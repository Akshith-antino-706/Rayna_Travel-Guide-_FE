import OpenAI from "openai";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { CITIES, type City } from "./cities.js";
import { TOPICS, type Topic } from "./topics.js";
import "dotenv/config";

// ─── CONFIG ───
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MODEL = "gpt-4o";
const TEMPERATURE = 0.7;
const MAX_TOKENS = 4096;
const DEFAULT_CONCURRENCY = 5;
const BATCH_SIZE = 20;
const RETRY_COUNT = 3;
const RETRY_BASE_DELAY_MS = 2000;
const CONTENT_DIR = path.resolve(__dirname, "../src/content/blog");
const PROGRESS_FILE = path.resolve(__dirname, "progress.json");
const COST_PER_1M_INPUT = 2.5;
const COST_PER_1M_OUTPUT = 10.0;

// ─── CLI ARGS ───
interface CLIArgs {
  city?: string;
  topic?: string;
  batch?: number;
  resume: boolean;
  dryRun: boolean;
  concurrency: number;
  force: boolean;
}

function parseArgs(): CLIArgs {
  const args = process.argv.slice(2);
  const result: CLIArgs = {
    resume: false,
    dryRun: false,
    concurrency: DEFAULT_CONCURRENCY,
    force: false,
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--city":
        result.city = args[++i];
        break;
      case "--topic":
        result.topic = args[++i];
        break;
      case "--batch":
        result.batch = parseInt(args[++i], 10);
        break;
      case "--resume":
        result.resume = true;
        break;
      case "--dry-run":
        result.dryRun = true;
        break;
      case "--concurrency":
        result.concurrency = parseInt(args[++i], 10);
        break;
      case "--force":
        result.force = true;
        break;
      case "--help":
        printHelp();
        process.exit(0);
    }
  }
  return result;
}

function printHelp() {
  console.log(`
Usage: npx tsx scripts/generate-content.ts [options]

Options:
  --city <slug>        Generate for a specific city (e.g., --city dubai)
  --topic <slug>       Generate a specific topic (e.g., --topic 1-day-itinerary)
  --batch <n>          Generate batch N (${BATCH_SIZE} cities per batch)
  --resume             Skip already completed articles
  --dry-run            Estimate cost without generating
  --concurrency <n>    Parallel requests (default: ${DEFAULT_CONCURRENCY})
  --force              Overwrite existing files
  --help               Show this help

Examples:
  npx tsx scripts/generate-content.ts --dry-run
  npx tsx scripts/generate-content.ts --city dubai
  npx tsx scripts/generate-content.ts --batch 1 --concurrency 10
  npx tsx scripts/generate-content.ts --resume --concurrency 8
`);
}

// ─── PROGRESS TRACKING ───
type ProgressStatus = "done" | "failed" | "skipped";
type Progress = Record<string, ProgressStatus>;

function loadProgress(): Progress {
  if (fs.existsSync(PROGRESS_FILE)) {
    return JSON.parse(fs.readFileSync(PROGRESS_FILE, "utf-8"));
  }
  return {};
}

function saveProgress(progress: Progress) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

// ─── TOKEN & COST TRACKING ───
let totalInputTokens = 0;
let totalOutputTokens = 0;

function estimateCost(): string {
  const inputCost = (totalInputTokens / 1_000_000) * COST_PER_1M_INPUT;
  const outputCost = (totalOutputTokens / 1_000_000) * COST_PER_1M_OUTPUT;
  return `$${(inputCost + outputCost).toFixed(2)}`;
}

// ─── SLUG & TEMPLATE HELPERS ───
function resolveSlug(template: string, city: City): string {
  return template
    .replace(/\{city\}/g, city.slug)
    .replace(
      /\{nearby-city\}/g,
      city.nearbyCity
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
    );
}

