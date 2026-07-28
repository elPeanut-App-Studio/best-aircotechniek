# Engelse versie van de website: implementatieplan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 15 indexeerbare Engelse pagina's onder `/en/` toevoegen met hreflang en een taalknop, zonder de bestaande Nederlandse site te wijzigen.

**Architecture:** Eén centrale routekaart (`src/i18n/routes.ts`) koppelt Nederlandse en Engelse paden aan elkaar en is de enige bron voor zowel de hreflang-tags als de taalknop. Gedeelde componenten krijgen een optionele `lang`-prop met default `'nl'`, zodat elk bestaand Nederlands gebruik ongewijzigd blijft werken. Engelse teksten staan in `src/i18n/ui.ts` (interface) en in `src/data/*-en.ts` (pagina-inhoud).

**Tech Stack:** Astro 5 (static), Tailwind CSS, TypeScript, `@astrojs/sitemap`. Deploy via GitHub Actions naar Netlify.

## Global Constraints

- Er is **geen testrunner** in dit project. De verificatiecyclus per taak is: `npm run build`, daarna een `grep`-assertie op de gegenereerde HTML in `dist/`. Een taak is pas klaar als de assertie slaagt.
- De Nederlandse site mag niet inhoudelijk wijzigen. Elke nieuwe prop op een bestaand component of layout krijgt default `'nl'`.
- Feiten zijn identiek aan de Nederlandse site en komen uit `src/data/site.ts`: vanaf-prijs `site.priceFrom` (€ 1.249, incl. btw en montage), merken Daikin/LG/AUX, 2 tot 5 jaar fabrieksgarantie afhankelijk van het merk plus 2 jaar op de installatie mits jaarlijks onderhoud, reactie binnen 24 uur, werkgebied 8 plaatsen in Noord-Brabant, onderhoud alleen op zelf geplaatste airco's, KVK 84577878, btw NL003984507B22.
- Bevestigde expat-feiten die gebruikt mogen worden: Engels op locatie, factuur op bedrijfsnaam mogelijk, huurwoningen mits toestemming verhuurder of VvE.
- **Niet claimen** dat Best Aircotechniek VvE- of verhuurderaanvragen begeleidt of documentatie levert.
- Klantreviews worden **niet vertaald**. Alleen de omliggende interfacetekst wordt Engels.
- Geen em-dashes in de teksten op de site.
- Alle nieuwe Engelse pagina's gebruiken `lang="en"` op `BaseLayout`.
- Astro zet de drie hreflang-tags op **één regel**. Tel dus met `grep -o ... | wc -l` en niet met `grep -c`, anders lijkt het resultaat altijd 1.

---

### Task 1: Routekaart en hreflang

**Files:**
- Create: `src/i18n/routes.ts`
- Modify: `src/layouts/BaseLayout.astro` (Props-interface, frontmatter, `<html>`, `<head>`)

**Interfaces:**
- Consumes: `locations` uit `src/data/locations.ts`, `site` uit `src/data/site.ts`
- Produces:
  - `type Lang = 'nl' | 'en'`
  - `routePairs: Record<string, string>` (nl-pad → en-pad)
  - `normalizePath(pathname: string): string`
  - `counterpart(pathname: string): { lang: Lang; path: string } | null`
  - `langFromPath(pathname: string): Lang`
  - `BaseLayout` accepteert `lang?: Lang` met default `'nl'`

- [ ] **Step 1: Schrijf de falende assertie**

Er bestaat nog geen hreflang. Leg de check vast die straks moet slagen:

```bash
cd /Users/drerrie/.claude/jobs/cfe46854/tmp/best-aircotechniek
npm run build >/dev/null 2>&1
grep -o 'rel="alternate" hreflang' dist/index.html | wc -l
```

Verwacht nu: `0`

- [ ] **Step 2: Maak de routekaart**

Create `src/i18n/routes.ts`:

```ts
import { locations } from '../data/locations';

export type Lang = 'nl' | 'en';

/** Vaste paginaparen: Nederlands pad -> Engels pad. */
const staticPairs: Record<string, string> = {
  '/': '/en/',
  '/hoe-het-werkt': '/en/how-it-works',
  '/over-ons': '/en/about-us',
  '/contact': '/en/contact',
  '/airco-installatie': '/en/air-conditioning-installation',
  '/airco-onderhoud': '/en/air-conditioning-maintenance',
  '/airco-installatie-noord-brabant': '/en/air-conditioning-installation-noord-brabant',
};

/**
 * Alle paginaparen, inclusief de 8 plaatspagina's. Dit is de enige bron van
 * waarheid voor de taalknop en de hreflang-tags.
 */
export const routePairs: Record<string, string> = {
  ...staticPairs,
  ...Object.fromEntries(
    locations.map((loc) => [
      `/airco-installatie-${loc.slug}`,
      `/en/air-conditioning-installation-${loc.slug}`,
    ]),
  ),
};

const enToNl: Record<string, string> = Object.fromEntries(
  Object.entries(routePairs).map(([nl, en]) => [en, nl]),
);

/** Haalt de trailing slash weg, behalve bij de twee homepages. */
export function normalizePath(pathname: string): string {
  if (pathname === '/' || pathname === '/en/') return pathname;
  return pathname.replace(/\/$/, '');
}

/** Geeft de tegenhanger in de andere taal, of null als die niet bestaat. */
export function counterpart(pathname: string): { lang: Lang; path: string } | null {
  const p = normalizePath(pathname);
  if (routePairs[p]) return { lang: 'en', path: routePairs[p] };
  if (enToNl[p]) return { lang: 'nl', path: enToNl[p] };
  return null;
}

export function langFromPath(pathname: string): Lang {
  return normalizePath(pathname) === '/en/' || pathname.startsWith('/en/') ? 'en' : 'nl';
}
```

