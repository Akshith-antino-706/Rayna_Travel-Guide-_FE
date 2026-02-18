import type { ContentSection } from '../../lib/types';

interface ContentSectionsTableProps {
  sections: ContentSection[];
}

export default function ContentSectionsTable({ sections }: ContentSectionsTableProps) {
  if (sections.length === 0) {
    return (
      <div className="card flex flex-col items-center justify-center py-8 text-gray-400">
        <svg className="mb-2 h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
        </svg>
        <p className="text-sm">No sections found.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">Content Sections</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
              <th className="pb-3 pr-4">Section</th>
              <th className="pb-3 pr-4 text-center">Items</th>
              <th className="pb-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {sections.map((section, i) => (
              <tr key={i} className="group transition-colors hover:bg-orange-50/40">
                <td className="py-3 pr-4">
                  <span className="font-medium text-gray-900">{section.name}</span>
                </td>
                <td className="py-3 pr-4 text-center">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold text-gray-600">
                    {section.items}
                  </span>
                </td>
                <td className="py-3 text-center">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      section.status === 'COMPLETE'
                        ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-500/20'
                        : 'bg-amber-50 text-amber-700 ring-1 ring-amber-500/20'
                    }`}
                  >
                    {section.status === 'COMPLETE' ? (
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    ) : (
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {section.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
