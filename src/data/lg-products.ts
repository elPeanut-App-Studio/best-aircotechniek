import { bestLabelsFrom } from './energy-labels';

/**
 * LG-productgegevens voor de merkpagina's onder /merken/lg.
 *
 * BRONNEN
 * - Modelkenmerken, SEER/SCOP per serie en de vuistregel-capaciteitstabel: de
 *   eigen brochure (public/lg-airco-brochure.pdf, pagina 3 en 4).
 * - Koel- en verwarmingsvermogen per uitvoering (nominaal en maximaal), de
 *   typeaanduidingen en de energielabels: de productpagina's van LG Nederland,
 *   lg.com/nl/residentiele-airconditioners/<typeaanduiding>/, opgehaald
 *   29 juli 2026.
 * - SEER/SCOP per uitvoering voor Deluxe: Airco Webwinkel, dezelfde bron die we
 *   voor Daikin gebruiken. Die vermogens (2,5/3,2 · 3,5/4,0 · 5,0/5,8 ·
 *   6,6/7,5 kW) komen exact overeen met wat LG zelf opgeeft.
 */

/**
 * Capaciteit en ruimtegrootte, exact zoals de tabel op brochurepagina 4.
 * De slugs vormen de URL: /merken/lg/<model>/<slug>
 *
 * De 7,0 kW-klasse heet in de handel zo (Airco Webwinkel noemt de H24S1D ook
 * "7,0 kW"), terwijl het nominale vermogen 6,6 kW koelen en 7,5 kW verwarmen is.
 * Het klasselabel blijft daarom 7,0 kW; de echte vermogens staan in de specs.
 */
export const lgSizes = [
  { slug: '2-5-kw', kw: '2,5 kW', volume: '± 90 m³', area: '± 35 m²', room: 'Slaapkamer of kleine kamer' },
  { slug: '3-5-kw', kw: '3,5 kW', volume: '± 120 m³', area: '± 46 m²', room: 'Woonkamer (gemiddeld)' },
  { slug: '5-0-kw', kw: '5,0 kW', volume: '± 180 m³', area: '± 70 m²', room: 'Grote woonkamer of open ruimte' },
  { slug: '7-0-kw', kw: '7,0 kW', volume: '± 240 m³', area: '± 92 m²', room: 'Zeer grote of hoge ruimte' },
] as const;

/** "Standaard bij élke LG-airco" (brochurepagina 3). */
export const lgShared = [
  'Warmtepomp: koelen én verwarmen',
  'Zuinig tot label A+++',
  'Afstandsbediening + app (LG ThinQ)',
  'R32-koudemiddel',
  '5 jaar fabrieksgarantie',
] as const;

export type LgModel = {
  slug: string;
  name: string;
  tier: string;
  intro: string;
  photo: string;
  /** SEER (tot) op modelniveau. */
  seer: string;
  scop: string;
  /** Kernkenmerken op modelniveau, uit de vergelijking in de brochure. */
  specs: { label: string; value: string }[];
};

