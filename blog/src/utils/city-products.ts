export interface Product {
  name: string;
  type: string;
  normalPrice: number;
  salePrice: number;
  currency: string;
  country: string;
  city: string;
  cityId: number;
  url: string;
  image: string;
  item_group_id: string;
}

export interface CityProductConfig {
  cityId: number;
  cityName: string;
  countryName: string;
}

/** City slug → API city config. Only cities available in the products API. */
export const CITY_PRODUCT_MAP: Record<string, CityProductConfig> = {
  'dubai':         { cityId: 13668, cityName: 'Dubai',          countryName: 'United Arab Emirates' },
  'abu-dhabi':     { cityId: 13236, cityName: 'Abu Dhabi',      countryName: 'United Arab Emirates' },
  'ras-al-khaimah':{ cityId: 14644, cityName: 'Ras al Khaimah', countryName: 'United Arab Emirates' },
  'bali':          { cityId: 15533, cityName: 'Bali',           countryName: 'Indonesia' },
  'bangkok':       { cityId: 16424, cityName: 'Bangkok',        countryName: 'Thailand' },
  'chiang-rai':    { cityId: 17036, cityName: 'Chiang Rai',     countryName: 'Thailand' },
  'chiang-mai':    { cityId: 17346, cityName: 'Chiang Mai',     countryName: 'Thailand' },
  'phuket':        { cityId: 19240, cityName: 'Phuket',         countryName: 'Thailand' },
  'hua-hin':       { cityId: 19399, cityName: 'Hua Hin',        countryName: 'Thailand' },
  'jeddah':        { cityId: 19683, cityName: 'Jeddah',         countryName: 'Saudi Arabia' },
  'dammam':        { cityId: 22883, cityName: 'Dammam',         countryName: 'Saudi Arabia' },
  'riyadh':        { cityId: 23288, cityName: 'Riyadh',         countryName: 'Saudi Arabia' },
  'al-ula':        { cityId: 70349, cityName: 'Al Ula',         countryName: 'Saudi Arabia' },
  'kuala-lumpur':  { cityId: 20097, cityName: 'Kuala Lumpur',   countryName: 'Malaysia' },
  'langkawi':      { cityId: 20198, cityName: 'Langkawi',       countryName: 'Malaysia' },
  'penang':        { cityId: 22356, cityName: 'Penang',         countryName: 'Malaysia' },
  'muscat':        { cityId: 20950, cityName: 'Muscat',         countryName: 'Oman' },
  'singapore':     { cityId: 23726, cityName: 'Singapore',      countryName: 'Singapore' },
};

export type ProductType = 'tour' | 'activities';

const PRODUCTS_API = 'https://earnest-panda-e8edbd.netlify.app/api/all-products';

export function getCityConfig(citySlug: string): CityProductConfig | null {
  return CITY_PRODUCT_MAP[citySlug.toLowerCase()] ?? null;
}

export function buildProductsUrl(config: CityProductConfig, productType: ProductType = 'tour'): string {
  const params = new URLSearchParams({
    productType,
    cityId: String(config.cityId),
    cityName: config.cityName,
    countryName: config.countryName,
  });
  return `${PRODUCTS_API}?${params.toString()}`;
}
