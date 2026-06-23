export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Algemene FAQ (homepage). Wordt zowel zichtbaar getoond als uitgelezen door
 * Google en AI-zoekmachines via FAQPage structured data.
 *
 * ⚠️ TE BEVESTIGEN door Best Aircotechniek — de onderstaande antwoorden zijn
 * eerlijk en algemeen geformuleerd, maar worden specifieker (en beter voor SEO)
 * zodra de echte gegevens bekend zijn:
 *  - Merken die jullie installeren (Daikin, Mitsubishi, LG, Samsung, ...?)
 *  - Exacte garantietermijn (bijv. 5 jaar)
 *  - Doen jullie ook reparatie, of alleen installatie + onderhoud?
 *  - Eventuele richtprijs ("vanaf € ...") — sterk voor zowel klanten als GEO.
 */
export const generalFaq: FaqItem[] = [
  {
    question: 'Wat kost het om een airco te laten installeren?',
    answer:
      'De prijs hangt af van het type airco, het aantal ruimtes en de montagesituatie. Een eenvoudige single-split is voordeliger dan een multi-split voor meerdere kamers. Wij maken altijd een vrijblijvende offerte op maat, zodat u vooraf precies weet waar u aan toe bent.',
    // TODO: voeg desgewenst een richtprijs toe, bijv. "Een complete single-split installatie start vanaf € ...".
  },
  {
    question: 'Hoe lang duurt het installeren van een airco?',
    answer:
      'Een standaard single-split plaatsen wij meestal binnen één werkdag. Heeft u meerdere binnenunits of een complexere situatie? Dan plannen wij hier extra tijd voor in en bespreken we dit vooraf.',
  },
  {
    question: 'Welke merken airco installeren jullie?',
    answer:
      'Wij werken met betrouwbare A-merken met een goede prijs-kwaliteitverhouding en langdurige garantie. Tijdens het adviesgesprek kiezen we samen het merk en model dat het beste past bij uw ruimte, wensen en budget.',
    // TODO: noem hier de concrete merken (bijv. Daikin, Mitsubishi Electric, LG, Samsung). Specifieke merknamen scoren beter in zoekresultaten.
  },
  {
    question: 'Krijg ik garantie op de installatie?',
    answer:
      'Ja. U krijgt fabrieksgarantie op de airco zelf en daarnaast garantie op onze montage. De exacte voorwaarden leggen we duidelijk vast in uw offerte, zodat u nooit voor verrassingen komt te staan.',
    // TODO: vul de exacte garantietermijn in, bijv. "Standaard geven wij 5 jaar garantie op de installatie."
  },
  {
    question: 'In welke plaatsen en regio zijn jullie actief?',
    answer:
      'Wij installeren airconditioning in heel Noord-Brabant, waaronder Best, Eindhoven, Veldhoven, Oirschot, Sint-Oedenrode, Boxtel, Tilburg en Den Bosch. Woont u net buiten dit gebied? Neem gerust contact op — vaak kunnen we u alsnog helpen.',
  },
  {
    question: 'Verzorgen jullie ook onderhoud aan de airco?',
    answer:
      'Naast installatie kunnen wij ook het onderhoud van uw airco verzorgen. Periodiek onderhoud houdt uw systeem efficiënt, hygiënisch en storingsvrij, en verlengt de levensduur van het apparaat.',
    // TODO: bevestig of jullie óók reparatie/storingsdienst aanbieden en pas dit antwoord daarop aan.
  },
];

/**
 * FAQ specifiek voor de pagina "Hoe het werkt".
 */
export const processFaq: FaqItem[] = [
  {
    question: 'Is het adviesgesprek vrijblijvend?',
    answer:
      'Ja. Wij komen langs, geven eerlijk advies en sturen een offerte. U beslist zelf of u verder gaat.',
  },
  {
    question: 'Hoe lang duurt een installatie?',
    answer:
      'Een standaard split-unit plaatsen wij meestal binnen één dag. Bij meerdere units plannen we extra tijd in.',
  },
  {
    question: 'Helpen jullie ook na de installatie?',
    answer:
      'Zeker. Na oplevering blijven wij uw aanspreekpunt voor vragen en kunnen wij onderhoud voor u regelen.',
  },
];
