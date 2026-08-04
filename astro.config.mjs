import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import flattenSitemaps from './integrations/flatten-sitemaps.mjs';

export default defineConfig({
  site: 'https://best-aircotechniek.nl',
  redirects: {
    '/diensten': '/airco-installatie/',
    // Comfora en Sensira hebben geen 4,2 kW-uitvoering. Deze twee URL's hebben
    // kort bestaan; redirect naar de modelpagina i.p.v. een 404.
    '/merken/daikin/comfora/4-2-kw': '/merken/daikin/comfora/',
    '/merken/daikin/sensira/4-2-kw': '/merken/daikin/sensira/',
    // LG levert AI Air Special en Premium alleen als 2,5 en 3,5 kW: de catalogus
    // van LG Nederland kent geen 18- of 24-uitvoering van deze twee series.
    // Deze vier URL's (en hun Engelse tegenhangers) hebben kort bestaan.
    '/merken/lg/ai-air-special/5-0-kw': '/merken/lg/ai-air-special/',
    '/merken/lg/ai-air-special/7-0-kw': '/merken/lg/ai-air-special/',
    '/merken/lg/premium/5-0-kw': '/merken/lg/premium/',
    '/merken/lg/premium/7-0-kw': '/merken/lg/premium/',
    '/en/brands/lg/ai-air-special/5-0-kw': '/en/brands/lg/ai-air-special/',
    '/en/brands/lg/ai-air-special/7-0-kw': '/en/brands/lg/ai-air-special/',
    '/en/brands/lg/premium/5-0-kw': '/en/brands/lg/premium/',
    '/en/brands/lg/premium/7-0-kw': '/en/brands/lg/premium/',
  },
  integrations: [
    tailwind({ configFile: './tailwind.config.mjs' }),
    sitemap(),
    flattenSitemaps(),
  ],
});
