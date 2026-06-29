/**
 * Locatiepagina's per werkgebied. Elke plaats heeft unieke content (geen
 * gedupliceerde tekst) om als waardevolle landingspagina te ranken op
 * zoekopdrachten als "airco installatie <plaats>".
 *
 * De slugs vormen de URL: /airco-installatie-<slug>
 * Houd deze lijst in lijn met `serviceAreas` in src/data/site.ts.
 */
export interface Location {
  slug: string;
  city: string;
  /** SEO meta description, ca. 150 tekens, met plaatsnaam. */
  metaDescription: string;
  /** Korte intro onder de paginatitel (hero). */
  heroDescription: string;
  /** Unieke intro-alinea's voor de hoofdtekst. */
  intro: string[];
  /** Nabijgelegen wijken/plaatsen voor lokale relevantie en interne links. */
  nearby: string[];
}

export const locations: Location[] = [
  {
    slug: 'best',
    city: 'Best',
    metaDescription:
      'Airco laten installeren in Best? Best Aircotechniek is hier gevestigd. Vakkundige montage, persoonlijk advies en snelle service. Vanaf € 1.299.',
    heroDescription:
      'Uw lokale airco-installateur in Best. Wij kennen de buurt en zijn snel ter plaatse.',
    intro: [
      'Best is onze thuisbasis. Of u nu in het centrum woont, in Heivelden, Naastenbest of Speelheide, of een nieuwbouwwoning heeft in Dijkstraten: wij kennen de plaats en de woningen hier als geen ander en staan snel bij u op de stoep.',
      'Veel woningen in Best zijn goed geïsoleerd en warmen in de zomer snel op. Een goed gekozen airco zorgt het hele jaar door voor comfort: koel in de zomer en bijverwarmen in het tussenseizoen. Wij adviseren u ter plaatse over de juiste capaciteit en de beste plek voor de binnen- en buitenunit.',
    ],
    nearby: ['Heivelden', 'Naastenbest', 'Speelheide', 'Dijkstraten', 'Wilhelminadorp'],
  },
  {
    slug: 'eindhoven',
    city: 'Eindhoven',
    metaDescription:
      'Airco installatie in Eindhoven door Best Aircotechniek. Vakkundige montage in Woensel, Strijp, Tongelre en omgeving. Gratis advies, vanaf € 1.299.',
    heroDescription:
      'Vakkundige airco-installatie in Eindhoven en alle wijken, van Woensel tot Meerhoven.',
    intro: [
      'In Eindhoven installeren wij airconditioning door de hele stad, van de jaren-30 woningen in Woensel, Stratum en Tongelre tot de nieuwbouw in Strijp en Meerhoven. Elk woningtype vraagt om een eigen aanpak, en daar denken wij graag in mee.',
      'Eindhoven kent warme, stedelijke zomers waarin het binnen flink kan oplopen. Met een efficiënte airco van een betrouwbaar merk houdt u het aangenaam koel zonder hoge energierekening. Wij komen langs voor advies op maat en verzorgen een nette, veilige montage.',
    ],
    nearby: ['Woensel', 'Strijp', 'Tongelre', 'Gestel', 'Stratum', 'Meerhoven'],
  },
  {
    slug: 'veldhoven',
    city: 'Veldhoven',
    metaDescription:
      'Airco laten plaatsen in Veldhoven? Best Aircotechniek verzorgt installatie in Meerveldhoven, Zeelst, Oerle en omgeving. Persoonlijk advies, vanaf € 1.299.',
    heroDescription:
      'Uw airco-specialist in Veldhoven, van Meerveldhoven tot Oerle en Zeelst.',
    intro: [
      'Veldhoven groeit hard en telt veel ruime eengezinswoningen, onder meer in Meerveldhoven, Zeelst, Oerle, Heikant en d’Ekker. Voor al deze woningen leveren en plaatsen wij de airco die past bij de ruimte en uw wensen.',
      'Een goede airco doet meer dan koelen: in het voor- en najaar verwarmt hij uw woning energiezuinig. Wij bespreken vooraf duidelijk de mogelijkheden en zorgen voor een strakke installatie waar u jarenlang plezier van heeft.',
    ],
    nearby: ['Meerveldhoven', 'Zeelst', 'Oerle', 'Heikant', 'd’Ekker'],
  },
  {
    slug: 'oirschot',
    city: 'Oirschot',
    metaDescription:
      'Airco installatie in Oirschot door Best Aircotechniek. Zorgvuldige montage, ook bij karakteristieke en monumentale panden. Gratis advies, vanaf € 1.299.',
    heroDescription:
      'Airco-installatie in Oirschot en de Beerzen, met respect voor uw woning.',
    intro: [
      'Oirschot staat bekend om zijn historische centrum en karakteristieke panden. Juist daar is een zorgvuldige, nette montage belangrijk: wij plaatsen de units onopvallend en met respect voor de uitstraling van uw woning of boerderij, ook in Spoordonk en de Beerzen.',
      'Of u nu een vrijstaande woning of een gerenoveerd pand heeft: wij adviseren eerlijk over het systeem dat technisch én esthetisch het beste past. Geen onnodige toeters en bellen, wel een oplossing die werkt.',
    ],
    nearby: ['Spoordonk', 'Middelbeers', 'Oostelbeers', 'Best'],
  },
  {
    slug: 'sint-oedenrode',
    city: 'Sint-Oedenrode',
    metaDescription:
      'Airco laten installeren in Sint-Oedenrode? Best Aircotechniek verzorgt vakkundige montage in Nijnsel, Olland en omgeving. Persoonlijk advies, vanaf € 1.299.',
    heroDescription:
      'Vakkundige airco-installatie in Sint-Oedenrode en omliggende kernen.',
    intro: [
      'Sint-Oedenrode, onderdeel van Meierijstad, kent veel ruime en vrijstaande woningen, ook in Nijnsel, Olland en Boskant. Deze grotere woningen profiteren juist van een goed afgestemd airco-systeem dat meerdere ruimtes comfortabel houdt.',
      'Wij komen bij u langs om de ideale capaciteit en opstelling te bepalen. Daarna installeren wij netjes en veilig, en leggen we de bediening rustig aan u uit, zodat u meteen optimaal van uw nieuwe klimaat geniet.',
    ],
    nearby: ['Nijnsel', 'Olland', 'Boskant', 'Meierijstad'],
  },
  {
    slug: 'boxtel',
    city: 'Boxtel',
    metaDescription:
      'Airco installatie in Boxtel door Best Aircotechniek. Vakkundige montage in Lennisheuvel, Liempde en omgeving. Gratis advies op maat, vanaf € 1.299.',
    heroDescription:
      'Uw airco-installateur in Boxtel, Lennisheuvel, Liempde en omgeving.',
    intro: [
      'Boxtel ligt centraal tussen Eindhoven en Den Bosch en heeft een gevarieerd woningbestand, van woningen rond het centrum en het station tot landelijke woningen in Lennisheuvel en Liempde. Voor elk type vinden wij de passende airco-oplossing.',
      'Wij werken met korte lijnen en duidelijke afspraken: u weet vooraf precies wat u krijgt en wat het kost. Na de installatie blijven wij bereikbaar voor vragen en kunnen wij het jaarlijks onderhoud verzorgen.',
    ],
    nearby: ['Lennisheuvel', 'Liempde', 'Esch'],
  },
  {
    slug: 'tilburg',
    city: 'Tilburg',
    metaDescription:
      'Airco laten plaatsen in Tilburg? Best Aircotechniek verzorgt installatie in Reeshof, Berkel-Enschot, Udenhout en omgeving. Persoonlijk advies, vanaf € 1.299.',
    heroDescription:
      'Vakkundige airco-installatie in Tilburg, van de Reeshof tot Berkel-Enschot.',
    intro: [
      'Tilburg is een grote stad met veel rijtjeswoningen, jaren-30 wijken en nieuwbouw in onder meer de Reeshof, Berkel-Enschot en Udenhout. In dichtbebouwde wijken kan het binnen in de zomer flink warm worden. Een airco maakt daar direct verschil.',
      'Wij kiezen samen met u een efficiënt systeem dat past bij uw woning en energieverbruik, en plaatsen het netjes en volgens de regels. Zo blijft het bij u koel in de zomer en aangenaam in het tussenseizoen.',
    ],
    nearby: ['Reeshof', 'Berkel-Enschot', 'Udenhout', 'Goirle'],
  },
  {
    slug: 'den-bosch',
    city: 'Den Bosch',
    metaDescription:
      "Airco installatie in 's-Hertogenbosch door Best Aircotechniek. Vakkundige montage in Rosmalen, Maaspoort, Empel en omgeving. Gratis advies, vanaf € 1.299.",
    heroDescription:
      "Uw airco-specialist in Den Bosch en omgeving, van de binnenstad tot Rosmalen.",
    intro: [
      "In 's-Hertogenbosch installeren wij airco's door de hele stad: van monumentale en stadse panden in de historische binnenstad tot ruime nieuwbouwwoningen in Rosmalen, Maaspoort en Empel. Elke situatie pakken wij met dezelfde zorg aan.",
      'Bij oudere panden plaatsen wij de units onopvallend en netjes; bij nieuwbouw stemmen we de capaciteit af op de goede isolatie. U krijgt altijd eerlijk advies en een vrijblijvende offerte vooraf.',
    ],
    nearby: ['Rosmalen', 'Maaspoort', 'Empel', 'Engelen'],
  },
];

/** Bouwt een korte, plaatsspecifieke FAQ zodat elke locatiepagina unieke FAQ-schema heeft. */
export function buildLocationFaq(loc: Location) {
  const nearbyText = loc.nearby.slice(0, 3).join(', ');
  return [
    {
      question: `Installeren jullie airco's in ${loc.city}?`,
      answer: `Ja. Best Aircotechniek installeert airconditioning in ${loc.city} en omliggende plaatsen zoals ${nearbyText}. Wij komen bij u langs voor advies op maat en verzorgen de complete montage.`,
    },
    {
      question: `Wat kost een airco laten installeren in ${loc.city}?`,
      answer: `Een complete installatie start vanaf € 1.299 (een basis single-split met 2,5 kW-model, inclusief montage). De exacte prijs in ${loc.city} hangt af van uw woning en het gekozen model. U ontvangt altijd een vrijblijvende offerte op maat.`,
    },
    {
      question: `Welke merken airco installeren jullie in ${loc.city}?`,
      answer: `Wij installeren airco's van Daikin, LG en AUX: betrouwbare merken met een goede prijs-kwaliteitverhouding en langdurige garantie. Samen kiezen we het model dat het beste past bij uw woning in ${loc.city}.`,
    },
  ];
}
