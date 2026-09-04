import { coolingLabel, heatingLabel, bestLabelsFrom } from './energy-labels';

/**
 * Mitsubishi Heavy Industries-productgegevens voor de merkpagina's onder
 * /merken/mitsubishi-heavy-industries.
 *
 * BRONNEN, alle op 4 september 2026 opgehaald
 * - ZS: de Nederlandse MHI-consumentenbrochure "Consumenten Series", uitgegeven
 *   door Maxi-Trade (de Nederlandse distributeur), specificatietabel SRK-ZS-WF.
 *   Bevestigd met de MHI RAC Catalogue 2026, pagina 100 (energielabeldata).
 * - ZT: het officiële specificatieblad van Maxi-Trade
 *   (Technische-gegevens-Mitsubishi-SRK-ZT.pdf, maart 2026) voor de capaciteiten
 *   en typeaanduidingen, en de SRK-ZT-brochure van MHI zelf voor SEER en SCOP.
 *   Die brochure zet de ZT naast de ZS in een staafdiagram, en de ZS-waarden
 *   daarin (SEER 8,5/8,5/8,4/7,0 en SCOP 4,6/4,7/4,7/4,6) zijn exact gelijk aan
 *   de Nederlandse ZS-brochure. Twee onafhankelijke bronnen die elkaar dekken.
 * - ZSX: de productleaflets per set van Maxi-Trade (maart 2026) voor 2,5 t/m
 *   6,0 kW, en de MHI RAC Catalogue 2026 voor de 2,0 kW.
 * - ZR: de MHI RAC Catalogue 2026, pagina 34 (capaciteiten en geluidsdruk) en
 *   pagina 100 (SEER, SCOP en de energielabels).
 *
 * TWEE VALKUILEN DIE HIER BEWUST VERMEDEN ZIJN
 *
 * 1. Er bestaan -S, -W en -WF uitvoeringen van dezelfde series, en dat zijn
 *    VERSCHILLENDE generaties met verschillende cijfers. De MHI-wereldcatalogus
 *    van 2022 geeft de ZS een SEER van 7,80; de Nederlandse WF-uitvoering haalt
 *    8,50. Alles hieronder is de -WF-generatie, want dat is wat er in Nederland
 *    geleverd wordt. Meng er nooit cijfers van een -S- of -W-type door.
 *
 * 2. Handelspartijen zetten onder "wandmodel ZS" ook 6,3 tot 10,0 kW. Die
 *    vermogens bestaan NIET in de ZS-serie; dat is de ZR-serie (SRK63ZR-WF en
 *    hoger). ZS en ZT stoppen bij 5,0 kW, ZSX bij 6,1 kW.
 *
 * De typeaanduidingen zijn niet uit een patroon afgeleid maar per stuk uit een
 * bron overgenomen. Let op het buitendeel van de ZS: de 2,5 en de 3,5 hebben
 * een W2-achtervoegsel en de 2,0 en de 5,0 niet. Precies zo'n afwijking maakt
 * extrapoleren onbetrouwbaar.
 */

/**
 * Capaciteit en ruimtegrootte. De volume-, oppervlakte- en ruimte-omschrijving
 * per klasse zijn letterlijk overgenomen uit de roomGuide van daikin-products,
 * zodat een 3,5 kW op de hele site dezelfde ruimte-indicatie krijgt.
 * De slugs vormen de URL: /merken/mitsubishi-heavy-industries/<model>/<slug>
 */
