// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import { satteri } from "@astrojs/markdown-satteri";
import { externalLinks } from "./src/plugins/externalLinks";

export default defineConfig({
    adapter: cloudflare(),
    site: 'https://maxparisi.me',
    trailingSlash: 'never',
    prefetch: { prefetchAll: true },
    markdown: {
        processor: satteri({
            hastPlugins: [ externalLinks ]
        })
    }
});