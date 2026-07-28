# Engelse versie van de website

Datum: 28 juli 2026
Status: goedgekeurd, klaar voor implementatieplan

## Aanleiding

Een Engelstalige klant nam contact op via de website. De regio Eindhoven kent
een grote expatpopulatie (ASML, Philips, TU/e) die in het Engels zoekt naar
diensten. Concurrenten hebben zelden een Engelse site, dus hier ligt een
onbenutte markt.

## Doel en niet-doel

**Doel**

- Engelstalige zoekers bereiken via Google, dus indexeerbare Engelse pagina's.
- Engelstalige bezoekers die de site al vinden, in hun eigen taal verder helpen.
- De Nederlandse site volledig ongewijzigd laten presteren.

**Expliciet geen doel**

- Een JavaScript-taalknop die teksten omwisselt. Die is onzichtbaar voor Google
  en levert dus geen Engels zoekverkeer op. Afgewezen tijdens het ontwerp.
- De 68 merk- en modelpagina's vertalen. Dat zijn vooral specificatietabellen
  met taalneutrale cijfers, en merk- en modelnamen zijn identiek in beide talen.
  Later te overwegen als de Engelse pagina's aanslaan.
- Andere talen dan Engels.

## Gekozen aanpak

Expliciete Engelse paginabestanden onder `src/pages/en/` met Engelse slugs, plus
één centrale routekaart die de Nederlandse en Engelse tegenhangers aan elkaar
koppelt. Die routekaart is de enige bron van waarheid voor zowel de taalknop als
de hreflang-tags.

Afgewogen alternatieven:

- **Losse Engelse pagina's zonder vertaallaag.** Afgewezen: de 16 gedeelde
  componenten bevatten Nederlandse tekst, dus dat probleem blijft bestaan.
- **Volledige `t()`-abstractie over alle componenten.** Afgewezen: verbouwing van
  alle componenten met risico voor de live Nederlandse site, en overkill voor
  15 pagina's.

## URL-structuur

Nederlands blijft exact ongewijzigd. Engels krijgt Engelse slugs, omdat daar in
het Engels op gezocht wordt.

| Nederlands | Engels |
| --- | --- |
| `/` | `/en/` |
| `/hoe-het-werkt` | `/en/how-it-works` |
| `/over-ons` | `/en/about-us` |
| `/contact` | `/en/contact` |
| `/airco-installatie` | `/en/air-conditioning-installation` |
| `/airco-onderhoud` | `/en/air-conditioning-maintenance` |
| `/airco-installatie-noord-brabant` | `/en/air-conditioning-installation-noord-brabant` |
| `/airco-installatie-<plaats>` (8×) | `/en/air-conditioning-installation-<plaats>` (8×) |

De plaats-slugs blijven gelijk (`best`, `eindhoven`, `veldhoven`, `oirschot`,
`sint-oedenrode`, `boxtel`, `tilburg`, `den-bosch`). Totaal 15 Engelse pagina's.

## Bestandsstructuur

```
src/i18n/routes.ts          Routekaart nl <-> en, single source of truth
src/i18n/ui.ts              Engelse teksten voor gedeelde UI (nav, footer, knoppen)
src/data/locations-en.ts    Engelse plaatscontent (zelfde slugs als NL)
src/data/faq-en.ts          Engelse FAQ, inclusief expat-vragen
src/pages/en/index.astro
src/pages/en/how-it-works.astro
src/pages/en/about-us.astro
src/pages/en/contact.astro
src/pages/en/air-conditioning-installation.astro
src/pages/en/air-conditioning-maintenance.astro
src/pages/en/air-conditioning-installation-noord-brabant.astro
src/pages/en/air-conditioning-installation-[stad].astro
```

Gedeelde componenten (`Header`, `Footer`, `CTASection`, `Hero`, `USPGrid`,
`PageHero`, `ContactForm`, `FaqAccordion`, `JourneyPreview`) krijgen een
optionele `lang`-prop die standaard `'nl'` is. Zo blijft elk bestaand
Nederlands gebruik werken zonder aanpassing.

## hreflang en canonical

`BaseLayout` krijgt een optionele `lang`-prop (standaard `'nl'`) en zet:

- `<html lang="nl">` of `<html lang="en">`
- `<link rel="canonical">` naar de eigen URL (ongewijzigd gedrag voor NL)
- `<link rel="alternate" hreflang="nl">` naar de Nederlandse tegenhanger
- `<link rel="alternate" hreflang="en">` naar de Engelse tegenhanger
- `<link rel="alternate" hreflang="x-default">` naar de Nederlandse versie
- `og:locale` `nl_NL` of `en_US`