export const mhiSizes = [
  { slug: '2-0-kw', kw: '2,0 kW', volume: '± 70 m³', area: '± 28 m²', room: 'Kleine slaap- of studeerkamer' },
  { slug: '2-5-kw', kw: '2,5 kW', volume: '± 90 m³', area: '± 35 m²', room: 'Slaapkamer of kleine kamer' },
  { slug: '3-5-kw', kw: '3,5 kW', volume: '± 120 m³', area: '± 46 m²', room: 'Woonkamer (gemiddeld)' },
  { slug: '5-0-kw', kw: '5,0 kW', volume: '± 180 m³', area: '± 70 m²', room: 'Grote woonkamer of open ruimte' },
  { slug: '6-0-kw', kw: '6,0 kW', volume: '± 215 m³', area: '± 83 m²', room: 'Zeer grote of open ruimte' },
  { slug: '6-3-kw', kw: '6,3 kW', volume: '± 225 m³', area: '± 87 m²', room: 'Zeer grote of hoge ruimte' },
  { slug: '7-1-kw', kw: '7,1 kW', volume: '± 245 m³', area: '± 94 m²', room: 'Zeer grote of hoge ruimte' },
  { slug: '8-0-kw', kw: '8,0 kW', volume: '± 285 m³', area: '± 110 m²', room: 'Bedrijfsruimte of winkel' },
  { slug: '10-0-kw', kw: '10,0 kW', volume: '± 355 m³', area: '± 137 m²', room: 'Grote bedrijfsruimte of open verdieping' },
] as const;

/** Standaard bij élke MHI-wandairco die wij leveren. */
export const mhiShared = [
  'Warmtepomp: koelen én verwarmen',
  'Zuinig tot label A+++',
  'Ingebouwde wifi + Smart M-Air-app',
  'Allergen Clear Filter',
  'R32-koudemiddel',
  '5 jaar garantie op onderdelen',
] as const;

export type MhiCapacity = {
  /** Officiële typeaanduiding van de binnenunit, in de witte uitvoering. */
  code: string;
  /** Officiële typeaanduiding van de buitenunit. */
  outdoor: string;
  /** Nominaal koelvermogen in kW. */
  koel: string;
  /** Onder- en bovengrens van het koelvermogen in kW (modulatiebereik). */
  koelMin: string;
  koelMax: string;
  /** Nominaal verwarmingsvermogen in kW. */
  verw: string;
  verwMin: string;
  verwMax: string;
  seer: string;
  scop: string;
  /** Geluidsdruk binnenunit in de stilste stand, dB(A). */
  db: string;
};

