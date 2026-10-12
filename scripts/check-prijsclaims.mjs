/**
 * Controleert na elke build of de AUX-vanafprijs niet op een productpagina van
 * een ander merk staat.
 *
 * WAAROM
 * site.priceFrom is de laagste prijs van de hele site: een AUX-instapmodel van
 * 2,5 kW. Die waarde werd in paginasjablonen geinterpoleerd, ook in de CTA en de
 * meta-description van Daikin-, LG- en MHI-pagina's. Onder de kop "Daikin
 * Perfera laten installeren?" stond dan "een vakkundige montage vanaf € 1.249",
 * en een klant las dat als de prijs van de Perfera. Terecht: het bedrag hoort
 * bij een ander, goedkoper toestel van een ander merk.
 *
 * Dit is twee keer misgegaan: eerder op de AUX-vermogenspagina's (waar 2,5 kW
 * de prijs bepaalde maar de 7,0 kW-pagina hem ook toonde) en daarna op de
 * productpagina's van de andere merken. Een prijsclaim die niet klopt is erger
 * dan een dode link, dus hij hoort in de build.
 *
 * WAT WEL MAG
 * Op de homepage, de plaats- en installatiepagina's en de vergelijking is
 * "vanaf <bedrag>" een site-brede claim die niet aan een specifiek product
 * hangt, en die klopt. Alleen productpagina's van andere merken dan AUX worden
 * hier gecontroleerd.
 *
 * Draait automatisch als npm-postbuild. Los aanroepen:
 *   node scripts/check-prijsclaims.mjs
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');

/** Het bedrag uit src/data/site.ts, zodat de controle meeloopt als dat wijzigt. */
const siteTs = readFileSync(join(ROOT, 'src/data/site.ts'), 'utf8');
const bedrag = Number(siteTs.match(/priceFromAmount:\s*(\d+)/)?.[1]);
if (!bedrag) {
  console.error('[prijs] priceFromAmount niet gevonden in src/data/site.ts; controle kan niet draaien.');
  process.exit(1);
}
// Zowel de Nederlandse (1.249) als de Engelse (1,249) notatie.
const varianten = [bedrag.toLocaleString('nl-NL'), bedrag.toLocaleString('en-US'), String(bedrag)];

function htmlFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...htmlFiles(full));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

// Productpagina's van een ANDER merk dan AUX: /merken/<merk>/<model>/... en de
// Engelse tegenhanger. De merkpagina zelf valt er ook onder.
const anderMerk = /^(?:en\/brands|merken)\/(?!aux(?:\/|$))([a-z-]+)\//;

/**
 * Alleen de tekst die OVER DIT PRODUCT gaat: de titel, de meta-description, de
 * zichtbare tekst en een Product-schema. Bewust NIET het bedrijfsschema: dat
 * bevat een makesOffer "Airco installatie (single-split 2,5 kW)" met minPrice
 * 1249, en dat is correct afgebakend (de omschrijving noemt de 2,5 kW zelf) en
 * staat als globale node op elke pagina.
 */
function productTekst(html) {
  const delen = [];
  delen.push(html.match(/<title>(.*?)<\/title>/s)?.[1] ?? '');
  delen.push(html.match(/<meta name="description" content="(.*?)"/s)?.[1] ?? '');
  for (const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    try {
      const data = JSON.parse(m[1]);
      if (data['@type'] === 'Product') delen.push(m[1]);
    } catch {
      // onleesbare JSON-LD slaan we over; daar gaat deze controle niet over
    }
  }
  const body = html
    .replace(/<head>.*?<\/head>/s, ' ')
    .replace(/<(script|style)[^>]*>.*?<\/\1>/gs, ' ')
    .replace(/<[^>]+>/g, ' ');
  delen.push(body);
  return delen.join(' ');
}

const fout = [];
let gecontroleerd = 0;

for (const bestand of htmlFiles(DIST)) {
  const pagina = bestand.slice(DIST.length + 1);
  const m = pagina.match(anderMerk);
  if (!m || m[1] === 'vergelijken' || m[1] === 'compare') continue;
  gecontroleerd += 1;
  const tekst = productTekst(readFileSync(bestand, 'utf8'));
  const gevonden = varianten.find((v) => tekst.includes(v));
  if (gevonden) fout.push({ pagina, merk: m[1], gevonden });
}

console.log(`[prijs] ${gecontroleerd} productpagina's van andere merken dan AUX gecontroleerd op de AUX-vanafprijs.`);

if (fout.length) {
  console.error(`[prijs] ${fout.length} pagina('s) tonen de AUX-vanafprijs terwijl ze over een ander merk gaan:`);
  for (const f of fout.slice(0, 15)) console.error(`  ${f.pagina}  (merk ${f.merk}, bedrag ${f.gevonden})`);
  console.error('[prijs] Haal het bedrag weg of maak de prijs productspecifiek, en bouw opnieuw.');
  process.exit(1);
}
console.log('[prijs] Geen misleidende prijsclaims.');
