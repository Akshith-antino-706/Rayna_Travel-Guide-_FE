import MetaFieldEditor from './MetaFieldEditor';
import KeywordsEditor from './KeywordsEditor';
import OgImageEditor from './OgImageEditor';

interface SeoSettingsTabProps {
  frontmatter: Record<string, any>;
  onUpdate: (updates: Record<string, any>) => void;
}

export default function SeoSettingsTab({ frontmatter, onUpdate }: SeoSettingsTabProps) {
  const handleFieldChange = (field: string, value: string) => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <div className="card space-y-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
              <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-gray-900">Meta Information</h3>
          </div>
          <MetaFieldEditor
            label="Meta Title"
            field="title"
            value={frontmatter.title || ''}
            onChange={handleFieldChange}
            minChars={20}
            maxChars={70}
            goodMin={30}
            goodMax={60}
          />
          <MetaFieldEditor
            label="Meta Description"
            field="description"
            value={frontmatter.description || ''}
            onChange={handleFieldChange}
            minChars={80}
            maxChars={200}
            goodMin={120}
            goodMax={160}
            multiline
          />
        </div>

        <div className="card space-y-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
              <svg className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-gray-900">SEO Overrides</h3>
          </div>
          <MetaFieldEditor
            label="SEO Title"
            field="seoTitle"
            value={frontmatter.seoTitle || ''}
            onChange={handleFieldChange}
            minChars={20}
            maxChars={70}
            goodMin={30}
            goodMax={60}
          />
          <MetaFieldEditor
            label="SEO Description"
            field="seoDescription"
            value={frontmatter.seoDescription || ''}
            onChange={handleFieldChange}
            minChars={80}
            maxChars={200}
            goodMin={120}
            goodMax={160}
            multiline
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="card">
          <KeywordsEditor
            keywords={frontmatter.keywords || []}
            onChange={(kw) => onUpdate({ keywords: kw })}
          />
        </div>

        <div className="card">
          <OgImageEditor
            value={frontmatter.heroImage || ''}
            onChange={(v) => onUpdate({ heroImage: v })}
          />
        </div>
      </div>
    </div>
  );
}
