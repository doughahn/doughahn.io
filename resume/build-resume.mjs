#!/usr/bin/env node
/**
 * build-resume.mjs — tailor a single-column resume to a job description.
 *
 * Reads the case studies in ../projects (frontmatter + body), the fixed
 * details in resume.config.yaml, and a job description. Claude picks and
 * phrases the most relevant material, then the script renders an editable
 * Word document (.docx).
 *
 *   node build-resume.mjs --jd jd.txt                # tailored with Claude (needs ANTHROPIC_API_KEY)
 *   node build-resume.mjs --jd jd.txt --no-ai        # keyword ranking only, no API call
 *   node build-resume.mjs --from-json out.content.json   # re-render saved content
 *
 * Options: --out <file.docx>  --config <yaml>  --projects <dir>  --model <id>
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import matter from 'gray-matter';
import * as yaml from 'js-yaml';
import {
  AlignmentType, Document, LevelFormat, Packer, Paragraph, Tab, TabStopType, TextRun,
} from 'docx';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_MODEL = 'claude-sonnet-5-5';

// ---------------------------------------------------------------- CLI

const { values: args } = parseArgs({
  options: {
    jd: { type: 'string' },
    out: { type: 'string' },
    config: { type: 'string', default: path.join(HERE, 'resume.config.yaml') },
    projects: { type: 'string', default: path.join(HERE, '..', 'projects') },
    model: { type: 'string', default: process.env.RESUME_MODEL || DEFAULT_MODEL },
    'no-ai': { type: 'boolean', default: false },
    'from-json': { type: 'string' },
    help: { type: 'boolean', short: 'h', default: false },
  },
});

if (args.help || (!args.jd && !args['from-json'])) {
  console.log(`Usage:
  node build-resume.mjs --jd <job-description.txt> [--out resume.docx] [--no-ai]
  node build-resume.mjs --from-json <resume.content.json> [--out resume.docx]

  --jd          Job description as a text file ("-" reads stdin)
  --no-ai       Rank existing material by keyword overlap instead of calling Claude
  --from-json   Re-render content saved by a previous run (edit the JSON first if you like)
  --config      Fixed resume details (default: resume.config.yaml next to this script)
  --projects    Portfolio case studies (default: ../projects)
  --model       Claude model (default: ${DEFAULT_MODEL}, or $RESUME_MODEL)`);
  process.exit(args.help ? 0 : 1);
}

const config = yaml.load(fs.readFileSync(args.config, 'utf8'));

// ---------------------------------------------------------------- Portfolio

/** Plain text from Markdown/HTML, with HTML comments (draft TODOs) removed. */
function toPlainText(md) {
  return md
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/^\s*(\d+\.|[-*])\s+/gm, '')
    .replace(/[*_`]/g, '')
    .replace(/&[a-z]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function loadProjects(dir) {
  const out = [];
  const walk = (d) => {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.md')) {
        const { data, content } = matter(fs.readFileSync(full, 'utf8'));
        out.push({
          id: path.relative(dir, full).split(path.sep).join('/'),
          title: String(data.title || '').trim(),
          years: String(data.years || '').trim(),
          summary: toPlainText(String(data.summary || '')),
          outcomes: toPlainText(String(data.projOutcomes || '')),
          skills: Array.isArray(data.projSkills) ? data.projSkills.map(String) : [],
          text: toPlainText(content).slice(0, 1800),
        });
      }
    }
  };
  walk(dir);
  return out;
}

/** "folder/*" matches files directly in folder; anything else is an exact path. */
function matchesPattern(id, pattern) {
  if (pattern.endsWith('/*')) {
    const prefix = pattern.slice(0, -1);
    return id.startsWith(prefix) && !id.slice(prefix.length).includes('/');
  }
  return id === pattern || id === `${pattern}.md`;
}

/** Flatten config sections into roles, each with the projects it claims.
 *  Exact paths are claimed before globs, so a file named explicitly for one
 *  role isn't pulled into another role's "folder/*". */
function buildRoles(cfg, projects) {
  const roles = [];
  cfg.sections.forEach((section) => {
    (section.roles || []).forEach((role) => {
      roles.push({ ...role, id: `role-${roles.length + 1}`, section: section.heading, projectIds: [] });
    });
  });
  const claimed = new Set();
  for (const globPass of [false, true]) {
    for (const role of roles) {
      for (const pattern of role.projects || []) {
        if (pattern.endsWith('/*') !== globPass) continue;
        const hits = projects.filter((p) => matchesPattern(p.id, pattern) && !claimed.has(p.id));
        if (!hits.length && !projects.some((p) => matchesPattern(p.id, pattern))) {
          console.warn(`  ! No project matches "${pattern}" (${role.title}). Skipping it.`);
        }
        hits.forEach((p) => { claimed.add(p.id); role.projectIds.push(p.id); });
      }
    }
  }
  return roles;
}

// ---------------------------------------------------------------- Tailoring with Claude

const RESUME_TOOL = {
  name: 'submit_resume',
  description: 'Submit the tailored resume content.',
  input_schema: {
    type: 'object',
    properties: {
      summary: { type: 'string', description: 'Two sentences, first person, at most 50 words.' },
      skills: { type: 'array', items: { type: 'string' }, description: '8 to 12 skills, most relevant first.' },
      roles: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            bullets: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  text: { type: 'string' },
                  sources: { type: 'array', items: { type: 'string' }, description: 'Project ids used, or "existing" for an existing bullet.' },
                },
                required: ['text', 'sources'],
              },
            },
          },
          required: ['id', 'bullets'],
        },
      },
      gaps: {
        type: 'array',
        items: { type: 'string' },
        description: 'Key requirements in the job description that the source material does not support.',
      },
    },
    required: ['summary', 'skills', 'roles', 'gaps'],
  },
};

const SYSTEM_PROMPT = `You tailor Doug Hahn's resume to a specific job description, using only the source material provided.

Hard rules:
- Every bullet must be supported by that role's source material. Never invent metrics, tools, employers, dates, titles, responsibilities, or outcomes, and never move an accomplishment to a different role.
- Keep figures exactly as they appear in the sources.
- Mirror the job description's language only where it truthfully describes the work.
- If the job asks for something the sources don't support, list it under gaps. Don't paper over it in the bullets.

Style:
- Summary: two sentences, at most 50 words, first person, in the voice of the base summary, positioned for this job. No clichés.
- Skills: 8 to 12 items drawn from the skill pool (you may shorten or merge names), most relevant to the job first.
- Bullets: up to max_bullets per role (fewer is fine). One sentence each, at most 32 words, starting with a strong past-tense verb and leading with the result where possible. Choose the material most relevant to the job.`;

function buildPrompt(jd, roles, projectsById) {
  const esc = (s) => String(s ?? '').replace(/</g, '‹');
  const pool = [...new Set([...(config.skills || []), ...roles.flatMap((r) => r.projectIds.flatMap((id) => projectsById[id].skills))])];
  const rolesXml = roles.map((r) => {
    const existing = (r.bullets || []).map((b) => `    - ${esc(b)}`).join('\n');
    const projects = r.projectIds.map((id) => {
      const p = projectsById[id];
      return `    <project id="${id}" years="${esc(p.years)}">
      Title: ${esc(p.title)}
      Outcome: ${esc(p.outcomes)}
      Skills: ${esc(p.skills.join(', '))}
      Details: ${esc(p.text)}
    </project>`;
    }).join('\n');
    return `  <role id="${r.id}" section="${esc(r.section)}" title="${esc(r.title)}" org="${esc(r.org)}" years="${esc(r.years)}" max_bullets="${r.maxBullets ?? 4}">
    <existing_bullets>
${existing || '    (none)'}
    </existing_bullets>
${projects}
  </role>`;
  }).join('\n');

  return `<job_description>
${esc(jd)}
</job_description>

<base_summary>${esc(config.summary)}</base_summary>

<skill_pool>${esc(pool.join(', '))}</skill_pool>

<roles>
${rolesXml}
</roles>

Tailor the resume to the job description and submit it with the submit_resume tool. Include every role id.`;
}

async function tailorWithClaude(jd, roles, projectsById) {
  let Anthropic;
  try {
    ({ default: Anthropic } = await import('@anthropic-ai/sdk'));
  } catch {
    throw new Error('Install the SDK first (npm install), or run with --no-ai.');
  }
  if (!process.env.ANTHROPIC_API_KEY) throw new Error('Set ANTHROPIC_API_KEY, or run with --no-ai.');

  const client = new Anthropic();
  const response = await client.messages.create({
    model: args.model,
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    tools: [RESUME_TOOL],
    tool_choice: { type: 'tool', name: RESUME_TOOL.name },
    messages: [{ role: 'user', content: buildPrompt(jd, roles, projectsById) }],
  });
  const block = response.content.find((b) => b.type === 'tool_use');
  if (!block) throw new Error('Claude did not return resume content.');
  return block.input;
}

// ---------------------------------------------------------------- Keyword fallback (--no-ai)

const STOP = new Set('the and for with that this from your our you are will have has into their they them who what when where how about across able such also more most other than then these those well work working team teams role including'.split(' '));
const IRREGULAR_PAST = new Set('built rebuilt led brought cut ran wrote made took grew drove won taught sold set found kept held oversaw began spun shipped'.split(' '));

const tokens = (s) => (s.toLowerCase().match(/[a-z][a-z+#.-]{2,}/g) || []).filter((t) => !STOP.has(t));
const isVerbFirst = (s) => {
  const word = (s.split(/\s+/)[0] || '').replace(/[^A-Za-z]/g, '');
  if (!word || word === word.toUpperCase()) return false; // skips acronyms like "LEED"
  const first = word.toLowerCase();
  return IRREGULAR_PAST.has(first) || (first.length >= 5 && first.endsWith('ed'));
};

function tailorByKeywords(jd, roles, projectsById) {
  const weight = {};
  tokens(jd).forEach((t) => { weight[t] = (weight[t] || 0) + 1; });
  const score = (s) => [...new Set(tokens(s))].reduce((sum, t) => sum + (weight[t] || 0), 0);
  const rank = (items) => items
    .map((item, i) => ({ item, i, s: score(item.rankText ?? item.text ?? item) }))
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .map((x) => x.item);

  const outRoles = roles.map((r) => {
    // Your curated bullets come first; case-study titles and outcomes fill any remaining slots.
    const existing = (r.bullets || []).map((text) => ({ text, sources: ['existing'] }));
    const fromProjects = r.projectIds.flatMap((id) => {
      const p = projectsById[id];
      return [p.title, p.outcomes]
        .filter((s) => s && s.split(/\s+/).length >= 5 && isVerbFirst(s))
        .map((text) => ({ text, sources: [id], rankText: `${text} ${p.summary}` }));
    });
    const bullets = [...rank(existing), ...rank(fromProjects)]
      .slice(0, r.maxBullets ?? 4)
      .map(({ text, sources }) => ({ text, sources }));
    return { id: r.id, bullets };
  });

  return {
    summary: config.summary,
    skills: rank(config.skills || []).slice(0, 10),
    roles: outRoles,
    gaps: ['(Not assessed in --no-ai mode.)'],
  };
}

// ---------------------------------------------------------------- Rendering

const FONT = config.font || 'Lato';
const PT = (n) => n * 2; // docx sizes are in half-points

const run = (text, opts = {}) => new TextRun({ text, font: FONT, ...opts });
const withPeriod = (s) => (/[.!?]$/.test(s.trim()) ? s.trim() : `${s.trim()}.`);

const PAGE = { width: 12240, height: 15840, margin: { top: 864, bottom: 864, left: 1008, right: 1008 } };
const TEXT_WIDTH = PAGE.width - PAGE.margin.left - PAGE.margin.right;

/** Bold text on the left, bold text flush right on the same line. */
function leftRight(left, right, { before = 0, after = 0, detail = '' } = {}) {
  const children = [run(left, { bold: true })];
  if (detail) children.push(run(`, ${detail}`));
  if (right) children.push(new TextRun({ font: FONT, bold: true, children: [new Tab(), right] }));
  return new Paragraph({
    children,
    tabStops: [{ type: TabStopType.RIGHT, position: TEXT_WIDTH }],
    keepNext: true,
    spacing: { before, after },
  });
}

const heading = (text) => new Paragraph({
  children: [run(text.toUpperCase(), { bold: true, size: PT(14) })],
  spacing: { before: 280, after: 60 },
  keepNext: true,
});

function render(content, roles) {
  const byId = Object.fromEntries(content.roles.map((r) => [r.id, r]));
  const children = [
    new Paragraph({ children: [run(config.name, { bold: true, size: PT(26) })], spacing: { after: 80 } }),
  ];
  if (config.credentials) {
    children.push(new Paragraph({ children: [run(config.credentials, { italics: true, size: PT(17) })], spacing: { after: 40 } }));
  }
  children.push(new Paragraph({ children: [run((config.contact || []).join(' | '), { size: 19 })], spacing: { after: 280 } }));
  children.push(new Paragraph({ children: [run(content.summary)] }));

  children.push(heading('Skills'));
  children.push(new Paragraph({ children: [run(content.skills.join(', '))] }));

  for (const section of config.sections) {
    const sectionRoles = roles.filter((r) => r.section === section.heading);
    const hasRoleContent = sectionRoles.some((r) => (byId[r.id]?.bullets || []).length || r.alwaysShow);
    if (!sectionRoles.length && !section.items?.length) continue;
    if (sectionRoles.length && !hasRoleContent) continue;
    children.push(heading(section.heading));

    sectionRoles.forEach((r, i) => {
      const bullets = byId[r.id]?.bullets || [];
      if (!bullets.length && !r.alwaysShow) return;
      children.push(leftRight(r.title, r.location, { before: i === 0 ? 0 : 240 }));
      children.push(leftRight(r.org, r.years, { after: 40 }));
      bullets.forEach((b) => children.push(new Paragraph({
        numbering: { reference: 'bullets', level: 0 },
        children: [run(withPeriod(b.text))],
        spacing: { after: 40 },
      })));
    });

    (section.items || []).forEach((item) => {
      children.push(leftRight(item.title, item.years, { after: 40, detail: item.detail }));
    });
  }

  return new Document({
    creator: config.name,
    title: `${config.name} — Resume`,
    styles: {
      default: {
        document: {
          run: { font: FONT, size: PT(11) },
          paragraph: { spacing: { line: 288 } },
        },
      },
    },
    numbering: {
      config: [{
        reference: 'bullets',
        levels: [{
          level: 0,
          format: LevelFormat.BULLET,
          text: '•',
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } },
        }],
      }],
    },
    sections: [{
      properties: {
        page: {
          size: { width: PAGE.width, height: PAGE.height }, // US Letter
          margin: PAGE.margin,
        },
      },
      children,
    }],
  });
}

// ---------------------------------------------------------------- Main

const projects = loadProjects(args.projects);
const projectsById = Object.fromEntries(projects.map((p) => [p.id, p]));
const roles = buildRoles(config, projects);

let content;
if (args['from-json']) {
  content = JSON.parse(fs.readFileSync(args['from-json'], 'utf8'));
} else {
  const jd = args.jd === '-' ? fs.readFileSync(0, 'utf8') : fs.readFileSync(args.jd, 'utf8');
  if (args['no-ai']) {
    content = tailorByKeywords(jd, roles, projectsById);
  } else {
    console.log(`Tailoring with ${args.model}…`);
    content = await tailorWithClaude(jd, roles, projectsById);
  }
  // Enforce per-role bullet limits and fill any role Claude skipped.
  const fallback = tailorByKeywords(jd, roles, projectsById);
  content.roles = roles.map((r) => {
    const found = content.roles.find((x) => x.id === r.id);
    const bullets = (found?.bullets?.length ? found.bullets : fallback.roles.find((x) => x.id === r.id).bullets);
    return { id: r.id, title: r.title, org: r.org, bullets: bullets.slice(0, r.maxBullets ?? 4) };
  });
}

const base = args.out
  ? args.out.replace(/\.docx$/i, '')
  : args['from-json']
    ? args['from-json'].replace(/\.content\.json$/i, '').replace(/\.json$/i, '')
    : `resume-${path.basename(args.jd === '-' ? 'stdin' : args.jd).replace(/\.[^.]+$/, '')}`;

if (!args['from-json']) fs.writeFileSync(`${base}.content.json`, JSON.stringify(content, null, 2));
fs.writeFileSync(`${base}.docx`, await Packer.toBuffer(render(content, roles)));

console.log(`\nWrote ${base}.docx`);
if (!args['from-json']) console.log(`Saved content to ${base}.content.json (edit it and re-render with --from-json)`);
if (content.gaps?.length) {
  console.log('\nGaps to address (in the doc or your cover letter):');
  content.gaps.forEach((g) => console.log(`  - ${g}`));
}
