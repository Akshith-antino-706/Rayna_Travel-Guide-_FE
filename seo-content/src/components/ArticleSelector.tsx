import type { ArticleSummary } from '../lib/types';

interface ArticleSelectorProps {
  articles: ArticleSummary[];
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
  loading: boolean;
}

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 80 ? 'bg-emerald-100 text-emerald-700' : score >= 50 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700';
  return (
    <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-bold ${color}`}>
      {score}
    </span>
  );
}

export default function ArticleSelector({ articles, selectedSlug, onSelect, loading }: ArticleSelectorProps) {
  if (loading) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-gray-200/80 bg-white p-4 shadow-sm">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
        <span className="text-sm text-gray-500">Loading articles...</span>
      </div>
    );
  }

  const selected = articles.find((a) => a.slug === selectedSlug);

  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-200/80 bg-white p-4 shadow-sm">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100">
        <svg className="h-4.5 w-4.5 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      </div>
      <div className="flex flex-1 items-center gap-3">
        <select
          className="input max-w-lg !py-2"
          value={selectedSlug || ''}
          onChange={(e) => onSelect(e.target.value)}
        >
          <option value="">Select an article...</option>
          {articles.map((a) => (
            <option key={a.slug} value={a.slug}>
              {a.title} ({a.seoScore}/100)
            </option>
          ))}
        </select>
        {selected && <ScoreBadge score={selected.seoScore} />}
      </div>
      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
        {articles.length} articles
      </span>
    </div>
  );
}