- [ ] **Step 3: Breid BaseLayout uit met lang en hreflang**

Modify `src/layouts/BaseLayout.astro`. Voeg bovenaan de import toe:

```ts
import { counterpart, normalizePath, type Lang } from '../i18n/routes';
```

Vervang de Props-interface en de destructurering door:

```ts
interface Props {
  /**
   * Volledige, SEO-geoptimaliseerde paginatitel. Bevat de titel bij voorkeur
   * al de merknaam; zo niet, dan wordt `| Best Aircotechniek` automatisch
   * toegevoegd. Houd titels onder ~60 tekens voor volledige weergave in Google.
   */
  title: string;
  description?: string;
  /** Taal van de pagina. Default 'nl', zodat bestaande pagina's ongewijzigd blijven. */
  lang?: Lang;
}

const { title, description = site.description, lang = 'nl' } = Astro.props;
```

Voeg daaronder toe:

```ts
// Tegenhanger in de andere taal, voor hreflang. Null = geen paar, geen tags.
const selfPath = normalizePath(Astro.url.pathname);
const pair = counterpart(Astro.url.pathname);
const nlHref = lang === 'nl' ? selfPath : (pair?.path ?? null);
const enHref = lang === 'en' ? selfPath : (pair?.path ?? null);
const hasPair = Boolean(nlHref && enHref);
```

Wijzig `<html lang="nl">` naar:

```astro
<html lang={lang}>
```

Wijzig de `og:locale`-regel naar:

```astro
<meta property="og:locale" content={lang === 'en' ? 'en_US' : 'nl_NL'} />
```

Voeg direct na de bestaande `<link rel="canonical" ... />` toe:

```astro
{
  hasPair && (
    <>
      <link rel="alternate" hreflang="nl" href={new URL(nlHref!, site.url).href} />
      <link rel="alternate" hreflang="en" href={new URL(enHref!, site.url).href} />
      <link rel="alternate" hreflang="x-default" href={new URL(nlHref!, site.url).href} />
    </>
  )
}
```

- [ ] **Step 4: Bouw en verifieer**

```bash
npm run build >/dev/null 2>&1 && echo BUILD_OK
echo "hreflang op home: $(grep -o 'rel="alternate" hreflang' dist/index.html | wc -l)"
grep -oE '<link rel="alternate" hreflang="[a-z-]+" href="[^"]*"' dist/index.html
echo "html lang: $(grep -oE '<html lang="[a-z]+"' dist/index.html)"
echo "merkpagina zonder paar (moet 0 zijn): $(grep -c 'hreflang' dist/merken/aux/index.html)"
```

Verwacht: `BUILD_OK`, `hreflang op home: 3`, drie alternate-regels met `nl`, `en` en `x-default`, `<html lang="nl"`, en `0` op de merkpagina.

- [ ] **Step 5: Verifieer dat de Nederlandse inhoud niet is veranderd**

```bash
grep -oE '<title>[^<]*</title>' dist/index.html
grep -oE '<meta name="description"[^>]*>' dist/index.html | head -1
grep -c 'priceFrom\|1\.249' dist/index.html
```

Verwacht: titel `Airco installatie Noord-Brabant vanaf € 1.249 | Best Aircotechniek`, de bestaande description, en een positief aantal voor de prijs.

- [ ] **Step 6: Commit**

```bash
git add src/i18n/routes.ts src/layouts/BaseLayout.astro
git commit -m "i18n: routekaart en hreflang-tags in BaseLayout"
```

---

### Task 2: Interfaceteksten, lang-props en taalknop

**Files:**
- Create: `src/i18n/ui.ts`
- Modify: `src/components/Header.astro`, `src/components/Footer.astro`, `src/components/CTASection.astro`, `src/components/Hero.astro`, `src/components/USPGrid.astro`

**Interfaces:**
- Consumes: `Lang`, `counterpart`, `normalizePath` uit `src/i18n/routes.ts`
- Produces:
  - `ui: Record<Lang, UiStrings>` en `t(lang: Lang): UiStrings`
  - `navFor(lang: Lang)` en `dienstenNavFor(lang: Lang)`: taalspecifieke navigatielijsten
  - Alle vijf genoemde componenten accepteren `lang?: Lang` met default `'nl'`

- [ ] **Step 1: Schrijf de falende assertie**

```bash
npm run build >/dev/null 2>&1
grep -c 'aria-label="Switch to English"' dist/index.html
```

Verwacht nu: `0`

- [ ] **Step 2: Maak het tekstenbestand**

Create `src/i18n/ui.ts`:

