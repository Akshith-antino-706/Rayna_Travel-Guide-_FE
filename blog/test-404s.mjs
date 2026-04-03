import { chromium } from 'playwright';

const BASE = 'http://localhost:4321/blogs/';
const visited = new Set();
const errors = [];
const queue = [BASE];

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();

// Track all failed resource loads
const brokenAssets = [];
page.on('response', (response) => {
  const url = response.url();
  const status = response.status();
  if (status >= 400 && url.startsWith('http://localhost:4321')) {
    brokenAssets.push({ url, status, referrer: page.url() });
  }
});

console.log('Starting crawl from:', BASE);
console.log('---');

let pagesChecked = 0;

while (queue.length > 0) {
  const url = queue.shift();
  if (visited.has(url)) continue;
  visited.add(url);

  try {
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    const status = response?.status() || 0;
    pagesChecked++;

    if (status >= 400) {
      errors.push({ url, status });
      console.log(`[${status}] ${url}`);
    } else if (pagesChecked % 50 === 0) {
      console.log(`Checked ${pagesChecked} pages... (queue: ${queue.length})`);
    }

    // Extract all internal links
    const links = await page.$$eval('a[href]', (anchors) =>
      anchors.map((a) => a.href).filter((href) => href.startsWith('http://localhost:4321'))
    );

    for (const link of links) {
      const clean = link.split('#')[0].split('?')[0];
      if (!visited.has(clean) && !queue.includes(clean)) {
        queue.push(clean);
      }
    }
  } catch (err) {
    errors.push({ url, status: 'TIMEOUT/ERROR', error: err.message });
    console.log(`[ERROR] ${url} - ${err.message.slice(0, 100)}`);
  }
}

await browser.close();

console.log('\n===== CRAWL COMPLETE =====');
console.log(`Pages checked: ${pagesChecked}`);
console.log(`404/Error pages: ${errors.length}`);
console.log(`Broken assets: ${brokenAssets.length}`);

if (errors.length > 0) {
  console.log('\n--- 404 / ERROR PAGES ---');
  for (const e of errors) {
    console.log(`  [${e.status}] ${e.url}`);
  }
}

if (brokenAssets.length > 0) {
  // Deduplicate
  const unique = [...new Map(brokenAssets.map(a => [a.url, a])).values()];
  console.log('\n--- BROKEN ASSETS ---');
  for (const a of unique) {
    console.log(`  [${a.status}] ${a.url}`);
    console.log(`    Referenced from: ${a.referrer}`);
  }
}

if (errors.length === 0 && brokenAssets.length === 0) {
  console.log('\nAll pages and assets loaded successfully!');
}
