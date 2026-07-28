/**
 * LG-productgegevens voor de merkpagina's onder /merken/lg.
 *
 * Alle waarden komen uit de eigen brochure
 * (public/lg-airco-brochure.pdf, pagina 3 en 4). Er zijn GEEN specificaties
 * per vermogen bekend voor LG, dus die worden hier ook niet getoond:
 * de capaciteitstabel hieronder is de vuistregel uit de brochure.
 */

/**
 * Capaciteit en ruimtegrootte, exact zoals de tabel op brochurepagina 4.
 * De slugs vormen de URL: /merken/lg/<model>/<slug>
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
  labelKoelen: string;
  labelVerwarmen: string;
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
    labelKoelen: 'A++',
    labelVerwarmen: 'A+',
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
    labelKoelen: 'A++',
    labelVerwarmen: 'A++',
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
    labelKoelen: 'A+++',
    labelVerwarmen: 'A++',
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
    labelKoelen: 'A+++',
    labelVerwarmen: 'A+++',
    specs: [
      { label: 'Luchtreiniging', value: 'Ionizer++ virus, Dual Protection' },
      { label: 'Slimme functies', value: 'Human sensor, Dual Vane, Jet Cool' },
      { label: 'Slim comfort', value: 'Sensor' },
      { label: 'Uitvoering', value: 'Wit of zwart' },
      { label: 'Bediening', value: 'Afstandsbediening en LG ThinQ-app' },
    ],
  },
];

/**
 * Officiële typeaanduidingen per uitvoering, aangeleverd door Best Aircotechniek.
 * Bij LG zit het vermogen in de code zelf (09 / 12 / 18 / 24 = BTU), dus de
 * aanduiding hoort bij een vermogen en niet bij een serie. Daarom per maat.
 *
 * LG is hiermee compleet; AUX moet nog. De vermogenspagina toont
 * de regel alleen als er een code bekend is, dus tot die tijd blijft hij weg.
 */
export const lgTypeCodes: Record<string, Record<string, string>> = {
  'standard-plus': {
    '2-5-kw': 'PC09ST',
    '3-5-kw': 'PC12ST',
    '5-0-kw': 'PC18ST',
    '7-0-kw': 'PC24ST',
  },
  // Alleen P09SND is opgegeven; de andere drie volgen het door Best
  // Aircotechniek aangegeven patroon (prefix + BTU + achtervoegsel), net als bij
  // Standard Plus. Nog te bevestigen tegen de prijslijst.
  'ai-air-special': {
    '2-5-kw': 'P09SND',
    '3-5-kw': 'P12SND',
    '5-0-kw': 'P18SND',
    '7-0-kw': 'P24SND',
  },
  // Opgegeven: H09S1D. De rest volgt hetzelfde patroon (H + BTU + S1 + serieletter).
  deluxe: {
    '2-5-kw': 'H09S1D',
    '3-5-kw': 'H12S1D',
    '5-0-kw': 'H18S1D',
    '7-0-kw': 'H24S1D',
  },
  // Opgegeven: H09S1P. Zelfde patroon als Deluxe, met P als serieletter.
  premium: {
    '2-5-kw': 'H09S1P',
    '3-5-kw': 'H12S1P',
    '5-0-kw': 'H18S1P',
    '7-0-kw': 'H24S1P',
  },
};

export function getLgModel(slug: string): LgModel | undefined {
  return lgModels.find((m) => m.slug === slug);
}
