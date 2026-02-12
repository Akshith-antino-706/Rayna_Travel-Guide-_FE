import { useState, useMemo, useEffect } from 'react';
import JsonEditor from './JsonEditor';
import JsonValidator from './JsonValidator';

interface RawJsonTabProps {
  frontmatter: Record<string, any>;
  onApply: (fm: Record<string, any>) => void;
}

export default function RawJsonTab({ frontmatter, onApply }: RawJsonTabProps) {
  const [jsonText, setJsonText] = useState('');
  const [hasLocalEdits, setHasLocalEdits] = useState(false);

  // Sync from parent when frontmatter changes externally
  useEffect(() => {
    if (!hasLocalEdits) {
      setJsonText(JSON.stringify(frontmatter, null, 2));
    }
  }, [frontmatter, hasLocalEdits]);

  const handleChange = (val: string) => {
    setJsonText(val);
    setHasLocalEdits(true);
  };

  const { parseError, parsed, issues } = useMemo(() => {
    try {
      const p = JSON.parse(jsonText);
      // Basic validation - check required fields
      const iss: { path: (string | number)[]; message: string }[] = [];
      if (!p.title) iss.push({ path: ['title'], message: 'Required' });
      if (!p.description) iss.push({ path: ['description'], message: 'Required' });
      if (!p.category) iss.push({ path: ['category'], message: 'Required' });
      if (!p.city) iss.push({ path: ['city'], message: 'Required' });
      if (!p.country) iss.push({ path: ['country'], message: 'Required' });
      return { parseError: null, parsed: p, issues: iss };
    } catch (e: any) {
      return { parseError: e.message, parsed: null, issues: [] };
    }
  }, [jsonText]);

  const handleApply = () => {
    if (parsed) {
      onApply(parsed);
      setHasLocalEdits(false);
    }
  };

  const handleReset = () => {
    setJsonText(JSON.stringify(frontmatter, null, 2));
    setHasLocalEdits(false);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100">
              <svg className="h-4 w-4 text-violet-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-gray-900">Frontmatter JSON</h3>
          </div>
          <div className="flex gap-2">
            <button
              className="btn-secondary !py-1.5 !px-3 text-xs"
              onClick={handleReset}
              disabled={!hasLocalEdits}
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
              </svg>
              Reset
            </button>
            <button
              className="btn-primary !py-1.5 !px-3 text-xs"
              onClick={handleApply}
              disabled={!!parseError || !hasLocalEdits}
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Apply JSON
            </button>
          </div>
        </div>
        <JsonEditor value={jsonText} onChange={handleChange} />
      </div>
      <div className="space-y-4">
        <JsonValidator parseError={parseError} issues={issues} />
        <div className="rounded-xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white p-4 text-xs text-gray-500">
          <p className="flex items-center gap-1.5 font-semibold text-gray-700">
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            Instructions
          </p>
          <ul className="mt-2.5 list-inside list-disc space-y-1.5 text-gray-400">
            <li>Edit the JSON directly in the editor</li>
            <li>Click "Apply JSON" to sync changes to other tabs</li>
            <li>Use "Save" in the header to persist to disk</li>
            <li>Arrays use inline format: ["item1", "item2"]</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