```ts
import type { Lang } from './routes';
import { locations } from '../data/locations';

export const ui = {
  nl: {
    siteDescription:
      'Best Aircotechniek. Altijd het beste klimaat. Vakkundige montage, persoonlijk advies en snelle service voor particulieren en bedrijven.',
    navHome: 'Home',
    navHowItWorks: 'Hoe het werkt',
    navServiceArea: 'Werkgebied',
    navAbout: 'Over ons',
    navContact: 'Contact',
    ctaContact: 'Neem contact met ons op',
    ctaQuote: 'Vraag een offerte aan',
    navigationHeading: 'Navigatie',
    servicesHeading: 'Diensten',
    contactHeading: 'Contact',
    serviceAreaLabel: 'Werkgebied',
    languageLabel: 'Taal',
    switchLabel: 'Schakel naar Engels',
    priceLead: 'Complete installatie',
    priceSuffix: 'inclusief btw en montage',
    reviewsNote: '',
  },
  en: {
    siteDescription:
      'Best Aircotechniek installs air conditioning across Noord-Brabant. Expert installation, personal advice and fast service for homes and businesses. We speak English.',
    navHome: 'Home',
    navHowItWorks: 'How it works',
    navServiceArea: 'Service area',
    navAbout: 'About us',
    navContact: 'Contact',
    ctaContact: 'Get in touch',
    ctaQuote: 'Request a quote',
    navigationHeading: 'Navigation',
    servicesHeading: 'Services',
    contactHeading: 'Contact',
    serviceAreaLabel: 'Service area',
    languageLabel: 'Language',
    switchLabel: 'Switch to English',
    priceLead: 'Complete installation',
    priceSuffix: 'including VAT and installation',
    reviewsNote: 'Our customers left these reviews in Dutch.',
  },
} as const;

export type UiStrings = (typeof ui)['nl'];

export function t(lang: Lang): UiStrings {
  return ui[lang] as UiStrings;
}

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
      { href: '/en/air-conditioning-installation-noord-brabant', label: 'Service area Noord-Brabant' },
    ];
  }
  return [
    { href: '/airco-installatie', label: 'Airco installatie' },
    { href: '/airco-onderhoud', label: 'Airco onderhoud' },
    { href: '/airco-installatie-noord-brabant', label: 'Werkgebied Noord-Brabant' },
    { href: '/downloads', label: 'Brochures & downloads' },
  ];
}

/** Engelse plaatsnamen zijn gelijk aan de Nederlandse. */
export const cityNames = locations.map((l) => l.city);
```

- [ ] **Step 3: Voeg de taalknop en lang-prop toe aan Header**

Modify `src/components/Header.astro`. Vervang de frontmatter door:

```ts
import { site } from '../data/site';
import Logo from './Logo.astro';
import { counterpart, type Lang } from '../i18n/routes';
import { navFor, t } from '../i18n/ui';

interface Props {
  lang?: Lang;
}

const { lang = 'nl' } = Astro.props;
const { pathname } = Astro.url;
const nav = navFor(lang);
const strings = t(lang);

// Tegenhanger voor de taalknop. Zonder paar linken we naar de homepage.
const pair = counterpart(pathname);
const otherLang: Lang = lang === 'nl' ? 'en' : 'nl';
const otherHref = pair?.path ?? (otherLang === 'en' ? '/en/' : '/');
const homeHref = lang === 'en' ? '/en/' : '/';
```

Wijzig de logo-link `href="/"` naar `href={homeHref}`.

Voeg in de desktopnavigatie, direct vóór de bestaande contact-knop, toe:

```astro
<span class="flex items-center gap-1 text-sm font-semibold" aria-label={strings.languageLabel}>
  <span class:list={[lang === 'nl' ? 'text-brand-800' : 'text-slate-400']}>NL</span>
  <span class="text-slate-300" aria-hidden="true">|</span>
  <a
    href={otherHref}
    hreflang={otherLang}
    aria-label={otherLang === 'en' ? 'Switch to English' : 'Schakel naar Nederlands'}
    class:list={[lang === 'en' ? 'text-brand-800' : 'text-slate-400 hover:text-brand-800']}
  >
    EN
  </a>
</span>
```

Let op: wanneer `lang === 'en'` moet NL de link zijn en EN de actieve tekst. Gebruik daarom deze variant, die beide richtingen aankan:

```astro
<span class="flex items-center gap-1 text-sm font-semibold" aria-label={strings.languageLabel}>
  {
    lang === 'nl' ? (
      <>
        <span class="text-brand-800">NL</span>
        <span class="text-slate-300" aria-hidden="true">|</span>
        <a href={otherHref} hreflang="en" aria-label="Switch to English" class="text-slate-400 hover:text-brand-800">EN</a>
      </>
    ) : (
      <>
        <a href={otherHref} hreflang="nl" aria-label="Schakel naar Nederlands" class="text-slate-400 hover:text-brand-800">NL</a>
        <span class="text-slate-300" aria-hidden="true">|</span>
        <span class="text-brand-800">EN</span>
      </>
    )
  }
</span>
```

Vervang de tekst van de contact-knoppen (desktop en mobiel) door `{strings.ctaContact}`. Voeg dezelfde taalknop toe onderaan het mobiele menu, vóór de contact-knop.

- [ ] **Step 4: Voeg lang-props toe aan Footer, CTASection, Hero en USPGrid**

In elk van deze vier componenten: voeg `lang?: Lang` toe aan de Props met default `'nl'`, importeer `t` en waar nodig `navFor`/`dienstenNavFor`, en vervang de vaste Nederlandse koppen en knopteksten door de waarden uit `strings`.

