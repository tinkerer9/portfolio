# My Personal Portfolio

This is the source code for my personal portfolio&mdash;check it out at [**maxparisi.me**](https://maxparisi.me).

It's built on [Astro](https://astro.build) and uses a [Cloudflare Worker](https://developers.cloudflare.com/workers/) for hosting on my domain.
It was based on the Astro [Portfolio Theme](https://astro.build/themes/details/portfolio), though significantly modified.

## Pages

My portfolio has various pages; here are a few:

- **[Home](https://maxparisi.me):** includes a short description about me, a photo, skills, and recent projects.
- **[Projects](https://maxparisi.me/projects):** showcases my projects, with a seperate page on each.
- **[About](https://maxparisi.me/about):** provides more information about me and my hobbies

*For a complete list, check out my [sitemap](https://maxparisi.me/sitemap.xml).*

## How it Works

[Astro files](https://docs.astro.build/en/basics/astro-pages/#astro-pages) are based on HTML but support custom [components](https://docs.astro.build/en/basics/astro-components/) for repetive layouts.

### Layouts

I use [layouts](https://docs.astro.build/en/basics/layouts/) for my main HTML boilerplate.

My [`BaseLayout.astro`](src/layouts/BaseLayout.astro) layout incorporates everything from my `<head>` to CSS backgrounds.
Astro layouts (and components) use a `<slot />` to include content, so `BaseLayout` also adds the header and footer surrounding the main body.

I also have [`ProjectLayout.astro`](src/layouts/ProjectLayout.astro) and [`MarkdownLayout.astro`](src/layouts/MarkdownLayout.astro), which are used for Markdown files and each [project](src/content/projects).

### Components

I use [components](https://docs.astro.build/en/basics/astro-components/) more extensively than layouts.
While they are similar, components are usually used for small UI pieces.

Here are a few of [my components](src/components):

- **[`MainHead.astro`](src/components/MainHead.astro):** used for my HTML `<head>` and SEO tags
- **[`Hero.astro`](src/components/Hero.astro):** defines the top banner of most pages
- **[`Icon.astro`](src/components/Icon.astro):** used with [`icons.ts`](src/data/icons.ts) for custom SVG icons
- **[`Footer.astro`](src/components/Footer.astro):** adds a footer to each and every page

I also use components for everything from [*Call to Actions*](src/components/CallToAction.astro) to hidden [easter eggs](src/components/Konami.astro).

### Collections

Each of my projects is written in a [Markdown file](src/content/projects) and parsed by a [dynamic page](https://docs.astro.build/en/guides/routing/#static-ssg-mode) into HTML.
[`[...slug].astro`](src/pages/projects/[...slug].astro) renders the Markdown into an Astro document (later to be transformed into HTML), while [`[...slug].md.ts`](src/pages/projects/[...slug].md.ts) uses an [endpoint](https://docs.astro.build/en/guides/routing/#static-ssg-mode) to generate a Markdown file for LLMs to read.

### RSS and Sitemaps

I also made more endpoints to generate an [RSS feed](src/pages/projects/rss.xml.ts) and [sitemap](src/pages/sitemap.xml.ts).
These find and add pages to an XML template for better Search Engine Optimization (SEO).

## More

In my mind, this portfolio will never be finished.
I still have more [projects to add](PROJECTS.md) and an extensive [todo list](TODO.md).

Please support my portfolio by sharing it with people.
Feel free to reach out with any questions or suggestions at [max@maxparisi.me](mailto:max@maxparisi.me).
Thank you!
