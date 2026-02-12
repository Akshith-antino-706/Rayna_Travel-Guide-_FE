#!/usr/bin/env python3
"""
DALL-E 3 Image Generator for Travel Blog
Generates unique, high-quality travel images for each article.
"""

import os
import json
import time
import urllib.request
import urllib.error
from pathlib import Path

API_KEY = os.environ.get("OPENAI_API_KEY", "")
if not API_KEY:
    # Try reading from .env file
    env_path = Path(__file__).parent.parent / ".env"
    if env_path.exists():
        for line in env_path.read_text().splitlines():
            if line.startswith("OPENAI_API_KEY="):
                API_KEY = line.split("=", 1)[1].strip()

OUTPUT_DIR = Path(__file__).parent.parent / "public" / "images" / "dubai"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Each entry: (filename, DALL-E prompt, size)
IMAGE_SPECS = [
    # Site hero / general Dubai
    (
        "dubai-hero.webp",
        "A breathtaking wide panoramic photograph of the Dubai skyline at golden hour sunset, "
        "featuring the Burj Khalifa, modern skyscrapers, and the Dubai Marina reflecting on calm water. "
        "Warm orange and gold tones, professional travel photography, ultra high quality, cinematic lighting, "
        "no text, no watermarks, no logos",
        "1792x1024"
    ),
    # Complete travel guide
    (
        "dubai-travel-guide.webp",
        "An aerial photograph of Dubai showing the Burj Khalifa, Palm Jumeirah, and the coastline "
        "with turquoise Arabian Gulf water. Clear blue sky, vivid colors, professional drone photography "
        "style, travel magazine cover quality, no text, no watermarks",
        "1792x1024"
    ),
    # Budget vs luxury
    (
        "dubai-budget-vs-luxury.webp",
        "A split-composition photograph showing the contrast of Dubai: one side showing a vibrant "
        "traditional souk market with colorful spices and lanterns, the other side showing a luxurious "
        "gold-accented hotel lobby with chandeliers. Rich warm colors, professional photography, "
        "no text, no watermarks",
        "1792x1024"
    ),
    # Safety guide
    (
        "dubai-safety.webp",
        "A peaceful photograph of a well-lit Dubai promenade at twilight with families walking safely "
        "along the waterfront, modern city lights in the background, the Burj Al Arab visible in the "
        "distance, calm and secure atmosphere, professional travel photography, no text, no watermarks",
        "1792x1024"
    ),
    # Things to do
    (
        "dubai-things-to-do.webp",
        "A vibrant collage-style photograph showing exciting Dubai activities: a view from the top "
        "of Burj Khalifa observation deck looking down at the city, with a desert landscape visible "
        "in the distance, golden sunlight, adventurous and exciting mood, professional photography, "
        "no text, no watermarks",
        "1792x1024"
    ),
    # Desert safari
    (
        "dubai-desert-safari.webp",
        "A stunning photograph of a desert safari scene in the Dubai desert at sunset. Golden sand "
        "dunes stretching into the horizon, a luxury 4x4 vehicle driving up a steep dune, dramatic "
        "orange and purple sky, sand particles catching the light, professional adventure photography, "
        "no text, no watermarks",
        "1792x1024"
    ),
    # 3-day itinerary
    (
        "dubai-3-day-itinerary.webp",
        "A beautiful photograph of the Dubai Frame landmark with the old Dubai neighborhood on one "
        "side and the modern skyline on the other, taken during blue hour with city lights beginning "
        "to glow, perfect symmetry, professional architecture photography, no text, no watermarks",
        "1792x1024"
    ),
    # Food guide
    (
        "dubai-food.webp",
        "A top-down food photography shot of a beautifully arranged spread of Middle Eastern cuisine "
        "on an ornate brass tray: hummus, shawarma, kebabs, fresh flatbread, falafel, colorful mezze, "
        "baklava, Arabic coffee in traditional dallah. Warm ambient lighting, restaurant setting, "
        "professional food photography, no text, no watermarks",
        "1792x1024"
    ),
    # Shopping malls
    (
        "dubai-shopping.webp",
        "An impressive interior photograph of a grand Dubai shopping mall with multiple levels, "
        "a massive indoor waterfall feature, luxury brand storefronts with warm lighting, marble "
        "floors, and a dramatic glass ceiling letting in natural light, wide-angle perspective, "
        "professional interior photography, no text, no watermarks",
        "1792x1024"
    ),
    # Best hotels
    (
        "dubai-hotels.webp",
        "A luxurious photograph of a Dubai beachfront resort with an infinity pool overlooking "
        "the Arabian Gulf, palm trees, the Burj Al Arab in the background, plush sun loungers, "
        "crystal blue water, golden hour lighting, ultimate luxury atmosphere, professional hotel "
        "photography, no text, no watermarks",
        "1792x1024"
    ),
    # Currency guide
    (
        "dubai-currency.webp",
        "A close-up still life photograph of UAE Dirham banknotes and coins artistically arranged "
        "on a wooden surface with a traditional Arabic coffee cup, a small souk shopping bag, and "
        "a Dubai city map in the soft background, warm natural lighting, professional photography, "
        "no text overlays, no watermarks",
        "1792x1024"
    ),
    # Visa guide
    (
        "dubai-visa.webp",
        "A photograph of the modern Dubai International Airport arrivals hall with sleek architecture, "
        "glass facades, warm lighting, travelers walking through the impressive terminal, palm trees "
        "visible through floor-to-ceiling windows, welcoming atmosphere, professional travel photography, "
        "no text, no watermarks",
        "1792x1024"
    ),
    # Sidebar images (square format)
    (
        "dubai-sidebar-1.webp",
        "A vertical photograph of the Burj Khalifa tower at night with colorful LED light show "
        "reflecting in the Dubai Fountain water below, vibrant blues and purples, professional "
        "night photography, no text, no watermarks",
        "1024x1024"
    ),
    (
        "dubai-sidebar-2.webp",
        "A photograph of a traditional wooden abra boat on Dubai Creek at sunset with the gold "
        "souk market buildings glowing in warm light, reflections on calm water, cultural atmosphere, "
        "professional photography, no text, no watermarks",
        "1024x1024"
    ),
    (
        "dubai-sidebar-3.webp",
        "A photograph of the Palm Jumeirah from above showing the iconic palm tree shape island "
        "surrounded by turquoise water, luxury villas along the fronds, Atlantis hotel at the tip, "
        "clear sky, professional aerial photography, no text, no watermarks",
        "1024x1024"
    ),
]


