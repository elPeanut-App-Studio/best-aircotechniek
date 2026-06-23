# SEO / GEO Plan — Best Aircotechniek

Doel: hoger ranken in Google én vaker genoemd worden door AI-zoekmachines
(ChatGPT, Gemini, Perplexity) voor zoekopdrachten als "airco installatie
Eindhoven", "airco laten plaatsen Noord-Brabant" en "airco installateur Best".

Uitgangssituatie (audit juni 2026): de site is technisch goed (Astro, valide
`HVACBusiness` schema, sitemap, Search Console actief), maar had slechts 4 dunne
pagina's, geen keyword-/locatiegerichte content en was nog vrijwel onvindbaar in
Google. De winst zit vooral in **content + lokale SEO**, niet in techniek.

---

## Fase 1 — On-page quick wins ✅ KLAAR (branch `seo-improvements`)

- [x] **Titelsysteem herzien** in `BaseLayout.astro` — elke pagina bepaalt nu zijn
      eigen SEO-titel (geen te lange auto-aangevulde titels meer).
- [x] **Per-pagina titels & meta descriptions** geoptimaliseerd met zoekwoorden +
      plaatsnamen (home, hoe-het-werkt, over-ons, contact).
- [x] **`og:image` + Twitter card** — gegenereerde 1200×630 afbeelding
      (`public/og-image.jpg`) voor nette previews op social media en in AI-antwoorden.
- [x] **Structured data uitgebreid** (`LocalBusinessSchema.astro`):
      `areaServed` als lijst van 8 concrete steden, `logo` + `image`, `sameAs`
      (samengevoegd uit Google Maps + socials), en optionele `openingHoursSpecification`.
- [x] **FAQ + `FAQPage` schema** — FAQ-sectie op de homepage en op "Hoe het werkt",
      met JSON-LD zodat Google rich results en AI-zoekmachines de antwoorden oppikken.
      Content staat centraal in `src/data/faq.ts`.

### ⚠️ Nog door Best Aircotechniek te bevestigen (zie TODO's in `src/data/faq.ts` en `src/data/site.ts`)
De FAQ-antwoorden zijn nu eerlijk en algemeen. Ze worden concreter en sterker zodra bekend is:
- Welke **merken** jullie installeren (Daikin, Mitsubishi, LG, Samsung, …) → noem ze.
- Exacte **garantietermijn** (bv. 5 jaar).
- Doen jullie ook **reparatie/storingsdienst**, of installatie + onderhoud?
- Eventuele **richtprijs** ("vanaf € …") — sterk voor klanten én GEO.
- **Openingstijden** → vul `site.openingHours` in `src/data/site.ts` (nu leeg, dus niet getoond).
- **Google Maps-URL / socials** → `site.googleMapsUrl` + `site.sameAs`.

---

## Fase 2 — Locatie- & dienstpagina's (grootste rankingpotentieel) — GEPLAND

- [ ] **Regio-hub** `/airco-installatie-noord-brabant` die naar alle plaatspagina's linkt.
- [ ] **Plaatspagina's** per werkgebied (uniek geschreven, ~250–350 woorden):
      `/airco-installatie-best`, `…-eindhoven`, `…-veldhoven`, `…-oirschot`,
      `…-sint-oedenrode`, `…-boxtel`, `…-tilburg`, `…-den-bosch`.
- [ ] **Dienstpagina's**: `/airco-installatie`, `/airco-onderhoud`,
      `/airco-reparatie` (laatste alleen als jullie dit aanbieden).
- [ ] **Interne links + navigatie**: "Werkgebied"-menu/footerblok naar de nieuwe pagina's.

Aanpak: herbruikbaar Astro-paginatemplate + data-array, zodat content uniek blijft
(geen dunne/doorway-pagina's) en de sitemap automatisch meegroeit.

---

## Fase 3 — Off-site (actie buiten de code) — DOOR BEST AIRCOTECHNIEK

- [ ] **Google Business Profile** afmaken: verificatie, foto's, beschrijving,
      Place ID → zet live reviews + `aggregateRating` schema aan (component bestaat al).
- [ ] Vermeldingen op **Werkspot, Trustoo, Google/Bing Places** met identieke NAP-gegevens.
- [ ] Actief **Google-reviews** verzamelen (sterkste lokale rankingfactor).

---

## Na deployment (Search Console)
1. `git push` op `main` → Netlify bouwt automatisch.
2. In Search Console: sitemap opnieuw indienen + "Verzoek om indexering" voor nieuwe URL's.
3. Indexering en prestaties monitoren; titels/teksten bijsturen op basis van vertoningen.
