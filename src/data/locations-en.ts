import { site } from './site';
import type { FaqItem } from './faq';

/**
 * Engelse locatiepagina's. De slugs zijn identiek aan die in locations.ts,
 * zodat de routekaart in src/i18n/routes.ts de paren kan koppelen.
 *
 * Elke plaats heeft eigen tekst met de wijken uit de Nederlandse versie.
 * Bewust geen herhaalde standaardalinea's, want dan wordt het dunne content.
 */
export interface LocationEn {
  slug: string;
  city: string;
  metaDescription: string;
  heroDescription: string;
  intro: string[];
  nearby: string[];
}

export const locationsEn: LocationEn[] = [
  {
    slug: 'best',
    city: 'Best',
    metaDescription: `Air conditioning installation in Best from ${site.priceFrom}. Best Aircotechniek is based here: expert installation, personal advice and fast service. We speak English.`,
    heroDescription: 'Your local air conditioning installer in Best. We know the area and are quick to arrive.',
    intro: [
      'Best is our home base. Whether you live in the centre, in Heivelden, Naastenbest or Speelheide, or you have a newly built home in Dijkstraten, we know this town and its houses better than anyone and we are on your doorstep quickly.',
      'Many homes in Best are well insulated and heat up fast in summer. A well chosen system gives you comfort all year round: cooling in summer and economical additional heating in the shoulder seasons. We advise you on site about the right capacity and the best position for the indoor and outdoor unit.',
      'Because we are based here, the lines are short. You speak directly with the installer who does the work, with no call centre in between. A complete installation starts at ' +
        `${site.priceFrom}, including VAT and installation.`,
    ],
    nearby: ['Heivelden', 'Naastenbest', 'Speelheide', 'Dijkstraten', 'Wilhelminadorp'],
  },
  {
    slug: 'eindhoven',
    city: 'Eindhoven',
    metaDescription: `Air conditioning installation in Eindhoven from ${site.priceFrom}. Expert installation in Woensel, Strijp, Tongelre and beyond. We speak English.`,
    heroDescription:
      'Expert air conditioning installation across Eindhoven, from Woensel to Meerhoven.',
    intro: [
      'In Eindhoven we install air conditioning across the whole city, from the 1930s houses in Woensel, Stratum and Tongelre to the newer homes in Strijp and Meerhoven. Every type of property calls for its own approach, and we are happy to think that through with you.',
      'Eindhoven has warm, urban summers in which indoor temperatures climb quickly. An efficient system from a reliable brand keeps your home pleasantly cool without a high energy bill. We visit for tailored advice and take care of a tidy, safe installation.',
      'A large share of our customers in Eindhoven are internationals working at ASML, Philips, the TU/e and the surrounding tech companies. Everything from the first message to the handover can be handled in English, so you always know exactly what is being installed and why.',
    ],
    nearby: ['Woensel', 'Strijp', 'Tongelre', 'Gestel', 'Stratum', 'Meerhoven'],
  },
  {
    slug: 'veldhoven',
    city: 'Veldhoven',
    metaDescription: `Air conditioning installation in Veldhoven from ${site.priceFrom}. Expert installation in Meerveldhoven, Zeelst, Oerle and beyond. We speak English.`,
    heroDescription: 'Your air conditioning specialist in Veldhoven, from Meerveldhoven to Oerle and Zeelst.',
    intro: [
      'Veldhoven is growing fast and has many spacious family homes, in Meerveldhoven, Zeelst, Oerle, Heikant and d’Ekker among others. For all of these homes we supply and install the system that suits the space and your wishes.',
      'A good system does more than cool. In spring and autumn it heats your home economically, which many owners of larger properties here appreciate. We go through the options clearly in advance and deliver a clean installation you will enjoy for years.',
      'Veldhoven sits right next to the ASML campus, so we work here for plenty of international residents. The whole process can be handled in English if that is easier for you.',
    ],
    nearby: ['Meerveldhoven', 'Zeelst', 'Oerle', 'Heikant', 'd’Ekker'],
  },
  {
    slug: 'oirschot',
    city: 'Oirschot',
    metaDescription: `Air conditioning installation in Oirschot from ${site.priceFrom}. Careful installation, also on characteristic and listed properties. We speak English.`,
    heroDescription: 'Air conditioning installation in Oirschot and the Beerzen, with respect for your home.',
    intro: [
      'Oirschot is known for its historic centre and characteristic properties. That is exactly where careful, tidy installation matters: we position the units discreetly and with respect for the appearance of your home or farmhouse, including in Spoordonk and the Beerzen.',
      'Whether you have a detached house or a renovated property, we advise honestly about the system that fits best both technically and visually. No unnecessary bells and whistles, just a solution that works.',
      `From our base in Best we are in Oirschot in minutes, which shows in our response time and our personal approach. A complete installation starts at ${site.priceFrom}, always after a free home visit and a clear quote up front.`,
    ],
    nearby: ['Spoordonk', 'Middelbeers', 'Oostelbeers', 'Best'],
  },
  {
    slug: 'sint-oedenrode',
    city: 'Sint-Oedenrode',
    metaDescription: `Air conditioning installation in Sint-Oedenrode from ${site.priceFrom}. Expert installation in Nijnsel, Olland and beyond. We speak English.`,
    heroDescription: 'Expert air conditioning installation in Sint-Oedenrode and the surrounding villages.',
    intro: [
      'Sint-Oedenrode, part of the Meierijstad municipality, has many spacious and detached homes, including in Nijnsel, Olland and Boskant. These larger properties benefit most from a well matched system that keeps several rooms comfortable.',
      'We visit you to determine the ideal capacity and layout. After that we install neatly and safely, and we explain the controls calmly so you get the most out of your new climate straight away.',
      'For homes of this size a multi-split is often the sensible choice: several indoor units on one outdoor unit, so you keep just one tidy unit outside. We are happy to explain the difference during the home visit.',
    ],
    nearby: ['Nijnsel', 'Olland', 'Boskant', 'Meierijstad'],
  },
  {
    slug: 'boxtel',
    city: 'Boxtel',
    metaDescription: `Air conditioning installation in Boxtel from ${site.priceFrom}. Expert installation in Lennisheuvel, Liempde and beyond. We speak English.`,
    heroDescription: 'Your air conditioning installer in Boxtel, Lennisheuvel, Liempde and the surrounding area.',
    intro: [
      'Boxtel sits centrally between Eindhoven and Den Bosch and has a varied housing stock, from homes around the centre and the station to rural properties in Lennisheuvel and Liempde. For every type we find a fitting solution.',
      'We work with short lines and clear agreements, so you know in advance exactly what you get and what it costs. After the installation we stay reachable for questions and we can take care of the annual maintenance.',
      'Boxtel is well connected by train, which makes it popular with people working in Eindhoven or Den Bosch. If English is easier for you, that is no problem for us.',
    ],
    nearby: ['Lennisheuvel', 'Liempde', 'Esch'],
  },
  {
    slug: 'tilburg',
    city: 'Tilburg',
    metaDescription: `Air conditioning installation in Tilburg from ${site.priceFrom}. Expert installation in Reeshof, Berkel-Enschot, Udenhout and beyond. We speak English.`,
    heroDescription: 'Expert air conditioning installation in Tilburg, from the Reeshof to Berkel-Enschot.',
    intro: [
      'Tilburg is a large city with many terraced houses, 1930s neighbourhoods and newer developments in the Reeshof, Berkel-Enschot and Udenhout. In densely built areas it can get very warm indoors in summer, and a system makes an immediate difference there.',
      'Together we choose an efficient system that suits your home and your energy use, and we install it neatly and to code. That keeps things cool in summer and pleasant in the shoulder seasons.',
      'In terraced and semi-detached homes the position of the outdoor unit needs some thought, because of your neighbours and the available wall space. We look at that with you during the home visit so there are no surprises later.',
    ],
    nearby: ['Reeshof', 'Berkel-Enschot', 'Udenhout', 'Goirle'],
  },
  {
    slug: 'den-bosch',
    city: 'Den Bosch',
    metaDescription: `Air conditioning installation in Den Bosch from ${site.priceFrom}. Expert installation in Rosmalen, Maaspoort, Empel and beyond. We speak English.`,
    heroDescription: 'Your air conditioning specialist in Den Bosch, from the old town to Rosmalen.',
    intro: [
      "In 's-Hertogenbosch we install air conditioning across the whole city: from listed and townhouse properties in the historic centre to spacious newer homes in Rosmalen, Maaspoort and Empel. We approach every situation with the same care.",
      'On older properties we position the units discreetly and neatly. On newer homes we match the capacity to the good insulation, so you do not pay for more capacity than you need. You always get honest advice and a free quote up front.',
      'In the protected old town there are often extra requirements for what may be mounted on a facade. We advise on placement, and any permission from your landlord or building association is something you arrange yourself.',
    ],
    nearby: ['Rosmalen', 'Maaspoort', 'Empel', 'Engelen'],
  },
];