export const mhiCapacities: Record<string, Record<string, MhiCapacity>> = {
  // Premium Series. Verwarmen tot -15 °C.
  zs: {
    '2-0-kw': { code: 'SRK20ZS-WF', outdoor: 'SRC20ZS-W',  koel: '2,0', koelMin: '0,9', koelMax: '2,9', verw: '2,7', verwMin: '0,9', verwMax: '4,3', seer: '8,50', scop: '4,60', db: '19' },
    '2-5-kw': { code: 'SRK25ZS-WF', outdoor: 'SRC25ZS-W2', koel: '2,5', koelMin: '0,9', koelMax: '3,1', verw: '3,2', verwMin: '0,9', verwMax: '4,5', seer: '8,50', scop: '4,70', db: '19' },
    '3-5-kw': { code: 'SRK35ZS-WF', outdoor: 'SRC35ZS-W2', koel: '3,5', koelMin: '0,9', koelMax: '4,0', verw: '4,0', verwMin: '0,9', verwMax: '5,0', seer: '8,40', scop: '4,70', db: '19' },
    '5-0-kw': { code: 'SRK50ZS-WF', outdoor: 'SRC50ZS-W',  koel: '5,0', koelMin: '1,3', koelMax: '5,5', verw: '5,8', verwMin: '1,3', verwMax: '6,6', seer: '7,00', scop: '4,60', db: '22' },
  },
  // Premium Series. Verwarmen tot -20 °C en het nominale verwarmingsvermogen
  // blijft tot -10 °C op peil.
  //
  // NIET positioneren als de opvolger van de ZS. Technisch is het de nieuwere
  // generatie, maar meerdere leveranciers voeren de ZT uitsluitend in mat
  // zwart, terwijl de ZS er in wit, zwart én titanium is. "Opvolger" wekt dan
  // de indruk dat de ZS verdwijnt, precies op het moment dat iemand een kleur
  // kiest.
  //
  // De codes hier zijn de WFB-uitvoering, mat zwart RAL 9011, want dat is de
  // enige ZT-set die onze leverancier aanbiedt. MHI maakt de ZT óók als -WF
  // (Pure White) en -WFT (Titanium & Black), met identieke prestaties; komt die
  // in het assortiment, dan is dat hier een kwestie van het achtervoegsel
  // aanpassen. Het buitendeel staat als -WB, Jet Black: de setfoto van de
  // leverancier toont een zwart buitendeel bij deze zwarte binnenunit. MHI
  // levert het buitendeel ook als -W in wit; controleer bij de eerste order
  // welke van de twee er daadwerkelijk meekomt.
  zt: {
    '2-0-kw': { code: 'SRK20ZT-WFB', outdoor: 'SRC20ZT-WB', koel: '2,0', koelMin: '0,9', koelMax: '2,9', verw: '2,7', verwMin: '0,9', verwMax: '4,5', seer: '9,50', scop: '5,10', db: '19' },
    '2-5-kw': { code: 'SRK25ZT-WFB', outdoor: 'SRC25ZT-WB', koel: '2,5', koelMin: '0,9', koelMax: '3,3', verw: '3,2', verwMin: '0,9', verwMax: '4,7', seer: '9,50', scop: '5,10', db: '19' },
    '3-5-kw': { code: 'SRK35ZT-WFB', outdoor: 'SRC35ZT-WB', koel: '3,5', koelMin: '0,9', koelMax: '4,0', verw: '4,0', verwMin: '0,9', verwMax: '5,0', seer: '8,70', scop: '4,90', db: '19' },
    '5-0-kw': { code: 'SRK50ZT-WFB', outdoor: 'SRC50ZT-WB', koel: '5,0', koelMin: '1,3', koelMax: '5,4', verw: '5,8', verwMin: '1,3', verwMax: '6,4', seer: '7,50', scop: '4,70', db: '22' },
  },
  // Diamond Series, het topsegment. Heeft als enige een aanwezigheidssensor,
  // Eco Operation en Auto Off. Grotere binnenunit (305x920x220 mm).
  zsx: {
    '2-0-kw': { code: 'SRK20ZSX-WF', outdoor: 'SRC20ZSX-W',  koel: '2,0', koelMin: '0,9', koelMax: '3,4',  verw: '2,7', verwMin: '0,8', verwMax: '5,5', seer: '10,00', scop: '5,20', db: '19' },
    '2-5-kw': { code: 'SRK25ZSX-WF', outdoor: 'SRC25ZSX-W',  koel: '2,5', koelMin: '0,9', koelMax: '3,87', verw: '3,2', verwMin: '0,8', verwMax: '6,0', seer: '10,30', scop: '5,20', db: '19' },
    '3-5-kw': { code: 'SRK35ZSX-WF', outdoor: 'SRC35ZSX-W',  koel: '3,5', koelMin: '0,9', koelMax: '4,5',  verw: '4,3', verwMin: '0,8', verwMax: '6,8', seer: '9,50',  scop: '5,10', db: '19' },
    '5-0-kw': { code: 'SRK50ZSX-WF', outdoor: 'SRC50ZSX-W3', koel: '5,0', koelMin: '1,0', koelMax: '6,2',  verw: '6,0', verwMin: '0,8', verwMax: '8,2', seer: '8,30',  scop: '4,70', db: '22' },
    // De klasse heet 6,0 kW in de handel, het nominale koelvermogen is 6,1 kW.
    '6-0-kw': { code: 'SRK60ZSX-WF', outdoor: 'SRC60ZSX-W3', koel: '6,1', koelMin: '1,0', koelMax: '6,9',  verw: '6,8', verwMin: '0,8', verwMax: '8,8', seer: '7,80',  scop: '4,70', db: '22' },
  },
  // Diamond Series voor grote open ruimtes. Brede behuizing (1197 mm) met een
  // krachtige luchtstroom. Let op de 10,0 kW: die heeft een ander buitendeel
  // (FDC100VNP-W in plaats van SRC..ZR-W) en 9,6 kW nominaal koelvermogen bij
  // 10,0 kW verwarmen, waar de klasse zijn naam aan ontleent.
  zr: {
    '6-3-kw':  { code: 'SRK63ZR-WF',  outdoor: 'SRC63ZR-W',   koel: '6,3', koelMin: '1,2', koelMax: '7,4', verw: '7,1',  verwMin: '0,8', verwMax: '9,3',  seer: '8,10', scop: '4,70', db: '25' },
    '7-1-kw':  { code: 'SRK71ZR-WF',  outdoor: 'SRC71ZR-W',   koel: '7,1', koelMin: '2,3', koelMax: '7,8', verw: '8,0',  verwMin: '2,0', verwMax: '10,8', seer: '7,40', scop: '4,50', db: '25' },
    '8-0-kw':  { code: 'SRK80ZR-WF',  outdoor: 'SRC80ZR-W',   koel: '8,0', koelMin: '2,3', koelMax: '9,7', verw: '9,0',  verwMin: '2,1', verwMax: '11,2', seer: '7,00', scop: '4,40', db: '26' },
    '10-0-kw': { code: 'SRK100ZR-WF', outdoor: 'FDC100VNP-W', koel: '9,6', koelMin: '2,1', koelMax: '9,6', verw: '10,0', verwMin: '1,7', verwMax: '10,4', seer: '6,11', scop: '4,14', db: '27' },
  },
};

