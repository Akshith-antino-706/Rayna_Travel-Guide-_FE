import { useState } from 'react';

interface KeywordsEditorProps {
  keywords: string[];
  onChange: (keywords: string[]) => void;
}

export default function KeywordsEditor({ keywords, onChange }: KeywordsEditorProps) {
  const [input, setInput] = useState('');

  const addKeyword = () => {
    const kw = input.trim();
    if (kw && !keywords.includes(kw)) {
      onChange([...keywords, kw]);
    }
    setInput('');
  };

  const removeKeyword = (kw: string) => {
    onChange(keywords.filter((k) => k !== kw));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addKeyword();
    }
  };

  const countColor =
    keywords.length >= 5
      ? 'bg-emerald-100 text-emerald-700'
      : keywords.length >= 3
        ? 'bg-amber-100 text-amber-700'
        : 'bg-red-100 text-red-700';

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100">
            <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
            </svg>
          </div>
          <label className="text-sm font-semibold text-gray-900">Keywords</label>
        </div>
        <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${countColor}`}>
          {keywords.length}
        </span>
      </div>
      <div className="flex flex-wrap gap-2 rounded-xl border border-gray-200 bg-gray-50/50 p-3 transition-colors focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-500/20">
        {keywords.map((kw) => (
          <span
            key={kw}
            className="group inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-orange-50 to-amber-50 px-3 py-1.5 text-sm font-medium text-orange-700 ring-1 ring-orange-200/60 transition-all hover:shadow-sm"
          >
            {kw}
            <button
              onClick={() => removeKeyword(kw)}
              className="flex h-4 w-4 items-center justify-center rounded-full text-orange-400 transition-colors hover:bg-orange-200 hover:text-orange-700"
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
        ))}
        <input
          type="text"
          className="flex-1 border-none bg-transparent text-sm outline-none placeholder:text-gray-400 min-w-[140px] py-1"
          placeholder="Type a keyword and press Enter..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addKeyword}
        />
      </div>
      <p className="mt-1.5 text-xs text-gray-400">
        {keywords.length >= 5 ? 'Great keyword coverage!' : `Add ${5 - keywords.length} more for optimal SEO`}
      </p>
    </div>
  );
}
