# Hello Tham Website (Astro)

[![Netlify Status](https://api.netlify.com/api/v1/badges/744060b8-0d0c-4951-a546-e61f40129cb2/deploy-status)](https://app.netlify.com/sites/hellotham/deploys)

This is the Hello Tham Corporate Website Web App (v4.0.0), built using the [Hello Astro](https://github.com/hellotham/hello-astro) starter.

## Modernized Architecture

The site runs on a modern dynamic serverless stack:

- **Astro v7 & Tailwind CSS v4:** Powered by Vite under the hood for maximum build performance and modern visual styles.
- **Dynamic Future-Dating (SSR):** Enabled via `@astrojs/netlify`. Dynamic routes (`/`, `/blog`, `/rss.xml`, categories, tags, and authors) are served on-demand, dynamically filtering out future-dated blog entries by comparing their `publishDate` against the current system clock at request time.
- **Client-Side Search:** High-performance local site searching powered by Pagefind v1.5.2.
- **Enhanced by Antigravity:** Google Deepmind's **Antigravity** agentic AI assistant was utilized to perform the code-base upgrades, enhance the underlying `hello-astro` template, and port the changes while preserving all custom consultancies content, partner listings, forms, and the original signature pink/purple theme colours.
