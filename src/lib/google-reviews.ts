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

import googleData from '../data/google-reviews.json';

/**
 * De weergavedata voor de reviewsectie en de schema-markup.
 *
 * De cijfers komen uit src/data/google-reviews.json, dat vóór elke build wordt
 * ververs door scripts/fetch-google-reviews.mjs. Geen fetch tijdens het
 * renderen: dat werkte lokaal wel en in GitHub Actions niet, waardoor de site
 * stil verouderde aantallen bleef tonen.
 *
 * Google indexeert een profiel in stappen: eerst het cijfer en het aantal
 * beoordelingen, en pas later de reviewTEKSTEN via de API. Zolang de teksten
 * ontbreken nemen we alleen het cijfer en het aantal over en houden we de
 * handmatige citaten. Zodra Google de teksten wél levert, wint de live feed
 * volledig zonder dat hier iets aangepast hoeft te worden.
 */
export function getReviewsForDisplay(fallback: GoogleReviewsData): GoogleReviewsData {
  const live = googleData as {
    rating: number | null;
    totalReviews: number | null;
    mapsUrl: string | null;
    reviews: {
      authorName: string;
      authorPhoto: string | null;
      rating: number;
      text: string;
      relativeTime: string;
    }[];
  };

  const liveReviews: GoogleReview[] = (live.reviews ?? []).map((r) => ({
    authorName: r.authorName,
    authorPhoto: r.authorPhoto ?? undefined,
    rating: r.rating,
    text: r.text,
    relativeTime: r.relativeTime,
  }));

  return {
    rating: live.rating && live.rating > 0 ? live.rating : fallback.rating,
    totalReviews: live.totalReviews && live.totalReviews > 0 ? live.totalReviews : fallback.totalReviews,
    mapsUrl: live.mapsUrl ?? fallback.mapsUrl,
    reviews: liveReviews.length > 0 ? liveReviews : fallback.reviews,
  };
}

export function getGoogleWriteReviewUrl(placeId?: string): string | null {
  if (!placeId) return null;
  return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`;
}
