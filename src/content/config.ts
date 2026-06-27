import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    category: z.string(),
    tags: z.array(z.string()),
    readTime: z.string(),
    cover: z.string().optional(),
    description: z.string(),
  }),
});

export const collections = { posts };
