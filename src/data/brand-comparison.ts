/**
 * Vergelijkingsgegevens voor de vier merken, AFGELEID uit de productdata.
 *
 * Niets hier is met de hand ingevoerd: de bereiken worden berekend uit
 * aux-products.ts, lg-products.ts en daikin-products.ts. Zo kan de
 * vergelijkingstabel niet uit de pas lopen met de productpagina's, en hoeft er
 * bij een nieuw model of vermogen niets aan deze pagina te gebeuren.
 *
 * Wat NIET wordt vergeleken en waarom:
 * - Prijs bij LG en Daikin. Daar zijn geen vanaf-prijzen van bekend, en die
 *   verzinnen we niet. Alleen AUX heeft prijzen per model.
 * - Geluidsniveau. Daikin publiceert dat per uitvoering, AUX en LG niet
 *   vergelijkbaar, dus een kolom zou suggereren dat de merken op dezelfde maat
 *   gemeten zijn.
 */
import { auxModels, auxSizes } from './aux-products';
import { lgModels, lgCapacities, lgSizes } from './lg-products';
import { daikinModels, daikinEfficiency } from './daikin-products';
import { mhiModels, mhiCapacities, mhiSizes } from './mhi-products';
import { coolingLabel, heatingLabel } from './energy-labels';
import { brands } from './brands';
import { formatPrice } from './site';

const getal = (s: string) => Number(s.replace(',', '.'));

/** Het logo staat al in brands.ts; hier niet nog een keer een pad intypen. */
const logoVan = (slug: string) => brands.find((b) => b.slug === slug)!.logo;

/**
 * Nederlandse notatie met behoud van de precisie uit de brondata: 8,75 blijft
 * 8,75 en 6,1 blijft 6,1. Afronden op één decimaal zou 8,75 als 8,8 tonen,
 * terwijl de productpagina 8,75 zegt, en dan gaat een bezoeker die het naast
 * elkaar legt terecht twijfelen.
 */
function komma(n: number, minDecimalen = 1): string {
  let s = n.toFixed(2);
  while (s.endsWith('0') && s.split('.')[1].length > minDecimalen) s = s.slice(0, -1);
  return s.replace('.', ',');
}

/** Laagste en hoogste waarde uit een reeks, als "6,1 tot 7,6". */
function bereik(waarden: number[]): string {
  const min = Math.min(...waarden);
  const max = Math.max(...waarden);
  return min === max ? komma(min) : `${komma(min)} tot ${komma(max)}`;
}

/** Beste (hoogste) label uit een reeks SEER- of SCOP-waarden. */
function besteLabel(waarden: number[], soort: 'koelen' | 'verwarmen'): string {
  const top = Math.max(...waarden).toFixed(2).replace('.', ',');
  return soort === 'koelen' ? coolingLabel(top) : heatingLabel(top);
}

// ---- AUX: SEER/SCOP staan per model EN per vermogen ------------------------
const auxSeer = auxModels.flatMap((m) => Object.values(m.sizeSpecs).map((s) => getal(s.seer)));
const auxScop = auxModels.flatMap((m) => Object.values(m.sizeSpecs).map((s) => getal(s.scop)));

// ---- LG: SEER/SCOP per uitvoering in lgCapacities -------------------------
const lgCaps = Object.values(lgCapacities).flatMap((perMaat) => Object.values(perMaat));
const lgSeer = lgCaps.map((c) => getal(c.seer));
const lgScop = lgCaps.map((c) => getal(c.scop));

// ---- Daikin: SEER/SCOP per uitvoering in daikinEfficiency -----------------
const dkEff = Object.values(daikinEfficiency).flatMap((perMaat) => Object.values(perMaat));
const dkSeer = dkEff.map((e) => getal(e.seer));
const dkScop = dkEff.map((e) => getal(e.scop));

// ---- MHI: SEER/SCOP per uitvoering in mhiCapacities ----------------------
const mhiCaps = Object.values(mhiCapacities).flatMap((perMaat) => Object.values(perMaat));
const mhiSeer = mhiCaps.map((c) => getal(c.seer));
const mhiScop = mhiCaps.map((c) => getal(c.scop));

/** Alle unieke vermogens van een merk, oplopend, als "2,0 tot 7,1 kW". */
function vermogensBereik(kws: string[]): string {
  const waarden = [...new Set(kws.map((k) => getal(k.replace(/[^\d,.]/g, ''))))].sort((a, b) => a - b);
  return `${komma(waarden[0])} tot ${komma(waarden[waarden.length - 1])} kW`;
}

