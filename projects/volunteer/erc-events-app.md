---
title: "Built a club event and race app that has handled thousands of signups"
slug: "built-a-club-event-and-race-app-that-has-handled-thousands-of-signups"
date: 2024-11-01
tags: [ 'Volunteer', 'Developer' ]
years: "2024-"
summary: "Read about how I replaced a rowing club's shared spreadsheet with a production event and race management app, and grew it from a solo build into a small team."
projOutcomes: "A production app that has handled 4,362 signups across 622 events and race-day logistics for 12 regattas, built with three other contributors across 77 merged pull requests."
projSkills: [ "Technical Leadership", "React", "TypeScript", "Hono", "Airtable", "SQLite", "Domain Modeling", "Access Control", "Testing", "Stakeholder Management" ]
---

### From a shared spreadsheet to a production system

The Embarcadero Rowing Club coordinated practices, crews, and regattas in a shared Google Sheet. As technical lead, I led its replacement: ERC Rows, an event and race management system that's been in production since November 2024.

1. 4,362 signups across 622 practice events.
1. 98 members, 65 of them active; 82 have signed up at least once.
1. Race-day logistics for 12 regattas, including 39 division and boat entries with seat assignments.
1. About 38,000 lines of TypeScript, with 39 test files spanning unit, integration, and end-to-end tests at multiple access levels.

<figure>
<img src="/erc-rows-calendar.webp" alt="The ERC Rows calendar for October 2026, showing daily practices, workouts, recreational rows, and two races, with the member’s own signups highlighted and a button to join or leave each event" loading="lazy" decoding="async" />
<figcaption>The events calendar, with each member’s signups and roles at a glance</figcaption>
</figure>

### Keeping the club in control of its data

The defining decision wasn't a framework choice — it was keeping the club in control of its own data. Production runs on Airtable, so non-technical board members can still open a table and fix a record the way they always have, with no deploy and no engineer. I put that behind a database service interface with a second SQLite adapter, so the app isn't coupled to the vendor and contributors get a local database with no credentials. Stakeholder autonomy and engineering independence, without trading one for the other.

### Letting the domain drive the model

A whaleboat seats eight rowers in port and starboard pairs, plus a coxswain and a bowhook, so seat assignment is modeled that way instead of as a generic roster. Members sign up for the role they can actually row; a full boat takes alternates, who get promoted when a seat opens; and the calendar warns about tide windows and Giants home-game parking. Members sign in with a magic link or a code. Access follows how the club is actually governed — member, event manager, and admin — and is enforced in tiers at the API, not just hidden in the interface.

<figure>
<img src="/erc-rows-events.webp" alt="Event cards in ERC Rows, each showing dock call, location, effort level, tides, a coxswain slot, eight rower seats with open seats and alternates, and alerts such as “Cox needed” or “Full boat”" loading="lazy" decoding="async" />
<figcaption>Event cards show who’s rowing, which seats are open, and the tides</figcaption>
</figure>

<figure>
<img src="/erc-rows-dashboard.webp" alt="A member’s ERC Rows dashboard, with total rows, weekly average, week streak, rows broken down by role and by event type, and upcoming signups" loading="lazy" decoding="async" />
<figcaption>Each member’s dashboard tracks their rowing history and upcoming signups</figcaption>
</figure>

### From solo build to small team

I grew the project from a solo build into a small team, merging 77 pull requests with three other contributors. That meant writing the conventions down — adapter parity rules, access tiers, preferred patterns — so code review could be about substance rather than style, and building test coverage at the access boundaries where an app like this is most likely to leak data. Live-data migrations run through scripts that dry-run by default and require an explicit commit flag, because the production database is a club that shows up at a dock on Saturday morning.

The club's public website, [ercrowing.org](https://ercrowing.org/), is a separate project I also designed and built.
