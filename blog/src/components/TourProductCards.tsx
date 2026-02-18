import { useState, useEffect } from 'react';
import type { Product, CityProductConfig } from '../utils/city-products';
import { buildProductsUrl } from '../utils/city-products';

interface Props {
  cityConfig: CityProductConfig;
  /** Filter to a specific item_group_id (optional) */
  groupId?: string;
  /** Max cards to show */
  limit?: number;
  heading?: string;
}

function PriceTag({ normal, sale, currency }: { normal: number; sale: number; currency: string }) {
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
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            {discountPct}% OFF
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1">
        <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 font-medium">
          {product.item_group_id.replace(/-/g, ' ')}
        </p>
        <h4 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 mb-2 flex-1">
          {product.name}
        </h4>
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
          <PriceTag
            normal={product.normalPrice}
            sale={product.salePrice}
            currency={product.currency}
          />
          <span className="text-xs text-gray-900 font-medium group-hover:underline">
            Book →
          </span>
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

export default function TourProductCards({
  cityConfig,
  groupId,
  limit = 6,
  heading,
}: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const url = buildProductsUrl(cityConfig);
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        let items: Product[] = data.products ?? [];
        if (groupId) {
          items = items.filter((p) => p.item_group_id === groupId);
        }
        // Prioritise discounted items, then by group diversity
        items.sort((a, b) => {
          const aDisc = a.salePrice < a.normalPrice ? 1 : 0;
          const bDisc = b.salePrice < b.normalPrice ? 1 : 0;
          return bDisc - aDisc;
        });
        setProducts(items.slice(0, limit));
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [cityConfig.cityId, groupId, limit]);

  if (error || (!loading && products.length === 0)) return null;

  const title = heading ?? `Things to Do in ${cityConfig.cityName}`;

  return (
    <section className="py-8 border-t border-gray-100">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Book tours &amp; activities · Prices from Rayna Tours
          </p>
        </div>
        <a
          href={`https://www.raynatours.com/${cityConfig.cityName.toLowerCase().replace(/\s+/g, '-')}`}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="text-xs text-gray-500 hover:text-gray-900 transition-colors shrink-0"
        >
          View all →
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {loading
          ? Array.from({ length: limit > 4 ? 4 : limit }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          : products.map((product) => (
              <ProductCard key={product.url} product={product} />
            ))}
      </div>
    </section>
  );
}
