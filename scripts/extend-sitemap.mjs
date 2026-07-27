// Appends the subsites' own sitemaps to the generated sitemap index so
// crawlers can discover the app/template microsites from the main site.
import { readFile, writeFile } from 'node:fs/promises'

const SUBSITE_SITEMAPS = [
  'https://rosely.hellotham.com/sitemap-index.xml',
  'https://hellotham.com/hellonotes/sitemap.xml',
  'https://hellotham.com/finvestlens/sitemap-index.xml',
  'https://hellotham.com/hello-astro/sitemap-index.xml',
  'https://hellotham.com/spotlite/sitemap-index.xml'
]

const file = new URL('../dist/sitemap-index.xml', import.meta.url)

let xml
try {
  xml = await readFile(file, 'utf8')
} catch {
  console.error('extend-sitemap: dist/sitemap-index.xml not found — run astro build first')
  process.exit(1)
}

const missing = SUBSITE_SITEMAPS.filter((loc) => !xml.includes(`<loc>${loc}</loc>`))
const entries = missing.map((loc) => `<sitemap><loc>${loc}</loc></sitemap>`).join('')

if (entries) {
  xml = xml.replace('</sitemapindex>', `${entries}</sitemapindex>`)
  await writeFile(file, xml)
}
console.log(`extend-sitemap: added ${missing.length} subsite sitemap(s) to sitemap-index.xml`)
