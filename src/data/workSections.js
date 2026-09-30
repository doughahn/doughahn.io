// How the "My Work" list is organized. Each post is filed under its FIRST tag:
//   - the employer section, grouped by role (a post's `role` frontmatter is the
//     slug of the role page it belongs under)
//   - the consultant section, grouped by skill tag, in `skillOrder`; any other
//     tag lands at the end so a new tag never silently disappears
//   - the volunteer section, as one list

export default {
  employer: {
    tag: 'Lawrence Livermore National Lab',
    title: 'Lawrence Livermore National Laboratory',
    roles: [
      {
        slug: 'web-team-lead',
        blurb: 'I lead a full-stack team of five across UX, content strategy, front-end, and full-stack development, with about 15 active projects at a time plus about 40 in maintenance, and budgets from $5K to $300K.',
      },
      { slug: 'web-editor-and-content-strategist' },
    ],
  },
  consultant: {
    title: 'Private Consultant',
    skillOrder: [
      'Technical Project Manager',
      'Business Strategist',
      'Content Strategist',
      'Technical Writer',
      'Developer',
      'Marketer',
      'Writer/Editor',
    ],
  },
  volunteer: {
    tag: 'Volunteer',
    title: 'Volunteer',
  },
};
