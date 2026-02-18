import type { SeoCheck } from '../../lib/types';

interface SeoChecklistProps {
  checks: SeoCheck[];
}

function StatusIcon({ status }: { status: SeoCheck['status'] }) {
  if (status === 'good')
    return (
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
        <svg className="h-3.5 w-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>
    );
  if (status === 'warning')
    return (
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100">
        <svg className="h-3.5 w-3.5 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>
    );
  return (
    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100">
      <svg className="h-3.5 w-3.5 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
  );
}

function getBarColor(status: SeoCheck['status']) {
  if (status === 'good') return 'bg-emerald-500';
  if (status === 'warning') return 'bg-amber-500';
  return 'bg-red-500';
}

export default function SeoChecklist({ checks }: SeoChecklistProps) {
  return (
    <div className="card">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">SEO Checklist</h3>
      <ul className="space-y-3">
        {checks.map((check) => (
          <li key={check.name} className="flex items-start gap-3">
            <StatusIcon status={check.status} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">{check.name}</span>
                <span className="text-xs font-semibold text-gray-500">
                  {check.score}/{check.maxPoints}
                </span>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full transition-all ${getBarColor(check.status)}`}
                    style={{ width: `${(check.score / check.maxPoints) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400 shrink-0">{check.message}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