export type MhiModel = {
  slug: string;
  name: string;
  /** De serie zoals MHI die noemt: Diamond of Premium. */
  serie: string;
  tier: string;
  intro: string;
  photo: string;
  /** Uitvoeringen met identieke prestaties; alleen de kleur verschilt. */
  uitvoeringen: string;
  /**
   * Drie onderscheidende regels voor de kaart op de merkpagina. Per serie de
   * dingen die die serie ECHT anders maken, zodat de drie kaarten op dezelfde
   * assen te vergelijken zijn.
   */
  highlights: string[];
  /**
   * Kernkenmerken op modelniveau. Het icoon staat hier bij de spec zelf en niet
   * in een aparte array op de pagina: bij een positionele array hoort er een
   * verkeerd plaatje bij zodra iemand de volgorde wijzigt.
   * Namen komen uit public/spec-icons/.
   */
  specs: { label: string; value: string; icon: string }[];
};

export const mhiModels: MhiModel[] = [
  {
    slug: 'zs',
    name: 'ZS',
    serie: 'Premium Series',
    tier: 'Vertrouwde keuze',
    intro:
      'Compact en fluisterstil, met Italiaans design en label tot A+++.',
    photo: '/mhi/zs.jpg',
    highlights: [
      'Italiaans design, compact',
      'Fluisterstil vanaf 19 dB(A)',
      'Wit, zwart of titanium',
    ],
    uitvoeringen: 'Pure White, Black & White en Titanium',
    specs: [
      { icon: 'luchtzuivering', label: 'Luchtreiniging', value: 'Allergen Clear Filter en fotokatalytisch wasbaar geurfilter' },
      { icon: 'verwarmen', label: 'Verwarmen bij vorst', value: 'Werkt tot -15 °C' },
      { icon: 'swing', label: 'Luchtstroom', value: '3D Auto Swing met verstelbare verticale schoepen' },
      { icon: 'design', label: 'Uitvoering', value: 'Pure White, Black & White of Titanium' },
      { icon: 'wifi', label: 'Bediening', value: 'Afstandsbediening en Smart M-Air-app' },
    ],
  },

  {
    slug: 'zt',
    name: 'ZT',
    serie: 'Premium Series',
    tier: 'Mat zwart',
    intro:
      'De zwarte uitvoering uit de Premium-serie, en de sterkste in de kou.',
    photo: '/mhi/zt.jpg',
    highlights: [
      'Mat zwart (RAL 9011), ook het buitendeel',
      'Verwarmt door tot -20 °C',
      'Luchtworp tot 11 meter',
    ],
    uitvoeringen: 'Mat zwart (RAL 9011)',
    specs: [
      { icon: 'luchtzuivering', label: 'Luchtreiniging', value: 'Allergen Clear Filter en fotokatalytisch wasbaar geurfilter' },
      { icon: 'verwarmen', label: 'Verwarmen bij vorst', value: 'Werkt tot -20 °C, vol vermogen tot -10 °C' },
      { icon: 'swing', label: 'Luchtstroom', value: 'Jet Air met een worp tot 11 meter' },
      { icon: 'design', label: 'Uitvoering', value: 'Mat zwart, RAL 9011; buitendeel wit of Jet Black' },
      { icon: 'wifi', label: 'Bediening', value: 'Afstandsbediening en Smart M-Air-app, per 0,5 °C' },
    ],
  },
  {
    slug: 'zr',
    name: 'ZR',
    serie: 'Diamond Series',
    tier: 'Grote ruimtes',
    intro:
      'Voor grote open ruimtes en bedrijfsruimtes, van 6,3 tot 10,0 kW.',
    photo: '/mhi/zr.jpg',
    highlights: [
      'Het grootste vermogen op deze site: tot 10,0 kW',
      'Brede behuizing met een krachtige luchtworp',
      'Stil voor dit formaat: vanaf 25 dB(A)',
    ],
    uitvoeringen: 'Pure White',
    specs: [
      { icon: 'ruimte', label: 'Bedoeld voor', value: 'Grote open ruimtes, winkels en bedrijfsruimtes' },
      { icon: 'luchtzuivering', label: 'Luchtreiniging', value: 'Allergen Clear Filter en fotokatalytisch wasbaar geurfilter' },
      { icon: 'verwarmen', label: 'Verwarmen bij vorst', value: 'Werkt tot -20 °C' },
      { icon: 'swing', label: 'Luchtstroom', value: '3D Auto Swing uit een behuizing van 1197 mm breed' },
      { icon: 'design', label: 'Uitvoering', value: 'Pure White' },
      { icon: 'wifi', label: 'Bediening', value: 'Afstandsbediening en Smart M-Air-app' },
    ],
  },
  {
    slug: 'zsx',
    name: 'ZSX',
    serie: 'Diamond Series',
    tier: 'Topmodel',
    intro:
      'Het zuinigste toestel dat wij leveren, met aanwezigheidssensor.',
    photo: '/mhi/zsx.jpg',
    highlights: [
      'Aanwezigheidssensor stuurt bij op de kamer',
      'Hoogste rendement: SEER tot 10,3',
      'Eco Operation en Auto Off',
    ],
    uitvoeringen: 'Pure White en Titanium',
    specs: [
      { icon: 'ruimte', label: 'Aanwezigheidssensor', value: 'Stuurt bij op aanwezigheid en activiteit in de ruimte' },
      { icon: 'rendement', label: 'Energie besparen', value: 'Eco Operation en Auto Off' },
      { icon: 'luchtzuivering', label: 'Luchtreiniging', value: 'Allergen Clear Filter en fotokatalytisch wasbaar geurfilter' },
      { icon: 'verwarmen', label: 'Verwarmen bij vorst', value: 'Werkt tot -20 °C' },
      { icon: 'design', label: 'Uitvoering', value: 'Pure White of Titanium' },
      { icon: 'wifi', label: 'Bediening', value: 'Afstandsbediening en Smart M-Air-app' },
    ],
  },];

