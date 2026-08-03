/**
 * Haalt cijfer, aantal beoordelingen en (indien beschikbaar) de reviewteksten
 * op bij de Google Places API en schrijft ze naar src/data/google-reviews.json.
 *
 * WAAROM EEN SCRIPT EN NIET IN DE PAGINA'S
 * Eerder deed een Astro-component de fetch tijdens het renderen. Dat werkte
 * lokaal maar niet in GitHub Actions: de build-log liet zien dat de API 4
 * beoordelingen teruggaf, terwijl elke pagina de handmatige 3 bleef tonen. De
 * waarde bereikte de componenten dus niet. Als losse stap vóór de build is er
 * geen twijfel meer: het resultaat staat in een bestand dat je kunt inzien, en
 * de build-log vertelt precies wat er is opgehaald.
 *
 * Faalt de aanroep of ontbreekt de sleutel, dan blijft het bestaande bestand
 * staan. De site toont dan de laatst bekende cijfers in plaats van terug te
 * vallen op verouderde hardcoded waarden.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const OUT = new URL('../src/data/google-reviews.json', import.meta.url);
const SITE = new URL('../src/data/site.ts', import.meta.url);

/** Place ID uit site.ts, zodat het op één plek staat. */
function placeIdFromConfig() {
  const match = readFileSync(SITE, 'utf8').match(/googlePlaceId:\s*'([^']+)'/);
  return match?.[1];
}

const apiKey = process.env.GOOGLE_PLACES_API_KEY;
const placeId = placeIdFromConfig();

if (!apiKey) {
  console.log('[reviews] Geen GOOGLE_PLACES_API_KEY; bestaande google-reviews.json blijft staan.');
  process.exit(0);
}
if (!placeId) {
  console.warn('[reviews] Geen googlePlaceId in site.ts gevonden; bestaande google-reviews.json blijft staan.');
  process.exit(0);
}

try {
  const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}?languageCode=nl`, {
    headers: {
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'rating,userRatingCount,googleMapsUri,reviews',
    },
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    console.warn(`[reviews] Places API gaf HTTP ${response.status}: ${body.slice(0, 200)}`);
    console.warn('[reviews] Bestaande google-reviews.json blijft staan.');
    process.exit(0);
  }

  const data = await response.json();
  const result = {
    fetchedAt: new Date().toISOString().slice(0, 10),
    rating: data.rating ?? null,
    totalReviews: data.userRatingCount ?? null,
    mapsUrl: data.googleMapsUri ?? null,
    reviews: (data.reviews ?? []).slice(0, 6).map((r) => ({
      authorName: r.authorAttribution?.displayName ?? 'Google-gebruiker',
      authorPhoto: r.authorAttribution?.photoUri ?? null,
      rating: r.rating ?? 5,
      text: r.text?.text ?? '',
      relativeTime: r.relativePublishTimeDescription ?? '',
    })),
  };

  writeFileSync(OUT, `${JSON.stringify(result, null, 2)}\n`);
  console.log(
    `[reviews] Opgehaald: cijfer ${result.rating}, ${result.totalReviews} beoordelingen, ${result.reviews.length} reviewteksten.`,
  );
  if (result.reviews.length === 0) {
    console.log('[reviews] Google levert geen reviewteksten via de API; de handmatige citaten blijven in gebruik.');
  }
} catch (error) {
  console.warn(`[reviews] Places API onbereikbaar: ${error instanceof Error ? error.message : error}`);
  console.warn('[reviews] Bestaande google-reviews.json blijft staan.');
}
