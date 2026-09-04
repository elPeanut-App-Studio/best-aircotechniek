import { brands } from './brands';
import { auxModels } from './aux-products';
import { lgModels } from './lg-products';
import { daikinModels } from './daikin-products';
import { mhiModels } from './mhi-products';

/**
 * Welke modellen bij welk merk horen, voor de merkpagina's.
 *
 * WAAROM DIT EEN APART BESTAND IS
 * Deze tabel stond twee keer: één keer in merken/[brand].astro en één keer in
 * en/brands/[brand].astro, en daarnaast bestaat er een vergelijkbare lijst in
 * i18n/routes.ts voor de URL's. Bij het toevoegen van Mitsubishi Heavy
 * Industries is die tabel op de merkpagina's vergeten. Gevolg: de routekaart
 * maakte netjes alle 34 URL's aan en de model- en vermogenspagina's werkten,
 * maar de merkpagina zelf toonde "Binnenkort vindt u hier meer informatie",
 * zonder dat de build daar iets over zei. Nu is er één tabel en faalt de build
 * als een merk er niet in staat.
 */
export const modelsByBrand: Record<string, readonly any[]> = {
  aux: auxModels,
  lg: lgModels,
  daikin: daikinModels,
  'mitsubishi-heavy-industries': mhiModels,
};

for (const merk of brands) {
  const lijst = modelsByBrand[merk.slug];
  if (!lijst) {
    throw new Error(
      `brand-models: merk '${merk.slug}' staat in brands.ts maar heeft hier geen modellenlijst. ` +
        `Zonder die lijst toont /merken/${merk.slug}/ een lege pagina met een "binnenkort"-tekst.`,
    );
  }
  if (lijst.length === 0) {
    throw new Error(`brand-models: de modellenlijst van '${merk.slug}' is leeg.`);
  }
}
