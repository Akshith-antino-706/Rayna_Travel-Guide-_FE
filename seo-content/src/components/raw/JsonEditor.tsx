interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function JsonEditor({ value, onChange }: JsonEditorProps) {
  const lineCount = value.split('\n').length;

  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-gray-900 shadow-sm">
      <div className="flex items-center gap-2 border-b border-gray-700 bg-gray-800 px-4 py-2">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        <span className="ml-2 text-xs text-gray-500">frontmatter.json</span>
        <span className="ml-auto text-[10px] text-gray-600">{lineCount} lines</span>
      </div>
      <textarea
        className="w-full bg-transparent p-4 font-mono text-sm leading-relaxed text-emerald-400 outline-none resize-none placeholder:text-gray-600"
        style={{ minHeight: '480px' }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
      />
    </div>
  );
}
