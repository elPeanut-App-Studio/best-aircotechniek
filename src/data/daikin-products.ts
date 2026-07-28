/**
 * Daikin-productgegevens voor de merkpagina's onder /merken/daikin.
 *
 * BRONNEN
 * - Koel- en verwarmingsvermogen per uitvoering, SEER en SCOP: officiële Daikin
 *   installateurscatalogus "Split installer catalogue" (ECPEN22-000), de
 *   specificatietabellen per productcode (FTXJ, FTXA, FTXM-R, FTXP-M, FTXF-D).
 * - Kenmerken Perfera: officiële Daikin-productpagina (Perfera wandmodel).
 * - Uitvoeringen/kleuren: af te leiden uit de officiële productcodes
 *   (AW = wit, S/BS = zilver, B/BB = zwart).
 * - Beschikbare vermogens en garantietermijn: aangeleverd door Best Aircotechniek.
 *
 * NIET OPGENOMEN (bewust, om geen onjuiste cijfers te tonen)
 * - Energielabels per uitvoering. Die verschillen per vermogen en staan in de
 *   catalogus als icoon, niet als tekst. SEER en SCOP staan er wel, dus die
 *   tonen we als "tot"-waarde, precies zoals Daikin zelf communiceert.
 * - Comfora 4,2 kW: door Best Aircotechniek opgegeven als leverbaar, maar in de
 *   catalogus staat voor FTXP-M geen 42-uitvoering. Vermogens daarom leeg
 *   gelaten voor die maat; wordt in de offerte bevestigd.
 */

/**
 * Ruimte-indicatie per vermogen. Dezelfde vuistregel als in de eigen
 * AUX- en LG-brochure (circa 36 m³ en 14 m² per kW, bij ca. 2,6 m
 * plafondhoogte en gemiddelde isolatie).
 */
const roomGuide: Record<string, { volume: string; area: string; room: string }> = {
  '2-0-kw': { volume: '± 70 m³', area: '± 28 m²', room: 'Kleine slaap- of studeerkamer' },
  '2-5-kw': { volume: '± 90 m³', area: '± 35 m²', room: 'Slaapkamer of kleine kamer' },
  '3-5-kw': { volume: '± 120 m³', area: '± 46 m²', room: 'Woonkamer (gemiddeld)' },
  '4-2-kw': { volume: '± 150 m³', area: '± 58 m²', room: 'Grote woonkamer' },
  '5-0-kw': { volume: '± 180 m³', area: '± 70 m²', room: 'Grote woonkamer of open ruimte' },
  '6-0-kw': { volume: '± 215 m³', area: '± 83 m²', room: 'Zeer grote of open ruimte' },
  '7-1-kw': { volume: '± 245 m³', area: '± 94 m²', room: 'Zeer grote of hoge ruimte' },
};

const kwLabels: Record<string, string> = {
  '2-0-kw': '2,0 kW',
  '2-5-kw': '2,5 kW',
  '3-5-kw': '3,5 kW',
  '4-2-kw': '4,2 kW',
  '5-0-kw': '5,0 kW',
  '6-0-kw': '6,0 kW',
  '7-1-kw': '7,1 kW',
};

export type DaikinSize = {
  slug: string;
  kw: string;
  /** Nominaal koelvermogen uit de Daikin-catalogus. Leeg = niet bekend. */
  koel?: string;
  /** Nominaal verwarmingsvermogen uit de Daikin-catalogus. Leeg = niet bekend. */
  verw?: string;
  volume: string;
  area: string;
  room: string;
};

/** Bouwt de maatlijst voor een model uit slug -> [koel, verw]. */
function sizes(entries: Record<string, [string, string] | null>): DaikinSize[] {
  return Object.entries(entries).map(([slug, cap]) => ({
    slug,
    kw: kwLabels[slug],
    koel: cap?.[0],
    verw: cap?.[1],
    ...roomGuide[slug],
  }));
}

export type DaikinModel = {
  slug: string;
  name: string;
  /** Officiële Daikin-productcode(s). */
  code: string;
  tier: string;
  intro: string;
  /** Hoogste SEER binnen het bereik (uit de catalogus). */
  seer: string;
  /** Hoogste SCOP binnen het bereik (uit de catalogus). */
  scop: string;
  specs: { label: string; value: string }[];
  sizes: DaikinSize[];
};

export const daikinShared = [
  'Warmtepomp: koelen én verwarmen',
  'R32-koudemiddel',
  'Bediening via de Daikin Onecta-app',
  '5 jaar fabrieksgarantie',
] as const;