export const lgModels: LgModel[] = [
  {
    slug: 'standard-plus',
    name: 'Standard Plus',
    tier: 'Instapmodel',
    intro: 'De voordelige instapkeuze: compact, stil en betrouwbaar.',
    photo: '/lg/standard-plus.jpg',
    seer: '6,4',
    scop: '4,0',
    specs: [
      { label: 'Luchtreiniging', value: 'Ionizer+' },
      { label: 'Slimme functies', value: 'Auto Clean, slaapstand vanaf 19 dB(A)' },
      { label: 'Slim comfort', value: 'Standaard' },
      { label: 'Uitvoering', value: 'Wit' },
      { label: 'Bediening', value: 'Afstandsbediening en LG ThinQ-app' },
    ],
  },
  {
    slug: 'ai-air-special',
    name: 'AI Air Special',
    tier: 'Middenklasse',
    intro: 'Automatisch comfort met AI Air mode en slim energiebeheer.',
    photo: '/lg/ai-air-special.jpg',
    seer: '8,3',
    scop: '4,6',
    specs: [
      { label: 'Luchtreiniging', value: 'Allergiefilter standaard' },
      { label: 'Slimme functies', value: 'AI Air mode, kW Manager' },
      { label: 'Slim comfort', value: 'AI Air mode' },
      { label: 'Uitvoering', value: 'Wit' },
      { label: 'Bediening', value: 'Afstandsbediening en LG ThinQ-app' },
    ],
  },
  {
    slug: 'deluxe',
    name: 'Deluxe',
    tier: 'Comfort-plus',
    intro: 'Extra luchtreiniging en een aangename, indirecte luchtstroom.',
    photo: '/lg/deluxe-premium.jpg',
    seer: '8,5',
    scop: '4,6',
    specs: [
      { label: 'Luchtreiniging', value: 'Ionizer++ met allergiefilter' },
      { label: 'Slimme functies', value: 'Soft Air, Dual Vane' },
      { label: 'Slim comfort', value: 'Soft Air' },
      { label: 'Uitvoering', value: 'Wit' },
      { label: 'Bediening', value: 'Afstandsbediening en LG ThinQ-app' },
    ],
  },
  {
    slug: 'premium',
    name: 'Premium',
    tier: 'Topmodel',
    intro: 'Het zuinigste topmodel met de rijkste sensoren en filtering.',
    photo: '/lg/deluxe-premium.jpg',
    seer: '9,5',
    scop: '5,10',
    specs: [
      { label: 'Luchtreiniging', value: 'Ionizer++ virus, Dual Protection' },
      { label: 'Slimme functies', value: 'Human sensor, Dual Vane, Jet Cool' },
      { label: 'Slim comfort', value: 'Sensor' },
      { label: 'Uitvoering', value: 'Wit of zwart' },
      { label: 'Bediening', value: 'Afstandsbediening en LG ThinQ-app' },
    ],
  },
];

export type LgCapacity = {
  /** Officiële typeaanduiding; bij LG zit het vermogen in de code (09/12/18/24 = BTU). */
  code: string;
  /** Nominaal koelvermogen in kW. */
  koel: string;
  /** Maximaal koelvermogen in kW. */
  koelMax: string;
  /** Nominaal verwarmingsvermogen in kW. */
  verw: string;
  /** Maximaal verwarmingsvermogen in kW. */
  verwMax: string;
  seer: string;
  scop: string;
};

/**
 * Specificaties per uitvoering, per model.
 *
 * Deze tabel bepaalt ook WELKE uitvoeringen bestaan: LG levert AI Air Special en
 * Premium alleen als 2,5 en 3,5 kW. De catalogus van LG Nederland bevat precies
 * deze twaalf wandmodellen, en Airco Webwinkel voert die twee series ook alleen
 * in die twee vermogens. Eerder stonden hier de codes P18SND, P24SND, H18S1P en
 * H24S1P, geëxtrapoleerd uit het patroon: die bestaan niet.
 *
 * SEER/SCOP is per uitvoering bekend voor Deluxe; bij de andere drie series geeft
 * LG één waarde voor de hele serie, en die staat hier dan bij elke uitvoering.
 * Dat mag, want LG publiceert voor die series ook per type hetzelfde energielabel.
 * De labels worden uit deze SEER/SCOP berekend (zie energy-labels.ts) en komen
 * voor alle twaalf uitvoeringen exact overeen met het label dat LG zelf noemt.
 */
