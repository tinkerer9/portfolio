import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: { site: any; }) {
    const projects = await getCollection('projects');
    return rss({
        title: "Max Parisi's Projects",
        description: "Get updated about Max's latest projects.",
        site: `${context.site}/projects`,
        items: projects.map((project) => ({
            title: project.data.title,
            pubDate: project.data.date,
            description: project.data.description,
            link: `/projects/${project.id}`,
        })),
    });
}