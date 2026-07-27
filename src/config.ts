import { getCollection, type CollectionEntry } from 'astro:content'

export type Frontmatter = CollectionEntry<'blog'>['data']

export interface TagType {
  tag: string
  count: number
  pages: CollectionEntry<'blog'>[]
}

export const SiteMetadata = {
  title: 'Hello Tham',
  description:
    'Hello Tham is a boutique management consulting firm. We specialise in Business and IT strategies, operating models, strategic roadmaps, enterprise architecture, analytics and business process design. Since 2026 we also design and build applications, data products and websites.',
  author: {
    name: 'Chris Tham',
    twitter: '@chris1tham',
    url: 'https://christham.net',
    email: 'chris@christham.net',
    summary: 'Founder of Hello Tham'
  },
  org: {
    name: 'Hello Tham',
    twitter: '@hellothamcom',
    url: 'https://hellotham.com',
    email: 'info@hellotham.com',
    summary:
      'Hello Tham is a boutique management consulting firm. We specialise in Business and IT strategies, operating models, strategic roadmaps, enterprise architecture, analytics and business process design. Since 2026 we also design and build applications, data products and websites.'
  },
  location: 'Sydney, NSW, Australia',
  latlng: [-33.86785, 151.20732] as [number, number],
  repository: 'https://github.com/hellotham/hellotham.github.io',
  buildTime: new Date()
}

export { default as Logo } from './assets/site/logo.svg'
export { default as LogoImage } from './assets/site/hellotham-logo-500x500.png'
export { default as FeaturedSVG } from './assets/svg/undraw/undraw_ideas_flow.svg'
export { default as DefaultSVG } from './assets/svg/undraw/undraw_my_feed.svg'
export { default as DefaultImage } from './assets/undraw/undraw_my_feed.png'

export const NavigationLinks = [
  { name: 'Home', href: '' },
  { name: 'About', href: 'about' },
  { name: 'Services', href: 'services' },
  { name: 'Apps', href: 'apps' },
  { name: 'People', href: 'consultants' },
  { name: 'Partners', href: 'partners' },
  { name: 'Achievements', href: 'work' },
  { name: 'Blog', href: 'blog' }
]

export interface Service {
  num: string
  name: string
  tag: string
  isNew: boolean
  desc: string
  long: string
  href?: string
}

export const Services: Service[] = [
  {
    num: '01',
    name: 'Business and IT Strategy',
    tag: 'Strategy',
    isNew: false,
    desc: 'Strategy and plans, operating models, business process design and standardisation.',
    long: 'We develop the business concept and long-term vision, define business and IT strategy, and execute and measure the strategic initiatives that follow — including several IT strategies for large global financial institutions.'
  },
  {
    num: '02',
    name: 'Enterprise Architecture',
    tag: 'Architecture',
    isNew: false,
    desc: 'Enterprise analysis, design, planning and implementation to execute a strategy.',
    long: 'Enterprise, information and solution architecture — defining the target state, the transition path and the governance that holds it together. Includes a strategic architecture and migration roadmap for a major diversified services client.'
  },
  {
    num: '03',
    name: 'Operating Models',
    tag: 'Organisation',
    isNew: false,
    desc: 'Vision, goals, operating principles, services, metrics, roles and structure.',
    long: 'We define and revise operating models, including a Centre of Excellence operating model for a government organisation covering vision, goals, key services, metrics, roles and future state structure.'
  },
  {
    num: '04',
    name: 'Strategic Roadmaps',
    tag: 'Portfolio',
    isNew: false,
    desc: 'Aligning portfolio to strategy, business cases, project planning and initiation.',
    long: 'Business roadmaps, funding cases and portfolio alignment — including three business cases that secured over $20m for an enterprise shared services change program.'
  },
  {
    num: '05',
    name: 'Analytics and Data Science',
    tag: 'Data',
    isNew: false,
    desc: 'Data discovery, analysis, machine learning, insights and recommendations.',
    long: 'Analytics strategy, cloud data platforms and self-service capability — from an AWS data lake and Tableau rollout to text-classification machine learning on IT incident data.'
  },
  {
    num: '06',
    name: 'Applications and Digital Products',
    tag: 'Build · New practice',
    isNew: true,
    desc: 'App, web and integration builds — from proof of concept to production.',
    long: 'Applications, web front ends, service integrations and data products - from proof of concept to production.',
    href: 'services/applications'
  },
  {
    num: '07',
    name: 'Websites and Content Platforms',
    tag: 'Build · New practice',
    isNew: true,
    desc: 'Fast, accessible, content-driven sites on modern serverless architecture.',
    long: 'Design and delivery of corporate and content sites on a modern serverless stack — static and server-rendered Astro, Tailwind, local search, structured data and accessibility built in, deployed to a CDN with automated pipelines.',
    href: 'services/websites'
  }
]

