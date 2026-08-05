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
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Max Parisi's Projects</title>
    <description>Get updated about Max's latest projects.</description>
    <link>${escapeXml(`${SITE}/projects`)}</link>
    <image>
      <url>${escapeXml(`${SITE}/logos/color.png`)}</url>
      <title>Max Parisi</title>
      <link>${escapeXml(SITE)}</link>
    </image>
    <language>en-us</language>
    <dc:creator>Max Parisi</dc:creator>
    <dc:publisher>Max Parisi</dc:publisher>
    <copyright>© ${new Date().getFullYear()} Max Parisi</copyright>
    <atom:link href="${escapeXml(`${SITE}/projects/rss.xml`)}" rel="self" type="application/rss+xml" />
    <atom:link href="${escapeXml(`${SITE}/projects`)}" rel="alternate" type="text/html" />
    <lastBuildDate>${lastUpdatedDate.toUTCString()}</lastBuildDate>
    <pubDate>${lastUpdatedDate.toUTCString()}</pubDate>
${projects
	.map(
		(project) => `    <item>
      <title>${escapeXml(project.data.title)}</title>
      <description>${escapeXml(project.data.description)}</description>
${project.data.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`).join("\n")}
      <dc:creator>Max Parisi</dc:creator>
      <media:content url="${escapeXml(`${SITE}${project.data.img}`)}" medium="image">
        <media:title>${escapeXml(project.data.title)}</media:title>
${project.data.img_alt ? `        <media:description type="plain">${escapeXml(project.data.img_alt)}</media:description>` : ""}
      </media:content>
      <link>${escapeXml(`${SITE}/projects/${project.id}`)}</link>
      <guid isPermaLink="true">${escapeXml(`${SITE}/projects/${project.id}`)}</guid>
      <pubDate>${project.data.date.toUTCString()}</pubDate>
    </item>`
	)
	.join("\n")}
  </channel>
</rss>
`;

	return new Response(xml, { 
		headers: {
			"Content-Type": "application/rss+xml; charset=utf-8",
			"Cache-Control": "public, max-age=3600"
		}
	});
}