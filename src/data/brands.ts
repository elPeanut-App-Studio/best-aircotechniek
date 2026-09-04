/** Merken die Best Aircotechniek installeert. Gebruikt op de homepage en de merkpagina's. */
export const brands = [
  {
    slug: 'daikin',
    name: 'Daikin',
    logo: '/brands/daikin.svg',
    tagline: 'Wereldwijd marktleider in klimaatbeheersing, bekend om betrouwbaarheid en zuinigheid.',
    brochure: '/daikin-airco-brochure.pdf',
    brochureEn: '/daikin-airco-brochure-en.pdf',
  },
  {
    slug: 'lg',
    name: 'LG',
    logo: '/brands/lg.svg',
    tagline: 'Moderne airconditioning met slimme bediening en een strak design.',
    brochure: '/lg-airco-brochure.pdf',
    brochureEn: '/lg-airco-brochure-en.pdf',
  },
  {
    slug: 'aux',
    name: 'AUX',
    logo: '/brands/aux.png',
    tagline: 'Veel comfort voor een scherpe prijs, met een uitstekende prijs-kwaliteitverhouding.',
    brochure: '/aux-airco-brochure.pdf',
    brochureEn: '/aux-airco-brochure-en.pdf',
  },
  {
    // Slug met de volledige naam en niet kort 'mitsubishi': Mitsubishi Electric
    // is een ánder bedrijf dat ook airco's maakt, en die verwarring hoort niet
    // in een URL. Het is bovendien de zoekterm die mensen intypen.
    slug: 'mitsubishi-heavy-industries',
    name: 'Mitsubishi Heavy Industries',
    logo: '/brands/mitsubishi-heavy-industries.svg',
    tagline: 'Japanse techniek met het hoogste rendement van ons aanbod, tot energielabel A+++.',
    // Nog geen brochure: MHI's eigen beeldmateriaal mag niet gepubliceerd
    // worden en een actuele Nederlandse brochure-PDF met de ZT bestaat niet
    // publiek. Zodra Coolmark er een met gebruiksrecht levert, kan die hier in.
    brochure: null,
    brochureEn: null,
  },
] as const;
