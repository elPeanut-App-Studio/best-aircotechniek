/**
 * AUX-productgegevens voor de merkpagina's onder /merken/aux.
 * Kernkenmerken + SEER (tot) uit de Best Aircotechniek-brochure;
 * per-vermogen specs (koel/verw kW, SEER/SCOP) van airco-webwinkel.nl.
 */

/** Beschikbare vermogens (gelijk voor elke serie). Capaciteit/ruimte uit de brochure. */
export const auxSizes = [
  { slug: '2-5-kw', kw: '2,5 kW', volume: '± 90 m³', area: '± 35 m²', room: 'Slaapkamer of kleine kamer' },
  { slug: '3-5-kw', kw: '3,5 kW', volume: '± 120 m³', area: '± 46 m²', room: 'Woonkamer (gemiddeld)' },
  { slug: '5-0-kw', kw: '5,0 kW', volume: '± 180 m³', area: '± 70 m²', room: 'Grote woonkamer of open ruimte' },
  { slug: '7-0-kw', kw: '7,0 kW', volume: '± 240 m³', area: '± 92 m²', room: 'Zeer grote of hoge ruimte' },
] as const;

export const auxShared = [
  'Warmtepomp: koelen én verwarmen',
  'WiFi + app (bediening op afstand)',
  'R32-koudemiddel',
  '2 jaar garantie',
] as const;

export type SizeSpec = { koel: string; verw: string; seer: string; scop: string };

export type AuxModel = {
  slug: string;
  name: string;
  tier: string;
  intro: string;
  photo: string;
  seer: string; // SEER (tot), modelniveau
  scop: string;
  labelKoelen: string;
  labelVerwarmen: string;
  /** Kernkenmerken op modelniveau, exact zoals in de brochure-vergelijking. */
  specs: { label: string; value: string }[];
  /** Per-vermogen specs (airco-webwinkel). */
  sizeSpecs: Record<string, SizeSpec>;
};

export const auxModels: AuxModel[] = [
  {
    slug: 'freedom',
    name: 'Freedom',
    tier: 'Instapmodel',
    intro: 'De voordelige no-nonsense keuze, betrouwbaar uitgevoerd.',
    photo: '/aux/freedom.jpg',
    seer: '6,7',
    scop: '4,0',
    labelKoelen: 'A++',
    labelVerwarmen: 'A+',
    specs: [
      { label: 'Luchtstroom & comfort', value: 'Standaard uitblaas' },
      { label: 'Luchtzuivering', value: 'Standaard stoffilter' },
      { label: 'Zelfreiniging', value: 'Basis (drogen van de unit)' },
      { label: 'Verwarmen bij extreme kou', value: 'Tot -15°C' },
      { label: 'Design & afwerking', value: 'Functioneel, glanzend wit' },
    ],
    sizeSpecs: {
      '2-5-kw': { koel: '2,6 kW', verw: '2,6 kW', seer: '6,1', scop: '4,0' },
      '3-5-kw': { koel: '3,4 kW', verw: '3,5 kW', seer: '6,2', scop: '4,0' },
      '5-0-kw': { koel: '5,1 kW', verw: '5,2 kW', seer: '6,7', scop: '4,0' },
      '7-0-kw': { koel: '7,3 kW', verw: '7,3 kW', seer: '6,1', scop: '4,0' },
    },
  },
  {
    slug: 'q-smart',
    name: 'Q-smart',
    tier: 'Middenklasse',
    intro: 'Meer comfort en schonere lucht dankzij UV-LED en 4D-luchtverdeling.',
    photo: '/aux/q-smart.jpg',
    seer: '6,8',
    scop: '4,0',
    labelKoelen: 'A++',
    labelVerwarmen: 'A+',
    specs: [
      { label: 'Luchtstroom & comfort', value: '4D Swing (horizontaal & verticaal)' },
      { label: 'Luchtzuivering', value: 'UV-LED + antibacterieel filter' },
      { label: 'Zelfreiniging', value: 'Zelfreinigende functie' },
      { label: 'Verwarmen bij extreme kou', value: 'Tot -20°C (incl. Heat Belt)' },
      { label: 'Design & afwerking', value: 'Modern & strak, wit' },
    ],
    sizeSpecs: {
      '2-5-kw': { koel: '2,7 kW', verw: '3,0 kW', seer: '6,2', scop: '4,0' },
      '3-5-kw': { koel: '3,5 kW', verw: '3,8 kW', seer: '6,1', scop: '4,0' },
      '5-0-kw': { koel: '5,3 kW', verw: '5,4 kW', seer: '6,8', scop: '4,0' },
      '7-0-kw': { koel: '6,7 kW', verw: '7,2 kW', seer: '6,53', scop: '4,09' },
    },
  },
  {
    slug: 'c-smart',
    name: 'C-smart',
    tier: 'Premium',
    intro: 'Het topmodel: hoogste efficiëntie, tochtvrije luchtstroom en strak design.',
    photo: '/aux/c-smart.jpg',
    seer: '7,6',
    scop: '4,2',
    labelKoelen: 'A++',
    labelVerwarmen: 'A+',
    specs: [
      { label: 'Luchtstroom & comfort', value: 'Micro-perforatie (tochtvrij) + 4D Swing' },
      { label: 'Luchtzuivering', value: 'UV-LED + antibacterieel & anti-schimmel filter' },
      { label: 'Zelfreiniging', value: '6-traps zelfreiniging' },
      { label: 'Verwarmen bij extreme kou', value: 'Tot -25°C (incl. Heat Belt)' },
      { label: 'Design & afwerking', value: 'Premium afwerking, wit of zwart' },
    ],
    sizeSpecs: {
      '2-5-kw': { koel: '2,75 kW', verw: '3,2 kW', seer: '7,6', scop: '4,2' },
      '3-5-kw': { koel: '3,5 kW', verw: '3,85 kW', seer: '7,1', scop: '4,1' },
      '5-0-kw': { koel: '5,4 kW', verw: '5,6 kW', seer: '7,0', scop: '4,1' },
      '7-0-kw': { koel: '7,3 kW', verw: '7,3 kW', seer: '6,9', scop: '4,2' },
    },
  },
];

export function getAuxModel(slug: string): AuxModel | undefined {
  return auxModels.find((m) => m.slug === slug);
}
