/**
 * Bouwt de additionalProperty-lijst voor het Product-schema.
 *
 * De weergavewaarden in de datalaag verschillen per merk: AUX schrijft
 * "2,6 kW", LG en Daikin schrijven "2,5" en de eenheid komt uit de pagina.
 * Voor machineleesbare markup moet er een kaal getal met een punt staan, plus
 * een aparte eenheidscode. Deze module doet die omzetting op één plek, zodat
 * de paginabestanden gewoon hun eigen velden kunnen doorgeven.
 */

export type SpecProp = { name: string; value: string; unitCode?: string };

/** "2,6 kW" en "2,6" worden beide "2.6". Geen getal gevonden: undefined. */
export function numeric(value?: string | null): string | undefined {
  if (!value) return undefined;
  const match = value.replace(',', '.').match(/-?\d+(?:\.\d+)?/);
  return match ? match[0] : undefined;
}

type Input = {
  lang?: 'nl' | 'en';
  /** Nominaal koelvermogen, met of zonder eenheid in de string. */
  koel?: string | null;
  /** Nominaal verwarmingsvermogen. */
  verw?: string | null;
  koelMax?: string | null;
  verwMax?: string | null;
  seer?: string | null;
  scop?: string | null;
  labelKoelen?: string | null;
  labelVerwarmen?: string | null;
  refrigerant?: string | null;
  /** Garantietekst zoals die op de pagina staat. */
  warranty?: string | null;
};

/**
 * UN/CEFACT-eenheidscode voor kilowatt, het formaat dat schema.org verwacht.
 */
const KILOWATT = 'KWT';

export function acSpecs(input: Input): SpecProp[] {
  const en = input.lang === 'en';
  const t = {
    koel: en ? 'Cooling capacity (nominal)' : 'Koelvermogen (nominaal)',
    verw: en ? 'Heating capacity (nominal)' : 'Verwarmingsvermogen (nominaal)',
    koelMax: en ? 'Cooling capacity (maximum)' : 'Koelvermogen (maximaal)',
    verwMax: en ? 'Heating capacity (maximum)' : 'Verwarmingsvermogen (maximaal)',
    labelKoelen: en ? 'Energy label cooling' : 'Energielabel koelen',
    labelVerwarmen: en ? 'Energy label heating' : 'Energielabel verwarmen',
    refrigerant: en ? 'Refrigerant' : 'Koudemiddel',
    warranty: en ? 'Warranty' : 'Garantie',
  };

  const props: SpecProp[] = [];
  const kw = (name: string, raw?: string | null) => {
    const v = numeric(raw);
    if (v) props.push({ name, value: v, unitCode: KILOWATT });
  };
  const plain = (name: string, raw?: string | null) => {
    const v = numeric(raw);
    if (v) props.push({ name, value: v });
  };
  const text = (name: string, raw?: string | null) => {
    if (raw) props.push({ name, value: raw });
  };

  kw(t.koel, input.koel);
  kw(t.verw, input.verw);
  kw(t.koelMax, input.koelMax);
  kw(t.verwMax, input.verwMax);
  plain('SEER', input.seer);
  plain('SCOP', input.scop);
  text(t.labelKoelen, input.labelKoelen);
  text(t.labelVerwarmen, input.labelVerwarmen);
  text(t.refrigerant, input.refrigerant);
  text(t.warranty, input.warranty);

  return props;
}
