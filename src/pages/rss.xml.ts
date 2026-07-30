import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const site = "https://maxparisi.me";

function escapeXml(text: string) {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

export const GET: APIRoute = async () => {
	const projects = await getCollection("projects");

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
	<title>Max Parisi's Projects</title>
	<description>Get updated about Max's latest projects.</description>
	<link>${site}/projects</link>
	<language>en-us</language>
	<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${projects
		.sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
		.map(
			(project) => `	<item>
		<title>${escapeXml(project.data.title)}</title>
		<description>${escapeXml(project.data.description)}</description>
		<link>${site}/projects/${project.id}</link>
		<guid>${site}/projects/${project.id}</guid>
		<pubDate>${project.data.date.toUTCString()}</pubDate>
	</item>`
		).join("\n")}
</channel>
</rss>`;

	return new Response(xml, {
		headers: {
			"Content-Type": "application/rss+xml; charset=utf-8",
			"Cache-Control": "public, max-age=3600",
		},
	});
};