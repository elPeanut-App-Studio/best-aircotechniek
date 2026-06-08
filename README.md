# Best Aircotechniek — Website

Professionele brochure-website voor [Best Aircotechniek](https://best-aircotechniek.nl), gebouwd met Astro en Tailwind CSS.

## Pagina's

- **Home** — hero, USP's, klantreis, vertrouwensblok
- **Hoe het werkt** — interactieve klantreis in 6 stappen
- **Over ons** — bedrijfsinfo, werkgebied
- **Contact** — formulier, telefoon, e-mail, WhatsApp

## Lokaal starten

```powershell
cd "$env:USERPROFILE\OneDrive - JEX\Bureaublad\best-aircotechniek"
npm install
npm.cmd run dev
```

Open [http://localhost:4321](http://localhost:4321) in je browser.

## Bedrijfsgegevens aanpassen

Alle contactgegevens, teksten en werkgebied staan centraal in `src/data/site.ts`.

## Logo

Het officiële logo staat in `public/logo.png`. Vervang dat bestand om het logo te wijzigen.

## Contactformulier (Web3Forms)

1. Maak een account op [web3forms.com](https://web3forms.com)
2. Kopieer je access key
3. Maak lokaal een `.env` bestand aan (kopieer van `.env.example`):

```
PUBLIC_WEB3FORMS_ACCESS_KEY=jouw-access-key
```

4. Herstart de dev-server

Het `.env` bestand staat in `.gitignore` en mag niet naar GitHub.

## Google Analytics (GA4)

Analytics wordt via **Netlify snippet injection** geladen (Post processing).

1. Netlify → **Site configuration → Build & deploy → Post processing → Snippet injection**
2. Plak je GA4-snippet (Measurement ID `G-JEL5C68CXV`)
3. Deploy opnieuw

Geen analytics-code meer in dit project, om dubbele meting te voorkomen.

## Google Business-profiel

Volg deze stappen om vindbaar te worden op Google Maps en reviews te ontvangen.

### 1. Profiel aanmaken

1. [business.google.com](https://business.google.com) → bedrijf toevoegen
2. Naam: **Best Aircotechniek**
3. Categorie: *Airconditioningbedrijf* of *Aannemer HVAC*
4. Telefoon: +31 6 45200605
5. Website: https://best-aircotechniek.nl
6. Werkgebied: Noord-Brabant (servicegebied, geen fysiek adres nodig)

### 2. Verificatie

Volg de verificatie (postkaart, telefoon of e-mail). Reviews zijn pas mogelijk na verificatie.

### 3. Profiel invullen

- Logo uploaden (`public/logo.png`)
- Foto's van montage/werk (minimaal 3)
- Openingstijden: op afspraak
- Beschrijving (max. 750 tekens):

```
Best Aircotechniek plaatst airconditioningsystemen voor particulieren en bedrijven in Noord-Brabant en omgeving. Van advies aan huis tot vakkundige montage en oplevering: wij begeleiden u persoonlijk door het hele traject.

Wij werken in onder meer Best, Eindhoven, Veldhoven, Oirschot, Sint-Oedenrode, Boxtel, Tilburg en Den Bosch. U spreekt direct met ons, zonder callcenter. Eerlijk advies, duidelijke offertes en nette installatie staan bij ons voorop.

Neem vrijblijvend contact op voor advies of een offerte op maat. Altijd het beste klimaat.
```

### 4. Koppelen aan de website

1. Kopieer je Google Maps-link (Delen → link kopiëren)
2. Plak in `src/data/site.ts` bij `googleMapsUrl`
3. Zoek je **Place ID** via [Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder)
4. Voeg Place ID + Places API key toe (zie Google Reviews hieronder)
5. Commit, push → reviews verschijnen automatisch op de homepage

## Google Reviews (automatisch op homepage)

1. Zoek je **Place ID** op [Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder)
2. Maak een project in [Google Cloud Console](https://console.cloud.google.com) en schakel **Places API (New)** in
3. Maak een API key en beperk deze tot Places API
4. Voeg toe aan `.env` en Netlify:
   - `PUBLIC_GOOGLE_PLACE_ID`
   - `GOOGLE_PLACES_API_KEY`
5. Optioneel: zet je Google Maps link in `site.ts` bij `googleMapsUrl`

Reviews worden bij elke deploy opgehaald. Zonder API-key tonen de knoppen **Bekijk op Google** en **Schrijf een review**.

## Build

```powershell
npm.cmd run build
npm.cmd run preview
```

## Online zetten (Netlify + STRATO)

De site draait op **Netlify**. DNS blijft bij **STRATO**.

### Environment variables in Netlify

Voeg toe onder **Site configuration → Environment variables**:

| Variable | Verplicht |
|----------|-----------|
| `PUBLIC_WEB3FORMS_ACCESS_KEY` | Ja (contactformulier) |
| `PUBLIC_GOOGLE_PLACE_ID` | Nee (reviews) |
| `GOOGLE_PLACES_API_KEY` | Nee (reviews) |

Analytics: via Netlify snippet injection, geen env var nodig.

### STRATO DNS

| Host | Type | Waarde |
|------|------|--------|
| `@` (apex) | A | `75.2.60.5` |
| `www` | CNAME | `best-aircotechniek.netlify.app` |

SSL regelt Netlify automatisch. Zet Force HTTPS aan onder Domain management.
