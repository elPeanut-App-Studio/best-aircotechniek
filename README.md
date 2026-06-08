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

## Google Reviews

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

## Online zetten (Vercel + STRATO)

### 1. GitHub

```powershell
git status
git add -A
git commit -m "Site klaar voor productie"
git push -u origin main
```

### 2. Vercel

1. Ga naar [vercel.com/new](https://vercel.com/new) en importeer de GitHub-repo
2. Framework: **Astro**
3. Environment variable toevoegen (Production, Preview, Development):
   - Naam: `PUBLIC_WEB3FORMS_ACCESS_KEY`
   - Waarde: je Web3Forms access key
4. Deploy
5. Voeg domeinen toe onder **Settings → Domains**: `best-aircotechniek.nl` en `www.best-aircotechniek.nl`

### 3. STRATO DNS

| Host | Type | Waarde |
|------|------|--------|
| `@` (apex) | A | `76.76.21.21` |
| `www` | CNAME | `cname.vercel-dns.com` |

Controleer in Vercel of beide domeinen op **Valid Configuration** staan. SSL regelt Vercel automatisch.

DNS-wijzigingen kunnen enkele minuten tot uren duren.