/** Alleen de vermogens die dit model echt heeft. ZSX heeft er vijf, ZS en ZT vier. */
export function mhiSizesFor(modelSlug: string) {
  return mhiSizes.filter((s) => mhiCapacities[modelSlug]?.[s.slug]);
}

export function mhiCapacity(modelSlug: string, sizeSlug: string): MhiCapacity | undefined {
  return mhiCapacities[modelSlug]?.[sizeSlug];
}

export function getMhiModel(slug: string): MhiModel | undefined {
  return mhiModels.find((m) => m.slug === slug);
}

/** Beste label over alle uitvoeringen van een model, voor "tot A+++". */
export function mhiBestLabels(modelSlug: string) {
  return bestLabelsFrom(Object.values(mhiCapacities[modelSlug] ?? {}));
}

/** Hoogste SEER en SCOP over alle uitvoeringen van een model. */
export function mhiBestEfficiency(modelSlug: string): { seer: string; scop: string } | null {
  const caps = mhiCapacities[modelSlug];
  if (!caps) return null;
  const getal = (v: string) => Number(v.replace(',', '.'));
  const top = (pick: (c: MhiCapacity) => string) =>
    Object.values(caps)
      .map(pick)
      .reduce((a, b) => (getal(b) > getal(a) ? b : a));
  return { seer: top((c) => c.seer), scop: top((c) => c.scop) };
}

