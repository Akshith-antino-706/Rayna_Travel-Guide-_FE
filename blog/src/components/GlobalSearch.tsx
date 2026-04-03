import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
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

export default function GlobalSearch({ articles }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

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

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setQuery('');
  }, []);

  // Escape key closes
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, close]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Auto-focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const modal =
    isOpen
      ? createPortal(
          <div
            className="fixed inset-0 z-[9999] flex flex-col items-center pt-16 px-4"
            onClick={close}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-[#0C4A6E]/60 backdrop-blur-md" />

            {/* Modal */}
            <div
              className="relative w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search input */}
              <div className="relative">
                <svg
                  className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-[#0EA5E9]"
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
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search articles... (e.g., 'Dubai food', 'visa guide')"
                  className="w-full pl-14 pr-14 py-5 bg-white rounded-2xl text-[#0C4A6E] text-lg
                             placeholder-[#0C4A6E]/35 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]
                             shadow-[0_12px_40px_rgba(14,165,233,0.15)] font-[Inter]"
                />
                <button
                  onClick={close}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[#0C4A6E]/40 hover:text-[#0C4A6E]/70 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Results */}
              {results.length > 0 && (
                <div className="mt-3 bg-white rounded-2xl shadow-[0_12px_40px_rgba(14,165,233,0.15)] border border-[#BAE6FD] overflow-hidden">
                  <div className="overflow-y-auto max-h-96 overscroll-contain">
                    {results.map(({ item }) => (
                      <a
                        key={item.slug}
                        href={url(`blog/${item.slug}`)}
                        className="flex items-start gap-4 p-4 hover:bg-[#E8F2F8] transition-colors border-b border-[#BAE6FD]/30 last:border-0"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-[#0C4A6E] truncate font-[Inter]">
                            {item.title}
                          </h4>
                          <p className="text-xs text-[#0C4A6E]/60 mt-1 truncate font-[Inter]">
                            {item.description}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs bg-[#0EA5E9]/10 text-[#0EA5E9] px-2.5 py-0.5 rounded-full font-medium">
                              {item.city}
                            </span>
                            <span className="text-xs bg-[#EA580C]/10 text-[#EA580C] px-2.5 py-0.5 rounded-full font-medium">
                              {item.category}
                            </span>
                          </div>
                        </div>
                        <svg
                          className="w-4 h-4 text-[#0EA5E9]/40 mt-1 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {query.trim() && results.length === 0 && (
                <div className="mt-3 bg-white rounded-2xl shadow-[0_12px_40px_rgba(14,165,233,0.15)] border border-[#BAE6FD] p-8 text-center">
                  <p className="text-[#0C4A6E]/70 text-sm font-medium font-[Inter]">No articles found for "{query}"</p>
                  <p className="text-[#0C4A6E]/40 text-xs mt-2 font-[Inter]">
                    Try searching by city name, topic, or category
                  </p>
                </div>
              )}
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <button
        onClick={open}
        className="p-2 rounded-full hover:bg-[#E8F2F8] transition-colors"
        aria-label="Search"
      >
        <svg className="w-5 h-5 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
      {modal}
    </>
  );
}