Voor `Footer.astro` betekent dit: `nav` wordt `navFor(lang)`, `dienstenNav` wordt `dienstenNavFor(lang)`, en de drie kopteksten worden `strings.navigationHeading`, `strings.servicesHeading` en `strings.contactHeading`. De regel `Werkgebied: {site.region}` wordt `{strings.serviceAreaLabel}: {site.region}`.

Voor `Hero.astro`: de prijsregel wordt `{strings.priceLead} ... vanaf {site.priceFrom}` met `{strings.priceSuffix}` eronder, en de knop krijgt `{strings.ctaContact}`.

Voor `CTASection.astro`: de knoptekst wordt `{strings.ctaContact}`. `title` en `description` blijven props, die geeft elke pagina zelf mee.

- [ ] **Step 5: Geef lang door vanuit BaseLayout**

Modify `src/layouts/BaseLayout.astro`: geef de taal door aan Header en Footer.

```astro
<Header lang={lang} />
...
<Footer lang={lang} />
```

- [ ] **Step 6: Bouw en verifieer**

```bash
npm run build >/dev/null 2>&1 && echo BUILD_OK
echo "taalknop op NL-home: $(grep -c 'Switch to English' dist/index.html)"
echo "NL nav ongewijzigd: $(grep -oE '>Hoe het werkt<|>Werkgebied<|>Over ons<' dist/index.html | sort -u | tr '\n' ' ')"
echo "footer koppen NL: $(grep -oE 'Navigatie|Diensten' dist/index.html | sort -u | tr '\n' ' ')"
echo "prijs in hero: $(grep -oc 'Complete installatie' dist/index.html)"
```

Verwacht: `BUILD_OK`, taalknop `1`, de Nederlandse navigatie- en footerteksten onveranderd aanwezig, en de prijsregel nog steeds op de homepage.

- [ ] **Step 7: Commit**

```bash
git add src/i18n/ui.ts src/components/Header.astro src/components/Footer.astro src/components/CTASection.astro src/components/Hero.astro src/components/USPGrid.astro src/layouts/BaseLayout.astro
git commit -m "i18n: interfaceteksten, lang-props en taalknop"
```

---

### Task 3: Engelse FAQ en de vier kernpagina's

**Files:**
- Create: `src/data/faq-en.ts`, `src/pages/en/index.astro`, `src/pages/en/how-it-works.astro`, `src/pages/en/about-us.astro`, `src/pages/en/contact.astro`
- Modify: `src/components/ContactForm.astro` (lang-prop), `src/components/GoogleReviews.astro` (lang-prop)

**Interfaces:**
- Consumes: `BaseLayout` met `lang="en"`, `t()` uit `src/i18n/ui.ts`, `site` uit `src/data/site.ts`, `manualReviewsData` uit `src/data/reviews.ts`
- Produces: `generalFaqEn: FaqItem[]` en `processFaqEn: FaqItem[]` uit `src/data/faq-en.ts`

- [ ] **Step 1: Schrijf de falende assertie**

```bash
npm run build >/dev/null 2>&1
ls dist/en/index.html 2>&1 | tail -1
```

Verwacht nu: een foutmelding dat het bestand niet bestaat.

- [ ] **Step 2: Maak de Engelse FAQ**

Create `src/data/faq-en.ts`:

```ts
import { site } from './site';
import type { FaqItem } from './faq';

/**
 * Engelse FAQ, aangepast voor expats in de regio Eindhoven.
 * De eerste drie vragen zijn bevestigd door Best Aircotechniek:
 * Engels op locatie, factuur op bedrijfsnaam, huurwoning mits toestemming.
 * NIET claimen dat wij VvE- of verhuurderaanvragen begeleiden.
 */
export const generalFaqEn: FaqItem[] = [
  {
    question: 'Do you speak English?',
    answer:
      'Yes. We communicate in English by phone, email and WhatsApp, and also during the home visit and the installation itself. You do not need to speak Dutch to work with us.',
  },
  {
    question: 'I rent my home. Can I still have air conditioning installed?',
    answer:
      'Yes, provided your landlord or the building association (VvE) gives permission for the installation, because an outdoor unit is mounted to the building. Once you have that permission, we take care of the rest.',
  },
  {
    question: 'Can you invoice my employer or company?',
    answer:
      'Yes. We can issue the invoice to a company name, which is useful if your air conditioning is paid for through an employer or expat arrangement. Let us know when you request your quote.',
  },
  {
    question: 'What does it cost to have air conditioning installed?',
    answer: `A complete installation starts at ${site.priceFrom}, including VAT and installation. That price is for a basic single-split system with the entry-level 2.5 kW model. The final price depends on the model, the number of rooms and the installation situation. You always receive a free quote with no obligation.`,
  },
  {
    question: 'Which brands do you install?',
    answer:
      'We install Daikin, LG and AUX. These are reliable brands with a good price-quality ratio and long manufacturer warranties. During the home visit we choose the brand and model that suits your space, wishes and budget.',
  },
  {
    question: 'What warranty do I get?',
    answer:
      'You get 2 to 5 years manufacturer warranty on the unit, depending on the brand. On top of that we give 2 years warranty on the installation, on the condition that the system is serviced annually by a professional.',
  },
  {
    question: 'Which areas do you cover?',
    answer:
      'We install air conditioning throughout Noord-Brabant, including Best, Eindhoven, Veldhoven, Oirschot, Sint-Oedenrode, Boxtel, Tilburg and Den Bosch. Just outside this area? Get in touch, we can often still help.',
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
      'A standard single-split system is usually installed within one working day. For multiple indoor units we schedule extra time and discuss this with you in advance.',
  },
  {
    question: 'Do you help after the installation?',
    answer:
      'Yes. After handover we remain your point of contact for questions, and we can take care of the annual maintenance on systems we installed.',
  },
];
```