function resolveTemplate(template: string, city: City): string {
  return template
    .replace(/\{city\}/g, city.name)
    .replace(/\{country\}/g, city.country)
    .replace(/\{currency\}/g, city.currency)
    .replace(/\{language\}/g, city.language)
    .replace(/\{signatureExperience\}/g, city.signatureExperience)
    .replace(/\{famousAttraction\}/g, city.famousAttraction)
    .replace(/\{nearbyCity\}/g, city.nearbyCity);
}

function computeRelatedSlugs(city: City, topic: Topic): string[] {
  const sameCat = TOPICS.filter(
    (t) => t.category === topic.category && t.slug !== topic.slug
  );
  const related = sameCat.slice(0, 3).map((t) => resolveSlug(t.slug, city));
  if (related.length < 3) {
    const others = TOPICS.filter(
      (t) => t.category !== topic.category && t.slug !== topic.slug
    );
    for (const t of others) {
      if (related.length >= 3) break;
      related.push(resolveSlug(t.slug, city));
    }
  }
  return related;
}

function getUnsplashUrl(city: City): string {
  return `https://images.unsplash.com/${city.unsplashId}?w=1200&h=675&fit=crop`;
}

function computePubDate(cityIndex: number, topicIndex: number): string {
  const baseDate = new Date("2026-01-15T08:00:00.000Z");
  const dayOffset = cityIndex * 2 + Math.floor(topicIndex / 10);
  const hourOffset = topicIndex % 24;
  const minuteOffset = (cityIndex * 7 + topicIndex * 3) % 60;
  const date = new Date(baseDate);
  date.setDate(date.getDate() + dayOffset);
  date.setHours(date.getHours() + hourOffset);
  date.setMinutes(date.getMinutes() + minuteOffset);
  return date.toISOString();
}

// ─── FRONTMATTER BUILDER ───
function buildFrontmatter(
  city: City,
  topic: Topic,
  cityIndex: number,
  topicIndex: number
): string {
  const title = resolveTemplate(topic.titleTemplate, city);
  const description = resolveTemplate(topic.descriptionTemplate, city);
  const slug = resolveSlug(topic.slug, city);
  const relatedSlugs = computeRelatedSlugs(city, topic);

  return `---
title: "${title}"
description: "${description}"
city: "${city.name}"
country: "${city.country}"
category: "${topic.category}"
topic: "${slug}"
author: "Travel Writer"
pubDate: ${computePubDate(cityIndex, topicIndex)}
heroImage: "${getUnsplashUrl(city)}"
heroImageAlt: "${city.name} - ${topic.category}"
keywords: ["${city.name} travel","things to do in ${city.name}","${city.name} guide","visit ${city.name}","${city.country}"]
tags: ["${topic.category}","${city.country}","${city.continent}","top-destination"]
seoTitle: "${title} | Travel Guide"
seoDescription: "${description}"
relatedSlugs: [${relatedSlugs.map((s) => `"${s}"`).join(",")}]
readingTime: ${topic.readingTime}
featured: ${topic.featured ? "true" : "false"}
draft: false
---`;
}

// ─── OPENAI ───
function createClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("ERROR: OPENAI_API_KEY not set in .env");
    process.exit(1);
  }
  return new OpenAI({ apiKey });
}

const SYSTEM_PROMPT = `You are a professional travel writer creating high-quality, SEO-optimized travel guide articles. Follow these rules strictly:

1. Write 1800-2500 words of engaging, informative content
2. Start with a single H1 heading (#) as the article title
3. Use H2 (##) for major sections and H3 (###) for subsections
4. Include specific details: addresses, costs in local currency with USD equivalents, opening hours, travel times
5. Add "**Tip:**" or "**Insider Tip:**" callouts with practical advice
6. Use bullet points for lists and bold text for emphasis
7. Write in a professional yet approachable tone — informative, practical, encouraging
8. Include real, accurate information about the destination
9. Organize content logically with clear hierarchy
10. End with a brief conclusion or summary
11. Do NOT include frontmatter — only write the markdown content body
12. Do NOT use generic filler — every sentence should provide value`;

