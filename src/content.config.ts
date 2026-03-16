import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    sector: z.enum(['nlp', 'healthcare', 'energy', 'cv', 'ml', 'transport', 'data-analysis', 'image-processing']),
    tech: z.array(z.string()),
    image: z.string().optional(),
    links: z.array(z.object({ label: z.string(), url: z.string().url() })).optional(),
    date: z.string().optional(),
    order: z.number(),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/experience' }),
  schema: z.object({
    company: z.string(),
    location: z.string(),
    role: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    logo: z.string().optional(),
    projects: z.array(z.object({
      title: z.string(),
      description: z.string(),
      tech: z.array(z.string()),
      image: z.string().optional(),
    })),
    order: z.number(),
  }),
});

export const collections = { projects, experience };
