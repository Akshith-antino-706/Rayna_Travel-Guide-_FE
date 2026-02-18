import { useState, useMemo, useCallback, useEffect } from 'react';
import Fuse from 'fuse.js';

interface Category {
  id: string;
  label: string;
  icon: string;
}

interface PostData {
  title: string;
  description: string;
  slug: string;
  city: string;
  category: string;
  pubDate: string;
  heroImage?: string;
  readingTime: number;
  tags: string[];
  keywords: string[];
  featured?: boolean;
}

interface Props {
  posts: PostData[];
  categories: Category[];
  postsPerPage: number;
}

const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop&q=70';

function FeaturedBlogCard({ post }: { post: PostData }) {
  const formattedDate = new Date(post.pubDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const imgSrc = post.heroImage || PLACEHOLDER_IMAGE;

  return (
    <a href={`/blog/${post.slug}`} className="group flex gap-3 sm:gap-4 items-start">
      <div className="w-24 h-16 sm:w-32 sm:h-[84px] flex-shrink-0 rounded-lg overflow-hidden">
        <img
          src={imgSrc}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).onerror = null;
            (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
          }}
        />
      </div>
      <div className="flex-1 min-w-0 py-0.5">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium uppercase tracking-wider">
            {post.category}
          </span>
          <span className="text-[10px] text-gray-400">{formattedDate}</span>
        </div>
        <h3 className="text-sm font-bold text-gray-900 group-hover:text-gray-900 transition-colors leading-snug line-clamp-2 mb-1">
          {post.title}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed hidden sm:block">
          {post.description}
        </p>
      </div>
    </a>
  );
}

function CompactBlogCard({ post }: { post: PostData }) {
  const imgSrc = post.heroImage || PLACEHOLDER_IMAGE;

  return (
    <a href={`/blog/${post.slug}`} className="group flex gap-3 items-start">
      <div className="w-24 h-[68px] flex-shrink-0 rounded-lg overflow-hidden">
        <img
          src={imgSrc}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).onerror = null;
            (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
          }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-gray-900 group-hover:text-gray-900 transition-colors line-clamp-2 leading-snug mb-1">
          {post.title}
        </h4>
        <p className="text-xs text-gray-400 line-clamp-2">{post.description}</p>
      </div>
    </a>
  );
}

export default function BlogFilterPage({ posts, categories, postsPerPage }: Props) {
  const getParams = () => {
    if (typeof window === 'undefined') return { q: '', city: '', category: '', page: 1 };
    const params = new URLSearchParams(window.location.search);
    return {
      q: params.get('q') || '',
      city: params.get('city') || '',
      category: params.get('category') || '',
      page: parseInt(params.get('page') || '1', 10),
    };
  };

  const [searchQuery, setSearchQuery] = useState(() => getParams().q);
  const [cityFilter, setCityFilter] = useState(() => getParams().city);
  const [categoryFilter, setCategoryFilter] = useState(() => getParams().category);
  const [currentPage, setCurrentPage] = useState(() => getParams().page);
  const [searchInput, setSearchInput] = useState(() => getParams().q);

  const cities = useMemo(
    () => [...new Set(posts.map((p) => p.city))].sort(),
    [posts]
  );

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
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
    [posts]
  );

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (cityFilter) params.set('city', cityFilter);
    if (categoryFilter) params.set('category', categoryFilter);
    if (currentPage > 1) params.set('page', String(currentPage));
    const qs = params.toString();
    const newUrl = qs ? `/?${qs}` : '/';
    window.history.replaceState(null, '', newUrl);
  }, [searchQuery, cityFilter, categoryFilter, currentPage]);

  const filteredPosts = useMemo(() => {
    let result = posts;

    if (searchQuery.trim()) {
      const fuseResults = fuse.search(searchQuery);
      result = fuseResults.map((r) => r.item);
    }

    if (cityFilter) {
      result = result.filter((p) => p.city === cityFilter);
    }

    if (categoryFilter) {
      result = result.filter((p) => p.category === categoryFilter);
    }

    result = [...result].sort(
      (a, b) => new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf()
    );

    return result;
  }, [posts, searchQuery, cityFilter, categoryFilter, fuse]);

  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const safePage = Math.min(currentPage, Math.max(totalPages, 1));
  const start = (safePage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(start, start + postsPerPage);

  // Split: ~60% featured (left), ~40% sidebar (right)
  const splitAt = Math.min(Math.ceil(paginatedPosts.length * 0.6), paginatedPosts.length);
  const featuredPosts = paginatedPosts.slice(0, splitAt);
  const sidebarPosts = paginatedPosts.slice(splitAt);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, cityFilter, categoryFilter]);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setSearchQuery(searchInput);
    },
    [searchInput]
  );

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSearchInput('');
    setCityFilter('');
    setCategoryFilter('');
    setCurrentPage(1);
  }, []);

  const hasActiveFilters = searchQuery || cityFilter || categoryFilter;

  return (
    <div id="all-posts" className="bg-white">
      {/* Compact filter bar */}
      <div className="sticky top-14 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <form onSubmit={handleSearch} className="flex-1 relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
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
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    setSearchQuery(searchInput);
                  }
                }}
                placeholder="Search articles..."
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg
                           text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2
                           focus:ring-gray-900 focus:border-gray-900 text-sm"
              />
            </form>

            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 min-w-[140px]"
            >
              <option value="">All Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 min-w-[160px]"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.icon} {cat.label}</option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <div className="flex items-center gap-2 mt-2 text-sm">
              <span className="text-gray-500">
                {totalPosts} article{totalPosts !== 1 ? 's' : ''} found
              </span>
              <button
                onClick={clearFilters}
                className="text-gray-900 hover:text-gray-900 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 2-Column Blog Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-8">Popular Travel Blogs</h2>

        {paginatedPosts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Left: Featured cards */}
            <div className="lg:col-span-3 space-y-8">
              {featuredPosts.map((post) => (
                <FeaturedBlogCard key={post.slug} post={post} />
              ))}
            </div>

            {/* Right: Sidebar */}
            {sidebarPosts.length > 0 && (
              <div className="lg:col-span-2">
                <div className="lg:sticky lg:top-28 space-y-5">
                  {sidebarPosts.map((post) => (
                    <CompactBlogCard key={post.slug} post={post} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-4">No articles found</p>
            <button onClick={clearFilters} className="btn-primary">
              View all articles
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Pagination">
            {safePage > 1 && (
              <button
                onClick={() => setCurrentPage(safePage - 1)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm"
              >
                Previous
              </button>
            )}

            {(() => {
              const pages: (number | 'ellipsis')[] = [];
              if (totalPages <= 7) {
                for (let i = 1; i <= totalPages; i++) pages.push(i);
              } else {
                pages.push(1);
                if (safePage > 3) pages.push('ellipsis');
                for (let i = Math.max(2, safePage - 1); i <= Math.min(totalPages - 1, safePage + 1); i++) {
                  pages.push(i);
                }
                if (safePage < totalPages - 2) pages.push('ellipsis');
                pages.push(totalPages);
              }
              return pages.map((p, idx) =>
                p === 'ellipsis' ? (
                  <span key={`ellipsis-${idx}`} className="px-2 py-2 text-gray-400 text-sm">...</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      p === safePage
                        ? 'bg-gray-900 text-white'
                        : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {p}
                  </button>
                )
              );
            })()}

            {safePage < totalPages && (
              <button
                onClick={() => setCurrentPage(safePage + 1)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm"
              >
                Next
              </button>
            )}
          </nav>
        )}
      </section>
    </div>
  );
}
