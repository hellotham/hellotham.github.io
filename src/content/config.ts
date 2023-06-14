// 1. Import your utilities and schemas
import { z, defineCollection, reference } from 'astro:content'

// 2. Define your collections
const blogCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      draft: z.boolean().default(false).optional(),
      title: z.string(),
      description: z.string(),
      author: reference('author').optional(),
      publishDate: z.date(),
      coverImage: image().optional(),
      socialImage: image().optional(),
      images: z.array(image()).optional(),
      gallery: z.string().optional(),
      categories: z.array(reference('category')).optional(),
      tags: z.array(z.string()).optional(),
      extra: z.array(z.enum(['math', 'markmap', 'mermaid', 'gallery'])).optional(),
      minutesRead: z.string().optional()
    })
})

const pageCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      draft: z.boolean().default(false).optional(),
      featuredpost: z.boolean().default(false).optional(),
      title: z.string(),
      description: z.string(),
      coverImage: image().optional(),
      socialImage: image().optional(),
      extra: z.array(z.enum(['math', 'markmap', 'mermaid', 'gallery'])).optional(),
      minutesRead: z.string().optional()
    })
})

const docCollection = defineCollection({
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

const categoryCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      coverImage: image(),
      socialImage: image()
    })
})

const authorCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      image: image(),
      contact: z.string()
    })
})

const partnerCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      image: image(),
      status: z.string(),
      link: z.string().url(),
      description: z.string()
    })
})

const socialCollection = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    link: z.string(),
    icon: z.string()
  })
})

// 3. Export multiple collections to register them
export const collections = {
  blog: blogCollection,
  page: pageCollection,
  doc: docCollection,
  category: categoryCollection,
  author: authorCollection,
  partner: partnerCollection,
  social: socialCollection
}
