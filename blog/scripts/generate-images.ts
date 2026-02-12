/**
 * DALL-E 3 Image Generator for Travel Blog
 * -----------------------------------------
 * Generates unique, high-quality AI images for each travel article.
 *
 * Usage:
 *   npm run generate:images                    # Generate all missing images
 *   npm run generate:images -- --city dubai     # Generate for specific city
 *   npm run generate:images -- --force          # Regenerate all (overwrite)
 *   npm run generate:images -- --dry-run        # Preview prompts without generating
 */

import 'dotenv/config';
import OpenAI from 'openai';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');
const CONTENT_DIR = path.join(PROJECT_ROOT, 'src', 'content', 'blog');

// ─── Configuration ───────────────────────────────────────────────────────────

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const DALLE_CONFIG = {
  model: 'dall-e-3' as const,
  quality: 'standard' as const,
  style: 'natural' as const,     // "natural" for photos, "vivid" for artistic
  response_format: 'url' as const,
};

const IMAGE_SIZES = {
  hero: '1792x1024' as const,     // Landscape for hero banners
  article: '1792x1024' as const,  // Landscape for article headers
  sidebar: '1024x1024' as const,  // Square for sidebar galleries
  thumbnail: '1024x1024' as const,// Square for card thumbnails
};

// ─── Image Prompt Templates ─────────────────────────────────────────────────

interface ImageSpec {
  filename: string;
  prompt: string;
  size: keyof typeof IMAGE_SIZES;
  category: 'hero' | 'article' | 'sidebar';
}

/**
 * Generate image specs for a given city.
 * These prompts are crafted to produce stunning, text-free travel photography.
 */
