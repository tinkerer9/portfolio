import { type APIContext } from 'astro';
import { type CollectionEntry, getCollection } from 'astro:content';

interface Props {
	entry: CollectionEntry<'projects'>;
}

export async function GET({ props, url }: APIContext & { props: Props }) {
	const entry = (await getCollection('projects')).sort(
		(a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
	)[0];

	if (!entry) return new Response('No projects found.', { status: 404 });

	if (!entry.body) return new Response('Project has no Markdown body.', { status: 500 });

	const site = url.origin;

    const body = entry.body
        // use full path for links and images:
        .replace(
            /(!?)\[([^\]]*)\]\(([^)\s]+)([^)]*)\)/g,
            (_, bang, text, href, rest) =>
                `${bang}[${text}](${new URL(href, site).href}${rest})`
        )
        // remove comments:
        .replace(/^\s*<!--[\s\S]*?-->\s*\n?/gm, '')
        // shift headers:
        .replace(/^(#{2,6})\s/gm, (_, hashes) => `${hashes.slice(1)} `)
        // keep newline spacing clean:
        .replace(/\n{3,}/g, '\n\n');
    
	const markdown = `# ${entry.data.title}

${entry.data.description}

![${entry.data.img_alt ?? ''}](${new URL(entry.data.img, site).href})

${body}
`;

	return new Response(markdown, {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8'
		}
	});
}