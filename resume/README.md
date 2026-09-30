# Resume builder

Tailors a single-column resume to a job description, using the case studies in `../projects` and the fixed details in `resume.config.yaml`. Outputs an editable Word document.

## Setup

```bash
cd resume
npm install
cp resume.config.example.yaml resume.config.yaml   # then add your real phone number
export ANTHROPIC_API_KEY=...   # only needed for tailoring with Claude
```

`resume.config.yaml` holds your contact details and is git-ignored, as are generated resumes and `jobs/`. Only the example config is committed, so keep the two in sync when you change roles or bullets.

## Use

Save the job description as a text file (a `jobs/` folder is git-ignored), then:

```bash
node build-resume.mjs --jd jobs/anthropic-internal-comms.txt
```

This writes two files:

- `resume-<job>.docx`: the resume, ready to edit in Word or Google Docs.
- `resume-<job>.content.json`: the tailored content, with the case study behind each bullet and a list of gaps (requirements the portfolio doesn't support).

Other modes:

```bash
node build-resume.mjs --jd jobs/some-job.txt --no-ai          # no API call; ranks your existing bullets by keyword overlap
node build-resume.mjs --from-json resume-some-job.content.json   # re-render after editing the JSON
```

Options: `--out <file.docx>`, `--config <yaml>`, `--projects <dir>`, `--model <id>` (or set `RESUME_MODEL`).

## How it decides what goes in

- **Fixed:** name, credentials, contact, role titles, organizations, dates, and education come from `resume.config.yaml` exactly as written.
- **Tailored:** the summary, skills, and bullets. Each role draws on the bullets you list for it plus the case studies you map to it.
- **Guardrails:** Claude is told to use only facts from each role's sources, keep figures exact, and list unsupported requirements as gaps rather than invent them. Check each bullet's `sources` in the JSON before sending.
- HTML comments in case studies (the `<!-- TODO -->` prompts) are stripped before anything is sent, so draft notes never reach the resume.

## Formatting

Lato, US Letter, single column: name, italic credentials, contact line, summary, then Skills, Experience, Volunteer Leadership, and Education & Certification. Role titles sit left with location flush right; organization sits left with dates flush right. Install Lato (Google Fonts) or change `font` in the config.
