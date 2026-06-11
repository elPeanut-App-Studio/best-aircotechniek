import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Astro + Netlify directory build serves sitemaps at /sitemap-0.xml/ (with slash).
 * Google Search Console expects /sitemap-0.xml with HTTP 200, not 301.
 * This hook writes flat .xml files after build.
 */
export default function flattenSitemaps() {
  return {
    name: 'flatten-sitemaps',
    hooks: {
      'astro:build:done': ({ dir }) => {
        const outDir = fileURLToPath(dir);
        flattenXmlDirs(outDir);
      },
    },
  };
}

function flattenXmlDirs(outDir) {
  for (const entry of fs.readdirSync(outDir, { withFileTypes: true })) {
    if (!entry.isDirectory() || !entry.name.endsWith('.xml')) continue;

    const dirPath = path.join(outDir, entry.name);
    const innerFiles = fs.readdirSync(dirPath);
    const source = innerFiles.find((f) => f.endsWith('.xml') || f === 'index.html');

    if (!source) {
      console.warn(`[flatten-sitemaps] Geen XML gevonden in ${entry.name}/`);
      continue;
    }

    const content = fs.readFileSync(path.join(dirPath, source), 'utf8');
    const flatPath = path.join(outDir, entry.name);

    fs.rmSync(dirPath, { recursive: true, force: true });
    fs.writeFileSync(flatPath, content, 'utf8');
    console.log(`[flatten-sitemaps] ${entry.name} → plat bestand`);
  }
}
