// City metadata interface (mirrors scripts/cities.ts for build-time use)
export interface CityMeta {
  name: string;
  slug: string;
  country: string;
  continent: string;
  currency: string;
  language: string;
  unsplashId: string;
  nearbyCity: string;
  signatureExperience: string;
  famousAttraction: string;
  hasBeach: boolean;
  hasYacht: boolean;
}

// Extended guide data for cities with full travel guides
export interface CityGuideData {
  quickStats: {
    currency: { code: string; name: string };
    timezone: string;
    language: string;
    plugType: string;
    bestTime: string;
    visa: string;
  };
  weather: {
    season: string;
    tempRange: string;
    description: string;
    icon: 'snowflake' | 'leaf' | 'sun' | 'cloud-sun';
  }[];
  transport: {
    mode: string;
    description: string;
    cost: string;
    color: string; // Tailwind color name: "red" | "yellow" | "green" | "blue"
  }[];
  budget: {
    tier: string;
    dailyCost: string;
    color: string; // "green" | "orange" | "purple"
    featured?: boolean;
    items: string[];
  }[];
  heroImages: [string, string];
  tagline: string;
  heroDescription: string;
}

// Lookup table of city metadata by slug (subset of scripts/cities.ts for runtime)
export const CITY_META: Record<string, CityMeta> = {
  dubai: { name: "Dubai", slug: "dubai", country: "United Arab Emirates", continent: "Asia", currency: "AED", language: "Arabic", unsplashId: "photo-1512453979798-5ea266f8880c", nearbyCity: "Abu Dhabi", signatureExperience: "Desert Safari", famousAttraction: "Burj Khalifa", hasBeach: true, hasYacht: true },
  'abu-dhabi': { name: "Abu Dhabi", slug: "abu-dhabi", country: "United Arab Emirates", continent: "Asia", currency: "AED", language: "Arabic", unsplashId: "photo-1512100356356-de1b84283e18", nearbyCity: "Dubai", signatureExperience: "Sheikh Zayed Mosque Visit", famousAttraction: "Sheikh Zayed Grand Mosque", hasBeach: true, hasYacht: true },
  bangkok: { name: "Bangkok", slug: "bangkok", country: "Thailand", continent: "Asia", currency: "THB", language: "Thai", unsplashId: "photo-1508009603885-50cf7c579365", nearbyCity: "Pattaya", signatureExperience: "Floating Market Tour", famousAttraction: "Grand Palace", hasBeach: false, hasYacht: true },
  singapore: { name: "Singapore", slug: "singapore", country: "Singapore", continent: "Asia", currency: "SGD", language: "English", unsplashId: "photo-1525625293386-3f8f99389edd", nearbyCity: "Kuala Lumpur", signatureExperience: "Gardens by the Bay Light Show", famousAttraction: "Marina Bay Sands", hasBeach: true, hasYacht: true },
  tokyo: { name: "Tokyo", slug: "tokyo", country: "Japan", continent: "Asia", currency: "JPY", language: "Japanese", unsplashId: "photo-1540959733332-eab4deabeeaf", nearbyCity: "Kyoto", signatureExperience: "Tsukiji Market Sushi Breakfast", famousAttraction: "Senso-ji Temple", hasBeach: false, hasYacht: true },
  london: { name: "London", slug: "london", country: "United Kingdom", continent: "Europe", currency: "GBP", language: "English", unsplashId: "photo-1513635269975-59663e0ac1ad", nearbyCity: "Paris", signatureExperience: "Thames River Cruise", famousAttraction: "Big Ben", hasBeach: false, hasYacht: true },
  paris: { name: "Paris", slug: "paris", country: "France", continent: "Europe", currency: "EUR", language: "French", unsplashId: "photo-1502602898657-3e91760cbb34", nearbyCity: "London", signatureExperience: "Seine River Cruise", famousAttraction: "Eiffel Tower", hasBeach: false, hasYacht: true },
  rome: { name: "Rome", slug: "rome", country: "Italy", continent: "Europe", currency: "EUR", language: "Italian", unsplashId: "photo-1552832230-c0197dd311b5", nearbyCity: "Florence", signatureExperience: "Colosseum & Forum Tour", famousAttraction: "Colosseum", hasBeach: false, hasYacht: false },
  istanbul: { name: "Istanbul", slug: "istanbul", country: "Turkey", continent: "Europe", currency: "TRY", language: "Turkish", unsplashId: "photo-1524231757912-21f4fe3a7200", nearbyCity: "Athens", signatureExperience: "Bosphorus Cruise", famousAttraction: "Hagia Sophia", hasBeach: false, hasYacht: true },
  'new-york': { name: "New York", slug: "new-york", country: "United States", continent: "North America", currency: "USD", language: "English", unsplashId: "photo-1496442226666-8d4d0e62e6e9", nearbyCity: "Boston", signatureExperience: "Statue of Liberty Ferry", famousAttraction: "Statue of Liberty", hasBeach: false, hasYacht: true },
};