export const Stats = [
  { n: '20 yrs', l: 'Advising organisations' },
  { n: '30+', l: 'Services delivered' },
  { n: '8', l: 'Industries served' },
  { n: '2', l: 'Apps published' }
]

export const ClientWords = [
  'Governments',
  'Financial institutions',
  'Global manufacturers',
  'Major organisations'
]

export const CaseStudies = [
  {
    year: '2026',
    client: 'Product launch',
    title: 'FinvestLens published',
    body: 'A native double-entry accounting application for macOS, iPadOS and iOS. Built on the rigour of the GnuCash accounting engine and reimagined for Apple platforms, it keeps accounts in local SQLite documents, imports from multiple formats and produces professional reports — released as free software under GPL v3.'
  },
  {
    year: '2026',
    client: 'Product launch',
    title: 'HelloNotes published',
    body: 'A private, local-first Markdown knowledge base for the Mac. A native live editor with wiki-links, backlinks, graph visualisation, full-text search and on-device intelligence — over plain files the user owns, with no accounts and no tracking.'
  },
  {
    year: '2026',
    client: 'Published book',
    title: 'AI-dō: The Way of AI, grounded in practice',
    body: 'A book by our founder Chris Tham on working with artificial intelligence in a disciplined, human-centred way — free to read online, with PDF and ePub editions available.'
  },
  {
    year: '2026',
    client: 'Global medical devices manufacturer',
    title: 'AI strategy and Architecture governance',
    body: 'A framework of eight patterns for deploying AI and twelve guardrails for safe, responsible use — aligned to ISO/IEC 22989, 23894 and 42001, complemented by a reference architecture. Also refined enterprise architecture governance by developing architecture services models and defined enterprise architecture metrics.'
  },
  {
    year: '2018',
    client: 'NSW Government agency',
    title: 'Investment planning',
    body: 'Developed a financial model and engaged stakeholders for a business case for a multi-year investment program for a suite of Enterprise applications. Successfully secured over $20m of funding to cover various aspects of Enterprise Shared Services applications change activities, including a Rolling Program to implement prioritised initiatives from Business Roadmap, and a ten year Asset Management Plan.'
  },
  {
    year: '2017',
    client: 'NSW Government agency',
    title: 'Enterprise Shared Services roadmap and operating model',
    body: 'Established a Business roadmap for Enterprise Shared Services applications, defined enterprise End to End process scenarios covered corporate and shared services functions, defined an overall Governance Framework and a Target Operating Model for the centre of excellence.'
  },
  {
    year: '2016',
    client: 'Australian subsidiary of a multi-national services organisation',
    title: 'Modern analytics platform and self-service capability',
    body: 'Increased the use of analytics in a large organisation to improve performance and gain insights, including establishing a modern cloud based data lake and analytics platform (AWS) and enabling self-service capacity (Tableau).'
  }
]

export const PAGE_SIZE = 48

export const GITHUB_EDIT_URL = `https://github.com/hellotham/hellotham.github.io/edit/master`

export const COMMUNITY_INVITE_URL = ``

export type Sidebar = Record<string, { text: string; link: string }[]>

export async function getPosts() {
  const posts = await getCollection('blog', ({ data }) => {
    return data.draft !== true
  })
  return posts.sort((a, b) =>
    a.data.publishDate && b.data.publishDate ? +b.data.publishDate - +a.data.publishDate : 0
  )
}
