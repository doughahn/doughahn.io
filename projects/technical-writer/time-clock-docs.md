---
title: "Research saved the day for a time clock app"
date: 2015-01-01
tags: [ 'Technical Writer' ]
years: "2015-'22"
summary: "Multi-state custom docs for a custom time clock"
projOutcomes: "Robust documentation website used to create and perform continuous quality control on a custom, multi-state time clock."
projSkills: [ "Technical Writing", "Collaboration", "Documentation", "Facilitation", "Problem-Solving", "Research", "Web Development", "Static Sites", "Root Cause Analysis" ]
---

### The Backbone of a Custom Time Clock

I researched and built the core documentation for a time clock system used across multiple states, across several companies, and many types of employee (from seasonal farm workers to executives to union members). 

#### Research  

A major first part of this project was researching and documenting policy histories to fully understand each pay type in each state, and to uncover the root cause of any discrepancies. The client primarily operated in California and Nevada, and had operated several business in several domains for decades. My first goal, therefore, was to become a historian of pay types and accrual rates in order to create comprehensive docs that would reduce risk for the client and help the engineers design a better product. 

To achieve this I leveraged informal authority to build a collegiate and collaborative atmosphere with subject matter experts in HR, namely a commitment to consistency by always following through promptly and keeping them engaged, clarity of mission, and tailoring communication to their preferences (one leader preferred messages over chat; another phone calls). This rapport helped us work though problems together and uncover the root cause of several discrepancies in the existing documentation; while the system was working correctly these changes were not documented. Has these faults been translated into the new application they would have exposed the company to litigation and caused the project to fail.

#### Implementation 

The documents were written with [Sphinx](https://www.sphinx-doc.org/) and published in a searchable, version-controlled format on a private documentation website. Versioning was a critical components of this project, as we needed to ensure all stakeholders were using the latest documentation. While version control creates a natural changelog that can help the technical writer or auditor dig into every granular edit, I also built a changelog with notable updates for higher-level stakeholders' reference. This document was searchable, cross-referenceable, and had deep linking built in to enhance communication. 

![The time clock website, offering robust search, cross-referencing, and precise navigation](/time-clock-site-sample.webp)

Once we documented context and rates of all pay types and accruals, it was a simple task translating these into simple equations for the engineering team:

![Framing calculations mathematically for the developers](/time-clock-calculations.webp)

#### Continuous Quality Control

I helped the engineers define and implement a continuous testing plan. I documented use-cases for each kind ot pay type, and collaborated on a checklist of tests to run on a schedule based on certain criteria (for example, *Vacation: midnight shifts: Status Flag U employee Shift starts at 10PM	Monday and ends at 7AM Tuesday requests VAC starting at 10pm Tuesday*). This continuous quality control program was used throughout the software lifecycle to mitigate risk for the company.

![A sample of a quality control checklist run on a schedule](/time-benefits-checklist.webp)

The documentation was critical throughout the product lifecycle. one senior engineer said it saved them costly work, and helped them track accountability and bugs, onboard new team members, and efficiently implement pay type changes down the line. 