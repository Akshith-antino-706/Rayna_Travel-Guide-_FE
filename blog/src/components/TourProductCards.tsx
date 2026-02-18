import { useState, useEffect } from 'react';
import type { Product, CityProductConfig } from '../utils/city-products';
import { buildProductsUrl } from '../utils/city-products';

interface Props {
  /** Config for tour + activities tabs (cities with tour/activities API coverage) */
  tourConfig?: CityProductConfig;
  /** Config for holiday packages tab */
  holidayConfig?: CityProductConfig;
  /** Config for cruise packages tab */
  cruiseConfig?: CityProductConfig;
  /** Config for yacht rentals tab */
  yachtConfig?: CityProductConfig;
  /** Max cards per tab */
  limit?: number;
  heading?: string;
}

type Tab = 'activities' | 'tours' | 'holidays' | 'cruises' | 'yachts';

const TAB_LABELS: Record<Tab, string> = {
  activities: 'Activities',
  tours:      'Tours',
  holidays:   'Holidays',
  cruises:    'Cruises',
  yachts:     'Yachts',
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function PriceTag({ normal, sale, currency }: { normal: number; sale: number; currency: string }) {
  if (sale === 0 && normal === 0) {
    return (
      <span className="text-sm font-semibold text-gray-600 italic">Get Quote</span>
    );
  }
  const hasDiscount = sale < normal;
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-base font-bold text-gray-900">
        {currency} {sale.toLocaleString()}
      </span>
      {hasDiscount && (
        <span className="text-xs text-gray-400 line-through">
          {currency} {normal.toLocaleString()}
        </span>
      )}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const hasDiscount = product.salePrice < product.normalPrice;
  const discountPct = hasDiscount
    ? Math.round(((product.normalPrice - product.salePrice) / product.normalPrice) * 100)
    : 0;

  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="group flex flex-col bg-white rounded-xl border border-gray-100 overflow-hidden
                 hover:border-gray-300 hover:shadow-md transition-all duration-200"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            {discountPct}% OFF
          </span>
        )}
      </div>

      <div className="p-3 flex flex-col flex-1">
        <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 font-medium">
          {product.item_group_id.replace(/-/g, ' ')}
        </p>
        <h4 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 mb-2 flex-1">
          {product.name}
        </h4>
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
          <PriceTag normal={product.normalPrice} sale={product.salePrice} currency={product.currency} />
          <span className="text-xs text-gray-900 font-medium group-hover:underline">Book →</span>
        </div>
      </div>
    </a>
  );
}

function SkeletonCard() {
  return (
    <div className="flex flex-col bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-gray-100" />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-gray-100 rounded w-1/2" />
        <div className="h-4 bg-gray-100 rounded w-full" />
        <div className="h-4 bg-gray-100 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-1/3 mt-3" />
      </div>
    </div>
  );
}

// ─── Data hook ────────────────────────────────────────────────────────────────

function useTabProducts(
  config: CityProductConfig,
  apiType: 'tour' | 'activities' | 'holiday' | 'cruise' | 'yacht',
  limit: number,
) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    setLoading(true);
    setEmpty(false);
    fetch(buildProductsUrl(config, apiType))
      .then((r) => r.json())
      .then((data) => {
        const items: Product[] = (data.products ?? [])
          .sort((a: Product, b: Product) => {
            const aD = a.salePrice < a.normalPrice ? 1 : 0;
            const bD = b.salePrice < b.normalPrice ? 1 : 0;
            return bD - aD;
          })
          .slice(0, limit);
        setProducts(items);
        setEmpty(items.length === 0);
      })
      .catch(() => setEmpty(true))
      .finally(() => setLoading(false));
  }, [config.cityId, apiType, limit]);

  return { products, loading, empty };
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function TourProductCards({
  tourConfig,
  holidayConfig,
  cruiseConfig,
  yachtConfig,
  limit = 6,
  heading,
}: Props) {
  // Build ordered tab list based on which configs are provided
  const tabs: Tab[] = [];
  if (tourConfig)    tabs.push('activities', 'tours');
  if (holidayConfig) tabs.push('holidays');
  if (cruiseConfig)  tabs.push('cruises');
  if (yachtConfig)   tabs.push('yachts');

  const [activeTab, setActiveTab] = useState<Tab>(tabs[0] ?? 'activities');

  // Derive the cityName for the "View all" link from whichever config is available
  const primaryConfig = tourConfig ?? holidayConfig ?? cruiseConfig ?? yachtConfig;

  // Fetch all data upfront so tab switching is instant
  const activitiesData = useTabProducts(
    tourConfig ?? { cityId: 0, cityName: '', countryName: '' },
    'activities',
    limit,
  );
  const toursData = useTabProducts(
    tourConfig ?? { cityId: 0, cityName: '', countryName: '' },
    'tour',
    limit,
  );
  const holidaysData = useTabProducts(
    holidayConfig ?? { cityId: 0, cityName: '', countryName: '' },
    'holiday',
    limit,
  );
  const cruisesData = useTabProducts(
    cruiseConfig ?? { cityId: 0, cityName: '', countryName: '' },
    'cruise',
    limit,
  );
  const yachtsData = useTabProducts(
    yachtConfig ?? { cityId: 0, cityName: '', countryName: '' },
    'yacht',
    limit,
  );

  if (tabs.length === 0 || !primaryConfig) return null;

  // Map each tab to its fetched data
  const dataMap: Record<Tab, ReturnType<typeof useTabProducts>> = {
    activities: activitiesData,
    tours:      toursData,
    holidays:   holidaysData,
    cruises:    cruisesData,
    yachts:     yachtsData,
  };

  // Filter out tabs where the API returned no results (after loading)
  const availableTabs = tabs.filter((t) => {
    const d = dataMap[t];
    return !(!d.loading && d.empty);
  });

  if (availableTabs.length === 0) return null;

  // Keep activeTab valid
  const currentTab = availableTabs.includes(activeTab) ? activeTab : availableTabs[0];
  const current = dataMap[currentTab];
  const skeletonCount = Math.min(limit, 4);

  const title = heading ?? `Things to Do in ${primaryConfig.cityName.replace(' City', '')}`;
  const cityPath = primaryConfig.cityName.toLowerCase().replace(/\s+/g, '-').replace('-city', '');

  return (
    <section className="py-8 border-t border-gray-100">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Powered by Rayna Tours
          </p>
        </div>
        <a
          href={`https://www.raynatours.com/${cityPath}`}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="text-xs text-gray-500 hover:text-gray-900 transition-colors shrink-0 mt-1"
        >
          View all →
        </a>
      </div>

      {/* Tabs — only show if more than one available */}
      {availableTabs.length > 1 && (
        <div className="flex gap-2 mb-5 flex-wrap">
          {availableTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                currentTab === tab
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {TAB_LABELS[tab]}
            </button>
          ))}
        </div>
      )}

      {/* Cards grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {current.loading
          ? Array.from({ length: skeletonCount }).map((_, i) => <SkeletonCard key={i} />)
          : current.products.map((p) => <ProductCard key={p.url} product={p} />)}
      </div>
    </section>
  );
}
