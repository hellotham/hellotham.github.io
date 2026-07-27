import { defineConfig, fontProviders } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'
import tailwindcss from '@tailwindcss/vite'
import robotsTxt from 'astro-robots-txt'
import mermaid from 'astro-mermaid'
import icon from 'astro-icon'
import markdoc from '@astrojs/markdoc'
import { satteri } from '@astrojs/markdown-satteri'
import { satteriReadingTime } from './satteri-plugins/satteri-reading-time.mjs'
import { satteriDiagram } from './satteri-plugins/satteri-diagram.mjs'
import { satteriEmoji } from './satteri-plugins/satteri-emoji.mjs'

// https://astro.build/config
export default defineConfig({
  output: 'static',
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Noto Sans',
      cssVariable: '--font-noto-sans',
      weights: ['100 900'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif']
    },
    {
      provider: fontProviders.google(),
      name: 'Noto Serif',
      cssVariable: '--font-noto-serif',
      weights: ['100 900'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['ui-serif', 'Georgia', 'serif']
    },
    {
      provider: fontProviders.google(),
      name: 'Noto Sans Mono',
      cssVariable: '--font-noto-sans-mono',
      weights: ['100 900'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['ui-monospace', 'SFMono-Regular', 'monospace']
    }
  ],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['astro-leaflet > leaflet']
    }
  },
  site: 'https://hellotham.com',
  image: {
    layout: 'constrained'
  },
  integrations: [
    icon(),
    // Placeholder starter docs are excluded until real documentation lands
    sitemap({ filter: (page) => !page.includes('/doc/') }),
    robotsTxt({
      sitemap: [
        'https://hellotham.com/sitemap-index.xml',
        'https://rosely.hellotham.com/sitemap-index.xml',
        'https://hellotham.com/hellonotes/sitemap.xml',
        'https://hellotham.com/finvestlens/sitemap-index.xml',
        'https://hellotham.com/hello-astro/sitemap-index.xml',
        'https://hellotham.com/spotlite/sitemap-index.xml'
      ]
    }),
    markdoc(),
    mdx(),
    mermaid()
  ],
  markdown: {
    processor: satteri({
      features: {
        math: true
      },
      mdastPlugins: [satteriReadingTime(), satteriDiagram(), satteriEmoji()]
    }),
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark'
      },
      // Enable word wrap to prevent horizontal scrolling
      wrap: true
    }
  },
  scopedStyleStrategy: 'where'
})
