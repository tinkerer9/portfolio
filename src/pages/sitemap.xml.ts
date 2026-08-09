import { pages } from "../data/pages";

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

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => `  <url>
    <loc>${escapeXml(`${site}${page.path}`)}</loc>${
        page.updated ? `\n    <lastmod>${page.updated.toISOString().slice(0, 10)}</lastmod>` : ""
    }
  </url>`).join("\n")}
</urlset>
`;

    return new Response(xml);
};