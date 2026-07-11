---
title: Major Upgrade to Astro v7 and Dynamic Future-Dating
description: An overview of the major website overhaul, shifting to Astro v7, Tailwind CSS v4, and dynamic on-demand rendering using Netlify serverless functions.
author: chris-tham
publishDate: 2026-07-13T00:00:00.000Z
featuredpost: true
coverImage: ../../assets/site/screenshot.png
tags:
  - Hello Tham
  - website
  - serverless
  - SSR
  - Astro
  - Tailwind CSS
  - web app
  - JavaScript
  - TypeScript
  - Antigravity
---

We are excited to announce a major upgrade of our website (version 4.0.0). We have transitioned our codebase to the modern web stack, incorporating **Astro v7**, **Tailwind CSS v4**, and dynamic **Server-Side Rendering (SSR)**.

### Porting and Enhancing the Original Template

This update was made possible using **Antigravity**, a powerful agentic AI coding assistant designed by the Google Deepmind team. Antigravity was first used to enhance the original template repository ([hello-astro](https://github.com/hellotham/hello-astro)), which was then ported to this project. This collaborative pair programming effort allowed us to modernize the site architecture while preserving our custom branding, layout structure, Netlify forms, Leaflet map integrations, and signature pink/purple theme colours.

### Transitioning to Dynamic Future-Dating (SSR)

Previously, the site was built entirely as a static site. This meant that any future-dated articles would not appear on the live site until a new deployment was manually triggered or scheduled.

To solve this, we have enabled dynamic on-demand rendering utilizing native **Astro** features. By adding the `@astrojs/netlify` adapter and setting our dynamic routes to run in server mode (`export const prerender = false`), the deployed site now checks the system date at the exact moment of request:

- Future-dated blog posts remain hidden and return a standard `404 Not Found` response until their release date is reached.

* As soon as the current system date passes the article's publish date, it immediately appears on the homepage, blog listings, categories, tags, author feeds, and the RSS feed—all without requiring a rebuild or redeployment.

### Key Changes in this Major Overhaul:

1. **Engine Upgrades:** Astro v7, Tailwind CSS v4, and Pagefind v1.5.2 search indexing.
2. **Dynamic Rendering:** On-demand rendering using Netlify functions for home page summaries, blog rolls, category/tag lists, and detail views.
3. **RSS Feeds:** Dynamic, real-time generation of the `/rss.xml` feed matching the current system date.
4. **Modernized Configs:** Standardized on flat ESLint configurations (`eslint.config.mjs`) and Prettier configs (`.prettierrc.mjs`).
5. **Content Loaders:** Content schemas migrated to use Astro's modern glob and file loaders (migrating social JSON feeds into a single `src/social.json` loader).
