# Hello Tham Website

[![GitHub Pages Status](https://github.com/hellotham/hellotham.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/hellotham/hellotham.github.io/actions/workflows/deploy.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/744060b8-0d0c-4951-a546-e61f40129cb2/deploy-status)](https://app.netlify.com/sites/hellotham/deploys)

The corporate website of [Hello Tham Pty Ltd](https://hellotham.com) (v5.0.0), a boutique management consulting firm — built on our own [Hello Astro](https://github.com/hellotham/hello-astro) starter.

## Design

The 2026 redesign implements our **Rosely** design system in an editorial style: Noto Serif headlines, mono uppercase eyebrows, hairline rules, numbered indexes, and the Rosely palette (mulberry, rose, quartz, plum, cream) expressed as Tailwind CSS v4 `@theme` tokens in `src/styles/global.css`. Every page supports light and dark themes, and illustrations are [unDraw](https://undraw.co) SVGs recoloured to the palette. The variable Noto Sans/Serif/Mono families are handled by Astro's native Fonts API (`fonts` in `astro.config.ts` + `<Font />` in the base layout): font files are downloaded at build time and self-hosted with preload links, so no third-party font requests are made at runtime. The design was authored in Claude Design and implemented with [Claude Code](https://claude.com/claude-code).

## Architecture

A static-first Astro site — no servers, no databases, no cookies:

- **Astro v7 + Tailwind CSS v4 + TypeScript**, `output: 'static'`.
- **Future-dated publishing (client-side):** future posts are built into the static output but hidden; a small script in `src/layouts/base.astro` compares each element's `data-publish-date` with the visitor's clock at view time, so scheduled articles unlock automatically without a rebuild.
- **Search:** [Pagefind](https://pagefind.app) builds a local index post-build; queries run entirely in the browser.
- **Content pipelines:** Markdown, MDX and Markdoc via `@astrojs/markdown-satteri`, with custom satteri plugins (reading time, diagrams, emoji), Mermaid/Markmap diagrams and KaTeX math.
- **SEO:** JSON-LD + Open Graph via `src/components/seo.astro`; `@astrojs/sitemap` is extended by `scripts/extend-sitemap.mjs` to reference the sitemaps of our five subsites (Rosely, HelloNotes, FinvestLens, Hello Astro, Spotlite), mirrored in `robots.txt`.
- **Contact:** Netlify Forms (with honeypot) and an `astro-leaflet` OpenStreetMap map — the site's only third-party request.

## Content

Content lives in `src/content/` collections: `blog`, `page`, `doc`, `author`, `category` and `partner`. Notable conventions:

- **Achievements** (`/work`) are parsed at build time from `src/content/page/work.md` — keep the strict `#### year, client` heading + `>` blockquote format; `src/pages/work.astro` turns them into year-grouped cards with client-keyed tints and artwork.
- **Partners** are one markdown file + logo per partner in `src/content/partner/`; the home partner strip, the Find-out-more card and the Partners page CTA copy name them as well.
- **Blog covers:** posts may set `coverSVG` (displayed in cards and heroes) alongside `coverImage` (used for Open Graph, which needs a raster).
- Bespoke pages (`about`, `consultants`, `partners`, `apps`, `services`, `work`) live in `src/pages/` and are excluded from the generic `[page].astro` collection route.

## Development

```bash
pnpm install
pnpm dev      # dev server on http://localhost:4321
pnpm build    # astro build + extend sitemap + pagefind index
pnpm preview  # preview the production build
pnpm check    # astro type/content checks
pnpm lint     # prettier --write + eslint --fix
```

## Deployment

Every push to `master` deploys twice:

- **GitHub Pages** via `.github/workflows/deploy.yml`.
- **Netlify** (badge above), which also processes the contact form submissions.

## Credits

Based on the [Hello Astro](https://github.com/hellotham/hello-astro) starter. The Astro v7 / Tailwind v4 platform upgrade was performed with Google DeepMind's Antigravity agentic assistant; the subsequent Rosely redesign, bespoke pages and content overhaul were implemented with Anthropic's Claude Code. Illustrations by [unDraw](https://undraw.co).
