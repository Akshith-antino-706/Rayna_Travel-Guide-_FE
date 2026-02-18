import { useState, useEffect, useCallback } from 'react';
import { api } from '../lib/api';
import type { City, ArticleSummary, ArticleDetail, HealthStatus } from '../lib/types';

export function useHealth() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.health().then(setHealth).catch((e) => setError(e.message));
  }, []);

  return { health, error };
}

export function useCities() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getCities()
      .then(setCities)
      .catch(() => setCities([]))
      .finally(() => setLoading(false));
  }, []);

  return { cities, loading };
}

export function useArticles(city: string | null) {
  const [articles, setArticles] = useState<ArticleSummary[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!city) {
      setArticles([]);
      return;
    }
    setLoading(true);
    api.getArticles(city)
      .then(setArticles)
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, [city]);

  return { articles, loading };
}

export function useArticleDetail(city: string | null, slug: string | null) {
  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(() => {
    if (!city || !slug) {
      setArticle(null);
      return;
    }
    setLoading(true);
    setError(null);
    api.getArticle(city, slug)
      .then(setArticle)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [city, slug]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { article, loading, error, reload, setArticle };
}