async function generateArticle(
  client: OpenAI,
  city: City,
  topic: Topic
): Promise<{ content: string; inputTokens: number; outputTokens: number }> {
  const userPrompt = resolveTemplate(topic.promptTemplate, city);

  let lastError: Error | null = null;
  for (let attempt = 0; attempt < RETRY_COUNT; attempt++) {
    try {
      const response = await client.chat.completions.create({
        model: MODEL,
        temperature: TEMPERATURE,
        max_tokens: MAX_TOKENS,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
      });

      const content = response.choices[0]?.message?.content || "";
      const inputTokens = response.usage?.prompt_tokens || 0;
      const outputTokens = response.usage?.completion_tokens || 0;

      return { content, inputTokens, outputTokens };
    } catch (error: any) {
      lastError = error;
      const status = error?.status || error?.response?.status;
      const isRetryable = status === 429 || status === 500 || status === 503;

      if (isRetryable && attempt < RETRY_COUNT - 1) {
        const delay = RETRY_BASE_DELAY_MS * Math.pow(2, attempt);
        console.log(
          `  ! Rate limited (${status}), retrying in ${delay}ms (attempt ${attempt + 1}/${RETRY_COUNT})...`
        );
        await sleep(delay);
      } else {
        throw error;
      }
    }
  }
  throw lastError;
}