/** Plaatsspecifieke Engelse FAQ, zodat elke pagina eigen FAQPage-schema heeft. */
export function buildLocationFaqEn(loc: LocationEn): FaqItem[] {
  const nearbyText = loc.nearby.slice(0, 3).join(', ');
  return [
    {
      question: `Do you install air conditioning in ${loc.city}?`,
      answer: `Yes. Best Aircotechniek installs air conditioning in ${loc.city} and nearby areas such as ${nearbyText}. We visit you for tailored advice and take care of the complete installation, in English if you prefer.`,
    },
    {
      question: `What does air conditioning cost in ${loc.city}?`,
      answer: `A complete installation starts at ${site.priceFrom}, including VAT and installation, for a basic single-split with the 2.5 kW model. The exact price in ${loc.city} depends on your home and the model you choose. You always receive a free quote with no obligation.`,
    },
    {
      question: `Which brands do you install in ${loc.city}?`,
      answer: `We install Daikin, LG and AUX in ${loc.city}: reliable brands with a good price-quality ratio and long manufacturer warranties. Together we choose the model that suits your home best.`,
    },
    {
      question: `How quickly can you install a system in ${loc.city}?`,
      answer: `We respond to your request within 24 hours. Once you approve the quote we can often schedule the installation in ${loc.city} within a few working days, at a time that suits you. A standard installation is usually finished within one day.`,
    },
    {
      question: `I rent my home in ${loc.city}. Is installation possible?`,
      answer: `Yes, as long as your landlord or the building association gives permission, because the outdoor unit is mounted to the building. Once you have that permission we can go ahead.`,
    },
  ];
}