const dkVermogens = daikinModels.flatMap((m) => m.sizes.map((s) => s.kw));

export type MerkVergelijking = {
  slug: string;
  naam: string;
  logo: string;
  /**
   * Waar dit merk in dit aanbod voor staat, in twee of drie woorden. Staat als
   * kop boven de kolom, zodat de bezoeker de cijfers eronder kan plaatsen. De
   * cijfers in de tabel moeten deze regel ook echt onderbouwen.
   */
  rol: string;
  rolEn: string;
  /** Aantal modelseries dat wij leveren. */
  modellen: number;
  /** Aantal losse uitvoeringen (model maal vermogen). */
  uitvoeringen: number;
  vermogens: string;
  seer: string;
  scop: string;
  /** Hoogste SEER/SCOP als getal, voor de staafjes in de tabel. */
  seerTop: number;
  scopTop: number;
  labelKoelen: string;
  labelVerwarmen: string;
  garantie: string;
  koudemiddel: string;
  /** Vanaf-prijs als die bekend is, anders null. */
  vanafPrijs: number | null;
  /** Waar dit merk in dit assortiment op uitblinkt, in één regel. */
  sterk: string;
  sterkEn: string;
  /** Eerlijke keerzijde, zodat de tabel geen verkooppraatje wordt. */
  keerzijde: string;
  keerzijdeEn: string;
};

