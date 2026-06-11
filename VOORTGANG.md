# Voortgang Best Aircotechniek website

Laatst bijgewerkt: 8 juni 2026

Live site: [best-aircotechniek.nl](https://best-aircotechniek.nl)  
Repository: [github.com/Best-Aircotechniek/best-aircotechniek](https://github.com/Best-Aircotechniek/best-aircotechniek)

---

## Samenvatting

| Onderdeel | Status |
|-----------|--------|
| Brochure-website (pagina's, design, formulier) | Klaar |
| Hosting & DNS (Netlify + STRATO) | Live |
| Google Search Console & sitemap | Klaar |
| Google Analytics | Live (via Netlify snippet) |
| Recente wijzigingen deployen | Nog te pushen |
| Google Business & live reviews | Nog te doen |
| SEO-uitbreiding (FAQ, regiopagina) | Gepland |

**Geschatte voortgang website:** ~90%  
**Geschatte voortgang vindbaarheid (SEO/local):** ~40%

---

## Klaar en live

### Pagina's
- [x] Home (hero, USP's, klantreis, vertrouwensblok, reviews-sectie, CTA)
- [x] Hoe het werkt (interactieve klantreis, FAQ)
- [x] Over ons (bedrijfsinfo, werkgebied)
- [x] Contact (formulier, telefoon, e-mail, WhatsApp)
- [x] Redirect `/diensten` → `/hoe-het-werkt`

### Design & techniek
- [x] Huisstijl (blauw `#1B4E79`, goud `#D4AF37`, Plus Jakarta Sans)
- [x] Logo in header, hero en footer
- [x] Responsive navigatie (desktop + hamburgermenu)
- [x] WhatsApp-knop (rechtsonder)
- [x] Contactformulier via Web3Forms
- [x] Astro 5 + Tailwind CSS
- [x] Sitemap (`sitemap-index.xml`) + `robots.txt`
- [x] LocalBusiness structured data
- [x] PageSpeed-basis (fonts, preconnect, logo-preload)

### Hosting & domein
- [x] Netlify gekoppeld aan GitHub
- [x] STRATO DNS (A-record apex, CNAME www)
- [x] SSL / HTTPS
- [x] Domeinverificatie Google Search Console (TXT-record)
- [x] Sitemap ingediend in Search Console (status: succesvol, 4 pagina's)

### Analytics
- [x] GA4 via Netlify snippet injection (`G-JEL5C68CXV`)
- [x] Geen dubbele tracking in code (GA verwijderd uit Astro)

---

## Klaar lokaal, nog niet live (wacht op `git push`)

Deze commits staan op je computer maar nog niet op Netlify:

- [x] Scherper logo (2048px bron) + Retina-resolutie
- [x] Zwevende bel-knop mobiel/tablet verwijderd
- [x] Nieuw telefoonnummer: **+31 6 28305341**

Mogelijk nog niet gecommit (controleer met `git status`):

- [ ] Google Reviews links gefixt (lege `googleMapsUrl`)
- [ ] Logo loading definitief (`priority` prop)
- [ ] Hero-volgorde mobiel (logo boven titel)
- [ ] "Bel ons!"-knoppen verwijderd uit hero en CTA-sectie
- [ ] Sitemap 200-rewrite (redirect-loop fix), indien nog niet gepusht

**Deploy wanneer u klaar bent:**

```powershell
cd "C:\Users\NielsChristoffelJEX\OneDrive - JEX\Bureaublad\best-aircotechniek"
git status
git add -A
git reset HEAD .env
git commit -m "Bundel openstaande wijzigingen"   # alleen als er nog unstaged wijzigingen zijn
git push origin main
```

Netlify bouwt automatisch (~1–3 minuten).

---

## Nog te doen

### Prioriteit 1: Google Business (grootste impact op vindbaarheid)
- [ ] Profiel aanmaken op [business.google.com](https://business.google.com)
- [ ] Verificatie afronden (postkaart / telefoon / e-mail)
- [ ] Logo en minimaal 3 werkfoto's uploaden
- [ ] Beschrijving invullen (tekst staat in `README.md`)
- [ ] Google Maps-link kopiëren → `googleMapsUrl` in `src/data/site.ts`
- [ ] Place ID opzoeken → `PUBLIC_GOOGLE_PLACE_ID` in Netlify + `.env`
- [ ] Places API key → `GOOGLE_PLACES_API_KEY` in Netlify + `.env`
- [ ] Deploy → live reviews op homepage

### Prioriteit 2: SEO verder uitbouwen
- [ ] Meta titles en descriptions aanscherpen per pagina
- [ ] FAQ-pagina met FAQPage structured data
- [ ] Regiopagina, bijv. `/airco-installateur-noord-brabant`
- [ ] `og:image` voor social media previews
- [ ] Search Console: indexering en prestaties monitoren

### Prioriteit 3: Content & afwerking
- [ ] Echte teamfoto op Over ons (nu stockfoto)
- [ ] Eventueel extra dienst- of plaatsingspagina's per stad
- [ ] Ongebruikte env var `PUBLIC_GA_MEASUREMENT_ID` in Netlify opruimen (optioneel)

---

## Bedrijfsgegevens (huidige stand)

| Gegeven | Waarde |
|---------|--------|
| Telefoon | +31 6 28305341 |
| E-mail | info@best-aircotechniek.nl |
| KVK | 84577878 |
| Btw-id | NL003984507B022 |
| Werkgebied | Noord-Brabant en omgeving |
| Google Maps URL | Nog leeg |

Centrale plek voor wijzigingen: `src/data/site.ts`

---

## Handige commando's

```powershell
# Lokaal bekijken
npm.cmd run dev

# Build testen
npm.cmd run build

# Status controleren
git status
git log --oneline -5
```

---

## Notities

- Wijzigingen batchen en in één keer deployen bespaart tokens en Netlify-builds.
- Bij wijziging van environment variables in Netlify: **Clear cache and deploy site**.
- Technische documentatie: `README.md`
