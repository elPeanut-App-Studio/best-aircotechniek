import type { GoogleReviewsData } from '../lib/google-reviews';

/**
 * Handmatig ingevoerde Google-reviews.
 *
 * Waarom handmatig: het Google Business Profile is een service-area business
 * zonder openbaar adres. Zulke profielen verschijnen (voorlopig) niet in de
 * Places API, waardoor de automatische feed geen data teruggeeft. Deze lijst
 * toont de echte reviews toch op de site.
 *
 * Zodra de Places API het profiel wél indexeert en PUBLIC_GOOGLE_PLACE_ID +
 * GOOGLE_PLACES_API_KEY zijn ingesteld, neemt de live feed het automatisch
 * over (zie GoogleReviews.astro) en hoeft deze lijst niet meer bijgewerkt.
 *
 * Nieuwe review toevoegen = één object toevoegen aan de array hieronder.
 * Bron: https://share.google/P0go8dYmyCVAl59WI
 */
export const manualReviews = [
  {
    authorName: 'Rigan Agachi',
    rating: 5,
    relativeTime: 'een week geleden',
    text:
      "Niels heeft bij ons in Veldhoven een drietal airco's geplaatst. Na de opname kregen we snel een offerte en nadat we die geaccepteerd hadden kon hij al best snel langskomen om ze te plaatsen. Binnen een dag was het werk netjes afgerond. Wij zijn erg blij met onze gekoelde kamers. Bedankt!",
  },
  {
    authorName: 'Bastiaan Ten Dam',
    rating: 5,
    relativeTime: 'een week geleden',
    text:
      'Vandaag is de airco in onze slaapkamer in Best gereed gekomen. De koelte kunnen we zelfs nu ook in de woonkamer voelen met de slaapkamer- en woonkamerdeur open. Na goede adviezen is de montage volgens wens gebeurd. We zijn klaar voor warme of koude dagen. Bedankt voor de vakkundige installatie!',
  },
  {
    authorName: 'Saskia V',
    rating: 5,
    relativeTime: '3 weken geleden',
    text: 'Kundig persoon, betrouwbaar, snel gedaan, 100% aan te raden.',
  },
] as const;

/**
 * Bouwt hetzelfde datamodel als de live Places API-feed, zodat GoogleReviews.astro
 * en LocalBusinessSchema.astro er direct mee kunnen werken.
 */
export const manualReviewsData: GoogleReviewsData | null =
  manualReviews.length > 0
    ? {
        rating:
          manualReviews.reduce((sum, r) => sum + r.rating, 0) / manualReviews.length,
        totalReviews: manualReviews.length,
        reviews: manualReviews.map((r) => ({ ...r })),
      }
    : null;
