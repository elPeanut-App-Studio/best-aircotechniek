/**
 * Engelse teksten voor de merk- en modelpagina's.
 *
 * BELANGRIJK: hier staan UITSLUITEND teksten. Alle feitelijke waarden
 * (SEER, SCOP, kW, energielabels, garantietermijnen, capaciteitstabellen)
 * blijven staan in aux-products.ts, lg-products.ts en daikin-products.ts.
 * Zo is er precies één bron van waarheid voor de cijfers en kan een correctie
 * nooit uit de pas lopen tussen de twee talen.
 *
 * De keys zijn de model-slugs uit de betreffende productbestanden.
 */

/** Merk-taglines (brands.ts bevat de Nederlandse versie). */
export const brandTaglinesEn: Record<string, string> = {
  daikin: 'Global market leader in climate control, known for reliability and efficiency.',
  lg: 'Modern air conditioning with smart controls and a sleek design.',
  aux: 'Plenty of comfort for a sharp price, with an excellent price-quality ratio.',
};

/** Intro-alinea per merkpagina. */
export const brandIntroEn: Record<string, string> = {
  aux: 'AUX offers three series, each with its own features and level of comfort. Below you will find the key functions per model. Click through for the available capacities and full specifications.',
  lg: 'LG offers four wall-mounted models, from an affordable entry model to the most efficient top model. They all cool and heat, run on R32 and have wifi built in. Below you will find the key features per model.',
  daikin:
    'Daikin offers five wall-mounted models, from the affordable Sensira to the design models Stylish and Emura. They all cool and heat, run on R32 and are controlled with the Onecta app. Below you will find the key features and the available capacities per model.',
};

/** Kop boven het modeloverzicht per merk. */
export const brandModelsHeadingEn: Record<string, string> = {
  aux: 'The three AUX series',
  lg: 'The four LG models',
  daikin: 'The five Daikin models',
};

type ModelText = {
  tier: string;
  intro: string;
  /** Zelfde volgorde en aantal als de `specs` in het Nederlandse productbestand. */
  specs: { label: string; value: string }[];
  /** Drie vergelijkbare kenmerken voor de kaart op de merkpagina. */
  highlights?: string[];
};

export const auxTextEn: Record<string, ModelText> = {
  freedom: {
    tier: 'Entry model',
    intro: 'The affordable no-nonsense choice, built to be reliable.',
    specs: [
      { label: 'Airflow and comfort', value: 'Standard outflow' },
      { label: 'Air purification', value: 'Standard dust filter' },
      { label: 'Self-cleaning', value: 'Basic (drying the unit)' },
      { label: 'Heating in extreme cold', value: 'Down to -15°C' },
      { label: 'Design and finish', value: 'Functional, glossy white' },
    ],
  },
  'q-smart': {
    tier: 'Mid-range',
    intro: 'More comfort and cleaner air thanks to UV-LED and 4D air distribution.',
    specs: [
      { label: 'Airflow and comfort', value: '4D Swing (horizontal and vertical)' },
      { label: 'Air purification', value: 'UV-LED plus antibacterial filter' },
      { label: 'Self-cleaning', value: 'Self-cleaning function' },
      { label: 'Heating in extreme cold', value: 'Down to -20°C (incl. Heat Belt)' },
      { label: 'Design and finish', value: 'Modern and sleek, white' },
    ],
  },
  'c-smart': {
    tier: 'Premium',
    intro: 'The top model: highest efficiency, draught-free airflow and a sleek design.',
    specs: [
      { label: 'Airflow and comfort', value: 'Micro-perforation (draught-free) plus 4D Swing' },
      { label: 'Air purification', value: 'UV-LED plus antibacterial and anti-mould filter' },
      { label: 'Self-cleaning', value: '6-stage self-cleaning' },
      { label: 'Heating in extreme cold', value: 'Down to -25°C (incl. Heat Belt)' },
      { label: 'Design and finish', value: 'Premium finish, white or black' },
    ],
  },
};

export const lgTextEn: Record<string, ModelText> = {
  'standard-plus': {
    tier: 'Entry model',
    intro: 'The affordable entry choice: compact, quiet and reliable.',
    specs: [
      { label: 'Air purification', value: 'Ionizer+' },
      { label: 'Smart functions', value: 'Auto Clean, sleep mode from 19 dB(A)' },
      { label: 'Smart comfort', value: 'Standard' },
      { label: 'Finish', value: 'White' },
      { label: 'Controls', value: 'Remote control and LG ThinQ app' },
    ],
  },
  'ai-air-special': {
    tier: 'Mid-range',
    intro: 'Automatic comfort with AI Air mode and smart energy management.',
    specs: [
      { label: 'Air purification', value: 'Allergy filter as standard' },
      { label: 'Smart functions', value: 'AI Air mode, kW Manager' },
      { label: 'Smart comfort', value: 'AI Air mode' },
      { label: 'Finish', value: 'White' },
      { label: 'Controls', value: 'Remote control and LG ThinQ app' },
    ],
  },
  deluxe: {
    tier: 'Comfort-plus',
    intro: 'Extra air purification and a pleasant, indirect airflow.',
    specs: [
      { label: 'Air purification', value: 'Ionizer++ with allergy filter' },
      { label: 'Smart functions', value: 'Soft Air, Dual Vane' },
      { label: 'Smart comfort', value: 'Soft Air' },
      { label: 'Finish', value: 'White' },
      { label: 'Controls', value: 'Remote control and LG ThinQ app' },
    ],
  },
  premium: {
    tier: 'Top model',
    intro: 'The most efficient top model, with the richest sensors and filtering.',
    specs: [
      { label: 'Air purification', value: 'Ionizer++ virus, Dual Protection' },
      { label: 'Smart functions', value: 'Human sensor, Dual Vane, Jet Cool' },
      { label: 'Smart comfort', value: 'Sensor' },
      { label: 'Finish', value: 'White or black' },
      { label: 'Controls', value: 'Remote control and LG ThinQ app' },
    ],
  },
};