- [ ] **Step 3: Maak ContactForm en GoogleReviews taalbewust**

Modify `src/components/ContactForm.astro`: voeg `lang?: Lang` toe met default `'nl'`, en zet de labels, placeholders, de verzendknop en de bedanktekst in het Engels wanneer `lang === 'en'`. Zet het verborgen Web3Forms-veld `subject` op `New EN request via best-aircotechniek.nl` bij Engels, zodat in de mailbox zichtbaar is dat er in het Engels teruggemaild moet worden.

Modify `src/components/GoogleReviews.astro`: voeg `lang?: Lang` toe met default `'nl'`. Zet de kop, de subkop, het sterrenlabel en de twee knoppen in het Engels bij `lang === 'en'`. Laat de **reviewteksten zelf ongewijzigd** en toon bij Engels de regel uit `strings.reviewsNote` onder de kop.

- [ ] **Step 4: Maak de vier kernpagina's**

Create `src/pages/en/index.astro`. Neem de structuur van `src/pages/index.astro` over en geef alle componenten `lang="en"` mee. Gebruik:

- `title`: `` `Air conditioning installation Noord-Brabant from ${site.priceFrom} | Best Aircotechniek` ``
- `description`: `` `Air conditioning installed from ${site.priceFrom} including VAT and installation. Expert installation, personal advice and fast service across Noord-Brabant. We speak English.` ``
- `<Hero lang="en" title="Air conditioning, installed properly" subtitle="Cooling in summer, heating in winter. Expert installation across Noord-Brabant, and we speak English." />`
- Merkensectie: kop `Brands we install`, met links naar de bestaande Nederlandse merkpagina's (`/merken/daikin` etc.) en de tekst `Product details are available in Dutch.`
- Vertrouwensblok: kop `Trusted across Noord-Brabant`, met een link naar `/en/air-conditioning-installation-noord-brabant`
- `<GoogleReviews lang="en" />`
- FAQ-sectie met `generalFaqEn` en `<FaqSchema items={generalFaqEn} />`
- `<CTASection lang="en" title="Ready for the best climate?" description="Request a free quote or advice. We respond within 24 hours." />`

Create `src/pages/en/how-it-works.astro`, `src/pages/en/about-us.astro` en `src/pages/en/contact.astro` volgens hetzelfde patroon, met:

- how-it-works: `title` `` `How we install your air conditioning | Best Aircotechniek` ``, zes stappen in het Engels, `processFaqEn` in de FAQ-sectie
- about-us: `title` `About us: air conditioning specialist in Noord-Brabant | Best Aircotechniek`, met het werkgebiedblok dat linkt naar de Engelse plaatspagina's
- contact: `title` `` `Contact and free quote | Best Aircotechniek` ``, met `<ContactForm lang="en" />`, de contactgegevens uit `site`, en de regel `We speak English.`

- [ ] **Step 5: Bouw en verifieer**

```bash
npm run build >/dev/null 2>&1 && echo BUILD_OK
for p in "" how-it-works about-us contact; do
  f="dist/en/${p:+$p/}index.html"
  echo "$f -> lang=$(grep -oE '<html lang="[a-z]+"' "$f") hreflang=$(grep -c hreflang "$f")"
done
echo "expat-FAQ in schema: $(grep -oc 'Do you speak English' dist/en/index.html)"
echo "reviews onvertaald: $(grep -oc 'Vandaag is de airco' dist/en/index.html)"
echo "geen NL-nav op EN: $(grep -oc '>Hoe het werkt<' dist/en/index.html)"
```

Verwacht: `BUILD_OK`, voor elke pagina `<html lang="en"` en `hreflang` gelijk aan 3, de expat-vraag aanwezig, de Nederlandse reviewtekst aanwezig (`1`), en geen Nederlandse navigatie (`0`).

- [ ] **Step 6: Commit**

```bash
git add src/data/faq-en.ts src/pages/en src/components/ContactForm.astro src/components/GoogleReviews.astro
git commit -m "en: FAQ voor expats en de vier kernpagina's"
```

---

### Task 4: Engelse dienstpagina's

**Files:**
- Create: `src/pages/en/air-conditioning-installation.astro`, `src/pages/en/air-conditioning-maintenance.astro`

**Interfaces:**
- Consumes: `BaseLayout` met `lang="en"`, `site`, `brands` uit `src/data/brands.ts`
- Produces: geen nieuwe exports

- [ ] **Step 1: Schrijf de falende assertie**

```bash
ls dist/en/air-conditioning-installation/index.html 2>&1 | tail -1
```

Verwacht nu: bestaat niet.

- [ ] **Step 2: Maak de installatiepagina**

Create `src/pages/en/air-conditioning-installation.astro`, structuur van `src/pages/airco-installatie.astro`, met:

