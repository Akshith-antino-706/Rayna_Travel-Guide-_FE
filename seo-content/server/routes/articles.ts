import { Router } from 'express';
import path from 'path';
import { parseArticle, saveArticle, listCityDirs, listArticleFiles } from '../lib/markdown.js';
import { computeSeoScore } from '../lib/seo-scorer.js';
import { analyzeContent } from '../lib/content-analyzer.js';
import { validateFrontmatter } from '../lib/schema.js';
import { marked } from 'marked';

const router = Router();

const CONTENT_DIR = path.resolve(import.meta.dirname, '../../..', 'blog/src/content/blog');

// GET /api/cities - list all cities with article counts
router.get('/cities', (_req, res) => {
  try {
    const dirs = listCityDirs(CONTENT_DIR);
    const cities = dirs.map((slug) => {
      const cityDir = path.join(CONTENT_DIR, slug);
      const files = listArticleFiles(cityDir);
      // Read the first article to get city name and country
      let name = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      let country = '';
      if (files.length > 0) {
        try {
          const first = parseArticle(path.join(cityDir, files[0]));
          name = first.frontmatter.city || name;
          country = first.frontmatter.country || '';
        } catch { /* use fallback name */ }
      }
      return { slug, name, country, articleCount: files.length };
    });
    res.json(cities);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/articles?city=dubai - list all articles for a city
router.get('/articles', (req, res) => {
  try {
    const citySlug = req.query.city as string;
    if (!citySlug) return res.status(400).json({ error: 'city query param required' });

    const cityDir = path.join(CONTENT_DIR, citySlug);
    const files = listArticleFiles(cityDir);

    const articles = files.map((file) => {
      const filePath = path.join(cityDir, file);
      const { frontmatter, body } = parseArticle(filePath);
      const seo = computeSeoScore(frontmatter, body);
      const stats = analyzeContent(body, frontmatter);
      const slug = file.replace(/\.md$/, '');

      return {
        slug,
        fileName: file,
        title: frontmatter.title || slug,
        category: frontmatter.category || '',
        seoScore: seo.score,
        wordCount: stats.wordCount,
        totalSections: stats.totalSections,
        keywordsCount: stats.keywordsCount,
        featured: frontmatter.featured || false,
        draft: frontmatter.draft || false,
        pubDate: frontmatter.pubDate,
      };
    });

    res.json(articles);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/articles/:city/:slug - get full article detail
router.get('/articles/:city/:slug', (req, res) => {
  try {
    const { city, slug } = req.params;
    const filePath = path.join(CONTENT_DIR, city, `${slug}.md`);
    const { frontmatter, body } = parseArticle(filePath);
    const seo = computeSeoScore(frontmatter, body);
    const stats = analyzeContent(body, frontmatter);
    const bodyHtml = marked(body);

    res.json({
      slug,
      city,
      frontmatter,
      body,
      bodyHtml,
      seo,
      stats,
    });
  } catch (err: any) {
    if (err.code === 'ENOENT') return res.status(404).json({ error: 'Article not found' });
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/articles/:city/:slug - save article
router.put('/articles/:city/:slug', (req, res) => {
  try {
    const { city, slug } = req.params;
    const { frontmatter, body } = req.body;

    if (!frontmatter || body === undefined) {
      return res.status(400).json({ error: 'frontmatter and body are required' });
    }

    // Validate frontmatter
    const validation = validateFrontmatter(frontmatter);
    if (!validation.success) {
      return res.status(400).json({ error: 'Invalid frontmatter', details: validation.error.issues });
    }

    const filePath = path.join(CONTENT_DIR, city, `${slug}.md`);
    saveArticle(filePath, frontmatter, body);

    // Return updated SEO score
    const seo = computeSeoScore(frontmatter, body);
    const stats = analyzeContent(body, frontmatter);

    res.json({ success: true, seoScore: seo.score, seo, stats });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
