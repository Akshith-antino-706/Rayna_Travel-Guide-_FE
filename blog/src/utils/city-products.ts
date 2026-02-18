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

export type ProductType = 'tour' | 'activities' | 'holiday' | 'cruise';

const PRODUCTS_API = 'https://earnest-panda-e8edbd.netlify.app/api/all-products';

// ─── Tour & Activities ────────────────────────────────────────────────────────
/** City slug → config for productType=tour and productType=activities */
export const CITY_PRODUCT_MAP: Record<string, CityProductConfig> = {
  'dubai':          { cityId: 13668, cityName: 'Dubai',          countryName: 'United Arab Emirates' },
  'abu-dhabi':      { cityId: 13236, cityName: 'Abu Dhabi',      countryName: 'United Arab Emirates' },
  'ras-al-khaimah': { cityId: 14644, cityName: 'Ras al Khaimah', countryName: 'United Arab Emirates' },
  'bali':           { cityId: 15533, cityName: 'Bali',           countryName: 'Indonesia' },
  'bangkok':        { cityId: 16424, cityName: 'Bangkok',        countryName: 'Thailand' },
  'chiang-rai':     { cityId: 17036, cityName: 'Chiang Rai',     countryName: 'Thailand' },
  'chiang-mai':     { cityId: 17346, cityName: 'Chiang Mai',     countryName: 'Thailand' },
  'phuket':         { cityId: 19240, cityName: 'Phuket',         countryName: 'Thailand' },
  'hua-hin':        { cityId: 19399, cityName: 'Hua Hin',        countryName: 'Thailand' },
  'jeddah':         { cityId: 19683, cityName: 'Jeddah',         countryName: 'Saudi Arabia' },
  'dammam':         { cityId: 22883, cityName: 'Dammam',         countryName: 'Saudi Arabia' },
  'riyadh':         { cityId: 23288, cityName: 'Riyadh',         countryName: 'Saudi Arabia' },
  'al-ula':         { cityId: 70349, cityName: 'Al Ula',         countryName: 'Saudi Arabia' },
  'kuala-lumpur':   { cityId: 20097, cityName: 'Kuala Lumpur',   countryName: 'Malaysia' },
  'langkawi':       { cityId: 20198, cityName: 'Langkawi',       countryName: 'Malaysia' },
  'penang':         { cityId: 22356, cityName: 'Penang',         countryName: 'Malaysia' },
  'muscat':         { cityId: 20950, cityName: 'Muscat',         countryName: 'Oman' },
  'singapore':      { cityId: 23726, cityName: 'Singapore',      countryName: 'Singapore' },
};

