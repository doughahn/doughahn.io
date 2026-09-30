---
title: "Streamlined how Lab websites are published, maintained, and tested"
slug: "streamlined-how-lab-websites-are-published-maintained-and-tested"
date: 2024-06-01 # confirm
tags: [ 'Lawrence Livermore National Lab' ]
years: "2024-" # confirm
summary: "Read about the processes I introduced so Lab websites are easier to keep current, easier to search, and checked automatically for regressions and content problems."
projOutcomes: "Each publication cut from 40 hours to 25 (roughly 165 hours a year) with a cleaner design-to-web handoff, plus regression testing that lets large upgrades ship with confidence and on-page editing that keeps customers' databases in use."
projSkills: [ "Process Improvement", "Liferay", "Information Architecture", "Accessibility", "Faceted Search", "Automated Testing", "Content Auditing", "Adobe InCopy", "Workflow Design" ]
---

### Keeping content current without the bottleneck

Much of the work behind a good website happens after launch. I introduced a set of processes to make the Lab sites my team supports easier to maintain, easier to use, and harder to break. Because this work is internal, I describe it by approach rather than by site.

### Maintaining data where it lives

Some of our customers rely on equipment databases published on their websites. In Liferay, I set up a process for maintaining those databases by editing web content articles directly on the page, so updates happen in context rather than through a separate system. The result is a usable system that grows with the customer and keeps getting used over time, rather than being launched and abandoned.

<!-- TODO: optional — who does the editing now (content owners, your team?) -->

### Document repositories built around the user

I designed document repositories that work alongside each site's information architecture, so documents are organized the way the rest of the site is. Faceted search lets people narrow large collections quickly, and a "last opened" feature lets them get back to the documents they use most. These projects also carried information architecture and accessibility improvements across the sites they touched.

<!-- FIGURE (optional): a screenshot of a repository with faceted search, if you can capture one from a public site or a mockup with placeholder content. -->

### Automated quality checks

I implemented automated regression testing, so changes to a site are checked against what already works, and automated content audits, along with the processes to act on what they find.

Regression automation saves many hours on large projects, like framework upgrades on sites with hundreds of pages, and lets us sign off on them with confidence. For day-to-day work, single-page testing lets developers check their pages against the Figma comps as they build.

<!-- TODO: optional — which tools, and what the content audits catch (broken links, accessibility issues, stale pages?) -->

### A cleaner handoff from design to web

Developers used to receive PDFs to publish print materials on the web, which meant pulling text out of a finished layout. I changed the process so developers work from the InCopy source files instead, giving them clean, structured text to publish. The new handoff reduced each publication from 40 hours to 25. With about 11 publications a year, that's roughly 165 hours saved annually.
