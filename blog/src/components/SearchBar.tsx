import { useState, useMemo, useCallback } from 'react';
import Fuse from 'fuse.js';
import { url } from '../utils/constants';

interface ArticleData {
  title: string;
  description: string;
  slug: string;
  city: string;
  category: string;
  tags: string[];
  keywords?: string[];
  featured?: boolean;
  readingTime: number;
}

interface Props {
  articles: ArticleData[];
}

export default function SearchBar({ articles }: Props) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const fuse = useMemo(
    () =>
      new Fuse(articles, {
        keys: [
          { name: 'title', weight: 0.4 },
          { name: 'city', weight: 0.3 },
          { name: 'description', weight: 0.15 },
          { name: 'keywords', weight: 0.1 },
          { name: 'tags', weight: 0.04 },
          { name: 'category', weight: 0.01 },
        ],
        threshold: 0.35,
        includeScore: true,
        minMatchCharLength: 2,
      }),
    [articles]
  );

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const fuseResults = fuse.search(query).slice(0, 30);
    const queryLower = query.toLowerCase().trim();

    // Re-rank: city-prefix matches first → featured articles next → then by Fuse score
    return fuseResults
      .sort((a, b) => {
        const aCityMatch = a.item.city.toLowerCase().startsWith(queryLower) ? 0 : 1;
        const bCityMatch = b.item.city.toLowerCase().startsWith(queryLower) ? 0 : 1;
        if (aCityMatch !== bCityMatch) return aCityMatch - bCityMatch;

        const aFeatured = a.item.featured ? 0 : 1;
        const bFeatured = b.item.featured ? 0 : 1;
        if (aFeatured !== bFeatured) return aFeatured - bFeatured;

        return (a.score ?? 1) - (b.score ?? 1);
      })
      .slice(0, 10);
  }, [query, fuse]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0EA5E9]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder="Search articles... (e.g., 'Dubai food', 'visa guide')"
          className="w-full pl-12 pr-4 py-3.5 bg-white border border-[#BAE6FD] rounded-xl
                     text-[#0C4A6E] placeholder-[#0C4A6E]/40 focus:outline-none focus:ring-2
                     focus:ring-[#0EA5E9] focus:border-[#0EA5E9] shadow-sm text-base font-[Inter]"
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setIsOpen(false); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0C4A6E]/40 hover:text-[#0C4A6E]/70"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white border border-[#BAE6FD] rounded-xl shadow-[0_8px_30px_rgba(14,165,233,0.12)] z-50 overflow-hidden flex flex-col">
          <div className="overflow-y-auto max-h-80 overscroll-contain">
            {results.map(({ item }) => (
              <a
                key={item.slug}
                href={url(`blog/${item.slug}`)}
                className="flex items-start gap-3 p-4 hover:bg-[#E8F2F8] transition-colors border-b border-[#BAE6FD]/30 last:border-0"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-[#0C4A6E] truncate font-[Inter]">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#0C4A6E]/60 mt-0.5 truncate font-[Inter]">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-xs bg-[#0EA5E9]/10 text-[#0EA5E9] px-2 py-0.5 rounded-full font-medium">
                      {item.city}
                    </span>
                    <span className="text-xs bg-[#EA580C]/10 text-[#EA580C] px-2 py-0.5 rounded-full font-medium">
                      {item.category}
                    </span>
                  </div>
                </div>
                <svg className="w-4 h-4 text-[#0EA5E9]/40 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      )}

      {isOpen && query.trim() && results.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-white border border-[#BAE6FD] rounded-xl shadow-[0_8px_30px_rgba(14,165,233,0.12)] z-50 p-6 text-center">
          <p className="text-[#0C4A6E]/70 text-sm font-[Inter]">No articles found for "{query}"</p>
          <p className="text-[#0C4A6E]/40 text-xs mt-1 font-[Inter]">Try searching by city name, topic, or category</p>
        </div>
      )}
    </div>
  );
}
