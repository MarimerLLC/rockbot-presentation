// Export the reveal.js deck to PDF via headless Chromium.
//   npm run pdf            -> rockbot-agentic-architecture.pdf
//   node export-pdf.mjs out.pdf
import { chromium } from 'playwright';
import { pathToFileURL } from 'url';
import { resolve } from 'path';

const out = process.argv[2] ?? 'rockbot-agentic-architecture.pdf';
const url = pathToFileURL(resolve('index.html')).href + '?print-pdf';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(url, { waitUntil: 'networkidle' });
// reveal lays out all slides stacked for print; give fonts/CDN a beat to settle.
await page.waitForTimeout(2500);

await page.pdf({
  path: out,
  width: '1280px',
  height: '720px',
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
});

await browser.close();
console.log('wrote ' + out);
