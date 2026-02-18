interface OgImageEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function OgImageEditor({ value, onChange }: OgImageEditorProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100">
          <svg className="h-4 w-4 text-rose-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
          </svg>
        </div>
        <label className="text-sm font-semibold text-gray-900">OG Image / Hero Image</label>
      </div>
      <input
        type="text"
        className="input"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://example.com/image.jpg"
      />
      {value ? (
        <div className="mt-3 overflow-hidden rounded-xl border border-gray-200 shadow-sm">
          <img
            src={value}
            alt="OG Preview"
            className="h-44 w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      ) : (
        <div className="mt-3 flex h-44 items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50">
          <div className="text-center text-gray-300">
            <svg className="mx-auto h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
            </svg>
            <p className="mt-1 text-xs">No image set</p>
          </div>
        </div>
      )}
    </div>
  );
}
