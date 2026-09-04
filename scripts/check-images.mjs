/**
 * Controleert na elke build of elke <img src="/..."> ook echt een bestand in
 * dist heeft.
 *
 * WAAROM
 * De linkcontrole in check-internal-links.mjs kijkt naar <a href>, niet naar
 * afbeeldingen. Bij het toevoegen van Mitsubishi Heavy Industries stonden er
 * daardoor 32 verwijzingen naar drie productfoto's die nog niet bestonden,
 * verspreid over 16 pagina's, zonder dat de build daarover klaagde. Een gebroken
 * afbeelding op de homepage is voor een bezoeker erger dan een dode link, want
 * die ziet hij meteen.
 *
 * Deze controle laat de build FALEN zodra een afbeelding ontbreekt.
 *
 * Draait automatisch als npm-postbuild. Los aanroepen:
 *   node scripts/check-images.mjs
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');

function htmlFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...htmlFiles(full));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const paginas = htmlFiles(DIST);
const ontbreekt = new Map();
const gebruiktOp = new Map();
let ok = 0;

for (const bestand of paginas) {
  const html = readFileSync(bestand, 'utf8');
  const pagina = bestand.slice(DIST.length + 1);

  // Alleen eigen, absolute paden. Externe URL's en data-URI's slaan we over,
  // en srcset-varianten van Astro's beeldpijplijn komen uit /_astro/.
  for (const match of html.matchAll(/<img[^>]+src="(\/[^"]+)"/g)) {
    const src = decodeURIComponent(match[1].split('?')[0]);
    if (existsSync(join(DIST, src))) {
      ok += 1;
      continue;
    }
    ontbreekt.set(src, (ontbreekt.get(src) ?? 0) + 1);
    if (!gebruiktOp.has(src)) gebruiktOp.set(src, new Set());
    if (gebruiktOp.get(src).size < 3) gebruiktOp.get(src).add(pagina);
  }
}

console.log(`[beeld] ${ok} afbeeldingverwijzingen op ${paginas.length} pagina's wijzen naar een bestaand bestand.`);

if (ontbreekt.size) {
  console.error(`[beeld] ${ontbreekt.size} ONTBREKENDE afbeelding(en):`);
  for (const [src, n] of [...ontbreekt.entries()].sort((a, b) => b[1] - a[1])) {
    const voorbeeld = [...gebruiktOp.get(src)].join(', ');
    console.error(`  ${n}x  ${src}   (o.a. op ${voorbeeld})`);
  }
  console.error('[beeld] Zet het bestand in public/ en bouw opnieuw.');
  process.exit(1);
}
console.log('[beeld] Geen ontbrekende afbeeldingen.');