export const daikinTextEn: Record<string, ModelText> = {
  sensira: {
    tier: 'Entry model',
    intro: 'The most affordable Daikin: reliable and complete, without the extras.',
    specs: [
      { label: 'Positioning', value: "Daikin's entry model" },

      { label: 'Sound level (quiet mode)', value: 'From 20 dB(A)' },      { label: 'Finish', value: 'White' },
      { label: 'Refrigerant', value: 'R32' },
      { label: 'Available in', value: '2.0 to 6.0 kW' },
    ],
    highlights: ['SEER up to 6.50', 'From 20 dB(A)', 'Entry model, functional build'],
  },
  comfora: {
    tier: 'Basic comfort',
    intro: 'Comfortable and efficient, with a whisper-quiet mode from 19 dB(A).',
    specs: [
      { label: 'Sound level (quiet mode)', value: 'From 19 dB(A)' },
      { label: 'Finish', value: 'White' },
      { label: 'Refrigerant', value: 'R32' },
      { label: 'Available in', value: '2.0 to 7.1 kW' },
    ],
    highlights: ['SEER up to 7.30', 'From 19 dB(A)', 'Whisper-quiet basic comfort'],
  },
  perfera: {
    tier: 'Most chosen',
    intro:
      'The most popular model: very efficient, whisper-quiet from 19 dB(A) and with air purification.',
    specs: [
      { label: 'Energy label', value: 'Up to A+++ for cooling and heating' },
      { label: 'Sound level (quiet mode)', value: 'From 19 dB(A)' },
      { label: 'Air purification', value: 'Flash Streamer and silver filter' },
      { label: 'Comfort', value: 'Comfort+ mode and 3D airflow' },
      { label: 'Sensor', value: 'Presence detection with energy-saving mode' },
      { label: 'Finish', value: 'White' },
    ],
    highlights: ['SEER up to 8.65', 'From 19 dB(A)', 'Air purification with Flash Streamer'],
  },
  stylish: {
    tier: 'Design, compact',
    intro: 'Strikingly compact and very efficient, in white, silver or black.',
    specs: [
      { label: 'Design', value: 'Compact casing, only 189 mm deep' },

      { label: 'Sound level (quiet mode)', value: 'From 21 dB(A)' },      { label: 'Finish', value: 'White, silver or black' },
      { label: 'Refrigerant', value: 'R32' },
      { label: 'Available in', value: '2.0 to 5.0 kW' },
    ],
    highlights: ['SEER up to 8.75', 'From 21 dB(A)', 'Compact, only 189 mm deep'],
  },
  emura: {
    tier: 'Premium design',
    intro: 'The design model with an aluminium front, for when the unit may stand out.',
    specs: [
      { label: 'Design', value: 'Premium finish with aluminium front' },

      { label: 'Sound level (quiet mode)', value: 'From 19 dB(A)' },      { label: 'Finish', value: 'White, silver or black' },
      { label: 'Refrigerant', value: 'R32' },
      { label: 'Available in', value: '2.0 to 5.0 kW' },
    ],
    highlights: ['SEER up to 8.75', 'From 19 dB(A)', 'Design model with aluminium front'],
  },
};

/** "Standaard bij elke ..."-lijsten per merk. */
export const sharedEn: Record<string, string[]> = {
  aux: [
    'Heat pump: cooling and heating',
    'Remote control plus wifi and app',
    'R32 refrigerant',
    '2 year warranty',
  ],
  lg: [
    'Heat pump: cooling and heating',
    'Efficient, up to label A+++',
    'Remote control plus app (LG ThinQ)',
    'R32 refrigerant',
    '5 year manufacturer warranty',
  ],
  daikin: [
    'Heat pump: cooling and heating',
    'R32 refrigerant',
    'Remote control included',
    'Also controlled with the Onecta app',
    '5 year manufacturer warranty',
  ],
};

/** Ruimte-indicatie per vermogen-slug. Gelijk voor alle merken. */
export const sizeRoomEn: Record<string, string> = {
  '2-0-kw': 'Small bedroom or study',
  '2-5-kw': 'Bedroom or small room',
  '3-5-kw': 'Living room (average)',
  '4-2-kw': 'Large living room',
  '5-0-kw': 'Large living room or open space',
  '6-0-kw': 'Very large or open space',
  '7-0-kw': 'Very large or high-ceilinged room',
  '7-1-kw': 'Very large or high-ceilinged room',
};

/**
 * Zet een Nederlandse decimale komma om naar een punt, voor getallen op de
 * Engelse pagina's ("3,40 kW" -> "3.40 kW"). Vervangt alleen komma's TUSSEN
 * cijfers, zodat opsommingen als "Daikin, LG and AUX" ongemoeid blijven.
 */
export function num(value?: string): string {
  return (value ?? '').replace(/(\d),(\d)/g, '$1.$2');
}
