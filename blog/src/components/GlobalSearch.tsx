import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Fuse from 'fuse.js';

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
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

            {/* Modal */}
            <div
              className="relative w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search input */}
              <div className="relative">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
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
                  className="w-full pl-12 pr-12 py-4 bg-white rounded-xl text-gray-900
                             placeholder-gray-400 focus:outline-none shadow-2xl text-base"
                />
                <button
                  onClick={close}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                <div className="mt-2 bg-white rounded-xl shadow-xl overflow-hidden">
                  <div className="overflow-y-auto max-h-80 overscroll-contain">
                    {results.map(({ item }) => (
                      <a
                        key={item.slug}
                        href={`/blog/${item.slug}`}
                        className="flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-900 truncate">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-0.5 truncate">
                            {item.description}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-xs bg-gray-200 text-gray-900 px-2 py-0.5 rounded-full">
                              {item.city}
                            </span>
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                              {item.category}
                            </span>
                          </div>
                        </div>
                        <svg
                          className="w-4 h-4 text-gray-300 mt-1 flex-shrink-0"
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
                <div className="mt-2 bg-white rounded-xl shadow-xl p-6 text-center">
                  <p className="text-gray-500 text-sm">No articles found for "{query}"</p>
                  <p className="text-gray-400 text-xs mt-1">
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
        className="p-2 rounded-full hover:bg-gray-50 transition-colors"
        aria-label="Search"
      >
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