function getCityImageSpecs(city: string, country: string): ImageSpec[] {
  const cityLower = city.toLowerCase().replace(/\s+/g, '-');

  // Base photography style suffix
  const photoStyle = 'Professional travel photography, ultra high quality, cinematic lighting, sharp focus, no text, no watermarks, no logos, no words, no letters, no numbers';

  return [
    // ─── Site Hero ───
    {
      filename: `${cityLower}-hero.webp`,
      prompt: `A breathtaking wide panoramic photograph of the ${city} skyline at golden hour sunset, featuring the most iconic landmarks and architecture, warm orange and gold tones reflecting on water or glass buildings. ${photoStyle}`,
      size: 'hero',
      category: 'hero',
    },

    // ─── Article Images (mapped to topic categories) ───
    {
      filename: `${cityLower}-travel-guide.webp`,
      prompt: `An aerial photograph of ${city}, ${country} showing the most famous landmarks from a drone perspective, with the coastline or landscape visible, vivid colors, clear sky, travel magazine cover quality. ${photoStyle}`,
      size: 'article',
      category: 'article',
    },
    {
      filename: `${cityLower}-budget-vs-luxury.webp`,
      prompt: `A split-composition photograph showing the contrast of ${city}: one side showing a vibrant traditional local market with colorful goods and warm ambient lighting, the other side showing an ultra-luxurious hotel lobby or restaurant with gold accents and chandeliers, rich warm colors. ${photoStyle}`,
      size: 'article',
      category: 'article',
    },
    {
      filename: `${cityLower}-safety.webp`,
      prompt: `A peaceful photograph of a well-lit ${city} promenade or boulevard at twilight with families and couples walking safely, modern city lights in the background, famous landmarks visible in the distance, calm and welcoming atmosphere. ${photoStyle}`,
      size: 'article',
      category: 'article',
    },
    {
      filename: `${cityLower}-things-to-do.webp`,
      prompt: `A vibrant photograph from the top of the most famous observation point in ${city}, looking down at the sprawling city with parks, rivers or coastline visible, dramatic perspective showing the scale and beauty of the city, golden hour light. ${photoStyle}`,
      size: 'article',
      category: 'article',
    },
    {
      filename: `${cityLower}-experiences.webp`,
      prompt: `A stunning action photograph of the most popular outdoor adventure or cultural experience in ${city}, ${country} — such as a desert safari, boat ride, cultural festival, or nature excursion — with dramatic lighting, vivid colors, and a sense of excitement. ${photoStyle}`,
      size: 'article',
      category: 'article',
    },
    {
      filename: `${cityLower}-itinerary.webp`,
      prompt: `A beautiful photograph of the most iconic landmark in ${city} during blue hour with city lights glowing warmly, perfect symmetry, long exposure effect on any moving elements, professional architecture and cityscape photography. ${photoStyle}`,
      size: 'article',
      category: 'article',
    },
    {
      filename: `${cityLower}-food.webp`,
      prompt: `A top-down food photography shot of a beautifully arranged spread of traditional ${city}, ${country} cuisine on an ornate table: local signature dishes, fresh bread, colorful sides, traditional beverages in authentic serving ware. Warm ambient restaurant lighting. ${photoStyle}`,
      size: 'article',
      category: 'article',
    },
    {
      filename: `${cityLower}-shopping.webp`,
      prompt: `An impressive interior photograph of a famous shopping destination in ${city} — either a grand modern mall or a traditional market/souk — with beautiful architecture, warm lighting, and a sense of grandeur. Wide-angle perspective. ${photoStyle}`,
      size: 'article',
      category: 'article',
    },
    {
      filename: `${cityLower}-hotels.webp`,
      prompt: `A luxurious photograph of a premium hotel in ${city} with a stunning view — infinity pool, rooftop terrace, or balcony overlooking the city skyline, plush furnishings, golden hour lighting, ultimate luxury travel atmosphere. ${photoStyle}`,
      size: 'article',
      category: 'article',
    },
    {
      filename: `${cityLower}-currency.webp`,
      prompt: `A stylish still life photograph featuring local currency of ${country} alongside a cup of local traditional beverage, a small shopping bag, and a folded city map, on a textured wooden surface with soft natural side lighting, shallow depth of field. ${photoStyle}`,
      size: 'article',
      category: 'article',
    },
    {
      filename: `${cityLower}-visa.webp`,
      prompt: `A modern photograph of the international airport or main transport hub in ${city} — sleek architecture, glass facades, warm lighting, travelers in a beautiful terminal building, welcoming atmosphere. ${photoStyle}`,
      size: 'article',
      category: 'article',
    },

    // ─── Sidebar Gallery Images ───
    {
      filename: `${cityLower}-sidebar-1.webp`,
      prompt: `A vertical photograph of the most iconic tower or tall building in ${city} at night with colorful lights and reflections in nearby water, vibrant blues and purples, professional night photography. ${photoStyle}`,
      size: 'sidebar',
      category: 'sidebar',
    },
    {
      filename: `${cityLower}-sidebar-2.webp`,
      prompt: `A photograph of a traditional cultural scene in ${city} — old quarter, traditional boats, historic market, or local craftsmen at work — at sunset with golden warm tones, cultural atmosphere. ${photoStyle}`,
      size: 'sidebar',
      category: 'sidebar',
    },
    {
      filename: `${cityLower}-sidebar-3.webp`,
      prompt: `A photograph of the most unique geographic or architectural feature near ${city} from an aerial perspective — an island, mountain, desert, river, or iconic bridge — surrounded by beautiful water or landscape, vivid colors, dramatic scale. ${photoStyle}`,
      size: 'sidebar',
      category: 'sidebar',
    },
  ];
}

// ─── Mapping: article filename → image filename ──────────────────────────────

/**
 * Maps markdown article filenames to their corresponding generated image.
 * This is used to update frontmatter heroImage fields.
 */