export const merkVergelijking: MerkVergelijking[] = [
  {
    slug: 'aux',
    naam: 'AUX',
    logo: logoVan('aux'),
    rol: 'Scherpste prijs',
    rolEn: 'Sharpest price',
    modellen: auxModels.length,
    uitvoeringen: auxModels.length * auxSizes.length,
    vermogens: vermogensBereik(auxSizes.map((s) => s.kw)),
    seer: bereik(auxSeer),
    scop: bereik(auxScop),
    seerTop: Math.max(...auxSeer),
    scopTop: Math.max(...auxScop),
    labelKoelen: besteLabel(auxSeer, 'koelen'),
    labelVerwarmen: besteLabel(auxScop, 'verwarmen'),
    garantie: '2 jaar',
    koudemiddel: 'R32',
    vanafPrijs: Math.min(...auxModels.map((m) => m.priceFrom)),
    sterk: `De beste prijs-kwaliteitverhouding van de drie: vanaf ${formatPrice(
      Math.min(...auxModels.map((m) => m.priceFrom)),
    )} compleet geïnstalleerd, met hetzelfde R32-koudemiddel en dezelfde invertertechniek als de duurdere merken, en energielabel ${besteLabel(
      auxSeer,
      'koelen',
    )} voor koelen.`,
    sterkEn: `The best value for money of the three: from ${formatPrice(
      Math.min(...auxModels.map((m) => m.priceFrom)),
      'en',
    )} fully installed, with the same R32 refrigerant and the same inverter technology as the pricier brands, and energy label ${besteLabel(
      auxSeer,
      'koelen',
    )} for cooling.`,
    keerzijde: `Twee jaar fabrieksgarantie in plaats van vijf. Aan de top halen de andere merken ${besteLabel(
      lgSeer.concat(dkSeer, mhiSeer),
      'koelen',
    )} voor koelen en verwarmen, waar AUX op ${besteLabel(auxSeer, 'koelen')} en ${besteLabel(
      auxScop,
      'verwarmen',
    )} blijft.`,
    keerzijdeEn: `Two years of manufacturer warranty instead of five. At the top the other brands reach ${besteLabel(
      lgSeer.concat(dkSeer, mhiSeer),
      'koelen',
    )} for cooling and heating, where AUX stays at ${besteLabel(auxSeer, 'koelen')} and ${besteLabel(
      auxScop,
      'verwarmen',
    )}.`,
  },
  {
    slug: 'lg',
    naam: 'LG',
    logo: logoVan('lg'),
    rol: 'Zuinig en slim',
    rolEn: 'Efficient and smart',
    modellen: lgModels.length,
    uitvoeringen: lgCaps.length,
    vermogens: vermogensBereik(lgSizes.map((s) => s.kw)),
    seer: bereik(lgSeer),
    scop: bereik(lgScop),
    seerTop: Math.max(...lgSeer),
    scopTop: Math.max(...lgScop),
    labelKoelen: besteLabel(lgSeer, 'koelen'),
    labelVerwarmen: besteLabel(lgScop, 'verwarmen'),
    garantie: '5 jaar',
    koudemiddel: 'R32',
    vanafPrijs: null,
    sterk: `Zuinig én slim: SEER tot ${komma(Math.max(...lgSeer))}, luchtreiniging met Ionizer+ en bediening via de ThinQ-app.`,
    sterkEn: `Efficient and smart: SEER up to ${komma(Math.max(...lgSeer)).replace(',', '.')}, air purification with Ionizer+ and control through the ThinQ app.`,
    keerzijde: 'De AI Air Special en Premium bestaan alleen als 2,5 en 3,5 kW, dus niet voor grote ruimtes.',
    keerzijdeEn: 'The AI Air Special and Premium only exist as 2.5 and 3.5 kW, so not for large rooms.',
  },
  {
    slug: 'daikin',
    naam: 'Daikin',
    logo: logoVan('daikin'),
    rol: 'Breedste keuze',
    rolEn: 'Widest choice',
    modellen: daikinModels.length,
    uitvoeringen: dkEff.length,
    vermogens: vermogensBereik(dkVermogens),
    seer: bereik(dkSeer),
    scop: bereik(dkScop),
    seerTop: Math.max(...dkSeer),
    scopTop: Math.max(...dkScop),
    labelKoelen: besteLabel(dkSeer, 'koelen'),
    labelVerwarmen: besteLabel(dkScop, 'verwarmen'),
    garantie: '5 jaar',
    koudemiddel: 'R32',
    vanafPrijs: null,
    sterk: 'Het breedste assortiment, met de fijnste stappen in vermogen en twee designmodellen.',
    sterkEn: 'The widest range, with the finest capacity steps and two design models.',
    keerzijde: 'Doorgaans de hoogste aanschafprijs van de vier.',
    keerzijdeEn: 'Usually the highest purchase price of the four.',
  },
  {
    slug: 'mitsubishi-heavy-industries',
    naam: 'Mitsubishi Heavy Industries',
    logo: logoVan('mitsubishi-heavy-industries'),
    rol: 'Hoogste rendement',
    rolEn: 'Highest efficiency',
    modellen: mhiModels.length,
    uitvoeringen: mhiCaps.length,
    vermogens: vermogensBereik(mhiSizes.map((s) => s.kw)),
    seer: bereik(mhiSeer),
    scop: bereik(mhiScop),
    seerTop: Math.max(...mhiSeer),
    scopTop: Math.max(...mhiScop),
    labelKoelen: besteLabel(mhiSeer, 'koelen'),
    labelVerwarmen: besteLabel(mhiScop, 'verwarmen'),
    // Bij MHI dekt de vijf jaar onderdelen; arbeidsloon en voorrijkosten vallen
    // er na het eerste jaar niet onder. Dat staat er bij, want de rij heet
    // Fabrieksgarantie en dan zou "5 jaar" te veel beloven.
    garantie: '5 jaar (onderdelen)',
    koudemiddel: 'R32',
    vanafPrijs: null,
    sterk: `Het hoogste rendement van de vier, met een SEER tot ${komma(
      Math.max(...mhiSeer),
    )}. Het topmodel ZSX merkt met een sensor of er iemand in de kamer is en stuurt daarop bij.`,
    sterkEn: `The highest efficiency of the four, with a SEER up to ${komma(Math.max(...mhiSeer)).replace(
      ',',
      '.',
    )}. The ZSX top model uses a sensor to detect whether anyone is in the room and adjusts accordingly.`,
    keerzijde:
      'De vijf jaar dekt onderdelen, niet het arbeidsloon na het eerste jaar; bij LG en Daikin is het volledige fabrieksgarantie. En de ZT leveren wij alleen in mat zwart.',
    keerzijdeEn:
      'The five years cover parts, not labour after the first year; with LG and Daikin it is full manufacturer warranty. And we supply the ZT in matte black only.',
  },
];

/**
 * De bereiken hierboven staan in Nederlandse notatie ("6,1 tot 7,6"). Op de
 * Engelse pagina moet dat "6.1 to 7.6" worden. Staat hier zodat de Engelse
 * pagina niet zijn eigen variant van deze omzetting hoeft te bewaren.
 */
export function naarEngels(waarde: string): string {
  return waarde.replace(' tot ', ' to ').replace(/(\d),(\d)/g, '$1.$2');
}
