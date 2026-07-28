/**
 * Daikin-productgegevens voor de merkpagina's onder /merken/daikin.
 *
 * BRONNEN
 * - Koel- en verwarmingsvermogen per uitvoering, SEER en SCOP: officiële Daikin
 *   installateurscatalogus "Split installer catalogue" (ECPEN22-000), de
 *   specificatietabellen per productcode (FTXJ, FTXA, FTXM-R, FTXP-M, FTXF-D).
 * - Kenmerken Perfera: officiële Daikin-productpagina (Perfera wandmodel).
 * - Geluidsniveau (stille stand): sound pressure level uit dezelfde catalogus,
 *   de stilste stand van het bereik, zoals Daikin die zelf ook communiceert.
 * - Uitvoeringen/kleuren: af te leiden uit de officiële productcodes
 *   (AW = wit, S/BS = zilver, B/BB = zwart).
 * - Beschikbare vermogens en garantietermijn: aangeleverd door Best Aircotechniek.
 *
 * NIET OPGENOMEN (bewust, om geen onjuiste cijfers te tonen)
 * - Energielabels per uitvoering. Die verschillen per vermogen en staan in de
 *   catalogus als icoon, niet als tekst. SEER en SCOP staan er wel, dus die
 *   tonen we als "tot"-waarde, precies zoals Daikin zelf communiceert.
 *
 * LEVERBAARHEID
 * Alleen Perfera, Stylish en Emura hebben een 4,2 kW-uitvoering. Comfora en
 * Sensira niet (bevestigd door Best Aircotechniek). Voor de twee URL's die
 * daardoor zijn vervallen staat een redirect in astro.config.mjs.
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
  /** Officiële Daikin-packshot, gedownload van my.daikin.eu. */
  photo: string;
  /** Hoogste SEER binnen het bereik (uit de catalogus). */
  seer: string;
  /** Hoogste SCOP binnen het bereik (uit de catalogus). */
  scop: string;
  specs: { label: string; value: string }[];
  /**
   * Drie korte, vergelijkbare kenmerken voor de kaart op de merkpagina.
   * Zelfde assen voor elk model (rendement, geluid, en wat dit model bijzonder
   * maakt), zodat de kaarten onderling te vergelijken zijn. Zonder deze lijst
   * valt de kaart terug op de eerste kenmerken uit `specs`.
   */
  highlights: string[];
  sizes: DaikinSize[];
};

export const daikinShared = [
  'Warmtepomp: koelen én verwarmen',
  'R32-koudemiddel',
  'Afstandsbediening meegeleverd',
  'Ook te bedienen met de Onecta-app',
  '5 jaar fabrieksgarantie',
] as const;

export const daikinModels: DaikinModel[] = [
  {
    slug: 'sensira',
    name: 'Sensira',
    code: 'FTXF-D',
    tier: 'Instapmodel',
    intro: 'De voordeligste Daikin: betrouwbaar en compleet, zonder extra franje.',
    photo: '/daikin/sensira.jpg',
    seer: '6,50',
    scop: '4,30',
    specs: [
      { label: 'Positionering', value: 'Instapmodel van Daikin' },

      { label: 'Geluidsniveau (stille stand)', value: 'Vanaf 20 dB(A)' },      { label: 'Uitvoering', value: 'Wit' },
      { label: 'Koudemiddel', value: 'R32' },
      { label: 'Beschikbaar in', value: '2,0 tot 6,0 kW' },
    ],
    // Geen 4,2 kW: bevestigd door Best Aircotechniek dat die niet leverbaar is
    // (de catalogus uit 2022 noemt nog wel een 42D-uitvoering).
    highlights: ['SEER tot 6,50', 'Vanaf 20 dB(A)', 'Instapmodel, functioneel uitgevoerd'],
    sizes: sizes({
      '2-0-kw': ['2,00 kW', '2,40 kW'],
      '2-5-kw': ['2,50 kW', '2,80 kW'],
      '3-5-kw': ['3,30 kW', '3,50 kW'],
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
    photo: '/daikin/comfora.jpg',
    seer: '7,30',
    scop: '4,65',
    specs: [
      { label: 'Geluidsniveau (stille stand)', value: 'Vanaf 19 dB(A)' },
      { label: 'Uitvoering', value: 'Wit' },
      { label: 'Koudemiddel', value: 'R32' },
      { label: 'Beschikbaar in', value: '2,0 tot 7,1 kW' },
    ],
    // Geen 4,2 kW: bevestigd door Best Aircotechniek, en ook de catalogus noemt
    // voor FTXP-M geen 42-uitvoering.
    highlights: ['SEER tot 7,30', 'Vanaf 19 dB(A)', 'Fluisterstil basiscomfort'],
    sizes: sizes({
      '2-0-kw': ['2,00 kW', '2,50 kW'],
      '2-5-kw': ['2,50 kW', '3,00 kW'],
      '3-5-kw': ['3,50 kW', '4,00 kW'],
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
    photo: '/daikin/perfera.jpg',
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
    highlights: ['SEER tot 8,65', 'Vanaf 19 dB(A)', 'Luchtzuivering met Flash Streamer'],
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
    photo: '/daikin/stylish.jpg',
    seer: '8,75',
    scop: '5,15',
    specs: [
      { label: 'Design', value: 'Compacte behuizing, slechts 189 mm diep' },

      { label: 'Geluidsniveau (stille stand)', value: 'Vanaf 21 dB(A)' },      { label: 'Uitvoering', value: 'Wit, zilver of zwart' },
      { label: 'Koudemiddel', value: 'R32' },
      { label: 'Beschikbaar in', value: '2,0 tot 5,0 kW' },
    ],
    highlights: ['SEER tot 8,75', 'Vanaf 21 dB(A)', 'Compact, slechts 189 mm diep'],
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
    photo: '/daikin/emura.jpg',
    seer: '8,75',
    scop: '5,15',
    specs: [
      { label: 'Design', value: 'Premium afwerking met aluminium front' },

      { label: 'Geluidsniveau (stille stand)', value: 'Vanaf 19 dB(A)' },      { label: 'Uitvoering', value: 'Wit, zilver of zwart' },
      { label: 'Koudemiddel', value: 'R32' },
      { label: 'Beschikbaar in', value: '2,0 tot 5,0 kW' },
    ],
    highlights: ['SEER tot 8,75', 'Vanaf 19 dB(A)', 'Designmodel met aluminium front'],
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
