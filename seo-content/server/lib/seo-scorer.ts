export interface SeoCheckResult {
  name: string;
  maxPoints: number;
  score: number;
  value: any;
  message: string;
  status: 'good' | 'warning' | 'error';
}

export interface SeoScore {
  score: number;
  checks: SeoCheckResult[];
}

type CheckFn = (fm: Record<string, any>, body: string) => Omit<SeoCheckResult, 'name' | 'maxPoints'>;

const SEO_CHECKS: { name: string; maxPoints: number; check: CheckFn }[] = [
  {
    name: 'Meta Title Length',
    maxPoints: 15,
    check: (fm) => {
      const len = (fm.title || '').length;
      if (len >= 30 && len <= 60)
        return { score: 15, value: len, message: `${len} chars`, status: 'good' };
      if (len >= 20 && len <= 70)
        return { score: 10, value: len, message: `${len} chars`, status: 'warning' };
      return { score: 0, value: len, message: `${len} chars`, status: 'error' };
    },
  },
  {
    name: 'Meta Description',
    maxPoints: 15,
    check: (fm) => {
      const len = (fm.description || '').length;
      if (len >= 120 && len <= 160)
        return { score: 15, value: len, message: `${len} chars`, status: 'good' };
      if (len >= 80 && len <= 200)
        return { score: 10, value: len, message: `${len} chars`, status: 'warning' };
      return { score: 0, value: len, message: `${len} chars`, status: 'error' };
    },
  },
  {
    name: 'SEO Title',
    maxPoints: 10,
    check: (fm) => {
      const set = !!fm.seoTitle && fm.seoTitle.length > 0;
      return { score: set ? 10 : 0, value: set, message: set ? 'Set' : 'Missing', status: set ? 'good' : 'error' };
    },
  },
  {
    name: 'SEO Description',
    maxPoints: 10,
    check: (fm) => {
      const set = !!fm.seoDescription && fm.seoDescription.length > 0;
      return { score: set ? 10 : 0, value: set, message: set ? 'Set' : 'Missing', status: set ? 'good' : 'error' };
    },
  },
  {
    name: 'Keywords',
    maxPoints: 15,
    check: (fm) => {
      const count = (fm.keywords || []).length;
      if (count >= 5)
        return { score: 15, value: count, message: `${count} keywords`, status: 'good' };
      if (count >= 3)
        return { score: 10, value: count, message: `${count} keywords`, status: 'warning' };
      return { score: 0, value: count, message: `${count} keywords`, status: 'error' };
    },
  },
  {
    name: 'OG Image',
    maxPoints: 10,
    check: (fm) => {
      const set = !!fm.heroImage && fm.heroImage.length > 0;
      return { score: set ? 10 : 0, value: set, message: set ? 'Set' : 'Not set', status: set ? 'good' : 'error' };
    },
  },
  {
    name: 'H1 Present',
    maxPoints: 10,
    check: (_fm, body) => {
      const has = /^#\s+.+/m.test(body);
      return { score: has ? 10 : 0, value: has, message: has ? 'Present' : 'Missing', status: has ? 'good' : 'error' };
    },
  },
  {
    name: 'Word Count',
    maxPoints: 15,
    check: (_fm, body) => {
      const words = body.split(/\s+/).filter(Boolean).length;
      if (words >= 1800)
        return { score: 15, value: words, message: `${words} words`, status: 'good' };
      if (words >= 1000)
        return { score: 10, value: words, message: `${words} words`, status: 'warning' };
      return { score: 5, value: words, message: `${words} words`, status: 'error' };
    },
  },
];

export function computeSeoScore(frontmatter: Record<string, any>, body: string): SeoScore {
  const checks = SEO_CHECKS.map((c) => ({
    name: c.name,
    maxPoints: c.maxPoints,
    ...c.check(frontmatter, body),
  }));
  const score = checks.reduce((sum, r) => sum + r.score, 0);
  return { score, checks };
}
