interface SeoScoreCardProps {
  score: number;
}

function getScoreColor(score: number) {
  if (score >= 80)
    return {
      ring: 'text-emerald-500',
      glow: 'shadow-glow-green',
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      label: 'Excellent',
      gradient: 'from-emerald-400 to-green-500',
    };
  if (score >= 50)
    return {
      ring: 'text-amber-500',
      glow: '',
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      label: 'Needs Work',
      gradient: 'from-amber-400 to-yellow-500',
    };
  return {
    ring: 'text-red-500',
    glow: '',
    bg: 'bg-red-50',
    text: 'text-red-700',
    label: 'Poor',
    gradient: 'from-red-400 to-rose-500',
  };
}

export default function SeoScoreCard({ score }: SeoScoreCardProps) {
  const color = getScoreColor(score);
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className={`card flex flex-col items-center justify-center ${color.glow}`}>
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">SEO Score</h3>
      <div className="relative h-40 w-40">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="#f3f4f6" strokeWidth="10" />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            className={color.ring}
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold tracking-tight text-gray-900">{score}</span>
          <span className="text-xs font-medium text-gray-400">/100</span>
        </div>
      </div>
      <span
        className={`mt-3 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${color.gradient} px-3.5 py-1 text-xs font-semibold text-white shadow-sm`}
      >
        {score >= 80 && (
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        )}
        {color.label}
      </span>
    </div>
  );
}
