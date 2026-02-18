import { useState, useCallback } from 'react';
import { api } from '../lib/api';

export function useSaveArticle() {
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const save = useCallback(async (city: string, slug: string, frontmatter: Record<string, any>, body: string) => {
    setSaving(true);
    setToast(null);
    try {
      const result = await api.saveArticle(city, slug, frontmatter, body);
      const deployMsg = result.git?.pushed
        ? ` | Deployed (${result.git.commitHash})`
        : result.git?.error
          ? ` | Deploy failed: ${result.git.error}`
          : '';
      setToast({ type: 'success', message: `Saved! SEO Score: ${result.seoScore}${deployMsg}` });
      return result;
    } catch (e: any) {
      setToast({ type: 'error', message: e.message });
      return null;
    } finally {
      setSaving(false);
    }
  }, []);

  const dismissToast = useCallback(() => setToast(null), []);

  return { save, saving, toast, dismissToast };
}
