import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import flattenSitemaps from './integrations/flatten-sitemaps.mjs';

export default defineConfig({
  site: 'https://best-aircotechniek.nl',
  redirects: {
    '/diensten': '/airco-installatie',
  },
  integrations: [
    tailwind({ configFile: './tailwind.config.mjs' }),
    sitemap(),
    flattenSitemaps(),
  ],
});