- `title`: `` `Air conditioning installation from ${site.priceFrom} | Best Aircotechniek` ``
- `description`: `` `Have air conditioning installed by Best Aircotechniek from ${site.priceFrom} including VAT and installation. Single and multi-split from Daikin, LG and AUX, across Noord-Brabant.` ``
- Twee typen: `Single-split` (`One indoor unit connected to one outdoor unit. Ideal for cooling and heating a single room such as a living room or bedroom. A complete installation starts at ${site.priceFrom}.`) en `Multi-split` (`Several indoor units on one outdoor unit. The solution if you want comfortable cooling and heating in multiple rooms with a single neat outdoor unit.`)
- Inbegrepen-lijst in het Engels: `Home visit and advice on capacity, type and placement`, `Supply of the unit from a reliable brand`, `Expert installation of indoor and outdoor unit`, `Connecting, vacuuming and testing the system`, `Explanation of the controls and maintenance`
- Werkgebiedblok met link naar `/en/air-conditioning-installation-noord-brabant`
- FAQ met de installatie-gerelateerde vragen uit `generalFaqEn` (prijs, merken, garantie, snelheid) plus `<FaqSchema>`
- Link naar de Nederlandse merkpagina's met de tekst `Product specifications are available in Dutch.`

- [ ] **Step 3: Maak de onderhoudspagina**

Create `src/pages/en/air-conditioning-maintenance.astro`, structuur van `src/pages/airco-onderhoud.astro`, met:

- `title`: `Air conditioning maintenance | Best Aircotechniek`
- `description`: `Air conditioning maintenance by Best Aircotechniek for systems we installed ourselves. Keep your system efficient and hygienic and your warranty valid. Active across Noord-Brabant.`
- Vier voordelen in het Engels: `Efficient and economical`, `Hygienic and healthy`, `Keeps your warranty valid`, `Longer lifespan`
- Expliciet de scope: `We service the systems we installed ourselves, so we know your installation. We do not take on repairs of units installed by others.`
- FAQ met drie Engelse onderhoudsvragen plus `<FaqSchema>`

- [ ] **Step 4: Bouw en verifieer**

```bash
npm run build >/dev/null 2>&1 && echo BUILD_OK
for p in air-conditioning-installation air-conditioning-maintenance; do
  f="dist/en/$p/index.html"
  echo "$p -> lang=$(grep -oE '<html lang="[a-z]+"' "$f") hreflang=$(grep -c hreflang "$f") prijs=$(grep -oc '1\.249' "$f")"
done
echo "scope onderhoud expliciet: $(grep -oc 'installed by others' dist/en/air-conditioning-maintenance/index.html)"
```

Verwacht: `BUILD_OK`, beide `lang="en"` met `hreflang: 3`, prijs aanwezig op de installatiepagina, en de scope-regel op de onderhoudspagina.

- [ ] **Step 5: Commit**

```bash
git add src/pages/en/air-conditioning-installation.astro src/pages/en/air-conditioning-maintenance.astro
git commit -m "en: dienstpagina's installatie en onderhoud"
```

---

### Task 5: Engelse regiopagina en de acht plaatspagina's

**Files:**
- Create: `src/data/locations-en.ts`, `src/pages/en/air-conditioning-installation-noord-brabant.astro`, `src/pages/en/air-conditioning-installation-[stad].astro`

**Interfaces:**
- Consumes: `locations` uit `src/data/locations.ts` (voor de slugs), `site`, `brands`
- Produces:
  - `locationsEn: LocationEn[]` met velden `slug`, `city`, `metaDescription`, `heroDescription`, `intro: string[]`, `nearby: string[]`
  - `buildLocationFaqEn(loc: LocationEn): FaqItem[]`

- [ ] **Step 1: Schrijf de falende assertie**

```bash
ls -d dist/en/air-conditioning-installation-*/ 2>/dev/null | wc -l
```

Verwacht nu: `0`

- [ ] **Step 2: Maak de Engelse locatiedata**

Create `src/data/locations-en.ts`. Gebruik dezelfde slugs als `locations`, zodat de routekaart klopt. Per plaats een eigen Engelse intro die de wijken noemt uit de Nederlandse versie, plus een `metaDescription` van circa 150 tekens met de plaatsnaam en de prijs. Voor Eindhoven bijvoorbeeld:

