import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import flattenSitemaps from './integrations/flatten-sitemaps.mjs';

export default defineConfig({
  site: 'https://best-aircotechniek.nl',
  redirects: {
    '/diensten': '/airco-installatie',
    // Comfora en Sensira hebben geen 4,2 kW-uitvoering. Deze twee URL's hebben
    // kort bestaan; redirect naar de modelpagina i.p.v. een 404.
    '/merken/daikin/comfora/4-2-kw': '/merken/daikin/comfora',
    '/merken/daikin/sensira/4-2-kw': '/merken/daikin/sensira',
  },
  integrations: [
    tailwind({ configFile: './tailwind.config.mjs' }),
    sitemap(),
    flattenSitemaps(),
  ],
});
