/*
 * exports an array of pages
 * automatically adds collections
 * includes path and title
 */

import { getCollection } from "astro:content";

const staticPages = [
	{ path: '/', title: 'Home' },
	{ path: '/projects', title: 'Projects' },
	{ path: '/about', title: 'About Me' },
	{ path: '/about/athletics', title: 'Athletics' },
	{ path: '/about/languages', title: 'Languages' },
	{ path: '/gear', title: 'Gear' },
	{ path: '/gear/camera', title: 'Camera Gear' },
	{ path: '/gear/printing', title: '3D Printing Gear' }
];

const projects = await getCollection('projects');

export const pages = [
	...staticPages,
	...projects.map((project) => ({
		path: `/projects/${project.id}`,
		title: project.data.title
	}))
]