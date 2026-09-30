// Parses the frontmatter `years` field ("2019", "2017-23", "2010-2016", "2024-")
// so every range displays the same way and ongoing work can sort first.

export function parseYears(value) {
  const match = String(value || '').trim().match(/^(\d{4})\s*(?:([-–])\s*(\d{2}|\d{4})?)?$/);
  if (!match) return { start: 0, end: 0, ongoing: false, raw: value };
  const start = parseInt(match[1], 10);
  const ongoing = Boolean(match[2]) && !match[3];
  let end = start;
  if (match[3]) {
    end = match[3].length === 2 ? Math.floor(start / 100) * 100 + parseInt(match[3], 10) : parseInt(match[3], 10);
  }
  return { start, end, ongoing, raw: value };
}

// "2024–present", "2017–23", "2019"
export function formatYears(value) {
  const { start, end, ongoing, raw } = parseYears(value);
  if (!start) return raw;
  if (ongoing) return `${start}–present`;
  if (end === start) return String(start);
  const sameCentury = Math.floor(start / 100) === Math.floor(end / 100);
  return `${start}–${sameCentury ? String(end).slice(-2) : end}`;
}

// ongoing work first, then most recently finished, then most recently started
export function compareYearsDesc(a, b) {
  const x = parseYears(a);
  const y = parseYears(b);
  if (x.ongoing !== y.ongoing) return x.ongoing ? -1 : 1;
  if (x.end !== y.end) return y.end - x.end;
  return y.start - x.start;
}