```ts
import { site } from './site';
import type { FaqItem } from './faq';

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
    slug: 'eindhoven',
    city: 'Eindhoven',
    metaDescription: `Air conditioning installation in Eindhoven from ${site.priceFrom}. Expert installation in Woensel, Strijp, Tongelre and beyond. We speak English.`,
    heroDescription: 'Expert air conditioning installation across Eindhoven, from Woensel to Meerhoven.',
    intro: [
      'In Eindhoven we install air conditioning across the whole city, from the 1930s houses in Woensel, Stratum and Tongelre to the newer homes in Strijp and Meerhoven. Every type of property needs its own approach, and we are happy to think that through with you.',
      'Eindhoven has warm, urban summers and indoor temperatures can climb quickly. An efficient system from a reliable brand keeps your home comfortable without a high energy bill. Many of our customers here are internationals, so we handle everything in English.',
    ],
    nearby: ['Woensel', 'Strijp', 'Tongelre', 'Gestel', 'Stratum', 'Meerhoven'],
  },
  // ... zeven overige plaatsen volgens hetzelfde patroon:
  // best, veldhoven, oirschot, sint-oedenrode, boxtel, tilburg, den-bosch
];

/** Plaatsspecifieke Engelse FAQ, zodat elke pagina eigen FAQPage-schema heeft. */
export function buildLocationFaqEn(loc: LocationEn): FaqItem[] {
  const nearbyText = loc.nearby.slice(0, 3).join(', ');
  return [
    {
      question: `Do you install air conditioning in ${loc.city}?`,
      answer: `Yes. Best Aircotechniek installs air conditioning in ${loc.city} and nearby areas such as ${nearbyText}. We visit you for tailored advice and handle the complete installation, in English if you prefer.`,
    },
    {
      question: `What does air conditioning cost in ${loc.city}?`,
      answer: `A complete installation starts at ${site.priceFrom}, including VAT and installation, for a basic single-split with the 2.5 kW model. The exact price in ${loc.city} depends on your home and the model you choose. You always receive a free quote.`,
    },
    {
      question: `Which brands do you install in ${loc.city}?`,
      answer: `We install Daikin, LG and AUX in ${loc.city}: reliable brands with a good price-quality ratio and long manufacturer warranties.`,
    },
    {
      question: `I rent my home in ${loc.city}. Is installation possible?`,
      answer: `Yes, as long as your landlord or building association gives permission, because the outdoor unit is mounted to the building. Once you have that permission we can go ahead.`,
    },
  ];
}
```

Vul de overige zeven plaatsen in met eigen Engelse tekst, gebaseerd op de wijken en kenmerken uit `src/data/locations.ts`. Geen letterlijke herhaling tussen plaatsen, want dan wordt het dunne content.

- [ ] **Step 3: Maak de Engelse plaatspagina's**

Create `src/pages/en/air-conditioning-installation-[stad].astro`, structuur van `src/pages/airco-installatie-[stad].astro`, met:

```ts
export function getStaticPaths() {
  return locationsEn.map((loc) => ({ params: { stad: loc.slug }, props: { loc } }));
}
```

- `title`: `` `Air conditioning installation ${loc.city} from ${site.priceFrom} | Best Aircotechniek` ``
- Kruimelpad naar `/en/air-conditioning-installation-noord-brabant`
- Feitenblok: `Price` (`from ${site.priceFrom}`, `basic single-split, incl. VAT and installation`), `Brands` (`Daikin · LG · AUX`), `Warranty` (`2 to 5 years`, `on the unit, by brand`), `Response` (`within 24 hours`)
- Aanpakblok met drie stappen in het Engels
- Merkenblok met links naar de Nederlandse merkpagina's plus `Product details in Dutch`
- Kruislinks naar de andere Engelse plaatspagina's
- FAQ met `buildLocationFaqEn(loc)` plus `<FaqSchema>`

- [ ] **Step 4: Maak de Engelse regiopagina**

Create `src/pages/en/air-conditioning-installation-noord-brabant.astro`, structuur van de Nederlandse regiopagina, met `title` `` `Air conditioning installer Noord-Brabant from ${site.priceFrom} | Best Aircotechniek` `` en kaarten naar alle acht Engelse plaatspagina's.

- [ ] **Step 5: Bouw en verifieer**

```bash
npm run build >/dev/null 2>&1 && echo BUILD_OK
echo "plaatspagina's: $(ls -d dist/en/air-conditioning-installation-*/ | grep -v noord-brabant | wc -l | tr -d ' ')"
echo "regiopagina links: $(grep -oE 'href="/en/air-conditioning-installation-[a-z-]+"' dist/en/air-conditioning-installation-noord-brabant/index.html | grep -v noord-brabant | sort -u | wc -l | tr -d ' ')"
f=dist/en/air-conditioning-installation-eindhoven/index.html
echo "eindhoven lang=$(grep -oE '<html lang=\"[a-z]+\"' $f) hreflang=$(grep -c hreflang $f) faq=$(grep -oc '\"@type\":\"Question\"' $f)"
echo "unieke content: $(grep -oc 'Woensel' $f)"
```

Verwacht: `BUILD_OK`, 8 plaatspagina's, 8 links op de regiopagina, Eindhoven met `lang="en"`, `hreflang: 3` en 4 FAQ-vragen, en de wijknaam aanwezig.

- [ ] **Step 6: Commit**

```bash
git add src/data/locations-en.ts src/pages/en/air-conditioning-installation-\[stad\].astro src/pages/en/air-conditioning-installation-noord-brabant.astro
git commit -m "en: regiopagina en acht plaatspagina's"
```

---

### Task 6: Eindverificatie en regressiecheck

**Files:**
- Modify: geen, tenzij de verificatie een fout blootlegt

**Interfaces:**
- Consumes: de volledige build
- Produces: bevestiging dat alle acceptatiecriteria uit de spec gehaald zijn

- [ ] **Step 1: Bewaar de huidige Nederlandse output als referentie**

```bash
git stash list >/dev/null
git worktree add /tmp/ba-baseline main >/dev/null 2>&1 || true
cd /tmp/ba-baseline && npm ci >/dev/null 2>&1 && npm run build >/dev/null 2>&1 && echo BASELINE_OK
cd -
```

- [ ] **Step 2: Vergelijk elke Nederlandse pagina met de referentie**

