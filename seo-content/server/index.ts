import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import articlesRouter from './routes/articles.js';
import exportRouter from './routes/export.js';
import { listCityDirs, listArticleFiles } from './lib/markdown.js';

const app = express();
const PORT = 4002;

const CONTENT_DIR = path.resolve(import.meta.dirname, '../..', 'blog/src/content/blog');

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// API routes
app.use('/api', articlesRouter);
app.use('/api', exportRouter);

// Health check
app.get('/api/health', (_req, res) => {
  try {
    const dirs = listCityDirs(CONTENT_DIR);
    let totalArticles = 0;
    for (const dir of dirs) {
      totalArticles += listArticleFiles(path.join(CONTENT_DIR, dir)).length;
    }
    res.json({
      status: 'connected',
      contentPath: CONTENT_DIR,
      citiesCount: dirs.length,
      articlesCount: totalArticles,
    });
  } catch (err: any) {
    res.status(500).json({ status: 'error', error: err.message });
  }
});

// In production, serve the built frontend
if (process.env.NODE_ENV === 'production') {
  const distDir = path.resolve(import.meta.dirname, '..', 'client', 'dist');
  if (fs.existsSync(distDir)) {
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }
}

app.listen(PORT, () => {
  console.log(`Dashboard API server running at http://localhost:${PORT}`);
  console.log(`Content directory: ${CONTENT_DIR}`);
});
