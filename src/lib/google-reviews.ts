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
 * Sleutel om een live review en een handmatig citaat van dezelfde klant te
 * herkennen. Google schrijft namen niet altijd identiek op ("Saskia V." tegen
 * "Saskia V"), dus alles behalve letters en cijfers valt weg.
 */
function authorKey(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

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

  // Live reviews eerst, daarna de handmatige citaten die Google nog niet levert.
  //
  // Dit was eerder alles-of-niets: zodra er één live review was, verdwenen alle
  // handmatige. Google geeft de teksten juist DRUIPGEWIJS vrij (op 4 augustus
  // 2026 één van de vijf), dus dat betekende drie reviewkaarten kwijt voor één
  // nieuwe. Nu vullen ze elkaar aan en verdwijnt een handmatig citaat pas als
  // Google dezelfde review zelf levert.
  const seen = new Set(liveReviews.map((r) => authorKey(r.authorName)));
  const merged = [...liveReviews, ...fallback.reviews.filter((r) => !seen.has(authorKey(r.authorName)))];

  return {
    rating: live.rating && live.rating > 0 ? live.rating : fallback.rating,
    totalReviews: live.totalReviews && live.totalReviews > 0 ? live.totalReviews : fallback.totalReviews,
    mapsUrl: live.mapsUrl ?? fallback.mapsUrl,
    reviews: merged.slice(0, 6),
  };
}

export function getGoogleWriteReviewUrl(placeId?: string): string | null {
  if (!placeId) return null;
  return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`;
}
