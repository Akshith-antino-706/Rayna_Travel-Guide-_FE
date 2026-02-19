/**
 * Blog Post Image Generator — DALL-E 3 + Gemini Imagen 3
 * --------------------------------------------------------
 * Generates unique hero images for ALL blog posts.
 * Supports dual-provider parallel mode to 2x speed.
 *
 * Usage:
 *   npx tsx scripts/generate-blog-images.ts                        # Auto (DALL-E if no Gemini key)
 *   npx tsx scripts/generate-blog-images.ts --provider openai      # Force DALL-E 3
 *   npx tsx scripts/generate-blog-images.ts --provider gemini      # Force Gemini Imagen 3
 *   npx tsx scripts/generate-blog-images.ts --shard even           # Even-indexed posts only
 *   npx tsx scripts/generate-blog-images.ts --shard odd            # Odd-indexed posts only
 *   npx tsx scripts/generate-blog-images.ts --city dubai           # One city only
 *   npx tsx scripts/generate-blog-images.ts --dry-run              # Preview prompts
 *   npx tsx scripts/generate-blog-images.ts --force                # Regenerate all
 *   npx tsx scripts/generate-blog-images.ts --limit 20             # Max 20 images
 *
 * Parallel mode (2x faster — run both in separate terminals):
 *   npx tsx scripts/generate-blog-images.ts --provider openai --shard even
 *   npx tsx scripts/generate-blog-images.ts --provider gemini --shard odd
 */

import { config as dotenvConfig } from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');

// Load .env from repo root or blog/
dotenvConfig({ path: path.join(process.cwd(), '..', '.env') });
dotenvConfig({ path: path.join(process.cwd(), '.env') });
dotenvConfig({ path: path.join(PROJECT_ROOT, '..', '.env') });
dotenvConfig({ path: path.join(PROJECT_ROOT, '.env') });

import OpenAI from 'openai';
import { GoogleGenAI, Modality } from '@google/genai';
import fs from 'fs/promises';

const PUBLIC_DIR    = path.join(PROJECT_ROOT, 'public');
const CONTENT_DIR   = path.join(PROJECT_ROOT, 'src', 'content', 'blog');
const PROGRESS_FILE = path.join(__dirname, 'blog-images-progress.json');

// ─── CLI Args ────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const FORCE    = args.includes('--force');
const DRY_RUN  = args.includes('--dry-run');
const CITY_ARG = args.find((_, i, a) => a[i - 1] === '--city') ?? null;
const LIMIT    = (() => { const i = args.indexOf('--limit');    return i !== -1 ? parseInt(args[i+1], 10) : Infinity; })();
const PROVIDER = (() => { const i = args.indexOf('--provider'); return i !== -1 ? args[i+1] as 'openai'|'gemini' : null; })();
const SHARD    = (() => { const i = args.indexOf('--shard');    return i !== -1 ? args[i+1] as 'even'|'odd' : null; })();

// ─── Providers ───────────────────────────────────────────────────────────────

const hasOpenAI = !!process.env.OPENAI_API_KEY;
const hasGemini = !!process.env.GEMINI_API_KEY;

// Choose provider: explicit flag > auto-detect
const activeProvider: 'openai' | 'gemini' = PROVIDER ?? (hasOpenAI ? 'openai' : 'gemini');

// Rate limits
const RATE_LIMIT_MS: Record<string, number> = {
  openai: 13000,  // DALL-E 3: 5 img/min tier-1
  gemini: 6000,   // Imagen 3: ~10 img/min
};

// ─── OpenAI client ───────────────────────────────────────────────────────────

