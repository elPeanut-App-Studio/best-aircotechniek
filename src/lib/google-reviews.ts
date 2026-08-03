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

async function fetchGoogleReviews(): Promise<GoogleReviewsData | null> {
  const apiKey = import.meta.env.GOOGLE_PLACES_API_KEY;
  const placeId = import.meta.env.PUBLIC_GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) return null;

  try {
    const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'reviews,rating,userRatingCount,googleMapsUri',
      },
    });

    if (!response.ok) return null;

    const data = await response.json();

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
  } catch {
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
