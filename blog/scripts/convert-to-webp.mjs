import sharp from 'sharp';
import { readdir, stat, unlink } from 'fs/promises';
import path from 'path';

const IMAGES_DIR = path.resolve('public/images');
const QUALITY = 80;
const MAX_WIDTH = 1200;
const MAX_HEIGHT = 675;

async function convertCity(cityDir) {
  const cityPath = path.join(IMAGES_DIR, cityDir);
  const files = await readdir(cityPath);
  const jpgs = files.filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png'));

  let converted = 0, skipped = 0, failed = 0;

  for (const file of jpgs) {
    const inputPath = path.join(cityPath, file);
    const outputName = file.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const outputPath = path.join(cityPath, outputName);

    try {
      // Check if webp already exists and is newer
      try {
        const outStat = await stat(outputPath);
        const inStat = await stat(inputPath);
        if (outStat.mtimeMs > inStat.mtimeMs) {
          skipped++;
          continue;
        }
      } catch {}

      const info = await sharp(inputPath)
        .resize(MAX_WIDTH, MAX_HEIGHT, { fit: 'cover', withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(outputPath);

      const origStat = await stat(inputPath);
      const savings = ((1 - info.size / origStat.size) * 100).toFixed(1);
      console.log(`  ✓ ${file} → ${outputName} (${(origStat.size/1024).toFixed(0)}KB → ${(info.size/1024).toFixed(0)}KB, -${savings}%)`);
      converted++;
    } catch (err) {
      console.error(`  ✗ ${file}: ${err.message}`);
      failed++;
    }
  }

  return { converted, skipped, failed, total: jpgs.length };
}

async function main() {
  console.log(`\n=== Converting images to WebP ===`);
  console.log(`Quality: ${QUALITY} | Max: ${MAX_WIDTH}×${MAX_HEIGHT}\n`);

  const cities = await readdir(IMAGES_DIR);
  const cityDirs = [];

  for (const c of cities) {
    const s = await stat(path.join(IMAGES_DIR, c));
    if (s.isDirectory()) cityDirs.push(c);
  }

  let totalConverted = 0, totalSkipped = 0, totalFailed = 0, totalFiles = 0;

  for (const city of cityDirs.sort()) {
    console.log(`[${city}]`);
    const result = await convertCity(city);
    totalConverted += result.converted;
    totalSkipped += result.skipped;
    totalFailed += result.failed;
    totalFiles += result.total;
    console.log(`  Done: ${result.converted} converted, ${result.skipped} skipped, ${result.failed} failed\n`);
  }

  console.log(`\n${'='.repeat(50)}`);
  console.log(`TOTAL: ${totalConverted} converted | ${totalSkipped} skipped | ${totalFailed} failed | ${totalFiles} files`);

  // Delete original JPGs if all converted successfully
  if (totalFailed === 0 && process.argv.includes('--delete-originals')) {
    console.log(`\nDeleting original JPG files...`);
    for (const city of cityDirs) {
      const cityPath = path.join(IMAGES_DIR, city);
      const files = await readdir(cityPath);
      for (const f of files.filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png'))) {
        await unlink(path.join(cityPath, f));
      }
    }
    console.log('Done — originals deleted.');
  }
}

main();
