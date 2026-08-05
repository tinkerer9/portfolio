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

export async function GET() {
	const projects = (await getCollection("projects"))
		.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

	const lastUpdatedDate = projects.length
		? projects.reduce(
				(latest, project) =>
					project.data.updated > latest ? project.data.updated : latest,
				projects[0].data.updated
			)
		: new Date();

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Max Parisi's Projects</title>
    <description>Get updated about Max's latest projects.</description>
    <link>${escapeXml(`${SITE}/projects`)}</link>
    <language>en-us</language>
    <atom:link href="${escapeXml(`${SITE}/projects/rss.xml`)}" rel="self" type="application/rss+xml" />
    <image>
      <url>${escapeXml(`${SITE}/logos/color.png`)}</url>
      <title>Max Parisi</title>
      <link>${escapeXml(SITE)}</link>
    </image>
    <lastBuildDate>${lastUpdatedDate.toUTCString()}</lastBuildDate>
    <pubDate>${lastUpdatedDate.toUTCString()}<pubDate>
${projects
	.map(
		(project) => `    <item>
      <title>${escapeXml(project.data.title)}</title>
      <description>${escapeXml(project.data.description)}</description>
${project.data.tags
	.map((tag) => `      <category>${escapeXml(tag)}</category>`)
	.join("\n")}
      <link>${escapeXml(`${SITE}/projects/${project.id}`)}</link>
      <guid isPermaLink="true">${escapeXml(`${SITE}/projects/${project.id}`)}</guid>
      <pubDate>${project.data.date.toUTCString()}</pubDate>
    </item>`
	)
	.join("\n")}
  </channel>
</rss>
`;

	return new Response(xml);
}