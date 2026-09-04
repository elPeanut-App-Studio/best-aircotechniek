/** Merken die Best Aircotechniek installeert. Gebruikt op de homepage en de merkpagina's. */
export const brands = [
  {
    slug: 'daikin',
    metaTitel: null,
    metaTitelEn: null,
    name: 'Daikin',
    logo: '/brands/daikin.svg',
    tagline: 'Wereldwijd marktleider in klimaatbeheersing, bekend om betrouwbaarheid en zuinigheid.',
    brochure: '/daikin-airco-brochure.pdf',
    brochureEn: '/daikin-airco-brochure-en.pdf',
  },
  {
    slug: 'lg',
    metaTitel: null,
    metaTitelEn: null,
    name: 'LG',
    logo: '/brands/lg.svg',
    tagline: 'Moderne airconditioning met slimme bediening en een strak design.',
    brochure: '/lg-airco-brochure.pdf',
    brochureEn: '/lg-airco-brochure-en.pdf',
  },
  {
    slug: 'aux',
    metaTitel: null,
    metaTitelEn: null,
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
    // De standaardtitel wordt met deze merknaam 72 tekens en dan kapt Google
    // hem af. Alleen hier een kortere variant; de andere merken houden hun
    // bestaande titel, want die pagina's zijn al geïndexeerd.
    metaTitel: 'Mitsubishi Heavy Industries airco | Best Aircotechniek',
    metaTitelEn: 'Mitsubishi Heavy Industries air conditioning | Best Aircotechniek',
    // Logo van Wikimedia Commons (File:MHI Logo en.svg), auteursrechtelijk
    // publiek domein met de gebruikelijke merkenrechtelijke aantekening. Zelfde
    // herkomst als daikin.svg en lg.svg. Een merklogo gebruiken om aan te geven
    // welke merken wij installeren is verwijzend gebruik (art. 14 lid 1 sub c
    // UMVo); dat staat los van MHI's productfoto's, die wij niet mogen
    // publiceren en dus via Coolmark moeten komen.
    logo: '/brands/mitsubishi-heavy-industries.svg',
    tagline: 'Japanse techniek met het hoogste rendement van ons aanbod.',
    // Nog geen brochure: MHI's eigen beeldmateriaal mag niet gepubliceerd
    // worden en een actuele Nederlandse brochure-PDF met de ZT bestaat niet
    // publiek. Zodra Coolmark er een met gebruiksrecht levert, kan die hier in.
    brochure: null,
    brochureEn: null,
  },
] as const;