/**
 * BUILDCONTROLE op de energielabels.
 *
 * MHI publiceert per type zelf een energielabel. Hieronder staat dat
 * gepubliceerde label, en de build faalt als onze berekening uit SEER/SCOP er
 * niet mee overeenkomt. Zo vangen we zowel een typefout in de tabel hierboven
 * als een toekomstige wijziging in de grenswaarden.
 *
 * Twee cellen ontbreken hier bewust, namelijk het verwarmingslabel van de
 * ZT 2,0 en 2,5 kW. MHI is daar intern niet consistent: de RAC Catalogue 2026
 * zet er A++ neer, de eigen productpagina's van MHI zetten er A+++. Bij een
 * SCOP van 5,10 zit het exact op de grens. Wat de catalogus zichzelf
 * tegenspreekt: de ZSX 3,5 kW heeft óók SCOP 5,10 en krijgt daar wél A+++.
 * Aangezien het label volgens verordening 626/2011 alleen van de SCOP afhangt,
 * kunnen die twee niet beide kloppen. Onze berekening geeft A+++, wat
 * overeenkomt met twee van de drie MHI-bronnen. LAAT DIT BEVESTIGEN DOOR
 * COOLMARK (de Nederlandse importeur) voordat het in een offerte belandt.
 */
const gepubliceerdeLabels: Record<string, Record<string, { koelen: string; verwarmen?: string }>> = {
  zs: {
    '2-0-kw': { koelen: 'A+++', verwarmen: 'A++' },
    '2-5-kw': { koelen: 'A+++', verwarmen: 'A++' },
    '3-5-kw': { koelen: 'A++', verwarmen: 'A++' },
    '5-0-kw': { koelen: 'A++', verwarmen: 'A++' },
  },
  zt: {
    '2-0-kw': { koelen: 'A+++' },
    '2-5-kw': { koelen: 'A+++' },
    '3-5-kw': { koelen: 'A+++', verwarmen: 'A++' },
    '5-0-kw': { koelen: 'A++', verwarmen: 'A++' },
  },
  zr: {
    '6-3-kw': { koelen: 'A++', verwarmen: 'A++' },
    '7-1-kw': { koelen: 'A++', verwarmen: 'A+' },
    '8-0-kw': { koelen: 'A++', verwarmen: 'A+' },
    '10-0-kw': { koelen: 'A++', verwarmen: 'A+' },
  },
  zsx: {
    '2-0-kw': { koelen: 'A+++', verwarmen: 'A+++' },
    '2-5-kw': { koelen: 'A+++', verwarmen: 'A+++' },
    '3-5-kw': { koelen: 'A+++', verwarmen: 'A+++' },
    '5-0-kw': { koelen: 'A++', verwarmen: 'A++' },
    '6-0-kw': { koelen: 'A++', verwarmen: 'A++' },
  },
};

for (const [model, perMaat] of Object.entries(gepubliceerdeLabels)) {
  for (const [maat, verwacht] of Object.entries(perMaat)) {
    const cap = mhiCapacities[model]?.[maat];
    if (!cap) {
      throw new Error(`mhi-products: ${model} ${maat} staat bij de gepubliceerde labels maar niet in mhiCapacities.`);
    }
    const koelen = coolingLabel(cap.seer);
    if (koelen !== verwacht.koelen) {
      throw new Error(
        `mhi-products: ${cap.code} berekent koellabel ${koelen} uit SEER ${cap.seer}, maar MHI publiceert ${verwacht.koelen}.`,
      );
    }
    if (verwacht.verwarmen) {
      const verwarmen = heatingLabel(cap.scop);
      if (verwarmen !== verwacht.verwarmen) {
        throw new Error(
          `mhi-products: ${cap.code} berekent verwarmingslabel ${verwarmen} uit SCOP ${cap.scop}, maar MHI publiceert ${verwacht.verwarmen}.`,
        );
      }
    }
  }
}
