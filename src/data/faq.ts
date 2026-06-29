export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Algemene FAQ (homepage). Wordt zowel zichtbaar getoond als uitgelezen door
 * Google en AI-zoekmachines via FAQPage structured data.
 * Antwoorden bevestigd door Best Aircotechniek (juni 2026).
 */
export const generalFaq: FaqItem[] = [
  {
    question: 'Wat kost het om een airco te laten installeren?',
    answer:
      'Een complete installatie start vanaf € 1.299. Dit is voor een eenvoudige single-split met het voordeligste 2,5 kW-model, inclusief montage. De uiteindelijke prijs hangt af van het gekozen model, het aantal ruimtes en de montagesituatie. Wij maken altijd een vrijblijvende offerte op maat, zodat u vooraf precies weet waar u aan toe bent.',
  },
  {
    question: 'Hoe lang duurt het installeren van een airco?',
    answer:
      'Een standaard single-split plaatsen wij meestal binnen één werkdag. Heeft u meerdere binnenunits of een complexere situatie? Dan plannen wij hier extra tijd voor in en bespreken we dit vooraf.',
  },
  {
    question: 'Welke merken airco installeren jullie?',
    answer:
      'Wij installeren airco’s van Daikin, LG en AUX. Dit zijn betrouwbare merken met een goede prijs-kwaliteitverhouding en langdurige garantie. Tijdens het adviesgesprek kiezen we samen het merk en model dat het beste past bij uw ruimte, wensen en budget.',
  },
  {
    question: 'Welke garantie krijg ik op mijn airco en de installatie?',
    answer:
      'U krijgt 2 tot 5 jaar fabrieksgarantie op de airco, afhankelijk van het merk. Daarnaast geven wij 2 jaar garantie op de installatie, op voorwaarde dat de airco elk jaar door een vakman wordt onderhouden. De voorwaarden leggen we duidelijk vast in uw offerte.',
  },
  {
    question: 'In welke plaatsen en regio zijn jullie actief?',
    answer:
      'Wij installeren airconditioning in heel Noord-Brabant, waaronder Best, Eindhoven, Veldhoven, Oirschot, Sint-Oedenrode, Boxtel, Tilburg en Den Bosch. Woont u net buiten dit gebied? Neem gerust contact op — vaak kunnen we u alsnog helpen.',
  },
  {
    question: 'Verzorgen jullie ook onderhoud aan de airco?',
    answer:
      'Wij zijn gespecialiseerd in het installeren van airco’s. Het jaarlijks onderhoud verzorgen wij voor airco’s die wij zelf hebben geplaatst. Zo blijft uw systeem efficiënt en hygiënisch werken én blijft uw installatiegarantie geldig.',
  },
  {
    question: 'Hoe snel reageren jullie op een aanvraag?',
    answer:
      'Stuur ons een bericht via het contactformulier, WhatsApp of e-mail, dan nemen wij binnen 24 uur contact met u op om uw wensen te bespreken.',
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
