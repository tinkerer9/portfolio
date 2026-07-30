import type { APIRoute } from "astro";
import { pages } from '../utils/pages.ts';

const site = "https://maxparisi.me";

export const GET: APIRoute = async () => {
	const urls = pages.map((page) => (`${site}${page.path}`));

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(loc) => `  <url>
    <loc>${loc}</loc>
  </url>`
	).join("\n")}
</urlset>`;

	return new Response(xml, {
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
			"Cache-Control": "public, max-age=3600",
		},
	});
};