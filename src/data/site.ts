export const site = {
  name: 'Best Aircotechniek',
  logo: '/logo.png',
  slogan: 'Altijd het beste klimaat',
  tagline: 'Vakkundige airco-installatie voor thuis en op kantoor',
  description:
    'Best Aircotechniek. Altijd het beste klimaat. Vakkundige montage, persoonlijk advies en snelle service voor particulieren en bedrijven.',
  url: 'https://best-aircotechniek.nl',
  phone: '+31 6 45200605',
  phoneHref: '+31645200605',
  email: 'info@best-aircotechniek.nl',
  whatsapp: '31645200605',
  region: 'Noord-Brabant en omgeving',
  kvk: '84577878',
  btwId: 'NL003984507B022',
} as const;

export const serviceAreas = [
  'Best',
  'Eindhoven',
  'Veldhoven',
  'Oirschot',
  'Sint-Oedenrode',
  'Boxtel',
  'Tilburg',
  'Den Bosch',
] as const;

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/hoe-het-werkt', label: 'Hoe het werkt' },
  { href: '/over-ons', label: 'Over ons' },
  { href: '/contact', label: 'Contact' },
] as const;

export const usps = [
  {
    title: 'Vakkundige montage',
    description: 'Ervaren monteurs plaatsen uw airco netjes, veilig en volgens de regels.',
    icon: 'wrench',
  },
  {
    title: 'Advies op maat',
    description: 'Wij helpen u de juiste capaciteit en locatie te kiezen voor optimaal comfort.',
    icon: 'chat',
  },
  {
    title: 'Snelle service',
    description: 'Korte lijnen, duidelijke afspraken en snelle reactie op uw vraag.',
    icon: 'clock',
  },
  {
    title: 'Garantie & nazorg',
    description: 'Kwaliteitsproducten met garantie en onderhoud wanneer u dat nodig heeft.',
    icon: 'shield',
  },
] as const;

export const journey = [
  {
    title: 'U neemt contact op',
    description:
      'Via telefoon, WhatsApp of het contactformulier vertelt u ons over uw woning, kantoor en wensen. Wij reageren snel en denken met u mee.',
  },
  {
    title: 'Advies aan huis',
    description:
      'Wij komen langs om uw ruimte te bekijken. Zo bepalen we de juiste capaciteit, het type airco en de beste plek voor binnen- en buitenunit.',
  },
  {
    title: 'Offerte op maat',
    description:
      'U ontvangt een duidelijke offerte zonder verrassingen. Heeft u vragen? Wij leggen alles rustig uit. U beslist in uw eigen tempo.',
  },
  {
    title: 'Installatie inplannen',
    description:
      'Akkoord met de offerte? Dan plannen we de installatie op een moment dat u uitkomt. Duidelijke afspraken, geen gedoe.',
  },
  {
    title: 'Vakkundige montage',
    description:
      'Onze monteurs plaatsen uw airco veilig en volgens de regels. Netjes afgewerkt. Wij laten uw woning of pand schoon achter.',
  },
  {
    title: 'Oplevering & genieten',
    description:
      'Wij testen het systeem, leggen de bediening uit en blijven bereikbaar voor vragen. Daarna geniet u van altijd het beste klimaat.',
  },
] as const;

export const journeyIntro = {
  title: 'Van eerste contact tot koel comfort',
  description:
    'Een airco laten plaatsen hoeft niet ingewikkeld te zijn. In zes overzichtelijke stappen begeleiden wij u persoonlijk, transparant en vakkundig.',
} as const;
