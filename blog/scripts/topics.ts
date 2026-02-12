export interface Topic {
  slug: string;
  titleTemplate: string;
  descriptionTemplate: string;
  category: string;
  requiresBeach?: boolean;
  requiresYacht?: boolean;
  featured?: boolean;
  readingTime: number;
  promptTemplate: string;
}

export const TOPICS: Topic[] = [
  // ─── ESSENTIALS (5) ───
  {
    slug: "complete-{city}-travel-guide",
    titleTemplate: "Complete {city} Travel Guide for First-Time Visitors: Tips, Weather & What to Know",
    descriptionTemplate: "The ultimate {city} travel guide for first-time visitors with tips on weather, safety, budget, transport, and what to know before you go.",
    category: "Essentials",
    featured: true,
    readingTime: 10,
    promptTemplate: `Write a comprehensive first-time visitor's travel guide for {city}, {country}. Cover: overview of the city and why it's worth visiting, best time to visit (weather by season), how to get there (flights, airports), visa requirements overview, local currency ({currency}) and payment tips, language ({language}) and useful phrases, safety tips, local customs and etiquette, top neighborhoods to stay in, getting around (metro, taxis, apps), budget overview (budget/mid-range/luxury), packing tips, and a quick 3-day highlight plan. Include specific costs in {currency} with USD equivalents.`
  },
  {
    slug: "is-{city}-expensive-budget-vs-luxury",
    titleTemplate: "Is {city} Expensive? Budget vs Luxury Travel Guide",
    descriptionTemplate: "Find out how expensive {city} really is. Complete budget vs luxury comparison with daily costs, accommodation, food, and transport prices.",
    category: "Essentials",
    readingTime: 8,
    promptTemplate: `Write a detailed budget vs luxury comparison guide for {city}, {country}. Break down daily costs for: accommodation (hostels/budget hotels vs 5-star resorts), food (street food vs fine dining), transport (public transit vs private car/taxi), activities (free vs premium), shopping. Provide specific prices in {currency} with USD equivalents. Include a budget traveler daily estimate, mid-range daily estimate, and luxury daily estimate. Add money-saving tips and areas where you can splurge vs save.`
  },
  {
    slug: "staying-safe-respecting-local-rules-{city}",
    titleTemplate: "Staying Safe & Respecting Local Rules in {city}: Laws, Etiquette & Tourist Safety Guide",
    descriptionTemplate: "Complete safety guide for {city}: local laws tourists must know, cultural etiquette, scam awareness, and emergency contacts.",
    category: "Essentials",
    readingTime: 7,
    promptTemplate: `Write a comprehensive safety and local rules guide for tourists visiting {city}, {country}. Cover: general safety level, safe vs areas to be cautious in, common tourist scams and how to avoid them, important local laws tourists must know, cultural dos and don'ts, dress code expectations, photography rules, drug/alcohol laws, emergency numbers, health precautions, travel insurance advice, and LGBTQ+ safety info. Be factual and helpful without being alarmist.`
  },
  {
    slug: "{city}-dress-code-what-tourists-should-wear",
    titleTemplate: "{city} Dress Code: What Tourists Should Wear",
    descriptionTemplate: "What to wear in {city} as a tourist. Complete dress code guide covering cultural norms, weather-appropriate clothing, and what to pack.",
    category: "Essentials",
    readingTime: 6,
    promptTemplate: `Write a detailed dress code and clothing guide for tourists visiting {city}, {country}. Cover: general dress culture, what locals wear, religious site dress codes, business/restaurant dress expectations, weather-appropriate clothing by season, beach attire rules, nightlife dress codes, what NOT to wear, packing list essentials, and where to buy clothes locally if needed. Include specific cultural sensitivities and practical tips.`
  },
  {
    slug: "currency-exchange-payments-money-tips-{city}",
    titleTemplate: "Currency, Currency Exchange, Payments & Money Tips for {city} Tourists",
    descriptionTemplate: "Everything about money in {city}: currency guide, best exchange rates, card payments, tipping, and money-saving tips for tourists.",
    category: "Essentials",
    readingTime: 7,
    promptTemplate: `Write a comprehensive money and currency guide for tourists visiting {city}, {country}. Cover: local currency ({currency}) overview and denominations, best places to exchange money, airport vs city exchange rates, ATM availability and fees, credit/debit card acceptance, digital payment apps used locally, tipping customs, bargaining culture, common price ranges for food/transport/activities, hidden costs to watch for, and money-saving tips. Include specific amounts in {currency} with USD equivalents.`
  },

  // ─── THINGS TO DO (7) ───
  {
    slug: "top-things-to-do-{city}-tourists",
    titleTemplate: "Top Things to Do in {city} for Tourists",
    descriptionTemplate: "The best things to do in {city}: top attractions, activities, and experiences every tourist must try on their visit.",
    category: "Things to Do",
    featured: true,
    readingTime: 9,
    promptTemplate: `Write a comprehensive guide to the top 15-20 things to do in {city}, {country} for tourists. For each activity include: what it is, why it's special, location/address, cost in {currency}, best time to visit, insider tips. Organize by category (landmarks, culture, food, nature, entertainment). Include a mix of popular must-sees and lesser-known gems. Add practical tips for each.`
  },
  {
    slug: "free-things-to-do-{city}",
    titleTemplate: "Free Things to Do in {city} (Budget-Friendly Guide)",
    descriptionTemplate: "Discover the best free things to do in {city}. Budget-friendly attractions, parks, markets, and experiences that cost nothing.",
    category: "Things to Do",
    readingTime: 7,
    promptTemplate: `Write a guide to the best free things to do in {city}, {country}. Include 15+ free activities: parks, gardens, free museums/gallery days, street art, markets to browse, viewpoints, beaches, festivals, walking tours, neighborhoods to explore, free cultural events, and architectural walks. For each include location, best time, and why it's worth visiting. Emphasize that {city} can be enjoyed on any budget.`
  },
  {
    slug: "unique-luxury-experiences-{city}",
    titleTemplate: "Unique & Luxury Experiences to Try in {city}",
    descriptionTemplate: "Top luxury and unique experiences in {city}: exclusive tours, VIP access, fine dining, and once-in-a-lifetime activities.",
    category: "Things to Do",
    readingTime: 8,
    promptTemplate: `Write a guide to unique and luxury experiences in {city}, {country}. Cover 10-15 premium experiences: private tours, VIP access, exclusive dining, luxury hotels, helicopter/yacht tours, spa experiences, private shopping, cultural immersion. For each include: what makes it special, approximate cost in {currency}, how to book, best time, and insider tips. Focus on once-in-a-lifetime experiences.`
  },
  {
    slug: "best-adventure-activities-{city}",
    titleTemplate: "Best Adventure Activities in {city} for Thrill Seekers",
    descriptionTemplate: "Top adventure activities in {city}: outdoor sports, extreme experiences, and adrenaline-pumping activities for thrill seekers.",
    category: "Things to Do",
    readingTime: 7,
    promptTemplate: `Write a guide to the best adventure and thrill-seeking activities in and around {city}, {country}. Cover 10-15 activities: water sports, hiking, climbing, zip-lining, skydiving, bungee jumping, off-road tours, wildlife encounters, extreme sports. For each include: what to expect, fitness level needed, cost in {currency}, where to book, safety tips, best season, and age/health restrictions.`
  },
  {
    slug: "things-to-do-{city}-at-night",
    titleTemplate: "Things to Do in {city} at Night",
    descriptionTemplate: "Best things to do in {city} at night: nightlife, bars, clubs, night markets, entertainment, and evening attractions.",
    category: "Things to Do",
    readingTime: 7,
    promptTemplate: `Write a nightlife and evening activities guide for {city}, {country}. Cover: best nightlife districts, rooftop bars, cocktail bars, nightclubs, live music venues, night markets, evening cruises, dinner shows, night tours, late-night food spots, cultural performances, and illuminated landmarks. For each include location, price range in {currency}, dress code, best nights to go, and safety tips for going out at night.`
  },
  {
    slug: "romantic-things-to-do-{city}-couples",
    titleTemplate: "Romantic Things to Do in {city} for Couples",
    descriptionTemplate: "Most romantic things to do in {city} for couples: date ideas, romantic restaurants, sunset spots, and couple activities.",
    category: "Things to Do",
    readingTime: 7,
    promptTemplate: `Write a romantic activities guide for couples visiting {city}, {country}. Cover 12-15 romantic experiences: sunset spots, romantic restaurants, couples spa, private tours, scenic walks, rooftop dining, boat rides, cultural experiences for two, photography spots, romantic hotels. For each include: why it's romantic, cost for two in {currency}, how to book, best time, and pro tips. Include both budget and luxury options.`
  },
  {
    slug: "best-things-to-do-{city}-families",
    titleTemplate: "Best Things to Do in {city} with Family",
    descriptionTemplate: "Family-friendly things to do in {city}: kid-approved attractions, activities, parks, and experiences the whole family will love.",
    category: "Things to Do",
    readingTime: 8,
    promptTemplate: `Write a family activities guide for {city}, {country}. Cover 15+ family-friendly activities: theme parks, zoos, aquariums, interactive museums, parks, beaches, nature activities, kid-friendly restaurants, educational experiences. For each include: age suitability, cost per person/family in {currency}, facilities (strollers, changing rooms), tips for visiting with kids. Add general family travel tips for {city}.`
  },

  // ─── EXPERIENCES & ACTIVITIES (6) ───
  {
    slug: "{city}-signature-experience-guide",
    titleTemplate: "{city} Signature Experience Guide: {signatureExperience}",
    descriptionTemplate: "Complete guide to {city}'s must-do signature experience: {signatureExperience}. Everything you need to know before booking.",
    category: "Experiences & Activities",
    featured: true,
    readingTime: 8,
    promptTemplate: `Write a detailed guide about {city}'s signature experience: {signatureExperience}. Cover: what it is and why it's iconic in {city}, history/background, different options/packages available, costs in {currency}, best time to go, what to wear/bring, how to book, comparison of operators/providers, duration, what to expect step-by-step, photography tips, accessibility, common mistakes to avoid, and alternative similar experiences. Make it the definitive guide.`
  },
  {
    slug: "morning-vs-evening-experiences-{city}",
    titleTemplate: "Morning vs Evening Experiences in {city} – Which Is Better?",
    descriptionTemplate: "Compare morning vs evening activities in {city}: sunrise tours, daytime attractions, sunset experiences, and nightlife options.",
    category: "Experiences & Activities",
    readingTime: 7,
    promptTemplate: `Write a comparative guide to morning vs evening experiences in {city}, {country}. For mornings cover: sunrise spots, early bird attractions, breakfast experiences, morning markets, outdoor activities. For evenings cover: sunset spots, dinner cruises, night entertainment, evening tours, late-night food. Compare pros/cons of each time, crowd levels, temperatures, pricing differences. Help readers plan their ideal day from dawn to dusk.`
  },
  {
    slug: "{city}-yacht-cruise-guide",
    titleTemplate: "{city} Yacht / Cruise Guide: What to Expect",
    descriptionTemplate: "Complete yacht and cruise guide for {city}: best routes, operators, prices, types of cruises, and what to expect on board.",
    category: "Experiences & Activities",
    requiresYacht: true,
    readingTime: 7,
    promptTemplate: `Write a comprehensive yacht and cruise guide for {city}, {country}. Cover: types of cruises available (dinner, sunset, sightseeing, party), yacht rental options (private vs shared), best routes and sightseeing points, popular operators, cost ranges in {currency}, duration options, what's included, what to bring, dress code, best time of year, seasickness tips, booking advice, and food/drink options on board.`
  },
  {
    slug: "best-cruise-experiences-{city}",
    titleTemplate: "Best Cruise Experiences in {city}",
    descriptionTemplate: "Top cruise experiences in {city}: dinner cruises, sightseeing tours, sunset sails, and luxury yacht charters reviewed.",
    category: "Experiences & Activities",
    requiresYacht: true,
    readingTime: 7,
    promptTemplate: `Write a guide to the best cruise and boat experiences in {city}, {country}. Review 8-10 specific cruise options: dinner cruises, sunset cruises, sightseeing tours, luxury yacht charters, speedboat tours, glass-bottom boat rides. For each include: operator name, route, duration, cost in {currency}, what's included, highlights, best for (couples/families/groups), and how to book. Compare options to help readers choose.`
  },
  {
    slug: "water-activities-{city}",
    titleTemplate: "Water Activities in {city}: What to Try",
    descriptionTemplate: "Best water activities in {city}: swimming, snorkeling, diving, kayaking, jet skiing, and aquatic adventures for all levels.",
    category: "Experiences & Activities",
    requiresBeach: true,
    readingTime: 7,
    promptTemplate: `Write a guide to water activities in and around {city}, {country}. Cover: swimming spots, snorkeling, scuba diving, jet skiing, parasailing, kayaking, paddleboarding, surfing, fishing, boat tours, water parks. For each include: best locations, cost in {currency}, skill level needed, equipment rental, best season, safety tips, and booking advice. Include both beach and non-beach water activities.`
  },
  {
    slug: "theme-parks-attractions-{city}",
    titleTemplate: "Theme Parks & Attractions in {city}",
    descriptionTemplate: "Guide to theme parks and major attractions in {city}: tickets, rides, tips, and everything you need for a perfect visit.",
    category: "Experiences & Activities",
    readingTime: 8,
    promptTemplate: `Write a guide to theme parks and major entertainment attractions in and around {city}, {country}. Cover major parks, amusement centers, water parks, and unique attractions. For each include: overview, top rides/experiences, ticket prices in {currency}, opening hours, how to get there, tips to avoid queues, best time to visit, age suitability, food options, and express pass options. Compare parks to help visitors prioritize.`
  },

  // ─── ATTRACTIONS (5) ───
  {
    slug: "top-tourist-attractions-{city}",
    titleTemplate: "Top Tourist Attractions in {city}",
    descriptionTemplate: "Must-see tourist attractions in {city}: iconic landmarks, historical sites, museums, and viewpoints every visitor should experience.",
    category: "Attractions",
    featured: true,
    readingTime: 9,
    promptTemplate: `Write a detailed guide to the top 15 tourist attractions in {city}, {country}. For each attraction include: what it is, historical significance, what you'll see, entry fee in {currency}, opening hours, how to get there, average visit duration, best time to visit, photography tips, accessibility, and insider tip. Include both iconic landmarks and hidden gems. End with a suggested order for visiting.`
  },
  {
    slug: "{famous-attraction}-visitor-guide-{city}",
    titleTemplate: "{famousAttraction} Visitor Guide in {city}",
    descriptionTemplate: "Complete visitor guide to {famousAttraction} in {city}: tickets, timings, tips, history, and everything you need to plan your visit.",
    category: "Attractions",
    readingTime: 8,
    promptTemplate: `Write a definitive visitor guide for {famousAttraction} in {city}, {country}. Cover: history and significance, what to see, ticket prices and types in {currency}, opening hours by season, how to get there (all transport options), best time to visit (time of day and season), photography tips and best spots, nearby restaurants and cafes, accessibility, facilities, guided tour options, common mistakes to avoid, and nearby attractions to combine. Make this the only guide a visitor needs.`
  },
  {
    slug: "new-unique-attractions-{city}",
    titleTemplate: "New & Unique Attractions in {city}",
    descriptionTemplate: "New attractions, unusual places, and hidden gems in {city} for visitors seeking unique experiences.",
    category: "Attractions",
    readingTime: 8,
    promptTemplate: `Write a guide to new, unique, and lesser-known attractions in {city}, {country}. Cover 8-10 attractions that opened recently or are off the typical tourist trail: innovative museums, art installations, unique neighborhoods, unusual experiences, new developments. For each include: what makes it different, cost in {currency}, location, best times to visit, accessibility, insider perspective from locals. Focus on what makes each attraction special and worth the detour.`
  },
  {
    slug: "must-visit-areas-neighborhoods-{city}",
    titleTemplate: "Must-Visit Areas & Neighborhoods in {city}",
    descriptionTemplate: "Best neighborhoods to explore in {city}: character, attractions, restaurants, and local vibes of each area.",
    category: "Attractions",
    readingTime: 8,
    promptTemplate: `Write a neighborhood guide for {city}, {country}. Cover 6-8 must-visit neighborhoods. For each include: character and history, what it's known for, top attractions, best restaurants and cafes, shopping, safety, best time to visit, walking routes, hotel recommendations, and how it connects to other areas. Help visitors understand each area's unique personality and decide which to prioritize.`
  },
  {
    slug: "seasonal-attractions-events-{city}",
    titleTemplate: "Seasonal Attractions & Events in {city}",
    descriptionTemplate: "Month-by-month guide to seasonal attractions and events in {city}: festivals, celebrations, and seasonal activities.",
    category: "Attractions",
    readingTime: 8,
    promptTemplate: `Write a month-by-month guide to seasonal attractions and events in {city}, {country}. For each month cover: weather, major festivals, cultural events, seasonal activities, what's unique, and why you might visit during that time. Include religious holidays, national celebrations, food festivals, art events, and sporting events. Help travelers choose the best month based on their interests.`
  },

  // ─── ITINERARIES (7) ───
  {
    slug: "1-day-{city}-itinerary",
    titleTemplate: "1 Day {city} Itinerary",
    descriptionTemplate: "Best 1-day {city} itinerary: must-see highlights, perfect day trip, and time-efficient route.",
    category: "Itineraries",
    readingTime: 6,
    promptTemplate: `Write a detailed 1-day itinerary for {city}, {country}. Structure by time blocks (Early Morning 7-9 AM, Morning 9-11:30 AM, Midday 11:30-1:30 PM, Afternoon 1:30-4:30 PM, Evening 4:30-8 PM). For each stop include: specific place name, address, travel time from previous stop, what to do/see, cost in {currency}, insider tip. Include breakfast, lunch, and dinner recommendations. Add "If Running Late" alternatives and transportation tips.`
  },
  {
    slug: "2-day-{city}-itinerary",
    titleTemplate: "2 Days {city} Itinerary",
    descriptionTemplate: "Perfect 2-day {city} itinerary: day-by-day guide covering top sights, food, and experiences.",
    category: "Itineraries",
    readingTime: 7,
    promptTemplate: `Write a detailed 2-day itinerary for {city}, {country}. Day 1 focuses on iconic highlights, Day 2 on culture and deeper exploration. Structure each day by time blocks with specific places, addresses, travel times, costs in {currency}, and tips. Include meal recommendations, transport between stops, and flexibility options. Add a "Day 2 Alternatives" section for different interests.`
  },
  {
    slug: "3-day-{city}-itinerary",
    titleTemplate: "3 Days {city} Itinerary",
    descriptionTemplate: "Comprehensive 3-day {city} itinerary: day-by-day plan with top attractions, hidden gems, and local favorites.",
    category: "Itineraries",
    readingTime: 8,
    promptTemplate: `Write a comprehensive 3-day itinerary for {city}, {country}. Day 1: iconic landmarks, Day 2: culture/food/neighborhoods, Day 3: day trips or off-beaten-path. Structure each day by time with specific stops, addresses, costs in {currency}, and tips. Include meals, transport, and alternatives. Add a daily budget estimate and packing tips.`
  },
  {
    slug: "5-day-{city}-itinerary",
    titleTemplate: "5 Days {city} Itinerary",
    descriptionTemplate: "Complete 5-day {city} itinerary: thorough day-by-day plan to see everything from landmarks to hidden gems.",
    category: "Itineraries",
    readingTime: 9,
    promptTemplate: `Write a complete 5-day itinerary for {city}, {country}. Spread activities across 5 days to avoid rushing. Days 1-2: main attractions, Day 3: food/culture deep dive, Day 4: day trip or adventure, Day 5: shopping/relaxation/hidden gems. Structure each day by time with specifics. Include a budget breakdown, transport tips, and customization options.`
  },
  {
    slug: "{city}-itinerary-families",
    titleTemplate: "{city} Itinerary for Families",
    descriptionTemplate: "Family-friendly {city} itinerary: kid-approved attractions, family restaurants, and activities for all ages.",
    category: "Itineraries",
    readingTime: 8,
    promptTemplate: `Write a 3-4 day family-friendly itinerary for {city}, {country}. Focus on kid-approved activities, avoid long walks, include rest breaks, kid-friendly restaurants. For each stop: age suitability, facilities (strollers, changing rooms, playgrounds), tips for visiting with children, family ticket prices in {currency}. Include rainy day alternatives and nap-time friendly scheduling.`
  },
  {
    slug: "{city}-honeymoon-itinerary",
    titleTemplate: "{city} Honeymoon Itinerary",
    descriptionTemplate: "Romantic {city} honeymoon itinerary: luxury experiences, romantic restaurants, and couple activities.",
    category: "Itineraries",
    readingTime: 8,
    promptTemplate: `Write a 4-5 day honeymoon itinerary for {city}, {country}. Focus on romantic experiences, luxury dining, couples activities, sunset spots, and intimate experiences. Include: luxury hotel recommendations, romantic restaurants, spa/wellness, private tours, photography spots. For each activity include cost for two in {currency} and booking tips. Mix relaxation with adventure.`
  },
  {
    slug: "budget-friendly-{city}-itinerary",
    titleTemplate: "Budget-Friendly {city} Itinerary",
    descriptionTemplate: "Budget {city} itinerary: see the best of {city} without breaking the bank. Free attractions, cheap eats, and money-saving tips.",
    category: "Itineraries",
    readingTime: 7,
    promptTemplate: `Write a 3-4 day budget-friendly itinerary for {city}, {country}. Focus on free attractions, affordable food, public transport, budget accommodation areas. For each day include specific free/cheap activities, street food spots, budget restaurant recommendations, and money-saving tips. Include a daily budget estimate in {currency} with USD equivalent. Show that {city} is amazing even on a tight budget.`
  },

  // ─── FOOD & DINING (5) ───
  {
    slug: "what-to-eat-{city}-local-dishes",
    titleTemplate: "What to Eat in {city}: Must-Try Local Dishes",
    descriptionTemplate: "Essential local dishes to try in {city}: traditional food, street eats, and regional specialties every foodie must taste.",
    category: "Food & Dining",
    readingTime: 8,
    promptTemplate: `Write a local food guide for {city}, {country}. Cover 15+ must-try local dishes and regional specialties. For each dish: name (in local language if applicable), description, what makes it special, where to find the best version, expected cost in {currency}, best time of day to eat it, dietary notes (vegetarian/halal/etc). Include a food market guide, breakfast/lunch/dinner specialties, and sweet treats.`
  },
  {
    slug: "best-street-food-{city}",
    titleTemplate: "Best Street Food in {city}",
    descriptionTemplate: "Street food guide for {city}: best street vendors, must-try snacks, food markets, and local eats.",
    category: "Food & Dining",
    readingTime: 8,
    promptTemplate: `Write a street food guide for {city}, {country}. Cover 15 iconic street foods. For each: name, description, where to find it (specific vendors/areas), estimated cost in {currency}, best time to visit, hygiene information. Include best street food neighborhoods, night market guides, and safety tips for eating street food. Add a hygiene rating system and tips for sensitive stomachs.`
  },
  {
    slug: "vegetarian-jain-food-{city}",
    titleTemplate: "Vegetarian & Jain Food in {city}",
    descriptionTemplate: "Vegetarian and vegan food guide for {city}: best restaurants, local vegetarian dishes, and plant-based dining options.",
    category: "Food & Dining",
    readingTime: 7,
    promptTemplate: `Write a vegetarian and vegan food guide for {city}, {country}. Cover: how vegetarian-friendly the city is, local vegetarian dishes, best vegetarian restaurants, vegan options, Jain food availability, how to communicate dietary needs in {language}, useful phrases, grocery stores for self-catering, vegetarian street food, and restaurant apps/websites to find options. Include 10+ specific restaurant recommendations with addresses and price ranges in {currency}.`
  },
  {
    slug: "fine-dining-rooftop-restaurants-{city}",
    titleTemplate: "Fine Dining & Rooftop Restaurants in {city}",
    descriptionTemplate: "Best fine dining and rooftop restaurants in {city}: luxury restaurants, skyline views, and gourmet experiences.",
    category: "Food & Dining",
    readingTime: 7,
    promptTemplate: `Write a fine dining and rooftop restaurant guide for {city}, {country}. Cover 10-12 restaurants: Michelin-starred, rooftop bars with views, celebrity chef restaurants, unique dining concepts. For each: cuisine type, price range in {currency}, dress code, reservation tips, best dishes, views/atmosphere, and location. Help readers choose the right restaurant for their occasion (anniversary, business, celebration).`
  },
  {
    slug: "best-restaurants-{city}",
    titleTemplate: "Best Restaurants in {city} for Tourists",
    descriptionTemplate: "Best restaurants in {city} for tourists: local favorites, international cuisine, and dining experiences for every budget.",
    category: "Food & Dining",
    readingTime: 8,
    promptTemplate: `Write a restaurant guide for tourists in {city}, {country}. Cover 15+ restaurants across budgets: budget-friendly, mid-range, and upscale. For each: cuisine type, signature dishes, price range in {currency}, location, atmosphere, reservation needed, and tourist tip. Organize by area/neighborhood. Include breakfast, lunch, dinner, and late-night options. Add a "Don't Miss" top 5 list.`
  },

  // ─── SHOPPING (5) ───
  {
    slug: "best-shopping-malls-{city}",
    titleTemplate: "Best Shopping Malls in {city}",
    descriptionTemplate: "Top shopping malls in {city}: luxury brands, local shops, entertainment, and dining all under one roof.",
    category: "Shopping",
    readingTime: 7,
    promptTemplate: `Write a guide to the best shopping malls in {city}, {country}. Cover 8-10 malls. For each: location, size, notable stores/brands, entertainment options, food courts, opening hours, how to get there, parking, and what makes it unique. Include luxury malls, outlet malls, and local shopping centers. Add tax-free shopping tips and seasonal sale periods.`
  },
  {
    slug: "local-markets-{city}",
    titleTemplate: "Local Markets in {city}",
    descriptionTemplate: "Best local markets in {city}: traditional bazaars, flea markets, food markets, and artisan markets to explore.",
    category: "Shopping",
    readingTime: 7,
    promptTemplate: `Write a guide to the best local markets in {city}, {country}. Cover 8-10 markets: traditional bazaars, food markets, flea markets, artisan markets, night markets. For each: what to find, bargaining tips, opening days/hours, location, how to get there, best time to visit, and what to buy. Include cultural etiquette for market shopping and bargaining phrases in {language}.`
  },
  {
    slug: "what-to-buy-{city}",
    titleTemplate: "What to Buy in {city} as a Tourist",
    descriptionTemplate: "Best souvenirs and things to buy in {city}: traditional crafts, local specialties, and unique gifts to bring home.",
    category: "Shopping",
    readingTime: 7,
    promptTemplate: `Write a souvenir and shopping guide for tourists in {city}, {country}. Cover 15+ items to buy: traditional crafts, local specialties, food/spices to bring home, clothing, art, jewelry, unique gifts. For each: where to buy (specific shops/markets), price range in {currency}, authenticity tips, and customs/import considerations. Include what NOT to buy (overpriced tourist traps) and best areas for shopping.`
  },
  {
    slug: "shopping-festivals-sale-seasons-{city}",
    titleTemplate: "Shopping Festivals & Sale Seasons in {city}",
    descriptionTemplate: "When to shop in {city}: major sales, shopping festivals, discount periods, and the best times for bargains.",
    category: "Shopping",
    readingTime: 6,
    promptTemplate: `Write a guide to shopping festivals and sale seasons in {city}, {country}. Cover: major shopping festivals, annual sales events, seasonal discounts, Black Friday/holiday sales, designer outlet sales, end-of-season clearances. For each event: dates, what discounts to expect, best stores, and tips. Include a month-by-month calendar of shopping opportunities and tax refund information.`
  },
  {
    slug: "tax-free-shopping-vat-refund-{city}",
    titleTemplate: "Tax-Free Shopping in {city}: How Tourists Can Claim VAT Refund",
    descriptionTemplate: "Complete guide to tax-free shopping in {city}: how to claim VAT refund, eligible purchases, and step-by-step process.",
    category: "Shopping",
    readingTime: 6,
    promptTemplate: `Write a detailed tax-free shopping and VAT refund guide for tourists in {city}, {country}. Cover: how the tax refund system works, minimum purchase amounts, eligible stores (look for tax-free signs), step-by-step claiming process, airport refund counters, required documents, timeframes, digital refund options, common mistakes, and how much you can actually save. Include specific VAT rates and example calculations.`
  },

  // ─── TRANSPORT (2) ───
  {
    slug: "how-to-get-around-{city}-transport-guide",
    titleTemplate: "How to Get Around {city}: Public Transport, Taxis, Metro & App Cabs",
    descriptionTemplate: "Complete transport guide for {city}: metro, bus, taxi, ride-hailing apps, and getting around like a local.",
    category: "Transport",
    readingTime: 8,
    promptTemplate: `Write a comprehensive transport guide for {city}, {country}. Cover: metro/subway system and maps, bus routes, taxis (official vs unofficial), ride-hailing apps (Uber, local alternatives), car rental, walking, cycling, ferry/water transport. For each: how to use, cost in {currency}, payment methods, safety tips, tourist passes. Include airport transfers, getting between popular areas, and a transport cost comparison table.`
  },
  {
    slug: "car-rental-rules-tips-{city}",
    titleTemplate: "Car Rental Rules & Tips in {city}",
    descriptionTemplate: "Guide to renting a car in {city}: driving rules, license requirements, best rental companies, and road safety tips.",
    category: "Transport",
    readingTime: 6,
    promptTemplate: `Write a car rental guide for {city}, {country}. Cover: whether renting a car is recommended, driving rules and road conditions, international driving license requirements, best rental companies, insurance tips, fuel costs in {currency}, parking situation, toll roads, speed limits, common driving challenges, GPS/navigation apps, and day trip routes by car. Include whether public transport is a better option.`
  },

  // ─── SPECIAL GUIDES (3) ───
  {
    slug: "{city}-kids-travel-guide",
    titleTemplate: "{city} with Kids: Travel Guide",
    descriptionTemplate: "Traveling to {city} with kids: family-friendly attractions, child-safe activities, and practical tips for parents.",
    category: "Special Guides",
    readingTime: 8,
    promptTemplate: `Write a comprehensive guide to visiting {city}, {country} with children. Cover: best family hotels (with kids' facilities), kid-friendly restaurants, top attractions for children by age group (toddlers, 5-10, teens), safety tips, medical facilities, baby gear rental, stroller-friendly areas, parks and playgrounds, rainy day activities, and general tips for traveling with kids in {city}. Include specific costs for family tickets in {currency}.`
  },
  {
    slug: "solo-travel-guide-{city}",
    titleTemplate: "Solo Travel Guide to {city}",
    descriptionTemplate: "Solo travel guide for {city}: safety tips, social spots, solo-friendly activities, and practical advice for lone travelers.",
    category: "Special Guides",
    readingTime: 7,
    promptTemplate: `Write a solo travel guide for {city}, {country}. Cover: safety tips for solo travelers, best neighborhoods to stay, social hostels and co-working spaces, solo-friendly restaurants and cafes, group tours to meet people, solo activities, photography tips (getting photos of yourself), nightlife safety, useful apps, costs for one person in {currency}, and specific advice for female/male solo travelers. Encourage confidence while being practical about safety.`
  },
  {
    slug: "{city}-travel-guide-indians",
    titleTemplate: "{city} Travel Guide for Indians",
    descriptionTemplate: "Complete {city} travel guide for Indian travelers: visa process, vegetarian food, cultural tips, and budget planning.",
    category: "Special Guides",
    readingTime: 8,
    promptTemplate: `Write a {city} travel guide specifically for Indian tourists. Cover: visa process from India (documents, fees, processing time), best flights from major Indian cities, currency exchange (INR to {currency}), Indian restaurants in {city}, vegetarian and Jain food options, cultural similarities and differences, language tips, budget planning in INR, SIM card options, specific shopping recommendations, festivals/events of interest, and a community/diaspora guide. Make it practical and relatable for Indian travelers.`
  },

  // ─── SEASONAL & MONTHLY (16) ───
  {
    slug: "festivals-events-monthly-guide-{city}",
    titleTemplate: "Festivals & Events in {city}: A Month-by-Month Guide",
    descriptionTemplate: "Complete calendar of festivals and events in {city}: cultural celebrations, music festivals, food events, and seasonal happenings.",
    category: "Seasonal & Monthly",
    readingTime: 8,
    promptTemplate: `Write a month-by-month festival and events guide for {city}, {country}. For each month cover: major festivals, cultural celebrations, music events, food festivals, sporting events, religious holidays, and seasonal activities. Include dates (approximate where needed), what to expect, ticket information, and tips for attending. Highlight the best months for different types of travelers.`
  },
  {
    slug: "{city}-summer",
    titleTemplate: "{city} in Summer: Weather, Things to Do & Travel Tips",
    descriptionTemplate: "Visiting {city} in summer: weather conditions, best activities, what to pack, and tips for beating the heat.",
    category: "Seasonal & Monthly",
    readingTime: 7,
    promptTemplate: `Write a summer travel guide for {city}, {country}. Cover: temperature and weather expectations, pros and cons of visiting in summer, best summer activities, indoor retreats from heat, summer events and festivals, what to pack, hydration and sun safety tips, crowd levels, pricing (peak vs off-peak), summer-specific food and drinks, and whether summer is a good time to visit. Include specific months and temperatures.`
  },
  {
    slug: "{city}-winter",
    titleTemplate: "{city} in Winter: Best Experiences & Weather Guide",
    descriptionTemplate: "Visiting {city} in winter: weather, festive activities, winter experiences, and tips for cold-weather travel.",
    category: "Seasonal & Monthly",
    readingTime: 7,
    promptTemplate: `Write a winter travel guide for {city}, {country}. Cover: temperatures and weather, pros and cons of winter visits, winter-specific activities, holiday markets and festivals, indoor attractions, what to pack, heating and comfort tips, winter food and hot drinks, crowd levels, pricing, and whether winter is a good time to visit. Include specific months and temperature ranges.`
  },
  {
    slug: "{city}-monsoon-rainy-season",
    titleTemplate: "{city} in Monsoon / Rainy Season: Is It Worth Visiting?",
    descriptionTemplate: "Visiting {city} during monsoon/rainy season: pros, cons, activities, and tips for rainy weather travel.",
    category: "Seasonal & Monthly",
    readingTime: 6,
    promptTemplate: `Write a rainy season / monsoon travel guide for {city}, {country}. Cover: when the rainy/monsoon season is, what rainfall to expect, pros of visiting (fewer crowds, lower prices, lush scenery), cons and challenges, indoor activities, waterproof gear to pack, transport considerations, health precautions, rainy day itinerary suggestions, and an honest assessment of whether it's worth visiting during this season.`
  },
  ...[
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ].map((month): Topic => ({
    slug: `{city}-${month.toLowerCase()}`,
    titleTemplate: `{city} in ${month}: Weather, Events & Travel Tips`,
    descriptionTemplate: `Complete guide to visiting {city} in ${month}: weather, events, prices, crowds, and what to pack.`,
    category: "Seasonal & Monthly",
    readingTime: 6,
    promptTemplate: `Write a travel guide for visiting {city}, {country} in ${month}. Cover: average temperature and weather conditions, rainfall, daylight hours, what to wear, major events and festivals happening in ${month}, crowd levels, hotel and flight pricing, pros and cons of visiting in ${month}, top activities for this time of year, and a quick 3-day itinerary optimized for ${month} weather. Help travelers decide if ${month} is the right time for their trip.`
  })),

  // ─── HOTELS & ACCOMMODATION (6) ───
  {
    slug: "best-hotels-{city}",
    titleTemplate: "Best Hotels in {city}",
    descriptionTemplate: "Top-rated hotels in {city}: luxury resorts, boutique stays, and best-value hotels for every budget.",
    category: "Hotels & Accommodation",
    readingTime: 8,
    promptTemplate: `Write a hotel guide for {city}, {country}. Cover 12-15 hotels across budgets: luxury (5-star), mid-range (4-star), and budget. For each: hotel name, location/neighborhood, price range in {currency} per night, key features, room types, best for (couples/families/business), nearby attractions, booking tips. Include a "Best For" summary table and best booking platforms/timing.`
  },
  {
    slug: "best-budget-hotels-{city}",
    titleTemplate: "Best Budget Hotels in {city}",
    descriptionTemplate: "Best budget hotels in {city}: affordable stays with great reviews, clean rooms, and convenient locations.",
    category: "Hotels & Accommodation",
    readingTime: 7,
    promptTemplate: `Write a budget hotel guide for {city}, {country}. Cover 10-12 budget-friendly hotels and hostels. For each: name, location, price range in {currency}, what's included, cleanliness rating, Wi-Fi quality, nearby transport, safety, and traveler reviews summary. Include tips for finding deals, best booking platforms, cheapest neighborhoods to stay, and hostel vs hotel comparison.`
  },
  {
    slug: "best-luxury-hotels-{city}",
    titleTemplate: "Best Luxury Hotels in {city}",
    descriptionTemplate: "Best luxury hotels in {city}: 5-star resorts, premium suites, and world-class hospitality experiences.",
    category: "Hotels & Accommodation",
    readingTime: 7,
    promptTemplate: `Write a luxury hotel guide for {city}, {country}. Cover 8-10 top luxury properties. For each: hotel name, star rating, location, price range in {currency}, signature suites, spa/wellness, dining options, unique features, best room to book, and VIP perks. Include tips on upgrades, loyalty programs, best time to book for deals, and what sets each property apart.`
  },
  {
    slug: "best-family-friendly-hotels-{city}",
    titleTemplate: "Best Family-Friendly Hotels in {city}",
    descriptionTemplate: "Best family hotels in {city}: kid-friendly facilities, family suites, pools, and activities for children.",
    category: "Hotels & Accommodation",
    readingTime: 7,
    promptTemplate: `Write a family hotel guide for {city}, {country}. Cover 8-10 family-friendly hotels. For each: name, location, family room/suite options, price range in {currency}, kids' club, pool, babysitting, kid menus, nearby family activities, stroller accessibility, and age suitability. Include tips for booking family rooms, extra bed policies, and best areas for families.`
  },
  {
    slug: "best-hotels-couples-honeymoon-{city}",
    titleTemplate: "Best Hotels in {city} for Couples / Honeymoon",
    descriptionTemplate: "Most romantic hotels in {city} for couples and honeymooners: intimate stays, spa retreats, and romantic suites.",
    category: "Hotels & Accommodation",
    readingTime: 7,
    promptTemplate: `Write a romantic hotel guide for {city}, {country}. Cover 8-10 hotels perfect for couples and honeymooners. For each: name, location, romance factor, price range in {currency}, best room/suite, spa treatments for two, romantic dining, views, private experiences, and honeymoon packages. Include tips for surprising your partner and best times of year for a romantic getaway.`
  },
  {
    slug: "best-areas-to-stay-{city}",
    titleTemplate: "Best Areas to Stay in {city} (Hotels by Location)",
    descriptionTemplate: "Where to stay in {city}: best neighborhoods and areas for tourists, broken down by budget, interests, and travel style.",
    category: "Hotels & Accommodation",
    readingTime: 8,
    promptTemplate: `Write a neighborhood accommodation guide for {city}, {country}. Cover 6-8 best areas to stay. For each area: character and vibe, price range in {currency}, best for (budget/luxury/families/nightlife/culture), top hotel recommendations, transport connections, nearby attractions, safety, restaurant scene. Include a comparison table and "Best Area For..." recommendations for different traveler types.`
  },

  // ─── PRACTICAL INFORMATION (7) ───
  {
    slug: "internet-sim-cards-{city}",
    titleTemplate: "Internet & SIM Cards in {city}: A Complete Guide for Travelers",
    descriptionTemplate: "How to stay connected in {city}: SIM cards, Wi-Fi, eSIM options, data plans, and internet tips for tourists.",
    category: "Practical Information",
    readingTime: 6,
    promptTemplate: `Write an internet and connectivity guide for tourists in {city}, {country}. Cover: buying a local SIM card (where, cost in {currency}, best providers), eSIM options, tourist data plans, Wi-Fi availability (hotels, cafes, public), free Wi-Fi hotspots, VPN considerations, calling/messaging apps used locally, international roaming costs, and tips for staying connected without overspending.`
  },
  {
    slug: "emergency-numbers-{city}",
    titleTemplate: "Emergency Numbers & Contacts in {city}",
    descriptionTemplate: "Essential emergency contacts for {city}: police, ambulance, fire, embassy numbers, and what to do in an emergency.",
    category: "Practical Information",
    readingTime: 5,
    promptTemplate: `Write an emergency information guide for tourists in {city}, {country}. Cover: emergency phone numbers (police, ambulance, fire), tourist police, embassy/consulate contacts for major countries, hospital locations with English-speaking staff, pharmacy locations, lost property, reporting theft, what to do if arrested, emergency apps, travel insurance claims process, and how to contact your embassy. Keep it clear and easy to reference quickly.`
  },
  {
    slug: "hospitals-medical-help-{city}",
    titleTemplate: "Hospitals & Medical Help in {city}: Emergency Guide",
    descriptionTemplate: "Medical guide for tourists in {city}: best hospitals, pharmacies, health insurance, and getting medical help abroad.",
    category: "Practical Information",
    readingTime: 6,
    promptTemplate: `Write a medical and health guide for tourists in {city}, {country}. Cover: best hospitals with English-speaking doctors, private vs public healthcare, pharmacy locations and hours, common health issues for tourists, vaccinations needed, travel insurance requirements, how to see a doctor, dental emergencies, cost of medical care in {currency}, and specific health tips for the local climate and food.`
  },
  {
    slug: "cultural-etiquette-local-customs-{city}",
    titleTemplate: "Cultural Etiquette & Local Customs in {city}",
    descriptionTemplate: "Cultural guide for {city}: local customs, etiquette rules, social norms, and how to show respect as a visitor.",
    category: "Practical Information",
    readingTime: 7,
    promptTemplate: `Write a cultural etiquette guide for tourists in {city}, {country}. Cover: greeting customs, dining etiquette, tipping norms, religious site behavior, photography rules, public behavior expectations, gender-specific customs, gift-giving, business etiquette, common gestures and their meanings, taboo topics, alcohol/smoking rules, and how to show respect. Help tourists avoid cultural faux pas while genuinely connecting with local culture.`
  },
  {
    slug: "useful-travel-apps-{city}",
    titleTemplate: "Useful Travel Apps for Tourists in {city}",
    descriptionTemplate: "Essential apps for visiting {city}: transport, food delivery, maps, translation, payments, and booking apps.",
    category: "Practical Information",
    readingTime: 6,
    promptTemplate: `Write a travel apps guide for tourists in {city}, {country}. Cover essential apps for: transport (ride-hailing, metro maps), food delivery, restaurant booking, maps/navigation, translation, payments/wallet, grocery delivery, pharmacy, taxi booking, laundry service, accommodation, and activity booking. For each app: what it does, is it free, do you need a local number, and alternatives. Include setup tips before your trip.`
  },
  {
    slug: "language-{city}-useful-phrases",
    titleTemplate: "Language Spoken in {city}: Useful Phrases for Tourists & English Tips",
    descriptionTemplate: "Language guide for {city}: useful phrases, English proficiency, and communication tips for tourists.",
    category: "Practical Information",
    readingTime: 6,
    promptTemplate: `Write a language guide for tourists in {city}, {country}. Cover: main language ({language}) and other languages spoken, English proficiency level, 30+ useful phrases with pronunciation (greetings, ordering food, directions, shopping, emergencies, numbers), how to use translation apps effectively, body language tips, language learning resources, and whether you can get by with English alone. Include a printable phrase card section.`
  },
  {
    slug: "beaches-{city}",
    titleTemplate: "Beaches in {city}: Best Public & Private Beaches, Family & Couples Guide",
    descriptionTemplate: "Beach guide for {city}: best public and private beaches, family-friendly options, water sports, and beach tips.",
    category: "Practical Information",
    requiresBeach: true,
    readingTime: 7,
    promptTemplate: `Write a beach guide for {city}, {country}. Cover 8-10 beaches: public and private. For each: location, water quality, facilities, crowd level, water sports available, entry fee in {currency}, food/drink options, best time to visit, and best for (families/couples/parties). Include beach safety tips, jellyfish/current warnings, dress code on beaches, and sunset spots.`
  },

  // ─── VISA & ENTRY (8) ───
  {
    slug: "{city}-tourist-visa-guide",
    titleTemplate: "{city} Tourist Visa Guide: Requirements, Fees & Process",
    descriptionTemplate: "Complete tourist visa guide for {city}: requirements, fees, application process, and tips for approval.",
    category: "Visa & Entry",
    readingTime: 7,
    promptTemplate: `Write a comprehensive tourist visa guide for {city}, {country}. Cover: visa types, who needs a visa, visa-free countries, required documents, application process (online vs embassy), fees in {currency}/USD, processing time, photo requirements, financial proof needed, cover letter tips, interview process if applicable, common mistakes, and tracking your application. Keep information current and practical.`
  },
  {
    slug: "visa-on-arrival-vs-tourist-visa-{city}",
    titleTemplate: "Visa on Arrival vs Tourist Visa for {city}",
    descriptionTemplate: "Visa on arrival vs tourist visa for {city}: which to choose, eligibility, costs, and step-by-step process for each option.",
    category: "Visa & Entry",
    readingTime: 6,
    promptTemplate: `Write a comparison guide for visa on arrival vs pre-arranged tourist visa for {city}, {country}. Cover: who is eligible for visa on arrival, countries that need pre-arranged visa, cost comparison, processing time, documents needed for each, pros and cons, which to choose based on your situation, airport process for visa on arrival, and common questions. Include e-visa options if available.`
  },
  {
    slug: "when-should-you-apply-visa-{city}",
    titleTemplate: "When Should You Apply for a {city} Tourist Visa?",
    descriptionTemplate: "Best timing for {city} visa application: how far in advance, peak seasons, and tips for faster processing.",
    category: "Visa & Entry",
    readingTime: 5,
    promptTemplate: `Write a visa timing guide for {city}, {country}. Cover: recommended application timeline, peak processing periods, fastest processing options, express/rush visa services, how seasons affect processing time, when to book flights relative to visa application, group/family application tips, and what to do if your trip is soon. Include a timeline checklist from application to travel.`
  },
  {
    slug: "visa-processing-time-{city}",
    titleTemplate: "Tourist Visa Processing Time for {city}",
    descriptionTemplate: "How long does a {city} tourist visa take? Processing times, fast-track options, and tips to avoid delays.",
    category: "Visa & Entry",
    readingTime: 5,
    promptTemplate: `Write a visa processing time guide for {city}, {country}. Cover: standard processing times by country, express/premium processing options and costs, factors that affect processing time, how to track your application, what to do if it's delayed, peak seasons for delays, embassy contact information, and tips for faster processing. Include realistic timeframes and planning advice.`
  },
  {
    slug: "common-visa-rejection-reasons-{city}",
    titleTemplate: "Common Tourist Visa Rejection Reasons for {city}",
    descriptionTemplate: "Why {city} visa applications get rejected: common reasons, how to avoid rejection, and what to do if denied.",
    category: "Visa & Entry",
    readingTime: 6,
    promptTemplate: `Write a guide about common visa rejection reasons for {city}, {country}. Cover: top 10 rejection reasons (incomplete documents, insufficient funds, no travel insurance, weak ties to home country, etc.), how to strengthen your application, financial requirements, what supporting documents help, appeal process if rejected, reapplication tips, and success stories. Be honest but encouraging.`
  },
  {
    slug: "{city}-airport-arrival-guide",
    titleTemplate: "{city} Airport Arrival Guide for Tourists",
    descriptionTemplate: "Complete airport arrival guide for {city}: immigration, customs, transport to city center, and first-hour survival tips.",
    category: "Visa & Entry",
    readingTime: 7,
    promptTemplate: `Write an airport arrival guide for {city}, {country}. Cover: main airport(s) overview, what to expect at immigration, customs rules and declarations, SIM card counters at arrival, currency exchange at airport, transport options to city center (taxi, metro, bus, private transfer) with costs in {currency}, airport facilities, luggage storage, transit hotel options, Wi-Fi, and a step-by-step "first 60 minutes" guide from landing to city center.`
  },
  {
    slug: "immigration-customs-rules-{city}",
    titleTemplate: "Immigration & Customs Rules in {city}",
    descriptionTemplate: "Immigration and customs rules for {city}: what you can bring, prohibited items, duty-free limits, and entry requirements.",
    category: "Visa & Entry",
    readingTime: 6,
    promptTemplate: `Write an immigration and customs guide for {city}, {country}. Cover: entry requirements, arrival card completion, prohibited items, restricted items, duty-free allowances (alcohol, tobacco, gifts), medication rules, electronic items declaration, food items, currency declaration limits, penalties for violations, customs inspection process, and what to expect at immigration. Include specific limits and amounts.`
  },
  {
    slug: "lost-passport-embassy-emergency-steps-{city}",
    titleTemplate: "Lost Your Passport in {city}? Embassy & Emergency Steps",
    descriptionTemplate: "What to do if you lose your passport in {city}: emergency steps, embassy contacts, replacement process, and travel document guide.",
    category: "Visa & Entry",
    readingTime: 5,
    promptTemplate: `Write an emergency guide for tourists who lose their passport in {city}, {country}. Cover: immediate steps (police report, embassy contact), major embassy/consulate locations and contact info, emergency travel document process, replacement passport timeline, costs, required documents/photos, how to travel domestically without passport, hotel check-in without passport, insurance claims, and prevention tips. Keep it calm and step-by-step.`
  },

  // ─── MONEY & PAYMENTS (3) ───
  {
    slug: "daily-budget-cost-breakdown-{city}",
    titleTemplate: "Daily Budget for {city} Trip (Cost Breakdown)",
    descriptionTemplate: "How much does a {city} trip cost per day? Complete budget breakdown for accommodation, food, transport, and activities.",
    category: "Money & Payments",
    readingTime: 7,
    promptTemplate: `Write a detailed daily budget breakdown for {city}, {country}. Cover three budget levels (backpacker, mid-range, luxury). For each: accommodation, breakfast, lunch, dinner, transport, 2-3 activities, drinks/snacks, miscellaneous. Show daily totals in {currency} and USD. Include a comparison table, hidden costs to budget for, seasonal price variations, and specific money-saving tips. Help travelers set realistic expectations.`
  },
  {
    slug: "atm-forex-money-exchange-{city}",
    titleTemplate: "ATM, Forex & Money Exchange in {city}",
    descriptionTemplate: "Where to exchange money in {city}: best ATMs, forex bureaus, exchange rates, and tips to avoid bad deals.",
    category: "Money & Payments",
    readingTime: 6,
    promptTemplate: `Write a money exchange guide for {city}, {country}. Cover: best places to exchange money, ATM networks and fees, airport vs city exchange rates, bank vs money changer comparison, credit/debit card fees abroad, dynamic currency conversion scams, best exchange rate apps, how much cash to carry, safety tips for carrying money, and digital wallet options. Include specific locations and current fee structures.`
  },
  {
    slug: "tipping-culture-{city}",
    titleTemplate: "Tipping Culture in {city}",
    descriptionTemplate: "Tipping guide for {city}: who to tip, how much, and local customs around gratuities for tourists.",
    category: "Money & Payments",
    readingTime: 5,
    promptTemplate: `Write a tipping guide for tourists in {city}, {country}. Cover: general tipping culture (is it expected/optional/offensive?), specific tipping amounts for: restaurants, bars, hotels (bellhop, housekeeping, concierge), taxis, tour guides, spa services, delivery, hairdressers. Include how to tip (cash vs card), what percentage is standard, and cultural context. Compare with international norms.`
  },

  // ─── BOOKING & EXPERIENCES (5) ───
  {
    slug: "best-time-to-book-activities-{city}",
    titleTemplate: "Best Time to Book Activities in {city} (Price & Availability Guide)",
    descriptionTemplate: "When to book activities in {city} for the best prices and availability. Early bird deals, last-minute discounts, and booking tips.",
    category: "Booking & Experiences",
    readingTime: 6,
    promptTemplate: `Write a booking timing guide for activities in {city}, {country}. Cover: how far in advance to book popular attractions, early bird vs last-minute pricing, peak vs off-peak availability, seasonal booking patterns, best platforms to book, cancellation policies, group discount timelines, and a month-by-month booking calendar. Include specific popular activities and their booking windows.`
  },
  {
    slug: "private-vs-shared-activities-{city}",
    titleTemplate: "Private vs Shared Activities in {city} – Which Should You Choose?",
    descriptionTemplate: "Private vs shared tours in {city}: cost comparison, pros and cons, and how to choose the right option for your trip.",
    category: "Booking & Experiences",
    readingTime: 6,
    promptTemplate: `Write a comparison guide for private vs shared activities in {city}, {country}. Cover: cost differences in {currency}, group size expectations, customization level, pace and flexibility, social aspect, language considerations, popular activities available in both formats, when to choose private (families, special occasions) vs shared (solo travelers, budget), and booking tips for each.`
  },
  {
    slug: "top-rated-activities-reviews-{city}",
    titleTemplate: "Top Rated Activities in {city} (Based on Tourist Reviews)",
    descriptionTemplate: "Highest-rated tourist activities in {city}: verified reviews, ratings, and honest feedback from real visitors.",
    category: "Booking & Experiences",
    readingTime: 7,
    promptTemplate: `Write a guide to the top-rated activities in {city}, {country} based on tourist reviews and ratings. Cover 12-15 activities. For each: activity name, average rating, number of reviews, what tourists love, common complaints, price in {currency}, best operator/provider, tips from reviewers, and who it's best for. Organize by category and include a "Skip It" section for overhyped attractions.`
  },
  {
    slug: "combo-tours-activity-passes-{city}",
    titleTemplate: "Combo Tours & Activity Passes in {city}",
    descriptionTemplate: "Save money with combo tours and activity passes in {city}: city passes, bundle deals, and multi-attraction tickets.",
    category: "Booking & Experiences",
    readingTime: 6,
    promptTemplate: `Write a guide to combo tours and activity passes in {city}, {country}. Cover: city passes (what's included, cost in {currency}, is it worth it), multi-attraction tickets, combo tour packages, hop-on/hop-off bus deals, restaurant and activity bundles. For each: what's included, cost savings vs individual tickets, validity period, and honest assessment of value. Help tourists decide which passes are actually worth buying.`
  },
  {
    slug: "last-minute-activities-{city}",
    titleTemplate: "Last-Minute Activities in {city}: What You Can Still Book",
    descriptionTemplate: "Last-minute activity bookings in {city}: same-day availability, walk-in options, and spontaneous things to do.",
    category: "Booking & Experiences",
    readingTime: 6,
    promptTemplate: `Write a last-minute activities guide for {city}, {country}. Cover: activities with same-day availability, walk-in attractions (no booking needed), last-minute deal platforms, standby/waitlist options for popular attractions, spontaneous activities, apps for last-minute bookings, and tips for filling an unexpected free day. Include specific activities and their walk-in policies.`
  },

  // ─── YACHT & CRUISE (5) ───
  {
    slug: "best-yacht-routes-sightseeing-{city}",
    titleTemplate: "Best Yacht Routes & Sightseeing Points in {city}",
    descriptionTemplate: "Top yacht and boat routes in {city}: scenic sailing routes, sightseeing from the water, and coastal highlights.",
    category: "Yacht & Cruise",
    requiresYacht: true,
    readingTime: 7,
    promptTemplate: `Write a yacht routes and waterfront sightseeing guide for {city}, {country}. Cover: top sailing/boating routes, what you'll see from the water, best harbors and marinas, coastal landmarks, sunset viewing points from boats, photography tips from the water, route durations, and seasonal considerations. Include both budget boat tours and luxury yacht options with costs in {currency}.`
  },
  {
    slug: "yacht-rental-private-vs-shared-{city}",
    titleTemplate: "Yacht Rental in {city}: Private vs Shared Options",
    descriptionTemplate: "Yacht rental guide for {city}: private vs shared options, prices, what's included, and how to choose the right boat.",
    category: "Yacht & Cruise",
    requiresYacht: true,
    readingTime: 6,
    promptTemplate: `Write a yacht rental comparison guide for {city}, {country}. Cover: private yacht rental (sizes, costs in {currency}, what's included), shared yacht tours (group size, costs, itinerary), comparison table, best operators, booking platforms, cancellation policies, what to bring, dress code, food/drink options, and tips for first-time yacht renters.`
  },
  {
    slug: "best-time-yacht-cruise-{city}",
    titleTemplate: "Best Time for Yacht Cruise in {city}",
    descriptionTemplate: "When to take a yacht cruise in {city}: best months, weather conditions, sunset times, and seasonal booking tips.",
    category: "Yacht & Cruise",
    requiresYacht: true,
    readingTime: 5,
    promptTemplate: `Write a guide about the best time to take a yacht or cruise in {city}, {country}. Cover: best months for calm waters, weather conditions by season, sunset times for sunset cruises, peak vs off-peak pricing, wave/current conditions, visibility, wind patterns, and special seasonal events viewable from the water. Include a month-by-month recommendation chart.`
  },
  {
    slug: "day-cruise-vs-dinner-cruise-{city}",
    titleTemplate: "Day Cruise vs Dinner Cruise in {city}",
    descriptionTemplate: "Day cruise vs dinner cruise in {city}: which is better? Compare experiences, prices, views, and what to expect.",
    category: "Yacht & Cruise",
    requiresYacht: true,
    readingTime: 6,
    promptTemplate: `Write a comparison of day cruises vs dinner cruises in {city}, {country}. Cover: experience differences, typical itinerary for each, what's included, cost comparison in {currency}, views (daytime vs illuminated nightscape), food/drink quality, dress code, duration, best for (families/couples/groups), and specific recommended operators for each type. Help readers choose the right cruise for their trip.`
  },
  {
    slug: "first-timer-cruise-guide-{city}",
    titleTemplate: "What to Expect on a Cruise in {city} (First-Timer Guide)",
    descriptionTemplate: "First-time cruise guide for {city}: what to expect, what to bring, etiquette, and tips for an amazing experience.",
    category: "Yacht & Cruise",
    requiresYacht: true,
    readingTime: 6,
    promptTemplate: `Write a first-timer's cruise guide for {city}, {country}. Cover: what to expect on board, check-in process, what to wear, what to bring (and what not to), seasickness prevention, safety briefing, food/drink etiquette, photography tips, gratuity customs, common mistakes first-timers make, and a step-by-step timeline of a typical cruise day. Include both luxury and budget cruise experiences.`
  },

  // ─── ACTIVITIES PLANNING (3) ───
  {
    slug: "indoor-vs-outdoor-activities-{city}",
    titleTemplate: "Indoor vs Outdoor Activities in {city}",
    descriptionTemplate: "Indoor vs outdoor activities in {city}: rainy day plans, outdoor adventures, and the best of both worlds.",
    category: "Activities Planning",
    readingTime: 6,
    promptTemplate: `Write a guide comparing indoor vs outdoor activities in {city}, {country}. Indoor: museums, shopping malls, aquariums, indoor entertainment, spas, cooking classes. Outdoor: parks, walking tours, adventure sports, markets, beaches, viewpoints. For each activity include cost in {currency} and best time. Add a rainy day plan and extreme heat plan. Help travelers plan for any weather.`
  },
  {
    slug: "weather-wise-activity-guide-{city}",
    titleTemplate: "Weather-Wise Activity Guide for {city}",
    descriptionTemplate: "Plan activities in {city} based on weather: hot day, rainy day, cool evening, and perfect weather activity suggestions.",
    category: "Activities Planning",
    readingTime: 6,
    promptTemplate: `Write a weather-based activity planning guide for {city}, {country}. Cover: what to do on extremely hot days, rainy days, windy days, cool/pleasant days, and perfect weather days. For each weather scenario, suggest 5-8 specific activities with location and cost in {currency}. Include weather apps to use, typical weather by month, and how to quickly pivot plans when weather changes unexpectedly.`
  },
  {
    slug: "activities-non-swimmers-non-adventurers-{city}",
    titleTemplate: "Activities in {city} for Non-Swimmers / Non-Adventurers",
    descriptionTemplate: "Gentle activities in {city} for those who prefer relaxation over adventure: cultural tours, dining, and easy-going experiences.",
    category: "Activities Planning",
    readingTime: 6,
    promptTemplate: `Write an activity guide for non-swimmers and non-adventurers visiting {city}, {country}. Cover: cultural experiences, food tours, spa and wellness, scenic drives, gentle walking tours, museum visits, cooking classes, shopping excursions, photography walks, garden visits, theater and performances. For each include: accessibility, physical demand level (easy/moderate), cost in {currency}. Show that you can have an amazing trip without extreme activities.`
  },

  // ─── HOLIDAY PACKAGES (4) ───
  {
    slug: "best-holiday-packages-{city}",
    titleTemplate: "Best Holiday Packages for {city}",
    descriptionTemplate: "Top holiday packages for {city}: all-inclusive deals, flight + hotel combos, and curated travel packages.",
    category: "Holiday Packages",
    readingTime: 7,
    promptTemplate: `Write a holiday packages guide for {city}, {country}. Cover: types of packages available (all-inclusive, flight+hotel, guided tours, self-drive), top package providers, what's typically included, price ranges in {currency}/USD, how to compare packages, hidden costs, best time to book, package vs DIY cost comparison, and tips for customizing packages. Include 5-6 sample package itineraries at different price points.`
  },
  {
    slug: "family-holiday-packages-{city}",
    titleTemplate: "{city} Holiday Packages for Families",
    descriptionTemplate: "Family holiday packages for {city}: kid-friendly tours, family resorts, and all-inclusive family deals.",
    category: "Holiday Packages",
    readingTime: 6,
    promptTemplate: `Write a family holiday package guide for {city}, {country}. Cover: family-specific packages, what to look for (kids eat free, family rooms, kids' clubs), top providers, age-appropriate inclusions, family resort options, cost for family of 4 in {currency}, school holiday vs off-peak pricing, and tips for booking with children. Include 3-4 sample family package itineraries.`
  },
  {
    slug: "honeymoon-holiday-packages-{city}",
    titleTemplate: "{city} Honeymoon Holiday Packages",
    descriptionTemplate: "Romantic honeymoon packages for {city}: luxury stays, couple experiences, and all-inclusive honeymoon deals.",
    category: "Holiday Packages",
    readingTime: 6,
    promptTemplate: `Write a honeymoon holiday package guide for {city}, {country}. Cover: romantic package options, what's typically included (suite upgrades, spa, dinner, activities), luxury vs mid-range honeymoon packages, cost for couple in {currency}, best romantic hotels, romantic activity inclusions, best time for honeymoon, and how to get honeymoon perks. Include 3-4 sample honeymoon itineraries.`
  },
  {
    slug: "luxury-holiday-packages-{city}",
    titleTemplate: "Luxury Holiday Packages in {city}",
    descriptionTemplate: "Luxury travel packages for {city}: premium experiences, 5-star hotels, private tours, and VIP treatment.",
    category: "Holiday Packages",
    readingTime: 6,
    promptTemplate: `Write a luxury holiday package guide for {city}, {country}. Cover: ultra-premium packages, what luxury means in {city}, 5-star hotel inclusions, private transfers, VIP access, personal concierge, exclusive experiences, cost ranges in {currency}, top luxury tour operators, and whether luxury packages are worth the premium vs booking separately. Include 3-4 sample luxury itineraries.`
  },

  // ─── TRUST & CONVERSION (3) ───
  {
    slug: "is-it-safe-to-book-online-{city}",
    titleTemplate: "Is It Safe to Book Activities Online in {city}?",
    descriptionTemplate: "Is it safe to book tours and activities online for {city}? Trusted platforms, scam awareness, and booking safety tips.",
    category: "Trust & Conversion",
    readingTime: 5,
    promptTemplate: `Write a guide about online booking safety for activities in {city}, {country}. Cover: trusted booking platforms, how to verify operators, red flags for scams, payment protection, reading reviews, cancellation policies, contact verification, what to do if something goes wrong, price comparison tips, and offline vs online booking comparison. Build confidence for first-time online bookers.`
  },
  {
    slug: "travel-insurance-activities-{city}",
    titleTemplate: "Travel Insurance for Activities & Cruises in {city}",
    descriptionTemplate: "Do you need travel insurance for {city}? Coverage for activities, medical emergencies, and trip cancellation explained.",
    category: "Trust & Conversion",
    readingTime: 6,
    promptTemplate: `Write a travel insurance guide for tourists visiting {city}, {country}. Cover: why you need travel insurance, what to look for in a policy, coverage for adventure activities, cruise-specific insurance, medical coverage, trip cancellation, lost luggage, specific risks in {city}, recommended providers, cost ranges, and how to make a claim. Include real scenarios where insurance saved travelers money.`
  },
  {
    slug: "refund-cancellation-policies-{city}",
    titleTemplate: "Refund & Cancellation Policies for Tours in {city}",
    descriptionTemplate: "Understanding refund and cancellation policies for tours in {city}: what to expect, how to get refunds, and your rights.",
    category: "Trust & Conversion",
    readingTime: 5,
    promptTemplate: `Write a guide about refund and cancellation policies for tours and activities in {city}, {country}. Cover: standard cancellation windows, free cancellation periods, non-refundable bookings, weather-related cancellations, operator cancellations, how to request refunds, credit card chargeback options, consumer protection laws in {country}, booking platform refund policies, and tips for flexible booking.`
  },

  // ─── COMPARISONS (3) ───
  {
    slug: "{city}-vs-{nearby-city}-comparison",
    titleTemplate: "{city} vs {nearbyCity} Activities Comparison",
    descriptionTemplate: "{city} vs {nearbyCity}: which destination is better? Compare activities, costs, nightlife, food, and experiences.",
    category: "Comparisons",
    readingTime: 7,
    promptTemplate: `Write a detailed comparison between {city} and {nearbyCity}. Compare: overall vibe, best activities, food scene, nightlife, shopping, accommodation costs in {currency}, day trip options, ease of travel, safety, family-friendliness, romantic appeal, adventure options, and cultural experiences. Include a comparison table and "Choose {city} if..." vs "Choose {nearbyCity} if..." recommendations. Be balanced and fair to both destinations.`
  },
  {
    slug: "guided-tours-vs-self-planned-{city}",
    titleTemplate: "Guided Tours vs Self-Planned Trips in {city}",
    descriptionTemplate: "Should you book guided tours or explore {city} on your own? Pros, cons, and cost comparison to help you decide.",
    category: "Comparisons",
    readingTime: 6,
    promptTemplate: `Write a comparison guide for guided tours vs self-planned trips in {city}, {country}. Cover: cost comparison in {currency}, time efficiency, depth of experience, flexibility, language barriers, safety, social aspect, specific activities better with guides vs solo, apps for self-guided tours, and hybrid approach recommendations. Help different types of travelers (solo, family, elderly, adventure) choose the right option.`
  },
  {
    slug: "package-holiday-vs-booking-separately-{city}",
    titleTemplate: "Is a Package Holiday Better Than Booking Separately in {city}?",
    descriptionTemplate: "Package holiday vs booking separately for {city}: cost analysis, convenience comparison, and which saves more.",
    category: "Comparisons",
    readingTime: 6,
    promptTemplate: `Write a detailed comparison of package holidays vs booking separately for {city}, {country}. Cover: total cost comparison in {currency} (sample itinerary both ways), convenience factor, flexibility, inclusions, hidden costs in packages, DIY booking tips, when packages win (peak season, complex trips), when DIY wins (flexible travelers, off-peak), and a decision framework. Include real price examples for a 5-night trip.`
  },
];
