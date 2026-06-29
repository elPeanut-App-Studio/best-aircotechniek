/** Merken die Best Aircotechniek installeert. Gebruikt op de homepage en de merkpagina's. */
export const brands = [
  {
    slug: 'daikin',
    name: 'Daikin',
    logo: '/brands/daikin.svg',
    tagline: 'Wereldwijd marktleider in klimaatbeheersing, bekend om betrouwbaarheid en zuinigheid.',
    brochure: null,
  },
  {
    slug: 'lg',
    name: 'LG',
    logo: '/brands/lg.svg',
    tagline: 'Moderne airconditioning met slimme bediening en een strak design.',
    brochure: null,
  },
  {
    slug: 'aux',
    name: 'AUX',
    logo: '/brands/aux.png',
    tagline: 'Veel comfort voor een scherpe prijs, met een uitstekende prijs-kwaliteitverhouding.',
    brochure: '/aux-airco-brochure.pdf',
  },
] as const;
