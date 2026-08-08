import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const collections = {
    projects: defineCollection({
        loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
        schema: z.object({
            title: z.string(),
            description: z.string(),
            date: z.coerce.date(),
            updated: z.coerce.date(),
            tags: z.array(z.string()),
            img: z.string(),
            img_alt: z.string().optional()
        })
    })
};
