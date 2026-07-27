---
title: 'A New Look for Hello Tham: Designing v5.0.0 with Claude'
description: Our website has been redesigned from the ground up — an editorial design system called Rosely, conceived in Claude Design and implemented with Claude Code.
author: chris-tham
publishDate: 2026-07-27T00:00:00.000Z
featuredpost: true
coverImage: ../../assets/blog/redesign-2026.png
tags:
  - Hello Tham
  - website
  - design
  - Rosely
  - Astro
  - Tailwind CSS
  - Claude
  - accessibility
---

Our website has a new look. Version 5.0.0 is a complete visual redesign — new typography, a new colour system, new pages, and a great deal of new content — while keeping everything that made version 4.0.0 fast.

If the previous release was about the engine, this one is about the bodywork.

### Why redesign at all?

The old site was perfectly serviceable, but it looked like what it was: a template with our colours applied. Nothing about it said _boutique consulting firm_. Everything was rounded cards, drop shadows and generous purple.

We advise clients on how to express strategy clearly. Our own website ought to do the same thing — so we went back to first principles and asked what a consultancy site should feel like. The answer we kept coming back to was **editorial**: the visual language of a well-set magazine or annual report. Serif headlines. Hairlines instead of shadows. Numbered indexes. Plenty of white space and a lot of restraint.

### Designing in Claude Design

The design itself was created in **Claude Design**, Anthropic's design tool, running **Claude Opus**. Rather than commissioning a single mockup, we explored several complete directions side by side — each a full, interactive page rather than a static picture, which made it much easier to judge how a direction would actually behave.

The direction we chose, "Blended Direction", became the specification for the build: type scale, spacing rhythm, the treatment of rules and eyebrows, and the palette in both light and dark.

### Rosely, applied to ourselves

The colour system is **[Rosely](https://rosely.hellotham.com)**, our own design system — the millennial pinks and purples we publish as a product. It has always been our palette in spirit, but this is the first time it is implemented on our own site as a proper token system rather than a set of hex codes sprinkled through the markup.

Every colour is now a Tailwind CSS v4 `@theme` token — ink, cream, quartz, mulberry, rose, aqua, grape, plum — used consistently across every page, with a dark variant for each. Adjusting a shade is a one-line change, and the ISO-style discipline appeals to the enterprise architect in me: define once, reference everywhere.

Along the way we recomputed the contrast ratios and darkened our signature mulberry so that body text and links now meet **WCAG AA** against both cream and white. Good design should be legible design.

### Implementing with Claude Code

The implementation — the part where a design becomes a working, accessible, fast website — was done in pair programming with **Claude Code**, running **Claude Fable**, Anthropic's most capable model.

This was genuinely collaborative work rather than code generation. I directed; Claude implemented, verified in a real browser, and reported back with screenshots. Some of what came out of the sessions:

1. **Bespoke pages** for About, People, Partners, Apps, Services and Achievements, replacing generic collection templates with layouts designed for their content.
2. **An Achievements page** that parses our `work.md` file at build time into a year-grouped timeline, so the source of truth stays a single markdown document I can edit directly.
3. **Illustrations recoloured** from [unDraw](https://undraw.co) into the Rosely palette — a scripted colour-mapping pass, verified by histogram rather than by eye.
4. **Accessibility fixes** throughout: a skip link, a single main landmark, correct listbox semantics on the theme switcher, and the contrast work described above.
5. **Fonts migrated** to Astro's native Fonts API. The variable Noto families are downloaded at build time and self-hosted with preload links, so no third-party font requests are made at runtime — better for privacy and for first paint.

### Beyond the visuals

While we were in there, we refreshed a good deal of substance:

- Our **Quality Statement** is now structured around the seven quality management principles of ISO 9000:2015, and our **Risk Management Statement** around the ISO 31000:2018 risk management process — including the modern definition of risk as the effect of uncertainty on objectives, covering opportunity as well as threat.
- Our **[Privacy Policy](/privacy)** was rewritten from scratch based on what this website actually does, and structured for GDPR: legal bases, retention periods, processors and your rights. The short version is that this site sets no cookies, runs no analytics and embeds no trackers — so it needs no cookie banner.
- New pages for our **[Applications and Digital Products](/services/applications)** and **[Websites and Content Platforms](/services/websites)** practices, and an **[Apps](/apps)** page for the software we publish ourselves.

### On working with AI

I have written before about using agentic assistants on this codebase. What strikes me about this release is the division of labour: **Claude Opus** in Claude Design was the right tool for exploring what the site should look like, and **Claude Fable** in Claude Code was the right tool for making it real — reading the codebase, holding conventions consistent across sixty-odd files, and checking its own work in a browser.

Neither replaced the judgement about what we wanted to say, or the taste to know when a direction was wrong. That part is still ours. But the distance between an idea and a working, verified implementation has become remarkably short — and that is precisely what we tell our clients to prepare for.

The site remains open source. Everything described here is in our [repository](https://github.com/hellotham/hellotham.github.io), and the [Hello Astro](https://github.com/hellotham/hello-astro) starter it is built on is free for anyone to use.
