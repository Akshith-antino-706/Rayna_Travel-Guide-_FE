import { Router } from 'express';
import path from 'path';
import { parseArticle, listArticleFiles } from '../lib/markdown.js';
import { computeSeoScore } from '../lib/seo-scorer.js';
import { analyzeContent } from '../lib/content-analyzer.js';

const router = Router();

const CONTENT_DIR = path.resolve(import.meta.dirname, '../../..', 'blog/src/content/blog');

// GET /api/export/:city - export all articles for a city as JSON download
router.get('/export/:city', (req, res) => {
  try {
    const { city } = req.params;
    const cityDir = path.join(CONTENT_DIR, city);
    const files = listArticleFiles(cityDir);

    const articles = files.map((file) => {
      const filePath = path.join(cityDir, file);
      const { frontmatter, body } = parseArticle(filePath);
      const seo = computeSeoScore(frontmatter, body);
      const stats = analyzeContent(body, frontmatter);
      const slug = file.replace(/\.md$/, '');

      return { slug, fileName: file, frontmatter, seo, stats, body };
    });

    const exportData = {
      city,
      exportedAt: new Date().toISOString(),
      totalArticles: articles.length,
      articles,
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="${city}-content-export.json"`);
    res.json(exportData);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
