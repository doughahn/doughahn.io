---
title: "Built an xAPI + Twine learning experience from scratch"
date: 2023-02-01
tags: [ 'Technical Project Manager' ]
years: "2023"
projOutcomes: "In under 10 weeks I helped a team build a complete xAPI-enabled learning experience, with documentation for the community."
projSkills: [ "Project Management", "xAPI", "JS", "CSS", "Twine", Learning Enablement", "Prompt Engineering" ]
---

### Learning together 



We conceived, designed, and launched an educational course built in Twine that instructs the learner how to leverage ChatGPT to construct more effective assessment questions. The name is *Chat Soufflé*, an inside joke among our team. 

<figure>
<video autoplay loop muted playsinline poster="/chat-souffle-cover.webp">
  <source src="/chat-souffle.mp4" type="video/mp4">
</video>
<figcaption>Demo of the site sending xAPI statements and console logs</figcaption>
</figure>

Using custom-built xAPI statements we collected over 3,000 learner activity data points which we aggregated in a dashboard on Veracity Learning&rsquo;s analytics platform. We built this with a team new to xApi and twine in under 10 weeks. 

#### We went from "0" in xAPI & Twine to:

- A complete Twine branching activity helping prompt engineers write better distractors
- 32 passages full of exercises and resources
- 2 learning tracks for users to explore and repeat as many times as they like
- 181 commits to a GitHub repo
- 153 deployments
- 3100 production-quality xAPI statements 
- A wiki on GitHub teaching users how to enable xAPI in their own Twine game, and potential best practices for xAPI teams

The success of this project was thanks to moving fast and keeping the whole team engaged. We also focused on organization from the outset, collaborating on verbs and how they would integrate with our app in order to help developers work efficiently and in parallel with the instructional designers, and to ultimately create a more robust data model:

![We collaborated on xAPI verbs from stage 1](/verbs.webp)

Real-time analysis of this data will allow us to measure learning effectiveness and refine the course design based on how well learning outcomes are being met at each step of the course.

I also drew storyboards showing each Twine passage and track, helping the learning designers get a solid grasp of the whole project:

![Storyboard of our Twine app](/storyboard.webp)

We built a robust dashboard using Veracity LMS visualizing user design experience levels, AI sentiment, ChatGPT experience, confidence in prompt engineering, etc. One of my contributions was to constantly create a good user experience, designing a responsive UX with buttons that provided feedback, a map of the game, and playful animations such as the below xAPI-style &ldquo;thank you&rdquo; for the team. I have found that these little things invigorate a team and drive engagement.

<figure>
<video autoplay loop muted playsinline poster="/chat-animation.webp">
  <source src="/chat-animation.mp4" type="video/mp4">
</video>
<figcaption>An easter egg saying &ldquo;thanks&rdquo; to the team.</figcaption>
</figure>

#### Project Links

**[Chat Soufflé](https://doughahn.github.io/chat-souffle/)**   
**[Source code](https://github.com/doughahn/chat-souffle)**  
**[Process Documentation](https://github.com/doughahn/chat-souffle/wiki)**

##### Video Walkthrough

Three of the five team members captured our work as part of the phase&rsquo;s close. Several of us continue the project, advocating for open-source tools in the Twine and xAPI communities. 

<iframe class="youtube-embed" src="https://www.youtube.com/embed/m0hl_OYQwPU?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

