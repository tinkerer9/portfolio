import { getCollection } from "astro:content";

function escapeXml(text: string) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

export async function GET(context: { site: URL }) {
    const site = context.site.origin;

    const projects = (await getCollection("projects"))
        .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

    const lastBuildDate = projects.length
        ? projects.reduce(
                (latest, project) =>
                    project.data.updated > latest ? project.data.updated : latest,
                projects[0].data.updated
            )
        : new Date();

    const xml = `\
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Max Parisi's Projects</title>
    <description>Get updated about Max's latest projects.</description>
    <link>${escapeXml(`${site}/projects`)}</link>
    <image>
      <url>${escapeXml(`${site}/logos/color.png`)}</url>
      <title>Max Parisi</title>
      <link>${escapeXml(site)}</link>
    </image>
    <language>en-us</language>
    <dc:creator>Max Parisi</dc:creator>
    <dc:publisher>Max Parisi</dc:publisher>
    <copyright>© ${new Date().getFullYear()} Max Parisi</copyright>
    <atom:link href="${escapeXml(`${site}/projects/rss.xml`)}" rel="self" type="application/rss+xml" />
    <atom:link href="${escapeXml(`${site}/projects`)}" rel="alternate" type="text/html" />
    <lastBuildDate>${lastBuildDate.toUTCString()}</lastBuildDate>
    <ttl>60</ttl>
${projects
    .map(
        (project) => `\
    <item>
      <title>${escapeXml(project.data.title)}</title>
      <link>${escapeXml(`${site}/projects/${project.id}`)}</link>
      <guid isPermaLink="true">${escapeXml(`${site}/projects/${project.id}`)}</guid>
      <pubDate>${project.data.date.toUTCString()}</pubDate>
      <description>${escapeXml(project.data.description)}</description>
${project.data.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`).join("\n")}
      <dc:creator>Max Parisi</dc:creator>
      <media:content url="${escapeXml(`${site}${project.data.image.path}`)}" medium="image">
        <media:title>${escapeXml(project.data.title)}</media:title>
${project.data.image.alt ? `        <media:description type="plain">${escapeXml(project.data.image.alt)}</media:description>` : ""}
      </media:content>
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