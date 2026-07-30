/**
 * Energielabel afgeleid uit SEER en SCOP volgens de officiële grenswaarden in
 * EU-verordening 626/2011, bijlage II, tabel 1 (airco's anders dan single- en
 * double-duct, gemiddeld stookseizoen).
 *
 * Bewust berekend en niet los ingevoerd: zo kan het label op een pagina nooit
 * uit de pas lopen met de SEER/SCOP die ernaast staat. Dat ging eerder mis bij
 * de Daikin Perfera 7,1 kW.
 *
 * Twee onafhankelijke controles op deze drempels:
 * - Daikin Perfera 2,0 tot 3,5 kW heeft SEER 8,65 en SCOP 5,10, wat hier
 *   A+++ / A+++ oplevert, precies wat Daikin zelf op de productpagina vermeldt.
 * - Alle twaalf LG-wandmodellen: de SEER/SCOP per uitvoering levert hier exact
 *   het energielabel op dat LG Nederland per type publiceert (12 van 12).
 */
function asNumber(value: string): number {
  return Number(value.replace(',', '.'));
}

export function coolingLabel(seer: string): string {
  const v = asNumber(seer);
  if (v >= 8.5) return 'A+++';
  if (v >= 6.1) return 'A++';
  if (v >= 5.6) return 'A+';
  if (v >= 5.1) return 'A';
  if (v >= 4.6) return 'B';
  if (v >= 4.1) return 'C';
  return 'D';
}

export function heatingLabel(scop: string): string {
  const v = asNumber(scop);
  if (v >= 5.1) return 'A+++';
  if (v >= 4.6) return 'A++';
  if (v >= 4.0) return 'A+';
  if (v >= 3.4) return 'A';
  if (v >= 3.1) return 'B';
  if (v >= 2.8) return 'C';
  return 'D';
}

/** Hoogste label binnen een reeks SEER-/SCOP-waarden, voor "tot A+++" op modelpagina's. */
export function bestLabelsFrom(values: readonly { seer: string; scop: string }[]): {
  koelen: string;
  verwarmen: string;
} | null {
  if (values.length === 0) return null;
  const fmt = (n: number) => n.toFixed(2).replace('.', ',');
  return {
    koelen: coolingLabel(fmt(Math.max(...values.map((v) => asNumber(v.seer))))),
    verwarmen: heatingLabel(fmt(Math.max(...values.map((v) => asNumber(v.scop))))),
  };
}