function getArticleImageMap(citySlug: string): Record<string, string> {
  return {
    [`complete-${citySlug}-travel-guide.md`]: `${citySlug}-travel-guide.webp`,
    [`${citySlug}-budget-vs-luxury-guide.md`]: `${citySlug}-budget-vs-luxury.webp`,
    [`${citySlug}-safety-guide.md`]: `${citySlug}-safety.webp`,
    [`top-things-to-do-${citySlug}.md`]: `${citySlug}-things-to-do.webp`,
    [`${citySlug}-desert-safari-guide.md`]: `${citySlug}-experiences.webp`,
    [`3-day-${citySlug}-itinerary.md`]: `${citySlug}-itinerary.webp`,
    [`what-to-eat-${citySlug}.md`]: `${citySlug}-food.webp`,
    [`best-shopping-malls-${citySlug}.md`]: `${citySlug}-shopping.webp`,
    [`best-hotels-${citySlug}.md`]: `${citySlug}-hotels.webp`,
    [`${citySlug}-currency-guide.md`]: `${citySlug}-currency.webp`,
    [`${citySlug}-visa-guide.md`]: `${citySlug}-visa.webp`,
  };
}

// ─── Image Generation ────────────────────────────────────────────────────────

async function generateImage(spec: ImageSpec): Promise<string | null> {
  const size = IMAGE_SIZES[spec.size];

  try {
    console.log(`  Calling DALL-E 3 (${size})...`);
    const response = await openai.images.generate({
      ...DALLE_CONFIG,
      prompt: spec.prompt,
      size: size,
      n: 1,
    });

    const imageUrl = response.data[0]?.url;
    const revisedPrompt = response.data[0]?.revised_prompt;

    if (revisedPrompt) {
      console.log(`  Revised: ${revisedPrompt.slice(0, 80)}...`);
    }

    return imageUrl || null;
  } catch (error: any) {
    console.error(`  API Error: ${error.message}`);
    if (error.code === 'content_policy_violation') {
      console.error('  Content policy violation — trying with simplified prompt...');
      // Retry with a simpler prompt
      try {
        const simplePrompt = `Beautiful travel photograph of a famous location, ${spec.prompt.split(',').slice(0, 2).join(',')}. Professional photography, no text.`;
        const retryResponse = await openai.images.generate({
          ...DALLE_CONFIG,
          prompt: simplePrompt,
          size: size,
          n: 1,
        });
        return retryResponse.data[0]?.url || null;
      } catch {
        return null;
      }
    }
    return null;
  }
}

async function downloadImage(url: string, savePath: string): Promise<boolean> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    await fs.writeFile(savePath, buffer);
    const stats = await fs.stat(savePath);
    console.log(`  Saved: ${path.basename(savePath)} (${(stats.size / 1024).toFixed(0)} KB)`);
    return true;
  } catch (error: any) {
    console.error(`  Download error: ${error.message}`);
    return false;
  }
}

// ─── Markdown Updater ────────────────────────────────────────────────────────

