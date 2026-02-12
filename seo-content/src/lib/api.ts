import type { City, ArticleSummary, ArticleDetail, HealthStatus } from './types';

const BASE = '/api';

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const api = {
  health: () => request<HealthStatus>('/health'),

  getCities: () => request<City[]>('/cities'),

  getArticles: (city: string) => request<ArticleSummary[]>(`/articles?city=${city}`),

  getArticle: (city: string, slug: string) => request<ArticleDetail>(`/articles/${city}/${slug}`),

  saveArticle: (city: string, slug: string, frontmatter: Record<string, any>, body: string) =>
    request<{ success: boolean; seoScore: number; seo: any; stats: any }>(
      `/articles/${city}/${slug}`,
      { method: 'PUT', body: JSON.stringify({ frontmatter, body }) },
    ),

  exportCity: (city: string) => {
    window.open(`${BASE}/export/${city}`, '_blank');
  },
};