export const lgCapacities: Record<string, Record<string, LgCapacity>> = {
  'standard-plus': {
    '2-5-kw': { code: 'PC09ST', koel: '2,5', koelMax: '3,7', verw: '3,3', verwMax: '4,1', seer: '6,4', scop: '4,0' },
    '3-5-kw': { code: 'PC12ST', koel: '3,5', koelMax: '4,0', verw: '4,0', verwMax: '5,1', seer: '6,4', scop: '4,0' },
    '5-0-kw': { code: 'PC18ST', koel: '5,0', koelMax: '5,5', verw: '5,8', verwMax: '6,4', seer: '6,4', scop: '4,0' },
    '7-0-kw': { code: 'PC24ST', koel: '6,6', koelMax: '7,4', verw: '7,5', verwMax: '8,6', seer: '6,4', scop: '4,0' },
  },
  'ai-air-special': {
    '2-5-kw': { code: 'P09SND', koel: '2,5', koelMax: '3,6', verw: '3,2', verwMax: '4,6', seer: '8,3', scop: '4,6' },
    '3-5-kw': { code: 'P12SND', koel: '3,5', koelMax: '4,0', verw: '3,7', verwMax: '5,0', seer: '8,3', scop: '4,6' },
  },
  deluxe: {
    '2-5-kw': { code: 'H09S1D', koel: '2,5', koelMax: '3,8', verw: '3,2', verwMax: '4,9', seer: '8,7', scop: '4,60' },
    '3-5-kw': { code: 'H12S1D', koel: '3,5', koelMax: '4,2', verw: '4,0', verwMax: '5,4', seer: '8,5', scop: '4,60' },
    '5-0-kw': { code: 'H18S1D', koel: '5,0', koelMax: '5,5', verw: '5,8', verwMax: '6,4', seer: '7,0', scop: '4,30' },
    '7-0-kw': { code: 'H24S1D', koel: '6,6', koelMax: '7,4', verw: '7,5', verwMax: '8,6', seer: '6,9', scop: '4,30' },
  },
  premium: {
    '2-5-kw': { code: 'H09S1P', koel: '2,5', koelMax: '4,0', verw: '3,2', verwMax: '5,5', seer: '9,5', scop: '5,10' },
    '3-5-kw': { code: 'H12S1P', koel: '3,5', koelMax: '4,3', verw: '4,0', verwMax: '6,0', seer: '9,5', scop: '5,10' },
  },
};

/**
 * Hoogste energielabel binnen de serie, voor de modelpagina ("tot A+++").
 * Afgeleid uit lgCapacities, zodat het label niet los kan gaan lopen van de
 * SEER/SCOP die op de vermogenspagina's staat.
 */
export function lgBestLabels(modelSlug: string): { koelen: string; verwarmen: string } | null {
  const caps = lgCapacities[modelSlug];
  if (!caps) return null;
  return bestLabelsFrom(Object.values(caps));
}

/**
 * Hoogste SEER/SCOP binnen de serie, voor de "tot"-waarde op de modelpagina.
 * Ook afgeleid, zodat de modelpagina nooit een lagere waarde claimt dan een
 * vermogenspagina toont (de Deluxe 2,5 kW haalt 8,7 en niet de 8,5 uit de brochure).
 */
export function lgBestEfficiency(modelSlug: string): { seer: string; scop: string } | null {
  const caps = lgCapacities[modelSlug];
  if (!caps) return null;
  const top = (pick: (c: LgCapacity) => string) =>
    Object.values(caps)
      .map(pick)
      .reduce((a, b) => (Number(b.replace(',', '.')) > Number(a.replace(',', '.')) ? b : a));
  return { seer: top((c) => c.seer), scop: top((c) => c.scop) };
}

/** De vermogens die dit model daadwerkelijk heeft, in de volgorde van lgSizes. */
export function lgSizesFor(modelSlug: string) {
  return lgSizes.filter((s) => lgCapacities[modelSlug]?.[s.slug]);
}

export function lgCapacity(modelSlug: string, sizeSlug: string): LgCapacity | undefined {
  return lgCapacities[modelSlug]?.[sizeSlug];
}

export function getLgModel(slug: string): LgModel | undefined {
  return lgModels.find((m) => m.slug === slug);
}
