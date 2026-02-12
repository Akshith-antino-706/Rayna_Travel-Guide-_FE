import { useState } from 'react';
import type { ArticleDetail } from '../../lib/types';
import FrontmatterEditor from './FrontmatterEditor';
import SectionEditor from './SectionEditor';
import MarkdownPreview from './MarkdownPreview';

interface ContentEditorTabProps {
  article: ArticleDetail;
  onUpdateFrontmatter: (updates: Record<string, any>) => void;
  onUpdateBody: (body: string) => void;
}

export default function ContentEditorTab({ article, onUpdateFrontmatter, onUpdateBody }: ContentEditorTabProps) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="space-y-6">
      <FrontmatterEditor frontmatter={article.frontmatter} onUpdate={onUpdateFrontmatter} />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100">
            <svg className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-gray-900">Body Content</h3>
        </div>
        <button
          className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
            showPreview
              ? 'bg-orange-100 text-orange-700 ring-1 ring-orange-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => setShowPreview(!showPreview)}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </button>
      </div>

      <div className={showPreview ? 'grid gap-6 lg:grid-cols-2' : ''}>
        <SectionEditor body={article.body} onBodyChange={onUpdateBody} />
        {showPreview && <MarkdownPreview body={article.body} />}
      </div>
    </div>
  );
}