// ─── CONCURRENCY ───
class Semaphore {
  private queue: (() => void)[] = [];
  private current = 0;
  constructor(private max: number) {}
  async acquire(): Promise<void> {
    if (this.current < this.max) {
      this.current++;
      return;
    }
    return new Promise((resolve) => {
      this.queue.push(() => {
        this.current++;
        resolve();
      });
    });
  }
  release() {
    this.current--;
    if (this.queue.length > 0) this.queue.shift()!();
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── SKIP LOGIC ───
function shouldSkip(city: City, topic: Topic): boolean {
  if (topic.requiresBeach && !city.hasBeach) return true;
  if (topic.requiresYacht && !city.hasYacht) return true;
  return false;
}

// ─── MAIN ───
async function main() {
  const args = parseArgs();
  const progress = args.resume ? loadProgress() : {};

  // Filter cities
  let cities = [...CITIES];
  if (args.city) {
    cities = cities.filter((c) => c.slug === args.city);
    if (cities.length === 0) {
      console.error(
        `City "${args.city}" not found. Available: ${CITIES.map((c) => c.slug).join(", ")}`
      );
      process.exit(1);
    }
  }
  if (args.batch !== undefined) {
    const start = (args.batch - 1) * BATCH_SIZE;
    cities = CITIES.slice(start, start + BATCH_SIZE);
    if (cities.length === 0) {
      console.error(
        `Batch ${args.batch} out of range. Max: ${Math.ceil(CITIES.length / BATCH_SIZE)}`
      );
      process.exit(1);
    }
  }

  // Filter topics
  let topics = [...TOPICS];
  if (args.topic) {
    topics = topics.filter((t) => {
      const base = t.slug
        .replace(/\{city\}/g, "")
        .replace(/\{nearby-city\}/g, "")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      const search = args
        .topic!.replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      return base === search || t.slug.includes(args.topic!) || base.includes(search);
    });
    if (topics.length === 0) {
      console.error(`Topic "${args.topic}" not found.`);
      process.exit(1);
    }
  }

  // Build jobs
  type Job = {
    city: City;
    topic: Topic;
    cityIndex: number;
    topicIndex: number;
    key: string;
    filePath: string;
  };
  const jobs: Job[] = [];
  let skippedCount = 0;
  let existingCount = 0;

  for (const city of cities) {
    const cityDir = path.join(CONTENT_DIR, city.slug);
    for (const topic of topics) {
      if (shouldSkip(city, topic)) {
        skippedCount++;
        continue;
      }
      const slug = resolveSlug(topic.slug, city);
      const key = `${city.slug}/${slug}`;
      const filePath = path.join(cityDir, `${slug}.md`);

      if (args.resume && progress[key] === "done") {
        existingCount++;
        continue;
      }
      if (!args.force && fs.existsSync(filePath)) {
        progress[key] = "done";
        existingCount++;
        continue;
      }

      jobs.push({
        city,
        topic,
        cityIndex: CITIES.indexOf(city),
        topicIndex: TOPICS.indexOf(topic),
        key,
        filePath,
      });
    }
  }

  // Summary
  console.log("\n========================================");
  console.log("  TRAVEL BLOG CONTENT GENERATOR");
  console.log("========================================\n");
  console.log(`  Cities:       ${cities.length}`);
  console.log(`  Topics:       ${topics.length}`);
  console.log(`  To generate:  ${jobs.length}`);
  console.log(`  Skipped:      ${skippedCount} (not applicable)`);
  console.log(`  Existing:     ${existingCount} (already done)`);
  console.log(`  Concurrency:  ${args.concurrency}`);
  console.log(`  Model:        ${MODEL}`);

  const estInputTokens = jobs.length * 1500;
  const estOutputTokens = jobs.length * 4000;
  const estCost =
    (estInputTokens / 1_000_000) * COST_PER_1M_INPUT +
    (estOutputTokens / 1_000_000) * COST_PER_1M_OUTPUT;
  console.log(`\n  Est. cost:    $${estCost.toFixed(2)}`);
  console.log(
    `  Est. time:    ~${Math.ceil((jobs.length * 8) / args.concurrency / 60)} minutes\n`
  );

  if (args.dryRun) {
    console.log("  [DRY RUN] No content generated.\n");
    const counts: Record<string, number> = {};
    for (const j of jobs) counts[j.city.name] = (counts[j.city.name] || 0) + 1;
    console.log("  Per-city breakdown:");
    Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .forEach(([name, n]) => console.log(`    ${name}: ${n}`));
    console.log();
    return;
  }

  if (jobs.length === 0) {
    console.log("  Nothing to generate.\n");
    return;
  }

  // Generate
  const client = createClient();
  const sem = new Semaphore(args.concurrency);
  let completed = 0;
  let failed = 0;
  const t0 = Date.now();

  const promises = jobs.map(async (job) => {
    await sem.acquire();
    try {
      const dir = path.dirname(job.filePath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

      const { content, inputTokens, outputTokens } = await generateArticle(
        client,
        job.city,
        job.topic
      );
      totalInputTokens += inputTokens;
      totalOutputTokens += outputTokens;

      const fm = buildFrontmatter(
        job.city,
        job.topic,
        job.cityIndex,
        job.topicIndex
      );
      fs.writeFileSync(job.filePath, `${fm}\n\n${content}\n`, "utf-8");

      progress[job.key] = "done";
      saveProgress(progress);

      completed++;
      const elapsed = ((Date.now() - t0) / 1000).toFixed(0);
      const pct = ((completed / jobs.length) * 100).toFixed(1);
      console.log(
        `  [${completed}/${jobs.length}] ${pct}% | ${job.city.name} / ${resolveSlug(job.topic.slug, job.city)} (${elapsed}s, ${estimateCost()})`
      );
    } catch (error: any) {
      failed++;
      progress[job.key] = "failed";
      saveProgress(progress);
      console.error(
        `  FAIL: ${job.city.name} / ${resolveSlug(job.topic.slug, job.city)} - ${error.message}`
      );
    } finally {
      sem.release();
    }
  });

  await Promise.allSettled(promises);

  const mins = ((Date.now() - t0) / 1000 / 60).toFixed(1);
  console.log("\n========================================");
  console.log("  GENERATION COMPLETE");
  console.log("========================================\n");
  console.log(`  Completed:     ${completed}`);
  console.log(`  Failed:        ${failed}`);
  console.log(`  Time:          ${mins} minutes`);
  console.log(`  Cost:          ${estimateCost()}`);
  console.log(`  Input tokens:  ${totalInputTokens.toLocaleString()}`);
  console.log(`  Output tokens: ${totalOutputTokens.toLocaleString()}\n`);

  if (failed > 0) {
    console.log(`  ${failed} failed. Run with --resume to retry.\n`);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
