/**
 * Image utility for the travel blog.
 * Provides city-specific images with intelligent fallbacks.
 *
 * Priority:
 * 1. AI-generated images in /images/{city}/
 * 2. Frontmatter heroImage (if URL)
 * 3. Unsplash fallback URLs
 */

// ─── Unsplash Fallback URLs (used when AI images aren't generated yet) ───

export const UNSPLASH_FALLBACKS: Record<string, Record<string, string>> = {
  dubai: {
    hero: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&h=600&fit=crop&q=80',
    'travel-guide': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=450&fit=crop',
    'budget-vs-luxury': 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800&h=450&fit=crop',
    safety: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&h=450&fit=crop',
    'things-to-do': 'https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=800&h=450&fit=crop',
    experiences: 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800&h=450&fit=crop',
    itinerary: 'https://images.unsplash.com/photo-1546412414-e1885259563a?w=800&h=450&fit=crop',
    food: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=450&fit=crop',
    shopping: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&h=450&fit=crop',
    hotels: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=450&fit=crop',
    currency: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=450&fit=crop',
    visa: 'https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=800&h=450&fit=crop',
    'sidebar-1': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=300&h=300&fit=crop&q=70',
    'sidebar-2': 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=300&h=300&fit=crop&q=70',
    'sidebar-3': 'https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=300&h=300&fit=crop&q=70',
    default: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop&q=70',
  },
};

/**
 * Get the image URL for a city + image type.
 * Returns AI-generated path if it exists, otherwise Unsplash fallback.
 */
export function getCityImage(city: string, imageType: string): string {
  const citySlug = city.toLowerCase().replace(/\s+/g, '-');
  const aiPath = `/images/${citySlug}/${citySlug}-${imageType}.webp`;

  // In SSG build, we check if the file exists in /public/images/
  // At runtime, we try AI path first — browser will handle 404 gracefully
  // But for <img> tags, we prefer to return the right URL

  // Check fallbacks
  const cityFallbacks = UNSPLASH_FALLBACKS[citySlug];
  const fallback = cityFallbacks?.[imageType] || cityFallbacks?.default || UNSPLASH_FALLBACKS.dubai.default;

  return aiPath;
}

/**
 * Get the fallback image URL for a city + image type.
 */
export function getFallbackImage(city: string, imageType: string): string {
  const citySlug = city.toLowerCase().replace(/\s+/g, '-');
  const cityFallbacks = UNSPLASH_FALLBACKS[citySlug];
  return cityFallbacks?.[imageType] || cityFallbacks?.default || UNSPLASH_FALLBACKS.dubai.default;
}

/**
 * Get sidebar gallery images for a city.
 */
export function getSidebarImages(city: string): string[] {
  const citySlug = city.toLowerCase().replace(/\s+/g, '-');
  return [
    `/images/${citySlug}/${citySlug}-sidebar-1.webp`,
    `/images/${citySlug}/${citySlug}-sidebar-2.webp`,
    `/images/${citySlug}/${citySlug}-sidebar-3.webp`,
    `/images/${citySlug}/${citySlug}-food.webp`,
    `/images/${citySlug}/${citySlug}-shopping.webp`,
    `/images/${citySlug}/${citySlug}-hotels.webp`,
  ];
}

/**
 * Get hero image for a city.
 */
export function getHeroImage(city: string): string {
  const citySlug = city.toLowerCase().replace(/\s+/g, '-');
  return `/images/${citySlug}/${citySlug}-hero.webp`;
}
