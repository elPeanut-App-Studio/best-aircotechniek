import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://best-aircotechniek.nl',
  redirects: {
    '/diensten': '/hoe-het-werkt',
  },
  integrations: [
    tailwind({ configFile: './tailwind.config.mjs' }),
    sitemap(),
  ],
});
