/**
 * Controleert na elke build of interne links rechtstreeks op een pagina
 * uitkomen, en niet eerst op een omleiding.
 *
 * WAAROM
 * De site levert pagina's uit MET afsluitende slash (/contact/). Een link naar
 * /contact geeft daarom eerst een 301. Op 4 augustus 2026 gold dat voor 4810 van
 * de 5156 interne links. Google moet dan twee verzoeken doen per pagina die hij
 * wil bereiken, wat crawlbudget kost; de Nederlandse Oirschot-pagina was
 * daardoor vermoedelijk nooit geindexeerd terwijl de Engelse dat wel was.
 *
 * Deze controle laat de build FALEN als er nog zo'n link in staat, zodat het
 * niet stil kan terugkomen bij een volgende wijziging.
 *
 * Draait automatisch als npm-postbuild. Los aanroepen:
 *   node scripts/check-internal-links.mjs
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');

/** Alle gebouwde HTML-pagina's. */
function htmlFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...htmlFiles(full));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

/** Bestaat dit pad als bestand in dist, precies zoals gelinkt? */
function servesDirectly(href) {
  const clean = href.split('#')[0].split('?')[0];
  if (clean.endsWith('/')) return existsSync(join(DIST, clean, 'index.html'));
  const asFile = join(DIST, clean);
  return existsSync(asFile) && statSync(asFile).isFile();
}

/** Zou dit pad met een slash erachter wel werken? Dan is het een omleiding. */
function wouldRedirect(href) {
  const clean = href.split('#')[0].split('?')[0];
  if (clean.endsWith('/')) return false;
  return existsSync(join(DIST, clean, 'index.html'));
}

if (!existsSync(DIST)) {
  console.error('[links] dist/ bestaat niet; draai eerst de build.');
  process.exit(1);
}

const redirects = new Map(); // href -> aantal
const broken = new Map();
let ok = 0;

for (const file of htmlFiles(DIST)) {
  const html = readFileSync(file, 'utf8');
  for (const match of html.matchAll(/href="(\/[^"]*)"/g)) {
    const href = match[1];
    if (href === '/' || href.startsWith('//')) continue;
    if (servesDirectly(href)) {
      ok++;
    } else if (wouldRedirect(href)) {
      redirects.set(href, (redirects.get(href) ?? 0) + 1);
    } else {
      broken.set(href, (broken.get(href) ?? 0) + 1);
    }
  }
}

const sorteer = (m) => [...m.entries()].sort((a, b) => b[1] - a[1]);

console.log(`[links] ${ok} interne links komen rechtstreeks uit op een pagina of bestand.`);

if (broken.size) {
  console.error(`[links] ${broken.size} DODE link(s):`);
  for (const [href, n] of sorteer(broken).slice(0, 20)) console.error(`  ${n}x  ${href}`);
}
if (redirects.size) {
  console.error(
    `[links] ${[...redirects.values()].reduce((a, b) => a + b, 0)} link(s) naar ${redirects.size} pad(en) die eerst een omleiding geven:`,
  );
  for (const [href, n] of sorteer(redirects).slice(0, 25)) console.error(`  ${n}x  ${href}  ->  ${href}/`);
}

if (broken.size || redirects.size) {
  console.error('[links] Voeg de afsluitende slash toe (of repareer de dode link) en bouw opnieuw.');
  process.exit(1);
}
console.log('[links] Geen omleidingen en geen dode links.');
