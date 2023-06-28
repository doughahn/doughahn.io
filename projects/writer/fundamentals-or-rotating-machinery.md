---
title: "Fundamentals of Rotating Machinery Diagnostics"
date: 2014-01-01
tags: [ 'Writer/Editor' ]
years: "2014"
summary: "Transferred and copy edited printers proof PDFs of schientific text into html format, and then into ebook and kindle formats."
projOutcomes: "eBook of industry standard textbook, with equations typeset using LaTeX."
projSkills: [ "Proofreading", "HTML", "CSS", "eBook Development", "grep" ]
---

### Translating a Scientific Text to Semantic Formats

This project came about when the client desired to publish [Fundamentals of Rotating machinery Diagnostics](https://www.amazon.com/Fundamentals-Rotating-Machinery-Diagnostics-Manufacturing/dp/0971408106) in electronic format but discovered the original was gone; all they had were flattened printers proofs from the first edition. I was tasked with exporting the text from the PDF into electronic format. As many who have worked with flattened PDFs knows, text is almost impossible to export with accuracy. 

Complicating this, the equations were low-resolution JPGs in these proofs, meaning they had to be reconstructed by hand and converted to a format that was usable. I used a LaTeX generator to assist with this, saving source files and converting them to scalable SVG for inclusion in the book. 

![Sample page showing typeset equations, cross-linking, and figure](/funamentals-sample.webp)

To save myself time I used grep extensively to search and replace common patterns that the PDF had garbled, as well as bootstrap cross-reference links within the documents. The final product was a set of semantic HTML documents and HTML images that had been proofread and converted to a variety of ebook formats. 

The book is 726 pages long and contains hundreds of equations and figures. The project was donated to the Donald E. Bently Foundation. 