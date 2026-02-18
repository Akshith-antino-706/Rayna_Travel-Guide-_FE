import { useState, useMemo } from 'react';

interface Section {
  heading: string;
  content: string;
}

interface SectionEditorProps {
  body: string;
  onBodyChange: (body: string) => void;
}

function splitSections(body: string): Section[] {
  const lines = body.split('\n');
  const sections: Section[] = [];
  let currentHeading = '(Introduction)';
  let currentLines: string[] = [];

  for (const line of lines) {
    const match = line.match(/^##\s+(.+)/);
    if (match) {
      sections.push({ heading: currentHeading, content: currentLines.join('\n').trim() });
      currentHeading = match[1];
      currentLines = [];
    } else {
      currentLines.push(line);
    }
  }
  sections.push({ heading: currentHeading, content: currentLines.join('\n').trim() });

  return sections;
}

function joinSections(sections: Section[]): string {
  return sections
    .map((s) => {
      const heading = s.heading === '(Introduction)' ? '' : `## ${s.heading}\n\n`;
      return `${heading}${s.content}`;
    })
    .join('\n\n');
}

export default function SectionEditor({ body, onBodyChange }: SectionEditorProps) {
  const sections = useMemo(() => splitSections(body), [body]);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const updateSection = (index: number, newContent: string) => {
    const updated = sections.map((s, i) => (i === index ? { ...s, content: newContent } : s));
    onBodyChange(joinSections(updated));
  };

  return (
    <div className="space-y-2">
      {sections.map((section, i) => {
        const isOpen = openIndex === i;
        const wordCount = section.content.split(/\s+/).filter(Boolean).length;

        return (
          <div
            key={i}
            className={`overflow-hidden rounded-xl border transition-all ${
              isOpen ? 'border-orange-200 shadow-sm' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <button
              className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium transition-colors ${
                isOpen ? 'bg-gradient-to-r from-orange-50 to-amber-50 text-gray-900' : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              <div className="flex items-center gap-2">
                <span className={`flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold ${
                  isOpen ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {i + 1}
                </span>
                <span>{section.heading}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">{wordCount} words</span>
                <svg
                  className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
            </button>
            {isOpen && (
              <div className="border-t border-gray-200 bg-white p-4">
                <textarea
                  className="input font-mono text-sm !rounded-xl"
                  rows={14}
                  value={section.content}
                  onChange={(e) => updateSection(i, e.target.value)}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
