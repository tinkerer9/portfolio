import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
    const projects = await getCollection('projects');
    return rss({
        title: "Max Parisi's Projects",
        description: "Get updated about Max's latest projects.",
        site: `${context.site}/projects`,
        items: projects.map((entry) => ({
            title: entry.data.title,
            pubDate: entry.data.date,
            description: entry.data.description,
            link: `/projects/${entry.id}`,
        })),
    });
}