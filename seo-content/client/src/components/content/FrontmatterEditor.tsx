const CATEGORIES = [
  'Essentials', 'Things to Do', 'Experiences & Activities', 'Attractions',
  'Itineraries', 'Food & Dining', 'Shopping', 'Transport',
  'Special Guides', 'Seasonal & Monthly', 'Hotels & Accommodation',
  'Practical Information', 'Visa & Entry', 'Money & Payments',
  'Booking & Experiences', 'Yacht & Cruise', 'Activities Planning',
  'Holiday Packages', 'Trust & Conversion', 'Comparisons',
] as const;

interface FrontmatterEditorProps {
  frontmatter: Record<string, any>;
  onUpdate: (updates: Record<string, any>) => void;
}

export default function FrontmatterEditor({ frontmatter, onUpdate }: FrontmatterEditorProps) {
  const change = (field: string, value: any) => onUpdate({ [field]: value });

  return (
    <div className="card space-y-5">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100">
          <svg className="h-4 w-4 text-orange-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
          </svg>
        </div>
        <h3 className="text-sm font-semibold text-gray-900">Frontmatter Fields</h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Title</label>
          <input className="input" value={frontmatter.title || ''} onChange={(e) => change('title', e.target.value)} />
        </div>
        <div>
          <label className="label">Category</label>
          <select className="input" value={frontmatter.category || ''} onChange={(e) => change('category', e.target.value)}>
            <option value="">Select...</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="label">City</label>
          <input className="input" value={frontmatter.city || ''} onChange={(e) => change('city', e.target.value)} />
        </div>
        <div>
          <label className="label">Country</label>
          <input className="input" value={frontmatter.country || ''} onChange={(e) => change('country', e.target.value)} />
        </div>
        <div>
          <label className="label">Publish Date</label>
          <input
            type="date"
            className="input"
            value={frontmatter.pubDate ? new Date(frontmatter.pubDate).toISOString().split('T')[0] : ''}
            onChange={(e) => change('pubDate', new Date(e.target.value).toISOString())}
          />
        </div>
        <div>
          <label className="label">Reading Time (min)</label>
          <input
            type="number"
            className="input"
            value={frontmatter.readingTime || ''}
            onChange={(e) => change('readingTime', parseInt(e.target.value) || 0)}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Description</label>
          <textarea className="input" rows={3} value={frontmatter.description || ''} onChange={(e) => change('description', e.target.value)} />
        </div>
        <div>
          <label className="label">Hero Image URL</label>
          <input className="input mb-2" value={frontmatter.heroImage || ''} onChange={(e) => change('heroImage', e.target.value)} />
          {frontmatter.heroImage && (
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <img
                src={frontmatter.heroImage}
                alt="Hero"
                className="h-20 w-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-6 rounded-xl bg-gray-50 px-4 py-3">
        <label className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
            checked={frontmatter.featured || false}
            onChange={(e) => change('featured', e.target.checked)}
          />
          Featured
        </label>
        <label className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
            checked={frontmatter.draft || false}
            onChange={(e) => change('draft', e.target.checked)}
          />
          Draft
        </label>
      </div>
    </div>
  );
}
