// @ts-check
import { defineConfig } from 'astro/config';
// import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  // adapter: cloudflare(),
  site: 'https://maxparisi.me',

  integrations: [ sitemap() ],
  output: 'static',
  build: { format: 'file' },
  trailingSlash: 'never',
  adapter: cloudflare()
});