export const daikinModels: DaikinModel[] = [
  {
    slug: 'sensira',
    name: 'Sensira',
    code: 'FTXF-D',
    tier: 'Instapmodel',
    intro: 'De voordeligste Daikin: betrouwbaar en compleet, zonder extra franje.',
    seer: '6,50',
    scop: '4,30',
    specs: [
      { label: 'Positionering', value: 'Instapmodel van Daikin' },
      { label: 'Uitvoering', value: 'Wit' },
      { label: 'Koudemiddel', value: 'R32' },
      { label: 'Beschikbaar in', value: '2,0 tot 6,0 kW' },
    ],
    sizes: sizes({
      '2-0-kw': ['2,00 kW', '2,40 kW'],
      '2-5-kw': ['2,50 kW', '2,80 kW'],
      '3-5-kw': ['3,30 kW', '3,50 kW'],
      '4-2-kw': ['4,20 kW', '4,60 kW'],
      '5-0-kw': ['5,00 kW', '6,00 kW'],
      '6-0-kw': ['6,00 kW', '6,40 kW'],
    }),
  },
  {
    slug: 'comfora',
    name: 'Comfora',
    code: 'FTXP-M',
    tier: 'Basiscomfort',
    intro: 'Comfortabel en zuinig, met een fluisterstille stand vanaf 19 dB(A).',
    seer: '7,30',
    scop: '4,65',
    specs: [
      { label: 'Geluidsniveau (stille stand)', value: 'Vanaf 19 dB(A)' },
      { label: 'Uitvoering', value: 'Wit' },
      { label: 'Koudemiddel', value: 'R32' },
      { label: 'Beschikbaar in', value: '2,0 tot 7,1 kW' },
    ],
    sizes: sizes({
      '2-0-kw': ['2,00 kW', '2,50 kW'],
      '2-5-kw': ['2,50 kW', '3,00 kW'],
      '3-5-kw': ['3,50 kW', '4,00 kW'],
      '4-2-kw': null,
      '5-0-kw': ['5,00 kW', '6,00 kW'],
      '6-0-kw': ['6,00 kW', '7,00 kW'],
      '7-1-kw': ['7,10 kW', '8,20 kW'],
    }),
  },
  {
    slug: 'perfera',
    name: 'Perfera',
    code: 'FTXM-R',
    tier: 'Meest gekozen',
    intro:
      'Het populairste model: zeer zuinig, fluisterstil vanaf 19 dB(A) en met luchtzuivering.',
    seer: '8,65',
    scop: '5,10',
    specs: [
      { label: 'Energielabel', value: 'Tot A+++ koelen en verwarmen' },
      { label: 'Geluidsniveau (stille stand)', value: 'Vanaf 19 dB(A)' },
      { label: 'Luchtzuivering', value: 'Flash Streamer en zilverfilter' },
      { label: 'Comfort', value: 'Comfort+ stand en 3D-luchtstroom' },
      { label: 'Sensor', value: 'Aanwezigheidsdetectie met energiespaarstand' },
      { label: 'Uitvoering', value: 'Wit' },
    ],
    sizes: sizes({
      '2-0-kw': ['2,00 kW', '2,50 kW'],
      '2-5-kw': ['2,50 kW', '2,80 kW'],
      '3-5-kw': ['3,40 kW', '4,00 kW'],
      '4-2-kw': ['4,20 kW', '5,40 kW'],
      '5-0-kw': ['5,00 kW', '5,80 kW'],
      '6-0-kw': ['6,00 kW', '7,00 kW'],
      '7-1-kw': ['7,10 kW', '8,20 kW'],
    }),
  },
  {
    slug: 'stylish',
    name: 'Stylish',
    code: 'FTXA-AW/BS/BT/BB',
    tier: 'Design, compact',
    intro: 'Opvallend compact en zeer zuinig, in wit, zilver of zwart.',
    seer: '8,75',
    scop: '5,15',
    specs: [
      { label: 'Design', value: 'Compacte behuizing, slechts 189 mm diep' },
      { label: 'Uitvoering', value: 'Wit, zilver of zwart' },
      { label: 'Koudemiddel', value: 'R32' },
      { label: 'Beschikbaar in', value: '2,0 tot 5,0 kW' },
    ],
    sizes: sizes({
      '2-0-kw': ['2,00 kW', '2,50 kW'],
      '2-5-kw': ['2,50 kW', '2,80 kW'],
      '3-5-kw': ['3,40 kW', '4,00 kW'],
      '4-2-kw': ['4,20 kW', '5,40 kW'],
      '5-0-kw': ['5,00 kW', '5,80 kW'],
    }),
  },
  {
    slug: 'emura',
    name: 'Emura',
    code: 'FTXJ-AW/S/B',
    tier: 'Premium design',
    intro: 'Het designmodel met aluminium front, voor wie de airco mag opvallen.',
    seer: '8,75',
    scop: '5,15',
    specs: [
      { label: 'Design', value: 'Premium afwerking met aluminium front' },
      { label: 'Uitvoering', value: 'Wit, zilver of zwart' },
      { label: 'Koudemiddel', value: 'R32' },
      { label: 'Beschikbaar in', value: '2,0 tot 5,0 kW' },
    ],
    sizes: sizes({
      '2-0-kw': ['2,00 kW', '2,50 kW'],
      '2-5-kw': ['2,50 kW', '2,80 kW'],
      '3-5-kw': ['3,40 kW', '4,00 kW'],
      '4-2-kw': ['4,20 kW', '5,40 kW'],
      '5-0-kw': ['5,00 kW', '5,80 kW'],
    }),
  },
];

export function getDaikinModel(slug: string): DaikinModel | undefined {
  return daikinModels.find((m) => m.slug === slug);
}
