import { type CollectionEntry, getCollection } from "astro:content";

type Page = {
    path: string;
    title: string;
    updated?: Date;
};

type Project = CollectionEntry<'projects'>;

const staticPages: Page[] = [
    { path: '/', title: 'Home' },
    { path: '/projects', title: 'Projects' },
    { path: '/about', title: 'About Me' },
    { path: '/about/athletics', title: 'Athletics' },
    { path: '/about/languages', title: 'Languages' },
    { path: '/about/volunteering', title: 'Volunteering' },
    { path: '/gear', title: 'Gear' },
    { path: '/gear/camera', title: 'Camera Gear' },
    { path: '/gear/printing', title: '3D Printing Gear' }
];

const projects = (await getCollection('projects'))
    .sort((a: Project, b: Project) => b.data.date.valueOf() - a.data.date.valueOf());

export const pages: Page[] = [
    ...staticPages,
    ...projects.map((project: Project) => ({
        path: `/projects/${project.id}`,
        title: project.data.title,
        updated: project.data.updated
    }))
]