async function updateMarkdownImages(city: string, citySlug: string): Promise<void> {
  const cityContentDir = path.join(CONTENT_DIR, citySlug);
  const imageMap = getArticleImageMap(citySlug);

  try {
    const files = await fs.readdir(cityContentDir);
    const mdFiles = files.filter(f => f.endsWith('.md'));

    for (const mdFile of mdFiles) {
      const imageName = imageMap[mdFile];
      if (!imageName) continue;

      const imagePath = `/images/${citySlug}/${imageName}`;
      const filePath = path.join(cityContentDir, mdFile);
      let content = await fs.readFile(filePath, 'utf-8');

      // Replace heroImage in frontmatter
      content = content.replace(
        /heroImage:\s*['"]?.*?['"]?\s*$/m,
        `heroImage: '${imagePath}'`
      );

      await fs.writeFile(filePath, content);
      console.log(`  Updated: ${mdFile} → ${imagePath}`);
    }
  } catch (error: any) {
    console.error(`  Error updating markdown: ${error.message}`);
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes('--force');
  const dryRun = args.includes('--dry-run');
  const cityArg = args.find((_, i, a) => a[i - 1] === '--city') || 'dubai';

  // City configurations (expand this as you add more cities)
  const cities: Record<string, { name: string; country: string }> = {
    dubai: { name: 'Dubai', country: 'UAE' },
    paris: { name: 'Paris', country: 'France' },
    tokyo: { name: 'Tokyo', country: 'Japan' },
    london: { name: 'London', country: 'United Kingdom' },
    newyork: { name: 'New York', country: 'USA' },
    bali: { name: 'Bali', country: 'Indonesia' },
    rome: { name: 'Rome', country: 'Italy' },
    bangkok: { name: 'Bangkok', country: 'Thailand' },
    istanbul: { name: 'Istanbul', country: 'Turkey' },
    singapore: { name: 'Singapore', country: 'Singapore' },
  };

  const cityConfig = cities[cityArg.toLowerCase()];
  if (!cityConfig) {
    console.error(`Unknown city: ${cityArg}. Available: ${Object.keys(cities).join(', ')}`);
    process.exit(1);
  }

  const citySlug = cityArg.toLowerCase();
  const imageDir = path.join(PUBLIC_DIR, 'images', citySlug);
  await fs.mkdir(imageDir, { recursive: true });

  const specs = getCityImageSpecs(cityConfig.name, cityConfig.country);

  console.log(`\n🎨 DALL-E 3 Image Generator for ${cityConfig.name} Travel Blog`);
  console.log(`${'─'.repeat(55)}`);
  console.log(`City: ${cityConfig.name}, ${cityConfig.country}`);
  console.log(`Images to generate: ${specs.length}`);
  console.log(`Output: ${imageDir}`);
  console.log(`Mode: ${dryRun ? 'DRY RUN' : force ? 'FORCE (overwrite)' : 'Normal (skip existing)'}`);
  console.log(`${'─'.repeat(55)}\n`);

  if (dryRun) {
    specs.forEach((spec, i) => {
      console.log(`[${i + 1}/${specs.length}] ${spec.filename}`);
      console.log(`  Size: ${IMAGE_SIZES[spec.size]}`);
      console.log(`  Prompt: ${spec.prompt.slice(0, 120)}...`);
      console.log();
    });
    console.log('Dry run complete. No images generated.');
    return;
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error('ERROR: OPENAI_API_KEY not found. Create a .env file with your key.');
    process.exit(1);
  }

  const results: { filename: string; success: boolean }[] = [];

  for (let i = 0; i < specs.length; i++) {
    const spec = specs[i];
    const savePath = path.join(imageDir, spec.filename);

    // Skip existing unless --force
    try {
      const stat = await fs.stat(savePath);
      if (!force && stat.size > 10000) {
        console.log(`[${i + 1}/${specs.length}] SKIP (exists): ${spec.filename}`);
        results.push({ filename: spec.filename, success: true });
        continue;
      }
    } catch {
      // File doesn't exist, generate it
    }

    console.log(`[${i + 1}/${specs.length}] Generating: ${spec.filename}`);
    const imageUrl = await generateImage(spec);

    if (imageUrl) {
      const success = await downloadImage(imageUrl, savePath);
      results.push({ filename: spec.filename, success });
    } else {
      results.push({ filename: spec.filename, success: false });
      console.log(`  FAILED`);
    }

    // Rate limiting: pause between API calls
    if (i < specs.length - 1) {
      console.log(`  Waiting 1.5s...\n`);
      await new Promise(r => setTimeout(r, 1500));
    }
  }

  // Update markdown files to point to generated images
  console.log(`\n📝 Updating markdown frontmatter...`);
  await updateMarkdownImages(cityConfig.name, citySlug);

  // Summary
  const successCount = results.filter(r => r.success).length;
  console.log(`\n${'═'.repeat(55)}`);
  console.log(`✅ GENERATION COMPLETE: ${successCount}/${results.length} images`);
  console.log(`${'═'.repeat(55)}`);
  results.forEach(r => {
    const icon = r.success ? '✅' : '❌';
    console.log(`  ${icon} ${r.filename}`);
  });

  if (successCount < results.length) {
    console.log(`\n⚠️  ${results.length - successCount} images failed. Run again to retry.`);
  }
}

main().catch(console.error);
