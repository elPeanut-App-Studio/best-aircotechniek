import { site } from '../data/site';

export interface GoogleReview {
  authorName: string;
  authorPhoto?: string;
  rating: number;
  text: string;
  relativeTime: string;
}

export interface GoogleReviewsData {
  rating: number;
  totalReviews: number;
  reviews: GoogleReview[];
  mapsUrl?: string;
}

let cached: Promise<GoogleReviewsData | null> | null = null;

/**
 * Leest een variabele uit de buildomgeving.
 *
 * process.env EERST: Vite vervangt `import.meta.env.NAAM` tijdens de build
 * statisch, en voor een variabele zonder PUBLIC_-prefix die niet in een
 * .env-bestand staat wordt dat `undefined`. In GitHub Actions komen de waarden
 * uit de omgeving van de stap en niet uit een .env-bestand, waardoor de
 * import.meta.env-route daar niets oplevert.
 */
function env(name: string): string | undefined {
  const fromProcess = typeof process !== 'undefined' ? process.env?.[name] : undefined;
  if (fromProcess) return fromProcess;
  return (import.meta.env as Record<string, string | undefined>)[name];
}

async function fetchGoogleReviews(): Promise<GoogleReviewsData | null> {
  const apiKey = env('GOOGLE_PLACES_API_KEY');
  // Uit de config: publieke informatie, dus niet afhankelijk van de omgeving.
  const placeId = site.googlePlaceId || env('PUBLIC_GOOGLE_PLACE_ID');

  if (!apiKey || !placeId) {
    // Geen sleutels ingesteld: dit is een geldige situatie (lokale build).
    return null;
  }

  try {
    const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'reviews,rating,userRatingCount,googleMapsUri',
      },
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      console.warn(
        `[google-reviews] Places API gaf HTTP ${response.status}. De site valt terug op de handmatige reviews. ${body.slice(0, 300)}`,
      );
      return null;
    }

    const data = await response.json();
    if (!data.reviews?.length) {
      console.info(
        `[google-reviews] Google geeft ${data.userRatingCount ?? 0} beoordelingen en cijfer ${data.rating ?? '-'}, maar levert geen reviewteksten via de API. Cijfer en aantal komen live, de citaten blijven handmatig.`,
      );
    }

    return {
      rating: data.rating ?? 0,
      totalReviews: data.userRatingCount ?? 0,
      mapsUrl: data.googleMapsUri,
      reviews: (data.reviews ?? []).slice(0, 6).map((review: Record<string, unknown>) => {
        const author = review.authorAttribution as Record<string, string> | undefined;
        const text = review.text as Record<string, string> | undefined;

        return {
          authorName: author?.displayName ?? 'Google-gebruiker',
          authorPhoto: author?.photoUri,
          rating: (review.rating as number) ?? 5,
          text: text?.text ?? '',
          relativeTime: (review.relativePublishTimeDescription as string) ?? '',
        };
      }),
    };
  } catch (error) {
    console.warn(
      `[google-reviews] Places API onbereikbaar (${error instanceof Error ? error.message : String(error)}). De site valt terug op de handmatige reviews.`,
    );
    return null;
  }
}

export function getGoogleReviews(): Promise<GoogleReviewsData | null> {
  if (!cached) cached = fetchGoogleReviews();
  return cached;
}

/**
 * De weergavedata voor de reviewsectie en de schema-markup.
 *
 * Google indexeert een profiel in stappen: eerst de plaats met een cijfer en een
 * aantal beoordelingen, en pas later de reviewTEKSTEN via de API. Zolang de
 * teksten er niet zijn, nemen we alleen het cijfer en het aantal van Google over
 * en houden we de handmatige citaten. Zonder deze samenvoeging zou het
 * aanzetten van de feed de reviewkaarten van de pagina laten verdwijnen.
 *
 * Zodra Google de teksten wél levert, wint de live feed volledig, zonder dat
 * hier iets aangepast hoeft te worden.
 */
export async function getReviewsForDisplay(fallback: GoogleReviewsData): Promise<GoogleReviewsData> {
  const live = await getGoogleReviews();
  if (!live) return fallback;
  if (live.reviews.length > 0) return live;

  return {
    ...fallback,
    rating: live.rating > 0 ? live.rating : fallback.rating,
    totalReviews: live.totalReviews > 0 ? live.totalReviews : fallback.totalReviews,
    mapsUrl: live.mapsUrl ?? fallback.mapsUrl,
  };
}

export function getGoogleWriteReviewUrl(placeId?: string): string | null {
  if (!placeId) return null;
  return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`;
}