def generate_image(prompt: str, size: str = "1792x1024") -> str | None:
    """Call DALL-E 3 API and return the image URL."""
    url = "https://api.openai.com/v1/images/generations"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}",
    }
    body = json.dumps({
        "model": "dall-e-3",
        "prompt": prompt,
        "n": 1,
        "size": size,
        "quality": "standard",
        "response_format": "url",
    }).encode("utf-8")

    req = urllib.request.Request(url, data=body, headers=headers, method="POST")

    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            image_url = data["data"][0]["url"]
            revised_prompt = data["data"][0].get("revised_prompt", "")
            print(f"  Revised prompt: {revised_prompt[:100]}...")
            return image_url
    except urllib.error.HTTPError as e:
        error_body = e.read().decode("utf-8") if e.fp else "No details"
        print(f"  API Error {e.code}: {error_body[:200]}")
        return None
    except Exception as e:
        print(f"  Error: {e}")
        return None


def download_image(image_url: str, save_path: Path) -> bool:
    """Download image from URL and save to disk."""
    try:
        req = urllib.request.Request(image_url)
        with urllib.request.urlopen(req, timeout=60) as resp:
            save_path.write_bytes(resp.read())
        size_kb = save_path.stat().st_size / 1024
        print(f"  Saved: {save_path.name} ({size_kb:.0f} KB)")
        return True
    except Exception as e:
        print(f"  Download error: {e}")
        return False


def main():
    if not API_KEY:
        print("ERROR: No OPENAI_API_KEY found in environment or .env file")
        return

    print(f"Generating {len(IMAGE_SPECS)} images for Dubai travel blog...")
    print(f"Output directory: {OUTPUT_DIR}\n")

    results = {}
    for i, (filename, prompt, size) in enumerate(IMAGE_SPECS):
        save_path = OUTPUT_DIR / filename

        # Skip if already generated
        if save_path.exists() and save_path.stat().st_size > 10000:
            print(f"[{i+1}/{len(IMAGE_SPECS)}] SKIP (exists): {filename}")
            results[filename] = True
            continue

        print(f"[{i+1}/{len(IMAGE_SPECS)}] Generating: {filename}")
        print(f"  Size: {size}")

        image_url = generate_image(prompt, size)
        if image_url:
            success = download_image(image_url, save_path)
            results[filename] = success
        else:
            results[filename] = False
            print(f"  FAILED to generate {filename}")

        # Rate limiting: small pause between requests
        if i < len(IMAGE_SPECS) - 1:
            print("  Waiting 2s...")
            time.sleep(2)

    # Summary
    print("\n" + "=" * 50)
    print("GENERATION SUMMARY")
    print("=" * 50)
    success_count = sum(1 for v in results.values() if v)
    print(f"Success: {success_count}/{len(IMAGE_SPECS)}")
    for fname, ok in results.items():
        status = "OK" if ok else "FAILED"
        print(f"  [{status}] {fname}")


if __name__ == "__main__":
    main()
