import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

export interface ParsedArticle {
  frontmatter: Record<string, any>;
  body: string;
  raw: string;
}

export function parseArticle(filePath: string): ParsedArticle {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data: frontmatter, content: body } = matter(raw);
  return { frontmatter, body: body.trim(), raw };
}

export function saveArticle(
  filePath: string,
  frontmatter: Record<string, any>,
  body: string,
): void {
  // Set updatedDate to now on every save
  frontmatter.updatedDate = new Date().toISOString();

  // gray-matter.stringify places body after frontmatter block
  const output = matter.stringify('\n' + body.trim() + '\n', frontmatter);
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, output, 'utf-8');
}

export function listCityDirs(contentDir: string): string[] {
  if (!fs.existsSync(contentDir)) return [];
  return fs
    .readdirSync(contentDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
}

export function listArticleFiles(cityDir: string): string[] {
  if (!fs.existsSync(cityDir)) return [];
  return fs
    .readdirSync(cityDir)
    .filter((f) => f.endsWith('.md'))
    .sort();
}
