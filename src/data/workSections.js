// How the "My Work" list is organized. Posts with `archived: true` keep their
// page but are left off the list. Every other post is filed under its FIRST tag:
//   - the employer section, grouped by role (a post's `role` frontmatter is the
//     slug of the role page it belongs under)
//   - the consultant section, grouped by `stage` frontmatter, in `stages` order;
//     a post without a known stage lands in a final "Other" group so it never
//     silently disappears
//   - the volunteer section, as one list

// anchor for a consultant stage group, e.g. /projects/#private-consultant-launch
export const stageId = key => `private-consultant-${key}`;

export default {
  employer: {
    tag: 'Lawrence Livermore National Lab',
    title: 'Lawrence Livermore National Laboratory',
    shortTitle: 'LLNL', // job headings read "LLNL: Web Team Lead"
    intro: 'Joined the Lab in 2023 in the Office of Strategic Communications; leading the web team since 2024.', // confirm
    roles: [
      {
        slug: 'web-team-lead',
        blurb: 'I lead a full-stack team of five across UX, content strategy, front-end, and full-stack development, with about 15 active projects at a time plus about 40 in maintenance, and budgets from $5K to $300K.',
      },
      {
        slug: 'web-editor-and-content-strategist',
        blurb: 'I was embedded with executives in the Director\'s Office, advising on the Lab Director\'s email campaigns and the mission language on the LLNL website.',
      },
    ],
  },
  consultant: {
    tag: 'Private Consultant',
    title: 'Private Consultant',
    slug: 'private-consultant', // overview page the heading links to
    blurb: 'A distillery\'s full lifecycle, from earning community support to divestment, 2013–2023.', // confirm
    // oldest stage first, since this is a story
    stages: [
      { key: 'earning-support', title: 'Earning support' },
      { key: 'launch', title: 'Launch' },
      { key: 'growth', title: 'Growth' },
      { key: 'crisis', title: 'Crisis' },
      { key: 'closure', title: 'Closure' },
    ],
  },
  volunteer: {
    tag: 'Volunteer',
    title: 'Volunteer',
    slug: 'volunteer', // overview page the heading links to
  },
};
