import { useState, useMemo, useCallback } from 'react';
import Fuse from 'fuse.js';

interface ArticleData {
  title: string;
  description: string;
  slug: string;
  city: string;
  category: string;
  tags: string[];
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
          { name: 'description', weight: 0.2 },
          { name: 'city', weight: 0.25 },
          { name: 'tags', weight: 0.1 },
          { name: 'category', weight: 0.05 },
        ],
        threshold: 0.35,
        includeScore: true,
        minMatchCharLength: 2,
      }),
    [articles]
  );

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query).slice(0, 8);
  }, [query, fuse]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
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
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder="Search articles... (e.g., 'Dubai food', 'visa guide')"
          className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-300 rounded-xl
                     text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2
                     focus:ring-orange-500 focus:border-orange-500 shadow-sm text-base"
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setIsOpen(false); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
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
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                    {item.city}
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>
              <svg className="w-4 h-4 text-gray-300 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          ))}
          {query.trim() && (
            <a
              href={`/blog?q=${encodeURIComponent(query)}`}
              className="block p-3 text-center text-sm text-orange-600 hover:bg-orange-50 font-medium transition-colors"
            >
              View all results for "{query}"
            </a>
          )}
        </div>
      )}

      {isOpen && query.trim() && results.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-6 text-center">
          <p className="text-gray-500 text-sm">No articles found for "{query}"</p>
          <p className="text-gray-400 text-xs mt-1">Try searching by city name, topic, or category</p>
        </div>
      )}
    </div>
  );
}
