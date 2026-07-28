import { locations } from '../data/locations';

export type Lang = 'nl' | 'en';

/**
 * Vaste paginaparen: Nederlands pad -> Engels pad.
 * Nederlands blijft op de root, Engels krijgt Engelse slugs onder /en/.
 */
const staticPairs: Record<string, string> = {
  '/': '/en/',
  '/hoe-het-werkt': '/en/how-it-works',
  '/over-ons': '/en/about-us',
  '/contact': '/en/contact',
  '/airco-installatie': '/en/air-conditioning-installation',
  '/airco-onderhoud': '/en/air-conditioning-maintenance',
  '/airco-installatie-noord-brabant': '/en/air-conditioning-installation-noord-brabant',
};

/**
 * Alle paginaparen, inclusief de plaatspagina's. Dit is de enige bron van
 * waarheid voor zowel de taalknop als de hreflang-tags. Voeg hier een paar toe
 * zodra er een nieuwe Engelse pagina bijkomt.
 */
export const routePairs: Record<string, string> = {
  ...staticPairs,
  ...Object.fromEntries(
    locations.map((loc) => [
      `/airco-installatie-${loc.slug}`,
      `/en/air-conditioning-installation-${loc.slug}`,
    ]),
  ),
};

const enToNl: Record<string, string> = Object.fromEntries(
  Object.entries(routePairs).map(([nl, en]) => [en, nl]),
);

/** Haalt de trailing slash weg, behalve bij de twee homepages. */
export function normalizePath(pathname: string): string {
  if (pathname === '/' || pathname === '/en/') return pathname;
  return pathname.replace(/\/$/, '');
}

/** Geeft de tegenhanger in de andere taal, of null als die niet bestaat. */
export function counterpart(pathname: string): { lang: Lang; path: string } | null {
  const p = normalizePath(pathname);
  if (routePairs[p]) return { lang: 'en', path: routePairs[p] };
  if (enToNl[p]) return { lang: 'nl', path: enToNl[p] };
  return null;
}

/** Leidt de taal af uit het pad. Alles onder /en/ is Engels. */
export function langFromPath(pathname: string): Lang {
  return pathname === '/en/' || pathname.startsWith('/en/') ? 'en' : 'nl';
}
