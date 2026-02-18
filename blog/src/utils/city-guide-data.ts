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

export interface Activity {
  name: string;
  description: string;
  price: string; // e.g. "From AED 179" or "Free"
  image: string;
  url: string;
}

export interface LocationSpot {
  name: string;
  description: string;
  badge: string;        // e.g. "Free Entry", "Paid Entry"
  badgeColor: 'green' | 'blue' | 'orange';
  image: string;
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
  activities?: {
    label: string;
    heading: string;
    description: string;
    viewAllUrl: string;
    items: Activity[];
  };
  spots?: {
    label: string;
    heading: string;
    description: string;
    items: LocationSpot[];
  };
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

// Extended guide data for all major cities
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
    activities: {
      label: 'Activities',
      heading: 'Where fun and family come together',
      description: 'Dubai offers world-class attractions for travelers of all ages. From theme parks to cultural experiences, there\'s something for everyone.',
      viewAllUrl: 'https://www.raynatours.com/dubai',
      items: [
        { name: 'Burj Khalifa', description: "World's tallest building at 828m", price: 'From AED 179', image: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/dubai' },
        { name: 'Desert Safari', description: 'Dune bashing, BBQ & entertainment', price: 'From AED 120', image: 'https://images.unsplash.com/photo-1509233725247-49e657c54213?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/dubai' },
        { name: 'Dubai Frame', description: '150m picture frame structure', price: 'From AED 50', image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/dubai' },
        { name: 'Balloon Flights', description: 'Sunrise views over the desert', price: 'From AED 950', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/dubai' },
      ],
    },
    spots: {
      label: 'Beaches',
      heading: 'Best Beaches in Dubai',
      description: 'Dubai boasts pristine beaches with crystal-clear waters and world-class amenities.',
      items: [
        { name: 'JBR Beach (Jumeirah Beach Residence)', description: "Dubai's most popular public beach with stunning Marina views, water sports, and The Walk promenade with shops and restaurants.", badge: 'Free Entry', badgeColor: 'green', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop&q=80' },
        { name: 'Kite Beach', description: 'Perfect for kite surfing and water sports with Burj Al Arab views. Features beach libraries, food trucks, and fitness areas.', badge: 'Free Entry', badgeColor: 'green', image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&h=400&fit=crop&q=80' },
        { name: 'La Mer Beach', description: 'Trendy beachfront destination with street art, boutique shops, waterpark, and diverse dining options. Instagram-worthy spots everywhere.', badge: 'Free Entry', badgeColor: 'green', image: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?w=600&h=400&fit=crop&q=80' },
      ],
    },
  },

  'abu-dhabi': {
    quickStats: {
      currency: { code: 'AED', name: 'UAE Dirham' },
      timezone: 'GMT+4',
      language: 'Arabic & English',
      plugType: 'Type G (UK)',
      bestTime: 'Oct - Mar',
      visa: 'On Arrival (30 days)*',
    },
    weather: [
      { season: 'Winter (Oct-Feb)', tempRange: '18-28°C', description: 'Ideal weather for sightseeing, outdoor events, and beach days. Peak tourist season.', icon: 'snowflake' },
      { season: 'Spring (Mar-Apr)', tempRange: '25-35°C', description: 'Warming up quickly. Good time for desert experiences before summer heat.', icon: 'leaf' },
      { season: 'Summer (May-Sep)', tempRange: '35-45°C', description: 'Very hot and humid. Excellent hotel deals, indoor attractions, and shopping malls.', icon: 'sun' },
      { season: 'Autumn (Oct)', tempRange: '28-38°C', description: 'Transition season. Temperatures drop gradually. Good shoulder-season deals.', icon: 'cloud-sun' },
    ],
    transport: [
      { mode: 'Taxi / Ride-Hailing', description: 'Metered taxis are the most common way to get around. Abu Dhabi Taxi app is reliable. Uber and Careem also operate.', cost: 'AED 12+ base', color: 'yellow' },
      { mode: 'Bus Network', description: 'DoT buses connect major areas including Yas Island, Corniche, and airport. Affordable but infrequent.', cost: 'AED 2-5', color: 'green' },
      { mode: 'Water Bus', description: 'Scenic water routes connecting Corniche to Abu Dhabi Island landmarks. Great way to see the waterfront.', cost: 'AED 2-4', color: 'blue' },
      { mode: 'Car Rental', description: 'Renting a car is recommended for flexibility. Roads are excellent and parking is free in most areas.', cost: 'AED 150-300/day', color: 'red' },
    ],
    budget: [
      { tier: 'Budget', dailyCost: 'AED 300-450/day', color: 'green', items: ['Budget hotel: AED 120-200', 'Street food & cafes: AED 50-80', 'Bus transport: AED 15-25', '1-2 attractions: AED 80-120', 'Free mosque visits'] },
      { tier: 'Mid-Range', dailyCost: 'AED 700-1200/day', color: 'orange', featured: true, items: ['4-star hotel: AED 350-600', 'Restaurants: AED 150-200', 'Taxi transport: AED 80-120', 'Ferrari World or Louvre: AED 150-300', 'Yas Island day trip'] },
      { tier: 'Luxury', dailyCost: 'AED 2500+/day', color: 'purple', items: ['5-star resort: AED 1200-4000+', 'Fine dining: AED 400-800+', 'Private transfers: AED 250-450', 'VIP theme park access: AED 400+', 'Private yacht, helicopter tours'] },
    ],
    heroImages: [
      'https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1568895559090-a2e1da6abf30?w=800&h=600&fit=crop&q=80',
    ],
    tagline: 'Grandeur, Culture & Arabian Elegance',
    heroDescription: 'Abu Dhabi, the UAE\'s serene capital, pairs world-class museums and theme parks with pristine beaches and the iconic Sheikh Zayed Grand Mosque. This guide covers everything you need to plan an unforgettable visit.',
    activities: {
      label: 'Activities',
      heading: 'World-class experiences await',
      description: 'From cultural landmarks to high-speed thrills, Abu Dhabi delivers extraordinary experiences for every type of traveler.',
      viewAllUrl: 'https://www.raynatours.com/abu-dhabi',
      items: [
        { name: 'Sheikh Zayed Mosque', description: 'One of the world\'s largest mosques, stunning white marble architecture', price: 'Free Entry', image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/abu-dhabi' },
        { name: 'Ferrari World', description: 'Home to Formula Rossa, the world\'s fastest roller coaster', price: 'From AED 295', image: 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/abu-dhabi' },
        { name: 'Louvre Abu Dhabi', description: 'Universal museum showcasing art from across civilizations', price: 'From AED 63', image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/abu-dhabi' },
        { name: 'Desert Safari', description: 'Dune bashing, camel rides & traditional Bedouin dinner', price: 'From AED 150', image: 'https://images.unsplash.com/photo-1509233725247-49e657c54213?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/abu-dhabi' },
      ],
    },
    spots: {
      label: 'Beaches',
      heading: 'Best Beaches in Abu Dhabi',
      description: 'Abu Dhabi\'s coastline stretches over 700km with pristine beaches and crystal-clear Arabian Gulf waters.',
      items: [
        { name: 'Corniche Beach', description: 'Abu Dhabi\'s iconic 8km waterfront promenade. Blue Flag certified beach with stunning city skyline views and excellent facilities.', badge: 'Free Entry', badgeColor: 'green', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop&q=80' },
        { name: 'Saadiyat Beach', description: 'A pristine natural beach adjacent to world-class museums and luxury resorts. Calm, crystal-clear waters perfect for swimming.', badge: 'Paid Entry', badgeColor: 'orange', image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&h=400&fit=crop&q=80' },
        { name: 'Yas Beach', description: 'Modern beach club on Yas Island near Ferrari World. Water sports, beach loungers, and F&B outlets in a vibrant setting.', badge: 'From AED 35', badgeColor: 'blue', image: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?w=600&h=400&fit=crop&q=80' },
      ],
    },
  },

  bangkok: {
    quickStats: {
      currency: { code: 'THB', name: 'Thai Baht' },
      timezone: 'GMT+7',
      language: 'Thai',
      plugType: 'Type A/B/C',
      bestTime: 'Nov - Feb',
      visa: 'Visa Free (60 days)*',
    },
    weather: [
      { season: 'Cool Season (Nov-Feb)', tempRange: '18-30°C', description: 'Best time to visit. Low humidity, clear skies, great for sightseeing and outdoor temples.', icon: 'snowflake' },
      { season: 'Hot Season (Mar-May)', tempRange: '30-40°C', description: 'Very hot and dry. Songkran (Thai New Year) in April. Indoor activities recommended midday.', icon: 'sun' },
      { season: 'Rainy Season (Jun-Oct)', tempRange: '28-35°C', description: 'Frequent afternoon showers. Lush greenery, fewer tourists, and great hotel deals.', icon: 'cloud-sun' },
      { season: 'Transition (Oct-Nov)', tempRange: '25-33°C', description: 'Cooling down with occasional rain. Ideal for budget travelers before peak season.', icon: 'leaf' },
    ],
    transport: [
      { mode: 'BTS Skytrain', description: 'Elevated rail covering Sukhumvit and Silom. Rabbit Card for easy top-ups. Air-conditioned and efficient.', cost: 'THB 17-62', color: 'green' },
      { mode: 'MRT Subway', description: 'Underground metro connecting key areas including Chatuchak, Silom, and Hua Lamphong Station.', cost: 'THB 17-42', color: 'blue' },
      { mode: 'Tuk-Tuk', description: 'Iconic three-wheeled taxi. Always negotiate the fare before boarding. Great for short hops and the local experience.', cost: 'THB 60-150', color: 'yellow' },
      { mode: 'Metered Taxi', description: 'Affordable and widely available. Insist on the meter ("meter dai krub"). Grab app is reliable and safer.', cost: 'THB 35+ base', color: 'red' },
    ],
    budget: [
      { tier: 'Budget', dailyCost: 'THB 1000-1500/day', color: 'green', items: ['Hostel/guesthouse: THB 300-500', 'Street food & local restaurants: THB 150-250', 'BTS/MRT transport: THB 80-120', '1-2 temple entries: THB 100-200', 'Night markets & free sights'] },
      { tier: 'Mid-Range', dailyCost: 'THB 2500-5000/day', color: 'orange', featured: true, items: ['3-4 star hotel: THB 1000-2000', 'Mix of local & tourist restaurants: THB 400-700', 'Taxis & BTS: THB 200-350', 'Day trip or boat tour: THB 500-800', 'Rooftop bar evening'] },
      { tier: 'Luxury', dailyCost: 'THB 10000+/day', color: 'purple', items: ['5-star hotel: THB 4000-12000+', 'Fine dining: THB 1500-3000+', 'Private car & transfers: THB 1500-3000', 'Private tours & experiences: THB 2000+', 'Sky bar, spa, river cruise'] },
    ],
    heroImages: [
      'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1555921015-5532091f6026?w=800&h=600&fit=crop&q=80',
    ],
    tagline: 'The City of Angels Awaits',
    heroDescription: 'Bangkok dazzles with ornate temples, floating markets, world-class street food, and pulsating nightlife. This guide covers all you need to navigate, enjoy, and fall in love with the Thai capital.',
    activities: {
      label: 'Activities',
      heading: 'Discover the soul of Bangkok',
      description: 'From sacred temples to buzzing markets and thrilling river tours, Bangkok delivers unforgettable experiences at every corner.',
      viewAllUrl: 'https://www.raynatours.com/bangkok',
      items: [
        { name: 'Grand Palace & Wat Phra Kaew', description: 'Thailand\'s most sacred site and former royal residence', price: 'From THB 500', image: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/bangkok' },
        { name: 'Floating Market Tour', description: 'Damnoen Saduak or Amphawa by traditional longtail boat', price: 'From THB 800', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/bangkok' },
        { name: 'Chao Phraya Dinner Cruise', description: 'Romantic evening cruise with buffet dinner and city views', price: 'From THB 1200', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/bangkok' },
        { name: 'Muay Thai Evening Show', description: 'Live Thai boxing at Rajadamnern or Lumpinee stadium', price: 'From THB 1500', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/bangkok' },
      ],
    },
    spots: {
      label: 'Landmarks',
      heading: 'Iconic places to explore',
      description: 'Beyond the temples, Bangkok\'s neighborhoods each have a distinct personality and charm to discover.',
      items: [
        { name: 'Chatuchak Weekend Market', description: 'One of the world\'s largest markets with over 15,000 stalls. Find everything from antiques to street food and clothing.', badge: 'Free Entry', badgeColor: 'green', image: 'https://images.unsplash.com/photo-1555529902-5261145633bf?w=600&h=400&fit=crop&q=80' },
        { name: 'Khao San Road', description: 'Bangkok\'s legendary backpacker hub lined with guesthouses, bars, street food, and unique shopping in the heart of the Old City.', badge: 'Free Entry', badgeColor: 'green', image: 'https://images.unsplash.com/photo-1509233725247-49e657c54213?w=600&h=400&fit=crop&q=80' },
        { name: 'Chinatown (Yaowarat)', description: 'Bangkok\'s vibrant Chinatown bursting with gold shops, seafood restaurants, and street food stalls active until midnight.', badge: 'Free Entry', badgeColor: 'green', image: 'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=600&h=400&fit=crop&q=80' },
      ],
    },
  },

  singapore: {
    quickStats: {
      currency: { code: 'SGD', name: 'Singapore Dollar' },
      timezone: 'GMT+8',
      language: 'English',
      plugType: 'Type G (UK)',
      bestTime: 'Feb - Apr',
      visa: 'Visa Free (30-90 days)*',
    },
    weather: [
      { season: 'Dry Season (Feb-Apr)', tempRange: '25-32°C', description: 'Least rainfall of the year. Best time for outdoor sightseeing and beach days on Sentosa.', icon: 'sun' },
      { season: 'SW Monsoon (May-Sep)', tempRange: '25-32°C', description: 'Short, intense afternoon showers. Hot and humid but rarely disrupts plans for long.', icon: 'cloud-sun' },
      { season: 'Inter-monsoon (Oct-Nov)', tempRange: '24-31°C', description: 'Thunderstorms possible but skies often clear. Comfortable temperatures overall.', icon: 'leaf' },
      { season: 'NE Monsoon (Dec-Jan)', tempRange: '23-30°C', description: 'Wettest season with heavy showers. Christmas and Chinese New Year bring festive decorations.', icon: 'snowflake' },
    ],
    transport: [
      { mode: 'MRT (Mass Rapid Transit)', description: 'Fast, clean, and affordable rail network covering most tourist attractions. EZ-Link card recommended.', cost: 'SGD 0.80-2.20', color: 'red' },
      { mode: 'Public Bus', description: 'Extensive bus network reaching every corner of the island. Same EZ-Link card works. Google Maps shows live arrivals.', cost: 'SGD 0.75-2.00', color: 'green' },
      { mode: 'Grab (Ride-Hailing)', description: 'Southeast Asia\'s leading ride-hailing app. Faster than taxis, upfront pricing, and widely used by locals.', cost: 'SGD 8-25', color: 'blue' },
      { mode: 'Cable Car', description: 'Scenic ride between Mount Faber, HarbourFront, and Sentosa Island. Great views of the harbor and southern islands.', cost: 'SGD 17-35', color: 'yellow' },
    ],
    budget: [
      { tier: 'Budget', dailyCost: 'SGD 80-120/day', color: 'green', items: ['Hostel dorm: SGD 25-45', 'Hawker Centre meals: SGD 15-25', 'MRT & buses: SGD 5-10', 'Gardens by the Bay (outdoor): Free', 'Night Safari or SkyPark'] },
      { tier: 'Mid-Range', dailyCost: 'SGD 200-350/day', color: 'orange', featured: true, items: ['3-4 star hotel: SGD 100-200', 'Mix of hawkers & restaurants: SGD 50-80', 'Grab & MRT: SGD 20-35', 'Universal Studios or SEA Aquarium: SGD 60-90', 'Marina Bay Sands SkyPark'] },
      { tier: 'Luxury', dailyCost: 'SGD 700+/day', color: 'purple', items: ['Marina Bay Sands or Capella: SGD 400-1000+', 'Fine dining restaurants: SGD 150-400+', 'Private car hire: SGD 80-200', 'Private tours & yacht: SGD 300+', 'Michelin-star dining'] },
    ],
    heroImages: [
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&h=600&fit=crop&q=80',
    ],
    tagline: 'Where East Meets West in Perfect Harmony',
    heroDescription: 'Singapore packs an extraordinary variety of experiences into a tiny island nation. Cutting-edge architecture, Michelin-starred street food, lush gardens, and a melting pot of cultures make it one of Asia\'s most exciting destinations.',
    activities: {
      label: 'Activities',
      heading: 'Singapore\'s best experiences',
      description: 'From futuristic gardens to theme parks and cultural neighborhoods, Singapore offers non-stop excitement for all ages.',
      viewAllUrl: 'https://www.raynatours.com/singapore',
      items: [
        { name: 'Marina Bay Sands SkyPark', description: 'Iconic infinity pool and observation deck 57 floors up', price: 'From SGD 26', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/singapore' },
        { name: 'Gardens by the Bay', description: 'Futuristic Supertrees and OCBC Skyway light show', price: 'From SGD 28', image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/singapore' },
        { name: 'Universal Studios', description: 'Southeast Asia\'s only Universal Studios theme park on Sentosa', price: 'From SGD 83', image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/singapore' },
        { name: 'Singapore Night Safari', description: 'World\'s first nocturnal wildlife park with tram rides', price: 'From SGD 49', image: 'https://images.unsplash.com/photo-1509233725247-49e657c54213?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/singapore' },
      ],
    },
    spots: {
      label: 'Beaches',
      heading: 'Best Beaches in Singapore',
      description: 'Singapore\'s beach scene is concentrated on Sentosa Island and the East Coast, offering white sand and calm waters.',
      items: [
        { name: 'Siloso Beach, Sentosa', description: 'Singapore\'s most popular beach with beach bars, water sports, and easy access via cable car or monorail from VivoCity.', badge: 'From SGD 4', badgeColor: 'blue', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop&q=80' },
        { name: 'East Coast Park Beach', description: 'A 15km stretch of parkland and beach perfect for cycling, BBQs, and water sports. A beloved local weekend destination.', badge: 'Free Entry', badgeColor: 'green', image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&h=400&fit=crop&q=80' },
        { name: 'Palawan Beach', description: 'Home to the Southernmost Point of Continental Asia. Ideal for families with shallow waters and a floating bridge to a tiny island.', badge: 'Free Entry', badgeColor: 'green', image: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?w=600&h=400&fit=crop&q=80' },
      ],
    },
  },

  tokyo: {
    quickStats: {
      currency: { code: 'JPY', name: 'Japanese Yen' },
      timezone: 'GMT+9',
      language: 'Japanese',
      plugType: 'Type A (US/JP)',
      bestTime: 'Mar - May',
      visa: 'Visa Free (90 days)*',
    },
    weather: [
      { season: 'Spring (Mar-May)', tempRange: '5-22°C', description: 'Cherry blossom season (late Mar-Apr). The most beautiful and popular time to visit. Book early.', icon: 'leaf' },
      { season: 'Summer (Jun-Sep)', tempRange: '22-34°C', description: 'Hot and humid with a rainy season (tsuyu) in June. Summer festivals and fireworks from July.', icon: 'sun' },
      { season: 'Autumn (Oct-Nov)', tempRange: '10-24°C', description: 'Stunning fall foliage from mid-October. Mild weather, clear skies, and fewer crowds than spring.', icon: 'cloud-sun' },
      { season: 'Winter (Dec-Feb)', tempRange: '0-12°C', description: 'Cold but rarely snows in central Tokyo. Illuminations, onsens, and New Year celebrations.', icon: 'snowflake' },
    ],
    transport: [
      { mode: 'JR Yamanote Line', description: 'The loop line connecting all major Tokyo districts: Shibuya, Shinjuku, Akihabara, Ueno, and more. IC Card essential.', cost: 'JPY 140-320', color: 'green' },
      { mode: 'Tokyo Metro', description: '9 color-coded metro lines covering the inner city. 1-day pass available. Google Maps works perfectly for navigation.', cost: 'JPY 170-320', color: 'blue' },
      { mode: 'IC Card (Suica/Pasmo)', description: 'Rechargeable smart card used on all trains, subways, buses, and even convenience stores. Essential for every visitor.', cost: 'JPY 500 deposit', color: 'yellow' },
      { mode: 'Shinkansen', description: 'Japan Rail Pass recommended for day trips to Kyoto, Osaka, Hiroshima. Book JR Pass before arrival for best value.', cost: 'JPY 13,870+', color: 'red' },
    ],
    budget: [
      { tier: 'Budget', dailyCost: 'JPY 8000-12000/day', color: 'green', items: ['Capsule/hostel: JPY 3000-5000', 'Convenience stores & ramen: JPY 1500-2500', 'Metro/train: JPY 500-800', 'Free temples & parks', 'Tsukiji outer market snacks'] },
      { tier: 'Mid-Range', dailyCost: 'JPY 18000-35000/day', color: 'orange', featured: true, items: ['Business hotel: JPY 8000-15000', 'Mix of restaurants: JPY 4000-7000', 'IC Card transport: JPY 1000-1500', 'TeamLab or Ghibli Museum: JPY 2000-3200', 'Day trip to Nikko or Kamakura'] },
      { tier: 'Luxury', dailyCost: 'JPY 80000+/day', color: 'purple', items: ['5-star hotel (Park Hyatt): JPY 40000-120000+', 'Kaiseki dinner: JPY 15000-50000+', 'Private car & chauffeur: JPY 15000+', 'Private sushi counter: JPY 20000+', 'Helicopter tour over Mt Fuji'] },
    ],
    heroImages: [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&h=600&fit=crop&q=80',
    ],
    tagline: 'Where Ancient Tradition Meets the Future',
    heroDescription: 'Tokyo is a city of endless contrast — centuries-old temples beside glittering skyscrapers, serene Zen gardens next to neon-drenched arcades. This guide unlocks the best of Japan\'s electrifying capital for first-time and returning visitors.',
    activities: {
      label: 'Activities',
      heading: 'Unmissable Tokyo experiences',
      description: 'Tokyo blends ancient culture with cutting-edge innovation, offering one-of-a-kind experiences found nowhere else on earth.',
      viewAllUrl: 'https://www.raynatours.com/tokyo',
      items: [
        { name: 'Senso-ji Temple', description: 'Tokyo\'s oldest and most visited Buddhist temple in Asakusa', price: 'Free Entry', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/tokyo' },
        { name: 'TeamLab Borderless', description: 'Immersive digital art museum — a truly unique experience', price: 'From JPY 3200', image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/tokyo' },
        { name: 'Mt Fuji Day Trip', description: 'Iconic volcano visit with Hakone or Kawaguchiko lakes', price: 'From JPY 8000', image: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/tokyo' },
        { name: 'Shibuya Crossing & Sky', description: 'World\'s busiest crossing + Shibuya Sky rooftop observation deck', price: 'From JPY 2000', image: 'https://images.unsplash.com/photo-1509233725247-49e657c54213?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/tokyo' },
      ],
    },
    spots: {
      label: 'Parks & Gardens',
      heading: 'Tokyo\'s most beautiful green spaces',
      description: 'Despite its urban density, Tokyo offers stunning parks and gardens for a peaceful retreat from the city buzz.',
      items: [
        { name: 'Shinjuku Gyoen National Garden', description: 'Tokyo\'s most beautiful park blending French formal, English landscape, and traditional Japanese garden styles. Spectacular in cherry blossom season.', badge: 'JPY 500', badgeColor: 'blue', image: 'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=600&h=400&fit=crop&q=80' },
        { name: 'Ueno Park', description: 'Tokyo\'s most popular park with several major museums, Ueno Zoo, Shinobazu Pond, and incredible cherry blossom parties each spring.', badge: 'Free Entry', badgeColor: 'green', image: 'https://images.unsplash.com/photo-1555921015-5532091f6026?w=600&h=400&fit=crop&q=80' },
        { name: 'Odaiba Seaside Park', description: 'A waterfront park on Tokyo Bay with views of Rainbow Bridge and a replica Statue of Liberty. Great for sunsets and relaxed walks.', badge: 'Free Entry', badgeColor: 'green', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop&q=80' },
      ],
    },
  },

  london: {
    quickStats: {
      currency: { code: 'GBP', name: 'British Pound' },
      timezone: 'GMT / BST (Summer)',
      language: 'English',
      plugType: 'Type G (UK)',
      bestTime: 'May - Sep',
      visa: 'ETA Required (2025)*',
    },
    weather: [
      { season: 'Spring (Mar-May)', tempRange: '8-18°C', description: 'Blooming parks, longer days, and fewer tourists. Unpredictable showers — carry an umbrella.', icon: 'leaf' },
      { season: 'Summer (Jun-Aug)', tempRange: '15-25°C', description: 'Peak season. Outdoor events, festivals, long daylight hours. Book accommodation well in advance.', icon: 'sun' },
      { season: 'Autumn (Sep-Nov)', tempRange: '8-16°C', description: 'Beautiful fall colors in parks. Museums less crowded, prices dip. Cozy pub weather begins.', icon: 'cloud-sun' },
      { season: 'Winter (Dec-Feb)', tempRange: '2-10°C', description: 'Cold and grey but magical Christmas markets and decorations. New Year fireworks on the Thames.', icon: 'snowflake' },
    ],
    transport: [
      { mode: 'London Underground', description: 'The world\'s oldest metro. 11 lines covering all major areas. Oyster card or contactless payment. Peak hours: 7-9:30AM & 4-7PM.', cost: 'GBP 2.50-3.80', color: 'red' },
      { mode: 'Buses (Red Double-Decker)', description: 'Extensive network open 24/7. Contactless payment only (no cash). Night buses cover all boroughs. Iconic experience on top deck!', cost: 'GBP 1.75 flat fare', color: 'green' },
      { mode: 'Elizabeth Line (Crossrail)', description: 'The newest and fastest cross-London rail. Connects Heathrow to central London in 30 mins. Modern, spacious trains.', cost: 'GBP 2.80-5.00', color: 'blue' },
      { mode: 'Thames Clipper (River Bus)', description: 'Fast commuter boats along the Thames. Scenic alternative to the Tube. Stops at Embankment, Tate Modern, and Greenwich.', cost: 'GBP 5-10', color: 'yellow' },
    ],
    budget: [
      { tier: 'Budget', dailyCost: 'GBP 80-120/day', color: 'green', items: ['Hostel dorm: GBP 25-40', 'Meal deals & street food: GBP 15-25', 'Oyster card transport: GBP 8-15', 'Free museums (British, V&A, National Gallery)', 'Free parks & South Bank'] },
      { tier: 'Mid-Range', dailyCost: 'GBP 180-300/day', color: 'orange', featured: true, items: ['3-4 star hotel: GBP 100-180', 'Pubs & casual restaurants: GBP 40-60', 'Oyster/contactless: GBP 10-18', 'Tower of London or London Eye: GBP 28-35', 'West End show tickets'] },
      { tier: 'Luxury', dailyCost: 'GBP 600+/day', color: 'purple', items: ['5-star hotel (Claridge\'s): GBP 400-1500+', 'Fine dining (Gordon Ramsay): GBP 150-300+', 'Private car hire: GBP 100-300', 'Private tours: GBP 200+', 'Harrods, private concierge, heli tour'] },
    ],
    heroImages: [
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=800&h=600&fit=crop&q=80',
    ],
    tagline: 'A World City Like No Other',
    heroDescription: 'London is an inexhaustible city that manages to be both deeply historic and relentlessly modern. From free world-class museums to iconic royal palaces, buzzing street food markets to legendary theatre, this guide helps you make the most of every minute.',
    activities: {
      label: 'Activities',
      heading: 'The best of London',
      description: 'London\'s attractions range from free world-class museums to thrilling river experiences and iconic Royal landmarks.',
      viewAllUrl: 'https://www.raynatours.com/london',
      items: [
        { name: 'Tower of London', description: 'Crown Jewels, Beefeaters & 900 years of royal history', price: 'From GBP 34', image: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/london' },
        { name: 'British Museum', description: 'World\'s greatest collection of human history & culture', price: 'Free Entry', image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/london' },
        { name: 'London Eye', description: 'Giant Ferris wheel with panoramic views across the Thames', price: 'From GBP 28', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/london' },
        { name: 'Thames River Cruise', description: 'Scenic 1-hour cruise from Westminster to Tower Bridge', price: 'From GBP 15', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/london' },
      ],
    },
    spots: {
      label: 'Parks',
      heading: 'London\'s iconic green spaces',
      description: 'London has more green space per capita than almost any major city — these Royal Parks are the city\'s lungs and living rooms.',
      items: [
        { name: 'Hyde Park', description: 'London\'s most famous Royal Park with the Serpentine lake, Speaker\'s Corner, and year-round events. Perfect for cycling, rowing, and picnics.', badge: 'Free Entry', badgeColor: 'green', image: 'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=600&h=400&fit=crop&q=80' },
        { name: 'Hampstead Heath', description: 'Wild and expansive parkland in North London with swimming ponds, Parliament Hill viewpoint, and Kenwood House. A true escape from the city.', badge: 'Free Entry', badgeColor: 'green', image: 'https://images.unsplash.com/photo-1555921015-5532091f6026?w=600&h=400&fit=crop&q=80' },
        { name: 'South Bank & Southwark', description: 'London\'s liveliest riverside walk from Westminster Bridge to London Bridge, featuring Tate Modern, Borough Market, and Shakespeare\'s Globe Theatre.', badge: 'Free Entry', badgeColor: 'green', image: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?w=600&h=400&fit=crop&q=80' },
      ],
    },
  },

  paris: {
    quickStats: {
      currency: { code: 'EUR', name: 'Euro' },
      timezone: 'GMT+1 / +2 (Summer)',
      language: 'French',
      plugType: 'Type C/E (EU)',
      bestTime: 'Apr - Jun',
      visa: 'Schengen (90 days)*',
    },
    weather: [
      { season: 'Spring (Apr-Jun)', tempRange: '8-22°C', description: 'Paris at its most romantic. Gardens in bloom, café terraces open, outdoor events begin. Ideal weather for sightseeing.', icon: 'leaf' },
      { season: 'Summer (Jul-Aug)', tempRange: '18-30°C', description: 'Long sunny days and lively outdoor culture. Crowded but magical. Paris Plages beach event along the Seine in July.', icon: 'sun' },
      { season: 'Autumn (Sep-Nov)', tempRange: '10-20°C', description: 'Golden light, colorful parks, and fewer tourists. Great for art lovers — galleries and museums are less crowded.', icon: 'cloud-sun' },
      { season: 'Winter (Dec-Mar)', tempRange: '3-10°C', description: 'Cold but festive. Christmas markets, illuminated boulevards, and the Louvre practically to yourself in January.', icon: 'snowflake' },
    ],
    transport: [
      { mode: 'Métro', description: '16 lines covering all of central Paris. Tickets valid for 90 minutes. Navigo week/month pass best value for multi-day stays.', cost: 'EUR 1.73-2.15', color: 'blue' },
      { mode: 'RER (Regional Express)', description: 'Fast trains connecting central Paris to Versailles, CDG Airport, and Disneyland. Zone-based pricing applies.', cost: 'EUR 3.80-11.50', color: 'red' },
      { mode: 'Vélib\' Bike Share', description: 'Self-service bikes available at 1,400+ stations. First 30 mins free on non-electric. Ideal for exploring along the Seine.', cost: 'EUR 3/day pass', color: 'green' },
      { mode: 'Bus & Tram', description: 'Extensive network covering areas the Métro misses. Night bus (Noctilien) runs after midnight when the Métro stops.', cost: 'EUR 1.73', color: 'yellow' },
    ],
    budget: [
      { tier: 'Budget', dailyCost: 'EUR 80-120/day', color: 'green', items: ['Hostel/budget hotel: EUR 30-60', 'Boulangeries & supermarkets: EUR 15-25', 'Navigo day pass: EUR 8.65', 'Free Louvre (under 26 EU): Free', 'Eiffel Tower (stairs level): EUR 12'] },
      { tier: 'Mid-Range', dailyCost: 'EUR 200-350/day', color: 'orange', featured: true, items: ['3-star hotel: EUR 100-180', 'Bistros & brasseries: EUR 50-80', 'Navigo pass: EUR 8.65/day', 'Louvre + Eiffel Tower: EUR 43', 'Seine River Cruise: EUR 17'] },
      { tier: 'Luxury', dailyCost: 'EUR 600+/day', color: 'purple', items: ['Palace hotel (Ritz): EUR 500-2000+', 'Michelin-star dining: EUR 200-600+', 'Private car & driver: EUR 150-300', 'Private Louvre after-hours: EUR 400+', 'Champagne, couture, & helicopter'] },
    ],
    heroImages: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=600&fit=crop&q=80',
    ],
    tagline: 'La Ville Lumière — The City of Light',
    heroDescription: 'Paris seduces every visitor with its extraordinary art, iconic architecture, world-class cuisine, and irresistible joie de vivre. Whether it\'s your first time or your tenth, this guide reveals the many layers of the most visited city on earth.',
    activities: {
      label: 'Activities',
      heading: 'Paris\'s unmissable experiences',
      description: 'From the world\'s most visited museum to romantic boat rides along the Seine, Paris delivers wonder at every turn.',
      viewAllUrl: 'https://www.raynatours.com/paris',
      items: [
        { name: 'Eiffel Tower', description: 'The iron lady — summit tickets & champagne bar', price: 'From EUR 29', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/paris' },
        { name: 'Louvre Museum', description: 'Mona Lisa, Venus de Milo & 35,000 works of art', price: 'From EUR 22', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/paris' },
        { name: 'Seine River Cruise', description: '1-hour Bateaux Mouches cruise past Notre-Dame & bridges', price: 'From EUR 17', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/paris' },
        { name: 'Palace of Versailles', description: 'Louis XIV\'s lavish palace & 800 hectares of gardens', price: 'From EUR 21', image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/paris' },
      ],
    },
    spots: {
      label: 'Neighborhoods',
      heading: 'Paris\'s most iconic spots',
      description: 'Each Parisian arrondissement has its own distinct character — these are the places every visitor should experience.',
      items: [
        { name: 'Montmartre & Sacré-Cœur', description: 'Bohemian hilltop neighborhood with the stunning white-domed basilica, artist studios, vineyard, and sweeping views across Paris.', badge: 'Free Entry', badgeColor: 'green', image: 'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=600&h=400&fit=crop&q=80' },
        { name: 'Luxembourg Gardens', description: 'Paris\'s most beloved public garden. Rent a toy sailboat, watch a chess match, or relax in an iron chair beside the central fountain.', badge: 'Free Entry', badgeColor: 'green', image: 'https://images.unsplash.com/photo-1555921015-5532091f6026?w=600&h=400&fit=crop&q=80' },
        { name: 'Le Marais District', description: 'Paris\'s most fashionable historic quarter. Medieval streets, Jewish bakeries, galleries, and the stunning Place des Vosges.', badge: 'Free Entry', badgeColor: 'green', image: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?w=600&h=400&fit=crop&q=80' },
      ],
    },
  },

  rome: {
    quickStats: {
      currency: { code: 'EUR', name: 'Euro' },
      timezone: 'GMT+1 / +2 (Summer)',
      language: 'Italian',
      plugType: 'Type C/F (EU)',
      bestTime: 'Apr - Jun',
      visa: 'Schengen (90 days)*',
    },
    weather: [
      { season: 'Spring (Apr-Jun)', tempRange: '12-24°C', description: 'Perfect sightseeing weather. Fewer crowds than summer. Easter celebrations and outdoor café season begins.', icon: 'leaf' },
      { season: 'Summer (Jul-Aug)', tempRange: '22-35°C', description: 'Very hot. Major crowds at peak sites. Romans go on holiday in August — some restaurants close.', icon: 'sun' },
      { season: 'Autumn (Sep-Oct)', tempRange: '14-24°C', description: 'Arguably the best time. Warm, golden light, grape harvest festivals, and manageable crowds.', icon: 'cloud-sun' },
      { season: 'Winter (Nov-Mar)', tempRange: '4-14°C', description: 'Cool and quiet. Museums virtually empty. Christmas in Rome is magical — piazzas fill with nativity scenes.', icon: 'snowflake' },
    ],
    transport: [
      { mode: 'Metro (2 Lines)', description: 'Only 2 main metro lines (A & B) but cover key sites: Vatican (Ottaviano), Spanish Steps (Spagna), Colosseum (Colosseo).', cost: 'EUR 1.50', color: 'blue' },
      { mode: 'Bus Network', description: 'Extensive network covering all of Rome. Essential for sites metro doesn\'t reach. Buy tickets before boarding.', cost: 'EUR 1.50', color: 'green' },
      { mode: 'Walking', description: 'Rome\'s historic center is compact. Walking between the Colosseum, Forum, Palatine Hill, and Circus Maximus takes 20 minutes.', cost: 'Free', color: 'yellow' },
      { mode: 'Taxi / Ride-Hailing', description: 'Official white taxis are metered. Uber Black available. Fixed fare from airports: EUR 48-55 to city center.', cost: 'EUR 3.50+ base', color: 'red' },
    ],
    budget: [
      { tier: 'Budget', dailyCost: 'EUR 70-100/day', color: 'green', items: ['Hostel dorm: EUR 20-35', 'Pizza al taglio & gelato: EUR 15-20', 'Bus/metro: EUR 6-10', 'Colosseum combo ticket: EUR 18', 'Vatican Museums (book online): EUR 20'] },
      { tier: 'Mid-Range', dailyCost: 'EUR 180-280/day', color: 'orange', featured: true, items: ['3-star hotel: EUR 100-160', 'Trattorias & restaurants: EUR 40-60', 'Metro & taxis: EUR 15-25', 'Vatican + Colosseum + Forum: EUR 50+', 'Cooking class or wine tour'] },
      { tier: 'Luxury', dailyCost: 'EUR 500+/day', color: 'purple', items: ['5-star hotel (Hassler): EUR 350-1000+', 'Fine dining (La Pergola): EUR 200-400+', 'Private driver: EUR 120-250', 'Private Vatican tour: EUR 150-350', 'Private Sistine Chapel access'] },
    ],
    heroImages: [
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&h=600&fit=crop&q=80',
    ],
    tagline: 'The Eternal City — 3000 Years of History',
    heroDescription: 'Rome is humanity\'s greatest open-air museum. Every cobblestone street tells a story spanning three millennia. From the Colosseum to the Sistine Chapel, the Trevi Fountain to trattorias serving authentic Roman pasta — this guide helps you experience the Eternal City at its finest.',
    activities: {
      label: 'Activities',
      heading: 'Rome\'s essential experiences',
      description: 'Walking Rome is an experience itself — but these iconic attractions and tours are absolute must-dos for every visitor.',
      viewAllUrl: 'https://www.raynatours.com/rome',
      items: [
        { name: 'Colosseum & Roman Forum', description: 'Walk where gladiators fought — skip-the-line guided tour', price: 'From EUR 29', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/rome' },
        { name: 'Vatican Museums & Sistine Chapel', description: 'Michelangelo\'s masterpiece ceiling & St Peter\'s Basilica', price: 'From EUR 34', image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/rome' },
        { name: 'Borghese Gallery', description: 'World\'s finest Bernini sculptures in a stunning villa', price: 'From EUR 20', image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/rome' },
        { name: 'Rome by Night Tour', description: 'Trevi Fountain, Pantheon & piazzas after dark', price: 'From EUR 35', image: 'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/rome' },
      ],
    },
    spots: {
      label: 'Piazzas & Fountains',
      heading: 'Rome\'s iconic public spaces',
      description: 'Rome\'s piazzas are its living rooms — social hubs where history, architecture, and everyday Italian life collide.',
      items: [
        { name: 'Trevi Fountain', description: 'The world\'s most famous fountain, immortalized in La Dolce Vita. Toss a coin to ensure your return to Rome. Magical at night.', badge: 'Free Entry', badgeColor: 'green', image: 'https://images.unsplash.com/photo-1555921015-5532091f6026?w=600&h=400&fit=crop&q=80' },
        { name: 'Piazza Navona', description: 'Baroque masterpiece with Bernini\'s Fountain of the Four Rivers surrounded by artists, street performers, and classic Roman cafés.', badge: 'Free Entry', badgeColor: 'green', image: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?w=600&h=400&fit=crop&q=80' },
        { name: 'Spanish Steps & Piazza di Spagna', description: 'Rome\'s most glamorous gathering spot. 135 travertine steps leading to Trinità dei Monti church. Lined with luxury boutiques below.', badge: 'Free Entry', badgeColor: 'green', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop&q=80' },
      ],
    },
  },

  istanbul: {
    quickStats: {
      currency: { code: 'TRY', name: 'Turkish Lira' },
      timezone: 'GMT+3',
      language: 'Turkish',
      plugType: 'Type C/F (EU)',
      bestTime: 'Apr - May',
      visa: 'e-Visa Required*',
    },
    weather: [
      { season: 'Spring (Apr-May)', tempRange: '12-22°C', description: 'Best season. Tulip Festival in April, mild temperatures, and blooming gardens. Ideal for sightseeing.', icon: 'leaf' },
      { season: 'Summer (Jun-Sep)', tempRange: '20-30°C', description: 'Hot, sunny, and busy. Bosphorus breezes help. Great for boat trips and rooftop bars. Book ahead.', icon: 'sun' },
      { season: 'Autumn (Oct-Nov)', tempRange: '12-22°C', description: 'Shoulder season. Warm September, colorful October. Fewer tourists and lower prices.', icon: 'cloud-sun' },
      { season: 'Winter (Dec-Mar)', tempRange: '3-12°C', description: 'Cool and rainy. Occasional snow. Museums and Grand Bazaar nearly empty. Cheapest time to visit.', icon: 'snowflake' },
    ],
    transport: [
      { mode: 'Metro & Tram', description: 'Modern metro lines and the iconic tram on İstiklal Avenue. İstanbulkart smartcard works on all public transport. Very affordable.', cost: 'TRY 25-50', color: 'blue' },
      { mode: 'Bosphorus Ferry', description: 'The most scenic and affordable way to cross between Europe and Asia. Regular service from Eminönü, Karaköy, and Kadıköy piers.', cost: 'TRY 25-50', color: 'green' },
      { mode: 'Nostalgic Tram (T2)', description: 'Historic red tram running along İstiklal Avenue in Beyoğlu. A cultural experience as much as transport.', cost: 'TRY 25', color: 'red' },
      { mode: 'Taxi / UBer', description: 'Yellow taxis widely available. Insist on the meter (taximeter). Uber operates in Istanbul and is often more reliable.', cost: 'TRY 100+ base', color: 'yellow' },
    ],
    budget: [
      { tier: 'Budget', dailyCost: 'TRY 1500-2500/day', color: 'green', items: ['Hostel/budget hotel: TRY 500-900', 'Simit, kebab & street food: TRY 200-350', 'Metro & ferry transport: TRY 100-180', 'Hagia Sophia (free mosque)', 'Grand Bazaar exploration'] },
      { tier: 'Mid-Range', dailyCost: 'TRY 4000-7000/day', color: 'orange', featured: true, items: ['4-star hotel: TRY 2000-3500', 'Restaurants & fish on Bosphorus: TRY 700-1200', 'Istanbulkart + taxis: TRY 300-500', 'Topkapi Palace + Basilica Cistern: TRY 600', 'Bosphorus cruise tour'] },
      { tier: 'Luxury', dailyCost: 'TRY 15000+/day', color: 'purple', items: ['5-star Bosphorus hotel: TRY 8000-25000+', 'Nusr-Et & fine dining: TRY 2500-5000+', 'Private car & transfers: TRY 1500-3000', 'Private Bosphorus yacht: TRY 5000+', 'Helicopter, hamam, private tours'] },
    ],
    heroImages: [
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&h=600&fit=crop&q=80',
    ],
    tagline: 'Where Two Continents and Cultures Meet',
    heroDescription: 'Istanbul is the only city in the world that straddles two continents, weaving together 2,500 years of Byzantine, Ottoman, and modern history. Mosques and churches, bazaars and rooftop bars, Bosphorus sunsets and spiced markets — this guide helps you experience it all.',
    activities: {
      label: 'Activities',
      heading: 'Istanbul\'s legendary experiences',
      description: 'Every corner of Istanbul tells a story. These iconic attractions and tours capture the city\'s extraordinary depth of history and culture.',
      viewAllUrl: 'https://www.raynatours.com/istanbul',
      items: [
        { name: 'Hagia Sophia & Blue Mosque', description: 'Two of the world\'s greatest religious monuments side by side', price: 'Free Entry', image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/istanbul' },
        { name: 'Bosphorus Cruise', description: 'Scenic strait separating Europe and Asia — stunning palaces', price: 'From TRY 400', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/istanbul' },
        { name: 'Topkapi Palace', description: 'Ottoman imperial palace with harem, treasury & Bosphorus views', price: 'From TRY 750', image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/istanbul' },
        { name: 'Grand Bazaar & Spice Market', description: 'The world\'s oldest covered market with 4,000 shops', price: 'Free Entry', image: 'https://images.unsplash.com/photo-1555529902-5261145633bf?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/istanbul' },
      ],
    },
    spots: {
      label: 'Districts',
      heading: 'Istanbul\'s most vibrant neighborhoods',
      description: 'Istanbul\'s diverse neighborhoods each have a distinct personality — from Ottoman grandeur to bohemian arts scenes.',
      items: [
        { name: 'Sultanahmet (Old City)', description: 'The historic heart of Istanbul with Hagia Sophia, Topkapi Palace, the Blue Mosque, and Basilica Cistern all within walking distance.', badge: 'Free Entry', badgeColor: 'green', image: 'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=600&h=400&fit=crop&q=80' },
        { name: 'Beyoğlu & İstiklal Avenue', description: 'Istanbul\'s modern beating heart. 1.4km pedestrian boulevard lined with shops, galleries, historic tram, music venues, and rooftop bars.', badge: 'Free Entry', badgeColor: 'green', image: 'https://images.unsplash.com/photo-1555921015-5532091f6026?w=600&h=400&fit=crop&q=80' },
        { name: 'Kadıköy (Asian Side)', description: 'Istanbul\'s hippest neighborhood on the Asian shore. Vibrant food market, art galleries, live music, and a completely different local vibe.', badge: 'Ferry TRY 25', badgeColor: 'blue', image: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?w=600&h=400&fit=crop&q=80' },
      ],
    },
  },

  'new-york': {
    quickStats: {
      currency: { code: 'USD', name: 'US Dollar' },
      timezone: 'GMT-5 / -4 (Summer)',
      language: 'English',
      plugType: 'Type A/B (US)',
      bestTime: 'Apr - Jun',
      visa: 'ESTA Required*',
    },
    weather: [
      { season: 'Spring (Apr-Jun)', tempRange: '10-22°C', description: 'Central Park in bloom, outdoor dining reopens, cherry blossoms in April. Ideal for walking the city.', icon: 'leaf' },
      { season: 'Summer (Jul-Aug)', tempRange: '22-32°C', description: 'Hot and humid. Free outdoor concerts, Broadway in Bryant Park, Coney Island beach. Very lively.', icon: 'sun' },
      { season: 'Autumn (Sep-Nov)', tempRange: '10-22°C', description: 'NYC\'s best season. Spectacular fall foliage in Central Park, mild temps, and the NYC Marathon in November.', icon: 'cloud-sun' },
      { season: 'Winter (Dec-Feb)', tempRange: '-2-7°C', description: 'Cold with possible snow. Holiday magic — Rockefeller tree, ice skating, festive window displays. NYC in winter is special.', icon: 'snowflake' },
    ],
    transport: [
      { mode: 'NYC Subway', description: '24/7 subway system with 472 stations. OMNY contactless payment. A/C/E, B/D/F/M, N/Q/R/W and more — perfect for every neighborhood.', cost: 'USD 2.90/ride', color: 'blue' },
      { mode: 'Yellow Cab / Uber', description: 'Yellow taxis are iconic and abundant in Manhattan. Lyft and Uber widely available. Avoid during rush hour — subway is faster.', cost: 'USD 5+ base', color: 'yellow' },
      { mode: 'Citi Bike', description: '27,000 bikes at 1,800+ docking stations. Perfect for exploring Brooklyn, the Hudson River Greenway, and Central Park loops.', cost: 'USD 4.49/trip', color: 'green' },
      { mode: 'Staten Island Ferry', description: 'Completely free ferry with stunning views of Manhattan skyline and Statue of Liberty. One of NYC\'s best free experiences.', cost: 'Free', color: 'red' },
    ],
    budget: [
      { tier: 'Budget', dailyCost: 'USD 100-150/day', color: 'green', items: ['Hostel/budget hotel: USD 50-80', 'Street food & dollar pizza: USD 20-30', 'Subway MetroCard: USD 10-15', 'High Line, Central Park: Free', 'Staten Island Ferry: Free'] },
      { tier: 'Mid-Range', dailyCost: 'USD 250-400/day', color: 'orange', featured: true, items: ['3-star hotel: USD 150-250', 'Restaurants & deli: USD 60-90', 'Subway + occasional Uber: USD 20-35', 'MoMA + Statue of Liberty: USD 40-60', 'Broadway show tickets: USD 80-150'] },
      { tier: 'Luxury', dailyCost: 'USD 800+/day', color: 'purple', items: ['5-star hotel (The Mark): USD 500-2000+', 'Fine dining (Per Se, Masa): USD 300-600+', 'Car service: USD 150-400', 'Private helicopter tour: USD 250+', 'VIP Broadway, private museum tours'] },
    ],
    heroImages: [
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&h=600&fit=crop&q=80',
    ],
    tagline: 'The City That Never Sleeps',
    heroDescription: 'New York City is where the world comes to dream big. From the dazzling towers of Midtown to the brownstone neighborhoods of Brooklyn, from world-class museums to legendary delis, this guide covers everything you need to experience the greatest city on earth.',
    activities: {
      label: 'Activities',
      heading: 'New York\'s iconic experiences',
      description: 'NYC packs more world-class experiences into a single city than almost anywhere else on earth. Here are the absolute must-dos.',
      viewAllUrl: 'https://www.raynatours.com/new-york',
      items: [
        { name: 'Statue of Liberty & Ellis Island', description: 'America\'s most iconic monument via ferry from Battery Park', price: 'From USD 24', image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/new-york' },
        { name: 'Empire State Building', description: '102-floor Art Deco skyscraper with iconic NYC views', price: 'From USD 44', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/new-york' },
        { name: 'Central Park Bike Tour', description: '843-acre urban park by guided bike or on your own', price: 'From USD 35', image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/new-york' },
        { name: 'Broadway Show', description: 'Best live theatre in the world — Times Square is electric', price: 'From USD 79', image: 'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=400&h=300&fit=crop&q=80', url: 'https://www.raynatours.com/new-york' },
      ],
    },
    spots: {
      label: 'Neighborhoods',
      heading: 'NYC\'s most iconic spots',
      description: 'New York\'s neighborhoods are as diverse as the city itself — each one a distinct world worth exploring.',
      items: [
        { name: 'The High Line', description: 'A 1.45-mile elevated linear park built on a former freight rail line. Art installations, food vendors, and stunning Hudson Yards views.', badge: 'Free Entry', badgeColor: 'green', image: 'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=600&h=400&fit=crop&q=80' },
        { name: 'DUMBO, Brooklyn', description: 'Under the Manhattan Bridge Overpass — Instagram\'s most photographed street. Cobblestones, galleries, and the Brooklyn Bridge Park waterfront.', badge: 'Free Entry', badgeColor: 'green', image: 'https://images.unsplash.com/photo-1555921015-5532091f6026?w=600&h=400&fit=crop&q=80' },
        { name: 'Times Square & Midtown', description: 'NYC\'s electrifying center. Overwhelming and unforgettable — especially after dark. Broadway shows, iconic hotels, and the buzz of Midtown.', badge: 'Free Entry', badgeColor: 'green', image: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?w=600&h=400&fit=crop&q=80' },
      ],
    },
  },
};

export function getCityMeta(slug: string): CityMeta | undefined {
  return CITY_META[slug];
}

export function getCityGuideData(slug: string): CityGuideData | undefined {
  return CITY_GUIDE_DATA[slug];
}
