import { defineCollection, reference } from 'astro:content'
import { z } from 'astro/zod'
import { glob, file } from 'astro/loaders'

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      draft: z.boolean().default(false).optional(),
      title: z.string(),
      description: z.string(),
      author: reference('author').optional(),
      publishDate: z.date(),
      pubDate: z.date().optional(),
      coverImage: image().optional(),
      coverSVG: image().optional(),
      socialImage: image().optional(),
      images: z.array(image()).optional(),
      gallery: z.string().optional(),
      categories: z.array(reference('category')).optional(),
      tags: z.array(z.string()).optional(),
      extra: z.array(z.enum(['math', 'markmap', 'mermaid', 'gallery'])).optional(),
      minutesRead: z.string().optional()
    })
})

const page = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/page' }),
  schema: ({ image }) =>
    z.object({
      draft: z.boolean().default(false).optional(),
      featuredpost: z.boolean().default(false).optional(),
      title: z.string(),
      description: z.string(),
      coverImage: image().optional(),
      coverSVG: image().optional(),
      socialImage: image().optional(),
      extra: z.array(z.enum(['math', 'markmap', 'mermaid', 'gallery'])).optional(),
      minutesRead: z.string().optional()
    })
})

const doc = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/doc' }),
  schema: ({ image }) =>
    z.object({
      draft: z.boolean().optional(),
      section: z.string(),
      weight: z.number().default(0),
      title: z.string(),
      description: z.string(),
      images: z.array(image()).optional(),
      gallery: z.string().optional()
    })
})

const category = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/category' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      coverImage: image(),
      coverSVG: image().optional(),
      socialImage: image()
    })
})

const author = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/author' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      image: image(),
      contact: z.string()
    })
})

const partner = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/partner' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      image: image(),
      status: z.string(),
      link: z.url(),
      description: z.string()
    })
})

const social = defineCollection({
  loader: file('src/social.json', { parser: (text) => JSON.parse(text) }),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    link: z.string(),
    icon: z.string()
  })
})

export const collections = {
  blog,
  page,
  doc,
  category,
  author,
  partner,
  social
}
