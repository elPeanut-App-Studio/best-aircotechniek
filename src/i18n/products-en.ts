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
  'mitsubishi-heavy-industries':
    'Japanese engineering with the highest efficiency in our range.',
};

/** Intro-alinea per merkpagina. */
export const brandIntroEn: Record<string, string> = {
  aux: 'AUX offers three series, each with its own features and level of comfort. Below you will find the key functions per model. Click through for the available capacities and full specifications.',
  lg: 'LG offers four wall-mounted models, from an affordable entry model to the most efficient top model. They all cool and heat, run on R32 and have wifi built in. Below you will find the key features per model.',
  daikin:
    'Daikin offers five wall-mounted models, from the affordable Sensira to the design models Stylish and Emura. They all cool and heat, run on R32 and are controlled with the Onecta app. Below you will find the key features and the available capacities per model.',
  'mitsubishi-heavy-industries':
    'Mitsubishi Heavy Industries offers four wall-mounted series: the new ZT, the ZSX top model, the ZS and the ZR for large rooms. They all cool and heat, run on R32 and have wifi built in for the Smart M-Air app. Below you will find the key features and the available capacities per series.',
};

/** Kop boven het modeloverzicht per merk. */
export const brandModelsHeadingEn: Record<string, string> = {
  aux: 'The three AUX series',
  lg: 'The four LG models',
  daikin: 'The five Daikin models',
  'mitsubishi-heavy-industries': 'The four MHI series',
};

type ModelText = {
  tier: string;
  intro: string;
  /** Zelfde volgorde en aantal als de `specs` in het Nederlandse productbestand. */
  specs: { label: string; value: string }[];
  /** Drie vergelijkbare kenmerken voor de kaart op de merkpagina. */
  highlights?: string[];
  /** Kleuren/uitvoeringen; alleen gevuld waar het Nederlandse model dat veld heeft. */
  uitvoeringen?: string;
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
    intro: 'The most affordable Daikin: reliable and complete.',
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
    intro: 'Comfortable and efficient, with a whisper-quiet night mode.',
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
      'The most popular model: very efficient, quiet and with air purification.',
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
    intro: 'For when the unit may stand out in your interior.',
    specs: [
      { label: 'Design', value: 'Premium finish with aluminium front' },

      { label: 'Sound level (quiet mode)', value: 'From 19 dB(A)' },      { label: 'Finish', value: 'White, silver or black' },
      { label: 'Refrigerant', value: 'R32' },
      { label: 'Available in', value: '2.0 to 5.0 kW' },
    ],
    highlights: ['SEER up to 8.75', 'From 19 dB(A)', 'Design model with aluminium front'],
  },
};

/**
 * MHI. De labels en de volgorde volgen exact de `specs` in mhi-products.ts,
 * want de pagina koppelt ze op index.
 */
export const mhiTextEn: Record<string, ModelText> = {
  zt: {
    tier: 'Latest generation',
    intro:
      'The successor to the ZS, and more efficient at every capacity. Keeps heating down to -20 °C and holds its full heating capacity down to -10 °C.',
    uitvoeringen: 'Matte black (RAL 9011)',
    highlights: ['Latest generation, more efficient than the ZS', 'Keeps heating down to -20 °C', 'Matte black (RAL 9011)'],
    specs: [
      { label: 'Air purification', value: 'Allergen Clear Filter and photocatalytic washable deodorising filter' },
      { label: 'Heating in frost', value: 'Works down to -20 °C, full capacity to -10 °C' },
      { label: 'Airflow', value: 'Jet Air with a reach of up to 11 metres' },
      { label: 'Finish', value: 'Matte black, RAL 9011; outdoor unit in white or Jet Black' },
      { label: 'Controls', value: 'Remote control and Smart M-Air app, in 0.5 °C steps' },
    ],
  },
  zsx: {
    tier: 'Top model',
    intro:
      'The most efficient unit we supply, with a SEER of up to 10.3. A presence sensor notices whether anyone is in the room and adjusts accordingly.',
    uitvoeringen: 'Pure White and Titanium',
    highlights: ['Presence sensor adjusts to the room', 'Highest efficiency: SEER up to 10.3', 'Also available as 6.0 kW'],
    specs: [
      { label: 'Presence sensor', value: 'Adjusts to presence and activity in the room' },
      { label: 'Saving energy', value: 'Eco Operation and Auto Off' },
      { label: 'Air purification', value: 'Allergen Clear Filter and photocatalytic washable deodorising filter' },
      { label: 'Heating in frost', value: 'Works down to -20 °C' },
      { label: 'Finish', value: 'Pure White or Titanium' },
      { label: 'Controls', value: 'Remote control and Smart M-Air app' },
    ],
  },
  zr: {
    tier: 'Large rooms',
    intro:
      'For large open spaces where the other series are too small. A wide casing with a powerful airflow, in four capacities from 6.3 to 10.0 kW.',
    uitvoeringen: 'Pure White',
    highlights: ['The largest capacity on this site: up to 10.0 kW', 'Wide casing with a powerful air throw', 'Quiet for its size: from 25 dB(A)'],
    specs: [
      { label: 'Intended for', value: 'Large open spaces, shops and business premises' },
      { label: 'Air purification', value: 'Allergen Clear Filter and photocatalytic washable deodorising filter' },
      { label: 'Heating in frost', value: 'Works down to -20 °C' },
      { label: 'Airflow', value: '3D Auto Swing from a casing 1197 mm wide' },
      { label: 'Finish', value: 'Pure White' },
      { label: 'Controls', value: 'Remote control and Smart M-Air app' },
    ],
  },
  zs: {
    tier: 'Current generation',
    intro:
      'The familiar Premium series with Italian design: compact, whisper-quiet from 19 dB(A) and efficient up to label A+++.',
    uitvoeringen: 'Pure White, Black & White and Titanium',
    highlights: ['Italian design, compact', 'Whisper-quiet from 19 dB(A)', 'White, black or titanium'],
    specs: [
      { label: 'Air purification', value: 'Allergen Clear Filter and photocatalytic washable deodorising filter' },
      { label: 'Heating in frost', value: 'Works down to -15 °C' },
      { label: 'Airflow', value: '3D Auto Swing with adjustable vertical vanes' },
      { label: 'Finish', value: 'Pure White, Black & White or Titanium' },
      { label: 'Controls', value: 'Remote control and Smart M-Air app' },
    ],
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
  'mitsubishi-heavy-industries': [
    'Heat pump: cooling and heating',
    'Efficient, up to label A+++',
    'Built-in wifi plus Smart M-Air app',
    'Allergen Clear Filter',
    'R32 refrigerant',
    '5 year parts warranty',
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
  '6-3-kw': 'Very large or high-ceilinged room',
  '7-1-kw': 'Very large or high-ceilinged room',
  '8-0-kw': 'Business premises or shop',
  '10-0-kw': 'Large business premises or open floor',
};

/**
 * Zet een Nederlandse decimale komma om naar een punt, voor getallen op de
 * Engelse pagina's ("3,40 kW" -> "3.40 kW"). Vervangt alleen komma's TUSSEN
 * cijfers, zodat opsommingen als "Daikin, LG and AUX" ongemoeid blijven.
 */
export function num(value?: string): string {
  return (value ?? '').replace(/(\d),(\d)/g, '$1.$2');
}