// ─── Holiday Packages ─────────────────────────────────────────────────────────
/** City slug → config for productType=holiday (uses different cityName strings) */
export const HOLIDAY_CITY_MAP: Record<string, CityProductConfig> = {
  // UAE
  'dubai':          { cityId: 13668, cityName: 'Dubai City',      countryName: 'United Arab Emirates' },
  'abu-dhabi':      { cityId: 13236, cityName: 'Abu Dhabi',       countryName: 'United Arab Emirates' },
  'ras-al-khaimah': { cityId: 14644, cityName: 'Ras al Khaimah',  countryName: 'United Arab Emirates' },
  // Europe
  'berlin':         { cityId: 13319, cityName: 'Berlin',          countryName: 'Germany' },
  'frankfurt':      { cityId: 13746, cityName: 'Frankfurt',       countryName: 'Germany' },
  'prague':         { cityId: 14561, cityName: 'Prague',          countryName: 'Czech Republic' },
  'vienna':         { cityId: 15043, cityName: 'Vienna',          countryName: 'Austria' },
  'zurich':         { cityId: 15360, cityName: 'Zurich',          countryName: 'Switzerland' },
  'athens':         { cityId: 16025, cityName: 'Athens',          countryName: 'Greece' },
  'budapest':       { cityId: 16751, cityName: 'Budapest',        countryName: 'Hungary' },
  'paris':          { cityId: 22260, cityName: 'Paris',           countryName: 'France' },
  'riga':           { cityId: 23148, cityName: 'Riga',            countryName: 'Latvia' },
  'rome':           { cityId: 23214, cityName: 'Rome',            countryName: 'Italy' },
  'rovaniemi':      { cityId: 23310, cityName: 'Rovaniemi',       countryName: 'Finland' },
  'madrid':         { cityId: 20787, cityName: 'Madrid',          countryName: 'Spain' },
  'moscow':         { cityId: 21359, cityName: 'Moscow',          countryName: 'Russia' },
  // Middle East
  'amman':          { cityId: 15816, cityName: 'Amman',           countryName: 'Jordan' },
  'istanbul':       { cityId: 19609, cityName: 'Istanbul',        countryName: 'Turkey' },
  'cappadocia':     { cityId: 56038, cityName: 'Cappadocia',      countryName: 'Turkey' },
  'jeddah':         { cityId: 19683, cityName: 'Jeddah',          countryName: 'Saudi Arabia' },
  'riyadh':         { cityId: 23288, cityName: 'Riyadh',          countryName: 'Saudi Arabia' },
  'dammam':         { cityId: 22883, cityName: 'Dammam',          countryName: 'Saudi Arabia' },
  'al-ula':         { cityId: 70349, cityName: 'Al Ula',          countryName: 'Saudi Arabia' },
  'salalah':        { cityId: 23392, cityName: 'Salalah',         countryName: 'Oman' },
  'baku':           { cityId: 13273, cityName: 'Baku',            countryName: 'Azerbaijan' },
  'yerevan':        { cityId: 13710, cityName: 'Yerevan',         countryName: 'Armenia' },
  'manama':         { cityId: 14261, cityName: 'Manama',          countryName: 'Bahrain' },
  'tbilisi':        { cityId: 24392, cityName: 'Tbilisi',         countryName: 'Georgia' },
  'tashkent':       { cityId: 24372, cityName: 'Tashkent',        countryName: 'Uzbekistan' },
  'almaty':         { cityId: 15688, cityName: 'Almaty',          countryName: 'Kazakhstan' },
  'bishkek':        { cityId: 18616, cityName: 'Bishkek',         countryName: 'Kyrgyzstan' },
  // Asia
  'bali':           { cityId: 15533, cityName: 'Bali',            countryName: 'Indonesia' },
  'bangkok':        { cityId: 16424, cityName: 'Bangkok',         countryName: 'Thailand' },
  'phuket':         { cityId: 19240, cityName: 'Phuket',          countryName: 'Thailand' },
  'koh-samui':      { cityId: 20033, cityName: 'Koh Samui',       countryName: 'Thailand' },
  'kuala-lumpur':   { cityId: 20097, cityName: 'Kuala Lumpur',    countryName: 'Malaysia' },
  'singapore':      { cityId: 23726, cityName: 'Singapore City',  countryName: 'Singapore' },
  'tokyo':          { cityId: 24773, cityName: 'Tokyo',           countryName: 'Japan' },
  'colombo':        { cityId: 17350, cityName: 'Colombo',         countryName: 'Sri Lanka' },
  'kandy':          { cityId: 19991, cityName: 'Kandy',           countryName: 'Sri Lanka' },
  'hanoi':          { cityId: 19083, cityName: 'Hanoi',           countryName: 'Vietnam' },
  'danang':         { cityId: 17721, cityName: 'Danang',          countryName: 'Vietnam' },
  'maldives':       { cityId: 17870, cityName: 'Maldives',        countryName: 'Maldives' },
  // India
  'mumbai':         { cityId: 16569, cityName: 'Mumbai',          countryName: 'India' },
  'delhi':          { cityId: 17778, cityName: 'Delhi',           countryName: 'India' },
  'jaipur':         { cityId: 19652, cityName: 'Jaipur',          countryName: 'India' },
  'darjeeling':     { cityId: 17727, cityName: 'Darjeeling',      countryName: 'India' },
  'srinagar':       { cityId: 24296, cityName: 'Srinagar',        countryName: 'India' },
  'udaipur':        { cityId: 24797, cityName: 'Udaipur',         countryName: 'India' },
  // Africa & Islands
  'cairo':          { cityId: 13446, cityName: 'Cairo',           countryName: 'Egypt' },
  'nairobi':        { cityId: 21665, cityName: 'Nairobi',         countryName: 'Kenya' },
  'mauritius':      { cityId: 21439, cityName: 'Mauritius',       countryName: 'Mauritius' },
  'mahe':           { cityId: 61146, cityName: 'Mahe',            countryName: 'Seychelles' },
};

// ─── Cruise Packages ──────────────────────────────────────────────────────────
/** City slug → config for productType=cruise */
export const CRUISE_CITY_MAP: Record<string, CityProductConfig> = {
  'dubai':          { cityId: 13668, cityName: 'Dubai City',      countryName: 'United Arab Emirates' },
  'abu-dhabi':      { cityId: 13236, cityName: 'Abu Dhabi',       countryName: 'United Arab Emirates' },
  'ras-al-khaimah': { cityId: 14644, cityName: 'Ras al Khaimah',  countryName: 'United Arab Emirates' },
  'copenhagen':     { cityId: 13557, cityName: 'Copenhagen',      countryName: 'Denmark' },
  'hamburg':        { cityId: 13876, cityName: 'Hamburg',         countryName: 'Germany' },
  'kiel':           { cityId: 14082, cityName: 'Kiel',            countryName: 'Germany' },
  'barcelona':      { cityId: 16234, cityName: 'Barcelona',       countryName: 'Spain' },
  'genoa':          { cityId: 18865, cityName: 'Genoa',           countryName: 'Italy' },
  'rome':           { cityId: 23214, cityName: 'Rome',            countryName: 'Italy' },
  'istanbul':       { cityId: 19609, cityName: 'Istanbul',        countryName: 'Turkey' },
  'jeddah':         { cityId: 19683, cityName: 'Jeddah',          countryName: 'Saudi Arabia' },
  'dammam':         { cityId: 22883, cityName: 'Dammam',          countryName: 'Saudi Arabia' },
  'singapore':      { cityId: 23726, cityName: 'Singapore City',  countryName: 'Singapore' },
  'southampton':    { cityId: 65326, cityName: 'Southampton',     countryName: 'United States' },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
export function getCityConfig(citySlug: string): CityProductConfig | null {
  return CITY_PRODUCT_MAP[citySlug.toLowerCase()] ?? null;
}

export function getHolidayConfig(citySlug: string): CityProductConfig | null {
  return HOLIDAY_CITY_MAP[citySlug.toLowerCase()] ?? null;
}

export function getCruiseConfig(citySlug: string): CityProductConfig | null {
  return CRUISE_CITY_MAP[citySlug.toLowerCase()] ?? null;
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
