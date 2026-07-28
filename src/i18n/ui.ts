import type { Lang } from './routes';
import { site, usps } from '../data/site';

/**
 * Alle vaste interfaceteksten per taal. Pagina-inhoud staat NIET hier maar in
 * src/data/*-en.ts; dit bestand is puur voor gedeelde componenten
 * (header, footer, knoppen, USP-blok, CTA-blok).
 */
export const ui = {
  nl: {
    siteDescription: site.description,
    slogan: site.slogan,

    // Navigatie
    navHome: 'Home',
    navHowItWorks: 'Hoe het werkt',
    navServiceArea: 'Werkgebied',
    navAbout: 'Over ons',
    navContact: 'Contact',

    // Knoppen en links
    /** Knop in de header. */
    ctaContact: 'Neem contact met ons op',
    /** Knop onderaan in het CTA-blok. Bewust korter dan de headerknop. */
    ctaSectionButton: 'Contact opnemen',
    ctaQuote: 'Vraag een offerte aan',
    contactHref: '/contact',

    // Footer
    navigationHeading: 'Navigatie',
    servicesHeading: 'Diensten',
    contactHeading: 'Contact',
    serviceAreaLabel: 'Werkgebied',

    // Taalknop
    languageLabel: 'Taal',

    // Hero-prijsregel
    priceLead: 'Complete installatie',
    priceFromWord: 'vanaf',
    priceSuffix: 'inclusief btw en montage',

    // USP-blok
    uspsHeading: 'Waarom Best Aircotechniek?',
    uspsSubheading:
      'Wij combineren vakmanschap met persoonlijke service, zodat u jarenlang geniet van een perfect werkende airco.',

    // CTA-blok, standaardteksten
    ctaDefaultTitle: 'Klaar voor het beste klimaat?',
    ctaDefaultDescription:
      'Neem vandaag nog contact op voor een vrijblijvend adviesgesprek of offerte.',

    // Reviews
    reviewsNote: '',
  },
  en: {
    siteDescription:
      'Best Aircotechniek installs air conditioning across Noord-Brabant. Expert installation, personal advice and fast service for homes and businesses. We speak English.',
    slogan: 'Always the best climate',

    navHome: 'Home',
    navHowItWorks: 'How it works',
    navServiceArea: 'Service area',
    navAbout: 'About us',
    navContact: 'Contact',

    ctaContact: 'Get in touch',
    ctaSectionButton: 'Contact us',
    ctaQuote: 'Request a quote',
    contactHref: '/en/contact',

    navigationHeading: 'Navigation',
    servicesHeading: 'Services',
    contactHeading: 'Contact',
    serviceAreaLabel: 'Service area',

    languageLabel: 'Language',

    priceLead: 'Complete installation',
    priceFromWord: 'from',
    priceSuffix: 'including VAT and installation',

    uspsHeading: 'Why Best Aircotechniek?',
    uspsSubheading:
      'We combine craftsmanship with personal service, so you enjoy a perfectly working system for years. And yes, we speak English.',

    ctaDefaultTitle: 'Ready for the best climate?',
    ctaDefaultDescription: 'Get in touch today for free advice or a quote with no obligation.',

    reviewsNote: 'Our customers left these reviews in Dutch.',
  },
} as const;

export type UiStrings = (typeof ui)['nl'];

export function t(lang: Lang): UiStrings {
  return ui[lang] as unknown as UiStrings;
}

/** USP-teksten per taal. De iconen komen overeen met die in USPGrid. */
export const uspsByLang = {
  nl: usps,
  en: [
    {
      icon: 'wrench',
      title: 'Expert installation',
      description: 'Experienced installers mount your unit neatly, safely and to code.',
    },
    {
      icon: 'chat',
      title: 'Tailored advice',
      description: 'We help you choose the right capacity and position for the best comfort.',
    },
    {
      icon: 'clock',
      title: 'Fast service',
      description: 'Short lines, clear agreements and a quick response to your question.',
    },
    {
      icon: 'shield',
      title: 'Warranty and aftercare',
      description: 'Quality products with warranty, and maintenance whenever you need it.',
    },
  ],
} as const;

/** Hoofdnavigatie per taal. */
export function navFor(lang: Lang) {
  if (lang === 'en') {
    return [
      { href: '/en/', label: ui.en.navHome },
      { href: '/en/how-it-works', label: ui.en.navHowItWorks },
      { href: '/en/air-conditioning-installation-noord-brabant', label: ui.en.navServiceArea },
      { href: '/en/about-us', label: ui.en.navAbout },
      { href: '/en/contact', label: ui.en.navContact },
    ];
  }
  return [
    { href: '/', label: ui.nl.navHome },
    { href: '/hoe-het-werkt', label: ui.nl.navHowItWorks },
    { href: '/airco-installatie-noord-brabant', label: ui.nl.navServiceArea },
    { href: '/over-ons', label: ui.nl.navAbout },
    { href: '/contact', label: ui.nl.navContact },
  ];
}

/** Dienstenlinks in de footer per taal. */
export function dienstenNavFor(lang: Lang) {
  if (lang === 'en') {
    return [
      { href: '/en/air-conditioning-installation', label: 'Air conditioning installation' },
      { href: '/en/air-conditioning-maintenance', label: 'Air conditioning maintenance' },
      {
        href: '/en/air-conditioning-installation-noord-brabant',
        label: 'Service area Noord-Brabant',
      },
    ];
  }
  return [
    { href: '/airco-installatie', label: 'Airco installatie' },
    { href: '/airco-onderhoud', label: 'Airco onderhoud' },
    { href: '/airco-installatie-noord-brabant', label: 'Werkgebied Noord-Brabant' },
    { href: '/downloads', label: 'Brochures & downloads' },
  ];
}
