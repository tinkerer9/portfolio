import { type CollectionEntry, getCollection } from 'astro:content';

interface Props {
    project: CollectionEntry<'projects'>;
}

export async function getStaticPaths() {
    const projects = await getCollection('projects');

    return projects.map((project) => ({
        params: { slug: project.id },
        props: { project }
    }));
}

export async function GET({ props, url }: { props: Props; url: URL }) {
    const { project } = props;

    if (!project.body) {
        return new Response('Project has no Markdown body.', { status: 500 });
    }

    const site = url.origin;

    const body = project.body
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
    
    const markdown = `\
# ${project.data.title}

${project.data.description}

![${project.data.image.alt ?? ''}](${new URL(project.data.image.path, site).href})

${body}
`;

    return new Response(markdown);
}