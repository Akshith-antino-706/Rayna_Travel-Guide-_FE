# Travel Blog

A scalable travel blog with 20,000+ city guides built with Astro, React, and Tailwind CSS.

## Prerequisites

- Node.js 18+
- npm

## Setup

```bash
cd blog
npm install
```

## Environment Variables

Create a `.env` file in the project root:

```
OPENAI_API_KEY=your-openai-api-key
```

## Commands

All commands are run from the `blog/` directory.

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build the static site to `dist/` |
| `npm run preview` | Preview the built site locally |
| `npm run generate` | Generate blog content using OpenAI |
| `npm run generate:dry` | Dry run — see what content would be generated |
| `npm run generate:resume` | Resume interrupted content generation |
| `npm run generate:images` | Generate images using OpenAI |
| `npm run generate:all` | Generate images + content in one go |
| `npm run dashboard` | Start the SEO dashboard (React app) |

## Project Structure

```
blog/
├── src/
│   ├── components/       # Astro & React components
│   │   ├── guide/        # Travel guide page components
│   │   └── react/        # Interactive React components
│   ├── content/blog/     # Markdown blog posts organized by city
│   ├── layouts/          # Page layouts (Base, Blog)
│   ├── pages/            # Route pages
│   ├── styles/           # Global CSS
│   └── utils/            # Constants, city data, helpers
├── scripts/              # Content & image generation scripts
├── dashboard/            # React SEO dashboard app
└── public/               # Static assets
```

## Key Pages

- `/` — Homepage with city cards and search
- `/blog` — All blog posts with filtering
- `/dubai-travel-guide` — Full travel guide (rich layout with weather, budget, transport)
- `/{city}-travel-guide` — Travel guide for any city with blog content
- `/blog/{city}/{slug}` — Individual blog post
