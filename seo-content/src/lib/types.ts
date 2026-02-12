export interface City {
  slug: string;
  name: string;
  country: string;
  articleCount: number;
}

export interface ArticleSummary {
  slug: string;
  fileName: string;
  title: string;
  category: string;
  seoScore: number;
  wordCount: number;
  totalSections: number;
  keywordsCount: number;
  featured: boolean;
  draft: boolean;
  pubDate: string;
}

export interface SeoCheck {
  name: string;
  score: number;
  maxPoints: number;
  status: 'good' | 'warning' | 'error';
  message: string;
}

export interface SeoScore {
  score: number;
  checks: SeoCheck[];
}

export interface ContentSection {
  name: string;
  items: number;
  status: 'COMPLETE' | 'INCOMPLETE';
}

export interface ContentStats {
  totalSections: number;
  attractionsCount: number;
  keywordsCount: number;
  faqCount: number;
  wordCount: number;
  sections: ContentSection[];
}

export interface ArticleDetail {
  slug: string;
  city: string;
  frontmatter: Record<string, any>;
  body: string;
  bodyHtml: string;
  seo: SeoScore;
  stats: ContentStats;
}

export interface HealthStatus {
  status: 'connected' | 'error';
  contentPath: string;
  citiesCount: number;
  articlesCount: number;
}

export type TabId = 'overview' | 'seo' | 'content' | 'raw';
