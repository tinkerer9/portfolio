import type { APIRoute } from "astro";
import { pages } from "../utils/pages";

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
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => `  <url>
    <loc>${escapeXml(`${SITE}${page.path}`)}</loc>${
		page.updated ? `\n    <lastmod>${page.updated.toISOString().slice(0, 10)}</lastmod>` : ""
	}
  </url>`).join("\n")}
</urlset>
`;

	return new Response(xml, {
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
			"Cache-Control": "public, max-age=3600",
		},
	});
};