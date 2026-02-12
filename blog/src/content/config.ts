import { defineCollection, z } from 'astro:content';

const CATEGORIES = [
  'Essentials',
  'Things to Do',
  'Experiences & Activities',
  'Attractions',
  'Itineraries',
  'Food & Dining',
  'Shopping',
  'Transport',
  'Special Guides',
  'Seasonal & Monthly',
  'Hotels & Accommodation',
  'Practical Information',
  'Visa & Entry',
  'Money & Payments',
  'Booking & Experiences',
  'Yacht & Cruise',
  'Activities Planning',
  'Holiday Packages',
  'Trust & Conversion',
  'Comparisons',
] as const;

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    city: z.string(),
    country: z.string(),
    category: z.enum(CATEGORIES),
    topic: z.string(),
    author: z.string().default('Travel Team'),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    keywords: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    relatedSlugs: z.array(z.string()).default([]),
    readingTime: z.number().default(5),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
