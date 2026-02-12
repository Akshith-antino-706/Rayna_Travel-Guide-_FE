interface MetaFieldEditorProps {
  label: string;
  field: string;
  value: string;
  onChange: (field: string, value: string) => void;
  minChars: number;
  maxChars: number;
  goodMin: number;
  goodMax: number;
  multiline?: boolean;
}

export default function MetaFieldEditor({
  label,
  field,
  value,
  onChange,
  minChars,
  maxChars,
  goodMin,
  goodMax,
  multiline,
}: MetaFieldEditorProps) {
  const len = (value || '').length;
  const pct = Math.min(100, (len / maxChars) * 100);

  let barColor = 'bg-red-500';
  let statusColor = 'text-red-600';
  let statusText = `${len} chars (aim for ${goodMin}-${goodMax})`;
  if (len >= goodMin && len <= goodMax) {
    barColor = 'bg-emerald-500';
    statusColor = 'text-emerald-600';
    statusText = `${len} chars - Perfect!`;
  } else if (len >= minChars && len <= maxChars) {
    barColor = 'bg-amber-500';
    statusColor = 'text-amber-600';
    statusText = `${len} chars (aim for ${goodMin}-${goodMax})`;
  }

  const InputTag = multiline ? 'textarea' : 'input';

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-sm font-semibold text-gray-700">{label}</label>
        <span className={`text-xs font-medium ${statusColor}`}>{statusText}</span>
      </div>
      <InputTag
        className="input"
        value={value || ''}
        onChange={(e) => onChange(field, e.target.value)}
        rows={multiline ? 3 : undefined}
      />
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className={`h-full rounded-full transition-all duration-300 ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-gray-300">
        <span>0</span>
        <span className="text-gray-400">{goodMin}-{goodMax} ideal</span>
        <span>{maxChars}</span>
      </div>
    </div>
  );
}
