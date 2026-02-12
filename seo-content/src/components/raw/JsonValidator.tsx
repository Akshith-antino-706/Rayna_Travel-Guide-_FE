interface ValidationIssue {
  path: (string | number)[];
  message: string;
}

interface JsonValidatorProps {
  parseError: string | null;
  issues: ValidationIssue[];
}

export default function JsonValidator({ parseError, issues }: JsonValidatorProps) {
  if (parseError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4">
        <h4 className="flex items-center gap-2 text-sm font-semibold text-red-800">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100">
            <svg className="h-3.5 w-3.5 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          JSON Parse Error
        </h4>
        <p className="mt-2 rounded-lg bg-red-100/50 p-2 font-mono text-xs text-red-700">{parseError}</p>
      </div>
    );
  }

  if (issues.length === 0) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
        <h4 className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
            <svg className="h-3.5 w-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          Valid Frontmatter
        </h4>
        <p className="mt-1.5 text-sm text-emerald-700">All required fields pass validation.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
      <h4 className="flex items-center gap-2 text-sm font-semibold text-amber-800">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100">
          <svg className="h-3.5 w-3.5 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        {issues.length} validation {issues.length === 1 ? 'issue' : 'issues'}
      </h4>
      <ul className="mt-3 space-y-2">
        {issues.map((issue, i) => (
          <li key={i} className="flex items-center gap-2 rounded-lg bg-amber-100/50 px-3 py-2 text-sm text-amber-700">
            <code className="rounded bg-amber-200/50 px-1.5 py-0.5 font-mono text-xs font-bold">{issue.path.join('.')}</code>
            <span>{issue.message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
