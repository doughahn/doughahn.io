---
title: "Rebuilt regatta scoring and operations for a multi-club rowing association"
slug: "rebuilt-regatta-scoring-and-operations-for-a-multi-club-rowing-association"
date: 2025-01-01 # confirm
tags: [ 'Volunteer', 'Developer' ]
years: "2025-" # confirm
summary: "Read about how I turned undocumented spreadsheet rules into a regatta operations platform for a multi-club rowing association."
projOutcomes: "A regatta operations platform with approval workflows, a rebuilt scoring engine, and test coverage grown from 82 to 181 passing tests, designed around how the association already makes decisions."
projSkills: [ "Requirements Discovery", "Stakeholder Management", "Access Control", "React", "TypeScript", "Netlify Functions", "Airtable", "AI-Assisted Development", "Testing" ]
---

### The hard part wasn't the code

The Bay Area Whaleboat Rowing Association (BAWRA) runs regattas for member clubs around San Francisco Bay. Its scoring rules lived in a spreadsheet's formulas and in people's heads, not in a spec, so most of the work on the BAWRA Racing System was reverse-engineering that undocumented process.

Some requirements only surfaced by reading the data. The data was missing an entire division of competitors, and the standings everyone assumed were live had been blank all season, because no results had been formally released.

Terminology turned out to be a correctness issue. The code said DNS ("did not start") where the association says DNF ("did not finish"). Renaming 144 references across 20 files was the easy part; the real work was recognizing that a naming mismatch between software and its users is a source of operational error, not a cosmetic one.

And one award couldn't be built as specified. The association asked for a ranking by cumulative crew age, but the award existed to discourage crews from gaming a cumulative-age threshold, and a sum rewards exactly that: stacking a couple of very old rowers among young ones. I flagged it, laid out alternatives like average age along with the data each would require, and the stakeholder made the call informed rather than surprised.

### Meeting users where they already work

BAWRA's users have genuinely conflicting needs: club representatives work within a single club, race coordinators work across clubs, and administrators live in spreadsheets. I modeled those differences as a permissions structure and designed two approval workflows, for member access requests and race-results sign-off, that map onto how the association already makes decisions rather than asking it to change its process to fit the software. Everyone signs in with a magic link or a code.

<figure>
<img src="/bawra-results-signoff.webp" alt="The Result Entry page for the Fall 2026 season: a sign-off panel listing four races, each marked “Not signed off” with a count of entries scored, above a grid for entering each mixed team’s finish position and time, DNF, or DQ" loading="lazy" decoding="async" />
<figcaption>Standings count only the races that have been signed off, so entering results never publishes them on its own</figcaption>
</figure>

The administrator who assembles race-day documents by hand preferred to keep her existing workflow. Rather than replacing her spreadsheet, I automated its inputs and preserved her file exactly — same sheets, formulas, and print settings — so the change was purely additive.

I also kept stakeholder decisions with stakeholders. Several times I declined to implement something until the rule behind it was confirmed, because a wrong assumption would have silently produced incorrect season results. Publishing standings and deleting records stayed with the people accountable for them; I provided the tooling and the evidence.

<figure>
<img src="/bawra-position-templates.webp" alt="The Position Templates admin page, listing reusable race-day officiating roles such as Backup Timer, Chief Race Official, Dockmaster, Finish Judge, and flaggers, each with a description of its duties and a default number of slots" loading="lazy" decoding="async" />
<figcaption>Reusable officiating positions that every race draws from</figcaption>
</figure>

### Making it reliable on race day

1. Diagnosed a race-day-blocking failure where saving results returned an opaque error. The root cause was an N+1 query pattern breaching the datastore's rate limit; I fixed the query, serialized client writes, and replaced the error with a message users could act on.
1. Found that member deactivation had never worked: the code read a field that didn't exist in the datastore, so deactivated users silently kept their access. I migrated production records and added regression tests.
1. Audited every read endpoint and added role-based access controls to protect members' and officials' personal information.
1. Rebuilt season scoring, fixing a bug that awarded points for races that hadn't been rowed and replacing all-or-nothing season totals with running standings.
1. Grew automated test coverage from 82 to 181 passing tests across scoring rules, data parsing, and export generation.
### On the AI-assisted part

I used AI assistance to compress implementation time, which shifted the real work to the parts that don't automate: auditing what the data actually said, catching the requirements nobody had written down, and knowing which decisions belonged to the association rather than to me.

The association's public website, [bawra.org](https://bawra.org/), is a separate project I also built.
