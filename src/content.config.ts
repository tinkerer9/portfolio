import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const collections = {
    projects: defineCollection({
        loader: glob({
            base: './src/content/projects',
            pattern: [ '**/*.md', '!**/_*/**', '!**/_*.md' ]
        }),
        schema: z.object({
            title: z.string(),
            description: z.string(),
            date: z.coerce.date(),
            updated: z.coerce.date(),
            image: z.object({
                path: z.string(),
                alt: z.string().optional()
            }),
            link: z.object({
                href: z.string(),
                label: z.string()
            }).optional(),
            noindex: z.boolean().default(false),
            comments: z.boolean().default(true)
        })
    })
};
