import { site } from './site';
import type { FaqItem } from './faq';

/**
 * Engelse FAQ, aangepast voor expats in de regio Eindhoven.
 *
 * De eerste drie vragen zijn bevestigd door Best Aircotechniek:
 * Engels op locatie, factuur op bedrijfsnaam, huurwoning mits toestemming.
 *
 * NIET claimen dat wij VvE- of verhuurderaanvragen begeleiden of daarvoor
 * documentatie leveren. Dat is expliciet niet bevestigd.
 */
export const generalFaqEn: FaqItem[] = [
  {
    question: 'Do you speak English?',
    answer:
      'Yes. We communicate in English by phone, WhatsApp and email, and also during the home visit and the installation itself. You do not need to speak Dutch to work with us.',
  },
  {
    question: 'I rent my home. Can I still have air conditioning installed?',
    answer:
      'Yes, provided your landlord or the building association (VvE) gives permission, because the outdoor unit is mounted to the building. Once you have that permission, we take care of the rest.',
  },
  {
    question: 'Can you invoice my employer or company?',
    answer:
      'Yes. We can issue the invoice to a company name, which helps if your air conditioning is paid for through an employer or an expat arrangement. Let us know when you request your quote.',
  },
  {
    question: 'What does it cost to have air conditioning installed?',
    answer: `A complete installation starts at ${site.priceFromEn}, including VAT and installation. That price is for a basic single-split system with the entry-level 2.5 kW model. The final price depends on the model, the number of rooms and the installation situation. You always receive a free quote with no obligation.`,
  },
  {
    question: 'How long does the installation take?',
    answer:
      'A standard single-split system is usually installed within one working day. If you need several indoor units or the situation is more complex, we schedule extra time and discuss this with you in advance.',
  },
  {
    question: 'Which brands do you install?',
    answer:
      'We install Daikin, LG and AUX. These are reliable brands with a good price-quality ratio and long manufacturer warranties. During the home visit we choose the brand and model that suits your space, wishes and budget together.',
  },
  {
    question: 'What warranty do I get?',
    answer:
      'You get 2 to 5 years manufacturer warranty on the unit, depending on the brand. On top of that we give 2 years warranty on the installation, on the condition that the system is serviced annually by a professional.',
  },
  {
    question: 'Which areas do you cover?',
    answer:
      'We install air conditioning throughout Noord-Brabant, including Best, Eindhoven, Veldhoven, Oirschot, Sint-Oedenrode, Son en Breugel, Boxtel, Tilburg and Den Bosch. Live just outside this area? Get in touch, we can often still help.',
  },
  {
    question: 'Do you also service air conditioning?',
    answer:
      'We specialise in installing air conditioning. We handle the annual maintenance for systems we installed ourselves, which keeps your system efficient and hygienic and keeps your installation warranty valid.',
  },
  {
    question: 'How quickly do you respond?',
    answer:
      'Send us a message through the contact form, WhatsApp or email and we will get back to you within 24 hours to discuss what you need.',
  },
];

/** Kortere FAQ voor de pagina "How it works". */
export const processFaqEn: FaqItem[] = [
  {
    question: 'Is the advice visit free and without obligation?',
    answer:
      'Yes. We visit, give honest advice and send you a quote. You decide in your own time whether to go ahead.',
  },
  {
    question: 'How long does an installation take?',
    answer:
      'A standard single-split system is usually installed within one working day. For multiple indoor units we schedule extra time.',
  },
  {
    question: 'Do you help after the installation?',
    answer:
      'Yes. After handover we remain your point of contact for questions, and we can take care of the annual maintenance.',
  },
];