let openai: OpenAI | null = null;
if (hasOpenAI) {
  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

// ─── Gemini client ───────────────────────────────────────────────────────────

let gemini: GoogleGenAI | null = null;
if (hasGemini) {
  gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

// ─── City config ─────────────────────────────────────────────────────────────

const CITY_CONFIG: Record<string, { name: string; country: string }> = {
  dubai:        { name: 'Dubai',     country: 'United Arab Emirates' },
  'abu-dhabi':  { name: 'Abu Dhabi', country: 'United Arab Emirates' },
  bangkok:      { name: 'Bangkok',   country: 'Thailand'             },
  istanbul:     { name: 'Istanbul',  country: 'Turkey'               },
  london:       { name: 'London',    country: 'United Kingdom'       },
  'new-york':   { name: 'New York',  country: 'USA'                  },
  paris:        { name: 'Paris',     country: 'France'               },
  rome:         { name: 'Rome',      country: 'Italy'                },
  singapore:    { name: 'Singapore', country: 'Singapore'            },
  tokyo:        { name: 'Tokyo',     country: 'Japan'                },
};

// ─── Category visual styles ──────────────────────────────────────────────────

const CATEGORY_STYLE: Record<string, string> = {
  'Itineraries':              'A stunning aerial or panoramic view of iconic city landmarks during golden hour',
  'Things to Do':             'Excited travelers exploring a vibrant iconic attraction with beautiful architecture',
  'Attractions':              'A breathtaking wide-angle photograph of a world-famous landmark in magnificent detail',
  'Experiences & Activities': 'Travelers enjoying a thrilling cultural or outdoor experience with vivid scenery',
  'Activities Planning':      'Travelers enjoying a popular outdoor experience with dramatic scenery in the background',
  'Food & Dining':            'An exquisite food photography shot of traditional local cuisine beautifully presented',
  'Hotels & Accommodation':   'A luxurious hotel room or rooftop terrace with sweeping city views at sunset',
  'Hotels & Stays':           'A luxurious hotel room or rooftop terrace with sweeping city views at sunset',
  'Booking & Experiences':    'A scenic travel scene showing the most iconic experience in the destination',
  'Holiday Packages':         'A postcard-perfect travel scene with pristine landscapes and iconic city landmarks',
  'Transport':                'A modern transport hub, iconic bridge, or scenic road with the city skyline visible',
  'Transportation':           'A modern transport hub, iconic bridge, or scenic road with the city skyline visible',
  'Money & Payments':         'A stylish travel flatlay with local currency, passport, and cultural items',
  'Practical Information':    'A well-organized travel scene showing a tourist exploring the city comfortably',
  'Essentials':               'A colorful and informative travel scene with the city skyline and cultural elements',
  'Trust & Conversion':       'A breathtaking panoramic view of the city that inspires wanderlust and discovery',
  'Comparisons':              'A side-by-side travel scene comparing iconic cultural and modern experiences',
  'Safety & Health':          'A bright and welcoming pedestrian promenade with locals and tourists strolling safely',
  'Special Guides':           'A culturally rich scene capturing a unique aspect of local life and traditions',
  'Shopping':                 'An opulent shopping mall interior or a vibrant traditional market with colorful stalls',
  'Nightlife':                'A dazzling city skyline or entertainment district lit up brilliantly at night',
  'Culture & History':        'A magnificent historic monument or museum bathed in warm afternoon light',
  'Nature & Parks':           'A serene natural landscape, park, or waterfront with lush greenery and clear skies',
  'Beaches':                  'A pristine beach with turquoise water, golden sand, and the city skyline in the distance',
  'Seasonal & Monthly':       'A beautiful seasonal landscape or cityscape with dramatic sky and natural lighting',
  'Events & Festivals':       'A vibrant festival or cultural celebration with colorful decorations and joyful crowds',
  'Day Trips':                'A scenic countryside, mountain, or coastal view reachable as a day trip from the city',
  'Visa & Entry':             'A sleek modern international airport terminal with light-filled glass architecture',
  'Budget Travel':            'Travelers exploring colorful local streets and markets with authentic cultural ambiance',
  'Family Travel':            'Families enjoying a fun outdoor attraction with playful energy and bright colors',
  'Solo Travel':              'A lone traveler with a backpack admiring a breathtaking city or natural viewpoint',
  'Luxury Travel':            'An ultra-luxurious pool, yacht, or fine-dining setting overlooking the city skyline',
  'Yacht & Cruise':           'A luxurious yacht or cruise ship sailing past stunning city skyline and blue water',
};

function getCategoryStyle(category: string): string {
  for (const [key, style] of Object.entries(CATEGORY_STYLE)) {
    if (category.toLowerCase().includes(key.toLowerCase())) return style;
  }
  return 'A beautiful travel photograph capturing the essence and atmosphere of the destination';
}

// ─── Post meta + prompt ──────────────────────────────────────────────────────

interface PostMeta {
  title: string; description: string; city: string; citySlug: string;
  country: string; category: string; topic: string; slug: string;
}

function buildPrompt(post: PostMeta): string {
  const config = CITY_CONFIG[post.citySlug];
  const cityName = config?.name ?? post.city;
  const country  = config?.country ?? post.country;
  const noText   = 'Professional travel photography, ultra high quality, cinematic lighting, sharp focus, no text, no watermarks, no logos, no words, no letters, no numbers';
  return `${getCategoryStyle(post.category)} in ${cityName}, ${country}. The scene relates to "${post.title}" — ${post.description.slice(0, 120)}. Photorealistic, magazine-quality travel photo. ${noText}.`;
}

// ─── Frontmatter helpers ─────────────────────────────────────────────────────

function parseFrontmatter(content: string): Record<string, string> {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm: Record<string, string> = {};
  const lines = match[1].split('\n');
  let i = 0;
  while (i < lines.length) {
    const kv = lines[i].match(/^(\w[\w-]*):\s*(.*)/);
    if (!kv) { i++; continue; }
    const key = kv[1]; let value = kv[2].trim();
    if (value === '>-' || value === '|-' || value === '>') {
      const block: string[] = []; i++;
      while (i < lines.length && (lines[i].startsWith('  ') || lines[i] === '')) {
        block.push(lines[i].replace(/^  /, '')); i++;
      }
      fm[key] = block.join(' ').trim(); continue;
    }
    fm[key] = value.replace(/^['"]|['"]$/g, ''); i++;
  }
  return fm;
}

function updateHeroImage(content: string, newPath: string): string {
  content = content.replace(/^heroImage:\s*>-?\s*\n(\s+\S[^\n]*\n?)+/m, `heroImage: "${newPath}"\n`);
  content = content.replace(/^heroImage:\s*['"]?https?:\/\/[^\s'"]+['"]?/m, `heroImage: "${newPath}"`);
  return content;
}

// ─── Image generation — DALL-E 3 ─────────────────────────────────────────────

async function generateWithOpenAI(prompt: string, slug: string): Promise<Buffer | null> {
  if (!openai) { console.error('  OpenAI not configured'); return null; }
  try {
    const res = await openai.images.generate({
      model: 'dall-e-3', prompt, size: '1792x1024',
      quality: 'standard', style: 'natural', response_format: 'url', n: 1,
    });
    const url = res.data[0]?.url;
    if (!url) return null;
    const dl = await fetch(url, { signal: AbortSignal.timeout(60000) });
    if (!dl.ok) throw new Error(`Download HTTP ${dl.status}`);
    return Buffer.from(await dl.arrayBuffer());
  } catch (err: any) {
    if (err?.status === 400 && err?.error?.code === 'content_policy_violation') {
      // Retry with simplified prompt
      try {
        const simple = `Beautiful travel photograph in ${slug.replace(/-/g,' ')}, professional photography, no text.`;
        const r2 = await openai.images.generate({ model:'dall-e-3', prompt:simple, size:'1792x1024', quality:'standard', style:'natural', response_format:'url', n:1 });
        const u2 = r2.data[0]?.url; if (!u2) return null;
        const d2 = await fetch(u2, { signal: AbortSignal.timeout(60000) });
        return Buffer.from(await d2.arrayBuffer());
      } catch { return null; }
    }
    if (err?.status === 429) {
      console.error('  Rate limited — waiting 30s'); await new Promise(r => setTimeout(r, 30000));
      return generateWithOpenAI(prompt, slug);
    }
    console.error(`  OpenAI error: ${err?.message ?? err}`); return null;
  }
}

// ─── Image generation — Gemini 2.0 Flash (AI Studio API key) ─────────────────
// Uses gemini-2.0-flash-preview-image-generation which works with AIza... keys

async function generateWithGemini(prompt: string, slug: string): Promise<Buffer | null> {
  if (!gemini) { console.error('  Gemini not configured'); return null; }
  try {
    const res = await gemini.models.generateContent({
      model: 'gemini-2.0-flash-preview-image-generation',
      contents: prompt,
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
        numberOfImages: 1,
      },
    });
    // Extract image from response parts
    const parts = res.candidates?.[0]?.content?.parts ?? [];
    for (const part of parts) {
      if (part.inlineData?.data) {
        return Buffer.from(part.inlineData.data, 'base64');
      }
    }
    console.error('  Gemini: no image in response');
    return null;
  } catch (err: any) {
    if (err?.status === 429 || err?.message?.includes('quota')) {
      console.error('  Gemini rate limited — waiting 30s'); await new Promise(r => setTimeout(r, 30000));
      return generateWithGemini(prompt, slug);
    }
    console.error(`  Gemini error: ${err?.message ?? err}`); return null;
  }
}

async function generateImage(prompt: string, slug: string, provider: 'openai'|'gemini'): Promise<Buffer | null> {
  return provider === 'gemini'
    ? generateWithGemini(prompt, slug)
    : generateWithOpenAI(prompt, slug);
}

// ─── Progress ────────────────────────────────────────────────────────────────

type Progress = Record<string, 'done' | 'failed'>;

async function loadProgress(): Promise<Progress> {
  try { return JSON.parse(await fs.readFile(PROGRESS_FILE, 'utf-8')); } catch { return {}; }
}
async function saveProgress(p: Progress): Promise<void> {
  await fs.writeFile(PROGRESS_FILE, JSON.stringify(p, null, 2));
}

// ─── Gather posts ────────────────────────────────────────────────────────────

async function gatherPosts(): Promise<PostMeta[]> {
  const posts: PostMeta[] = [];
  const cityDirs = await fs.readdir(CONTENT_DIR);
  for (const citySlug of cityDirs) {
    if (CITY_ARG && citySlug !== CITY_ARG) continue;
    const cityPath = path.join(CONTENT_DIR, citySlug);
    if (!(await fs.stat(cityPath)).isDirectory()) continue;
    const config = CITY_CONFIG[citySlug];
    if (!config) { console.warn(`  Unknown city: ${citySlug} — skipping`); continue; }
    for (const file of await fs.readdir(cityPath)) {
      if (!file.endsWith('.md')) continue;
      const slug = file.replace(/\.md$/, '');
      const content = await fs.readFile(path.join(cityPath, file), 'utf-8');
      const fm = parseFrontmatter(content);
      posts.push({ title: fm.title ?? slug, description: fm.description ?? '', city: fm.city ?? config.name, citySlug, country: fm.country ?? config.country, category: fm.category ?? 'Travel', topic: fm.topic ?? slug, slug });
    }
  }
  return posts;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const providerLabel = activeProvider === 'gemini' ? 'Gemini Imagen 3' : 'DALL-E 3';
  console.log(`\n=== Blog Image Generator [${providerLabel}] ===`);
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : FORCE ? 'FORCE' : 'Normal (skip existing)'}`);
  if (SHARD)    console.log(`Shard: ${SHARD} posts only`);
  if (CITY_ARG) console.log(`City: ${CITY_ARG}`);
  if (LIMIT !== Infinity) console.log(`Limit: ${LIMIT}`);
  console.log(`Rate limit: ${RATE_LIMIT_MS[activeProvider]/1000}s between calls\n`);

  if (!DRY_RUN) {
    if (activeProvider === 'openai' && !hasOpenAI) { console.error('ERROR: OPENAI_API_KEY not set'); process.exit(1); }
    if (activeProvider === 'gemini' && !hasGemini) { console.error('ERROR: GEMINI_API_KEY not set'); process.exit(1); }
  }

  const progress = await loadProgress();
  let posts = await gatherPosts();
  console.log(`Found ${posts.length} blog posts`);

  // Apply sharding (for parallel runs)
  if (SHARD) {
    posts = posts.filter((_, i) => SHARD === 'even' ? i % 2 === 0 : i % 2 === 1);
    console.log(`After shard filter: ${posts.length} posts`);
  }

  const toProcess = posts.filter(p => FORCE || progress[`${p.citySlug}/${p.slug}`] !== 'done');
  console.log(`To process: ${toProcess.length} (${posts.length - toProcess.length} already done)\n`);

  if (DRY_RUN) {
    toProcess.slice(0, 10).forEach((p, i) => {
      console.log(`[${i+1}] ${p.citySlug}/${p.slug} [${p.category}]`);
      console.log(`  ${buildPrompt(p).slice(0, 120)}...`);
    });
    if (toProcess.length > 10) console.log(`... and ${toProcess.length - 10} more`);
    return;
  }

  let processed = 0, succeeded = 0, failedCount = 0;

  for (const post of toProcess) {
    if (processed >= LIMIT) break;
    processed++;

    const key       = `${post.citySlug}/${post.slug}`;
    const imageDir  = path.join(PUBLIC_DIR, 'images', post.citySlug);
    const imageFile = `${post.slug}.jpg`;
    const imagePath = path.join(imageDir, imageFile);
    const publicPath = `/images/${post.citySlug}/${imageFile}`;
    const mdPath    = path.join(CONTENT_DIR, post.citySlug, `${post.slug}.md`);

    console.log(`[${processed}/${Math.min(toProcess.length, LIMIT)}] ${key}`);

    if (!FORCE) {
      try {
        const s = await fs.stat(imagePath);
        if (s.size > 10000) {
          console.log(`  SKIP — image exists`);
          progress[key] = 'done'; continue;
        }
      } catch {}
    }

    await fs.mkdir(imageDir, { recursive: true });
    const prompt = buildPrompt(post);
    console.log(`  [${activeProvider}] ${prompt.slice(0, 90)}...`);

    const buf = await generateImage(prompt, post.slug, activeProvider);

    if (!buf) {
      console.error(`  FAILED`);
      progress[key] = 'failed'; failedCount++;
      await saveProgress(progress); continue;
    }

    await fs.writeFile(imagePath, buf);
    const { size } = await fs.stat(imagePath);
    console.log(`  Saved ${imageFile} (${(size/1024).toFixed(0)} KB)`);

    try {
      let content = await fs.readFile(mdPath, 'utf-8');
      content = updateHeroImage(content, publicPath);
      await fs.writeFile(mdPath, content);
      console.log(`  Updated frontmatter: ${publicPath}`);
    } catch (err: any) {
      console.error(`  Frontmatter error: ${err.message}`);
    }

    progress[key] = 'done'; succeeded++;
    await saveProgress(progress);

    if (processed < Math.min(toProcess.length, LIMIT)) {
      const delay = RATE_LIMIT_MS[activeProvider];
      process.stdout.write(`  Waiting ${delay/1000}s...\n`);
      await new Promise(r => setTimeout(r, delay));
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`DONE [${providerLabel}]: ${succeeded} succeeded, ${failedCount} failed`);
  const allFailed = Object.entries(progress).filter(([,v]) => v==='failed').length;
  if (allFailed > 0) console.log(`${allFailed} total failed — run again to retry`);
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