```bash
# Relatieve paden binnen dist, zodat baseline en huidige build 1-op-1 vergelijkbaar zijn.
for rel in index.html contact/index.html over-ons/index.html \
           hoe-het-werkt/index.html airco-installatie/index.html \
           airco-onderhoud/index.html airco-installatie-eindhoven/index.html; do
  echo "== $rel =="
  diff <(sed 's/></>\n</g' "/tmp/ba-baseline/dist/$rel") \
       <(sed 's/></>\n</g' "dist/$rel") \
    | grep -E '^[<>]' \
    | grep -viE 'hreflang|Switch to English|Schakel naar Nederlands' \
    | head -5
done
```

Alleen regels met `hreflang` of de taalknop mogen verschijnen. Elke andere regel is een regressie op de Nederlandse site en moet gerepareerd worden voordat je verder gaat.

Verwacht: geen output per pagina, buiten de toegevoegde hreflang- en taalknop-elementen.

- [ ] **Step 3: Controleer de acceptatiecriteria uit de spec**

```bash
echo "1. sitemap URL's: $(grep -oc '<loc>' dist/sitemap-0.xml)  (verwacht 102)"
echo "2. Engelse pagina's: $(find dist/en -name index.html | wc -l | tr -d ' ')  (verwacht 15)"
echo "3. zonder hreflang-paar:"; for f in $(find dist/en -name index.html); do [ "$(grep -c hreflang "$f")" -ne 3 ] && echo "   ONTBREEKT: $f"; done; echo "   (geen output = goed)"
echo "4. taalknop Eindhoven ->"; grep -oE 'href="/en/air-conditioning-installation-eindhoven"' dist/airco-installatie-eindhoven/index.html | head -1
echo "   en terug ->"; grep -oE 'href="/airco-installatie-eindhoven"' dist/en/air-conditioning-installation-eindhoven/index.html | head -1
echo "5. NL-interfacetekst op EN-pagina's:"; grep -rlE '>Hoe het werkt<|>Over ons<|Vraag een offerte aan|Neem contact met ons op' dist/en/ | head
echo "   (geen output = goed)"
echo "6. x-default wijst naar NL: $(grep -oE 'hreflang="x-default" href="[^\"]*"' dist/en/index.html)"
```

Verwacht: 102 URL's, 15 Engelse pagina's, geen ontbrekende hreflang, werkende taalknop in beide richtingen, geen Nederlandse interfacetekst op Engelse pagina's, en `x-default` naar de Nederlandse homepage.

- [ ] **Step 4: Ruim de referentie op**

```bash
git worktree remove /tmp/ba-baseline --force 2>/dev/null || true
```

- [ ] **Step 5: Commit en open een pull request**

De pagina's zijn in Task 1 tot 5 al gecommit. Push de branch en open de PR:

```bash
git push -u origin feat/en-site
gh pr create --base main --head feat/en-site \
  --title "Engelse versie van de website: 15 pagina's onder /en/" \
  --body "Implementeert docs/superpowers/specs/2026-07-28-engelse-site-design.md. 15 indexeerbare Engelse pagina's met Engelse slugs, hreflang in beide richtingen, taalknop die naar de equivalente pagina linkt, en een expat-FAQ. De Nederlandse site is ongewijzigd op de hreflang-tags en de taalknop na, gecontroleerd met een HTML-diff tegen main."
```

- [ ] **Step 6: Wacht de deploy af en verifieer live**

```bash
RID=$(gh run list --workflow=deploy.yml --limit 1 --json databaseId --jq '.[0].databaseId')
gh run watch "$RID" --exit-status --interval 10 >/dev/null 2>&1
echo "deploy: $(gh run view $RID --json conclusion --jq .conclusion)"
for u in en/ en/contact en/air-conditioning-installation en/air-conditioning-installation-eindhoven; do
  echo "$u -> HTTP $(curl -s -o /dev/null -w '%{http_code}' -A Mozilla/5.0 https://best-aircotechniek.nl/$u)"
done
```

Verwacht: `success` en HTTP 200 op alle vier.

---

## Zelfcontrole van dit plan

**Dekking van de spec.** Elk onderdeel van de spec is toegewezen: URL-structuur en routekaart in Task 1, hreflang in Task 1, taalknop in Task 2, interfaceteksten in Task 2, expat-FAQ in Task 3, reviews onvertaald in Task 3, contactformulier in Task 3, dienstpagina's in Task 4, regio- en plaatspagina's in Task 5, sitemapverwachting en alle zeven acceptatiecriteria in Task 6.

**Openstaand punt dat tijdens de uitvoering beslist moet worden.** De spec noemt `src/i18n/ui.ts` voor gedeelde teksten. Tijdens Task 2 blijkt of `USPGrid` en `JourneyPreview` genoeg vaste tekst bevatten om ook in `ui.ts` te horen, of dat de Engelse pagina's die inhoud beter als props meegeven. Beslis dat op basis van de werkelijke inhoud van die componenten en houd het consistent.

**Namen die over taken heen consistent moeten blijven:** `Lang`, `routePairs`, `counterpart`, `normalizePath`, `langFromPath`, `t`, `navFor`, `dienstenNavFor`, `generalFaqEn`, `processFaqEn`, `locationsEn`, `buildLocationFaqEn`. De `lang`-prop heet in elk component `lang` en heeft overal default `'nl'`.