// Extended guide data — start with Dubai, add more cities over time
export const CITY_GUIDE_DATA: Record<string, CityGuideData> = {
  dubai: {
    quickStats: {
      currency: { code: 'AED', name: 'UAE Dirham' },
      timezone: 'GMT+4',
      language: 'Arabic & English',
      plugType: 'Type G (UK)',
      bestTime: 'Nov - Mar',
      visa: 'On Arrival (30 days)*',
    },
    weather: [
      { season: 'Winter (Nov-Feb)', tempRange: '20-30°C', description: 'Perfect weather for outdoor activities. Peak tourist season with higher prices.', icon: 'snowflake' },
      { season: 'Spring (Mar-Apr)', tempRange: '25-35°C', description: 'Warming up but still pleasant. Good for beach activities.', icon: 'leaf' },
      { season: 'Summer (May-Sep)', tempRange: '35-48°C', description: 'Extremely hot. Great hotel deals (30-50% off). Indoor activities recommended.', icon: 'sun' },
      { season: 'Autumn (Oct)', tempRange: '28-38°C', description: 'Temperatures cooling. Shoulder season with moderate prices.', icon: 'cloud-sun' },
    ],
    transport: [
      { mode: 'Dubai Metro', description: 'Red and Green lines cover major attractions. Nol Card required (25 AED + fares). Gold class available. Runs 5AM-12AM.', cost: 'AED 3-7.50', color: 'red' },
      { mode: 'Taxi / Ride-Hailing', description: 'RTA metered taxis everywhere. Careem (local favorite), Uber, and Hala (RTA official app) available.', cost: 'AED 12+ base', color: 'yellow' },
      { mode: 'Bus Network', description: 'Extensive air-conditioned network covering areas Metro doesn\'t reach. Nol card accepted.', cost: 'AED 3-5', color: 'green' },
      { mode: 'Abra (Water Taxi)', description: 'Traditional wooden boats crossing Dubai Creek. A must-do cultural experience. Just 1 AED per ride!', cost: 'AED 1-50', color: 'blue' },
    ],
    budget: [
      {
        tier: 'Budget',
        dailyCost: 'AED 350-500/day',
        color: 'green',
        items: ['Hostel/budget hotel: AED 150-250', 'Street food & cafes: AED 60-100', 'Metro/bus transport: AED 20-30', '1-2 attractions: AED 100-150', 'Free beaches & souks'],
      },
      {
        tier: 'Mid-Range',
        dailyCost: 'AED 800-1500/day',
        color: 'orange',
        featured: true,
        items: ['4-star hotel: AED 400-700', 'Restaurants & cafes: AED 150-250', 'Mix of taxi & metro: AED 80-120', '2-3 attractions: AED 200-350', 'Desert safari included'],
      },
      {
        tier: 'Luxury',
        dailyCost: 'AED 3000+/day',
        color: 'purple',
        items: ['5-star hotel: AED 1500-5000+', 'Fine dining: AED 500-1000+', 'Private transfers: AED 300-500', 'Premium experiences: AED 500+', 'Helicopter tours, yacht cruises'],
      },
    ],
    heroImages: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&h=600&fit=crop&q=80',
    ],
    tagline: 'Where Modern Marvels Meet Arabian Heritage',
    heroDescription: 'Dubai blends ancient Arabian heritage with futuristic architecture. From the world\'s tallest building to golden desert dunes, this comprehensive guide covers everything first-time visitors need to know for an unforgettable trip.',
  },
};

export function getCityMeta(slug: string): CityMeta | undefined {
  return CITY_META[slug];
}

export function getCityGuideData(slug: string): CityGuideData | undefined {
  return CITY_GUIDE_DATA[slug];
}
