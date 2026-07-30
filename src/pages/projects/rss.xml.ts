import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const SITE = "https://maxparisi.me";

function escapeXml(text: string) {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

export const GET: APIRoute = async () => {
	const projects = (await getCollection('projects'))
		.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

	const lastBuildDate = projects.length
		? projects.reduce(
			(latest, project) => project.data.updated > latest ? project.data.updated : latest,
			projects[0].data.updated
		)
		: new Date();

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
    <atom:link href="${escapeXml(`${SITE}/projects/rss.xml`)}" rel="self" type="application/rss+xml" />
	<title>Max Parisi's Projects</title>
	<description>Get updated about Max's latest projects.</description>
	<link>${escapeXml(`${SITE}/projects`)}</link>
	<language>en-us</language>
	<lastBuildDate>${lastBuildDate.toUTCString()}</lastBuildDate>
${projects
		.map((project) => `	<item>
		<title>${escapeXml(project.data.title)}</title>
		<description>${escapeXml(project.data.description)}</description>
		<link>${escapeXml(`${SITE}/projects/${project.id}`)}</link>
		<guid isPermaLink="true">${escapeXml(`${SITE}/projects/${project.id}`)}</guid>
		<pubDate>${project.data.date.toUTCString()}</pubDate>
	</item>`).join("\n")}
</channel>
</rss>
`;

	return new Response(xml, {
		headers: {
			"Content-Type": "application/rss+xml; charset=utf-8",
			"Cache-Control": "public, max-age=3600",
		},
	});
};