De tegenhangers komen uit `src/i18n/routes.ts`. Pagina's zonder tegenhanger
(bijvoorbeeld de merkpagina's) krijgen geen hreflang-tags.

## Taalknop

In de header, zichtbaar op desktop en in het mobiele menu. Toont `NL | EN` met
de actieve taal gemarkeerd. De knop linkt naar de **equivalente** pagina via de
routekaart, niet naar de homepage. Staat een bezoeker op
`/airco-installatie-eindhoven`, dan gaat EN naar
`/en/air-conditioning-installation-eindhoven`.

Bestaat er geen tegenhanger voor de huidige pagina, dan linkt de knop naar de
homepage van de andere taal.

Geen automatische taaldetectie op basis van browsertaal: dat geeft
onvoorspelbare redirects en kan indexering verstoren.

## Inhoud

Feiten zijn identiek aan de Nederlandse site en komen uit `src/data/site.ts`:

- Vanaf-prijs € 1.249, inclusief btw en montage (basis single-split 2,5 kW)
- Merken: Daikin, LG, AUX
- Garantie: 2 tot 5 jaar fabrieksgarantie afhankelijk van het merk, plus 2 jaar
  op de installatie mits jaarlijks onderhoud door een vakman
- Reactie binnen 24 uur
- Werkgebied: de 8 plaatsen en heel Noord-Brabant
- Onderhoud alleen op door onszelf geplaatste airco's, geen losse reparatie
- KVK 84577878, btw NL003984507B22

### Expat-FAQ

Op de Engelse pagina's, met `FAQPage`-schema. Bevestigd door Best Aircotechniek:

- **Do you speak English?** Ja, ook tijdens het adviesgesprek en de montage.
- **I rent my home, can I still have air conditioning installed?** Ja, mits de
  verhuurder of VvE toestemming geeft.
- **Can you invoice my employer or company?** Ja, factuur op bedrijfsnaam is
  mogelijk.

Plus de standaardvragen (prijs, merken, garantie, werkgebied, doorlooptijd) in
het Engels.

**Niet claimen:** dat Best Aircotechniek VvE- of verhuurderaanvragen begeleidt
of documentatie daarvoor levert. Dat is tijdens het ontwerp expliciet niet
bevestigd.

## Structured data

`LocalBusinessSchema` blijft één keer per pagina staan, met een Engelse
`description` op Engelse pagina's. `FaqSchema` gebruikt de Engelse FAQ.
`aggregateRating` en `sameAs` blijven ongewijzigd, want die zijn taalneutraal.

## Reviews blijven Nederlands

De drie klantreviews zijn echte citaten en worden **niet vertaald**. Op de
Engelse pagina's zijn de omliggende teksten Engels (kop, sterrenlabel, knoppen)
maar staat de reviewtekst in het origineel. Vertaalde citaten zijn misleidend en
schaden de geloofwaardigheid. Wel een korte Engelse aanduiding erbij dat de
reviews in het Nederlands zijn achtergelaten door klanten uit de regio.

## Sitemap

De Astro sitemap-integratie pakt de nieuwe pagina's automatisch op. Verwachting:
87 URL's nu, 102 na oplevering.

## Contactformulier

Engelse labels en foutmeldingen. Het verborgen `subject`-veld van Web3Forms
krijgt op de Engelse pagina een aanduiding dat het een Engelse aanvraag is,
zodat er in het Engels teruggemaild wordt. Dezelfde Web3Forms-sleutel.

## Wat ongewijzigd blijft

- Alle Nederlandse URL's, teksten, titels, meta en canonicals
- De 68 merk- en modelpagina's (blijven Nederlands, wel gelinkt vanaf de Engelse
  installatiepagina)
- De brochures (Nederlands)
- `/downloads` (Nederlands, geen Engelse tegenhanger)
- De deploy-workflow

## Risico's

- **Dubbele content.** Ondervangen met hreflang plus zelfstandige canonicals.
- **Regressie op de Nederlandse site.** Ondervangen doordat elke component- en
  layout-prop standaard `'nl'` is, zodat bestaand gebruik ongemoeid blijft.
  Verificatie vergelijkt de Nederlandse build voor en na.
- **Halfvertaalde pagina's.** Ondervangen door een build-check die faalt als een
  Engelse pagina geen hreflang-paar heeft.

## Acceptatiecriteria

1. `npm run build` slaagt en genereert 102 URL's in de sitemap.
2. Alle 15 Engelse pagina's geven HTTP 200 en hebben `<html lang="en">`.
3. Elke Engelse pagina heeft hreflang naar zijn Nederlandse tegenhanger en
   omgekeerd, plus `x-default` naar Nederlands.
4. De taalknop op `/airco-installatie-eindhoven` linkt naar
   `/en/air-conditioning-installation-eindhoven`, en omgekeerd.
5. Geen Nederlandse interfacetekst meer op Engelse pagina's, gecontroleerd op de
   gedeelde componenten (header, footer, knoppen, formulier). De reviewcitaten
   zijn hierop de bewuste uitzondering.
6. Op de Nederlandse pagina's zijn de enige verschillen ten opzichte van de
   huidige build de toegevoegde hreflang-tags en de taalknop. Alle overige
   inhoud, titels en meta zijn ongewijzigd, te controleren met een HTML-diff.
7. De Engelse homepage en installatiepagina noemen de prijs vanaf € 1.249
   inclusief btw en montage.
