import type { City, HealthStatus } from '../lib/types';

interface HeaderProps {
  health: HealthStatus | null;
  cities: City[];
  selectedCity: string | null;
  onCityChange: (city: string) => void;
  onExport: () => void;
  onSave: () => void;
  saving: boolean;
  hasUnsavedChanges: boolean;
}

export default function Header({
  health,
  cities,
  selectedCity,
  onCityChange,
  onExport,
  onSave,
  saving,
  hasUnsavedChanges,
}: HeaderProps) {
  const connected = health?.status === 'connected';

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200/60 bg-white/80 backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/[0.03] via-transparent to-amber-500/[0.03]" />
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-md shadow-orange-500/20">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
            </div>
            <h1 className="text-lg font-bold tracking-tight">
              <span className="text-gradient">TravelScope</span>
              <span className="ml-1.5 font-normal text-gray-400">Dashboard</span>
            </h1>
          </div>

          <div className="h-6 w-px bg-gray-200" />

          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
              connected
                ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-500/20'
                : 'bg-red-50 text-red-700 ring-1 ring-red-500/20'
            }`}
          >
            <span className="relative flex h-2 w-2">
              {connected && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              )}
              <span className={`relative inline-flex h-2 w-2 rounded-full ${connected ? 'bg-emerald-500' : 'bg-red-500'}`} />
            </span>
            {connected ? 'Connected' : 'Disconnected'}
          </span>

          {health && (
            <span className="hidden text-xs text-gray-400 sm:inline">
              {health.citiesCount} cities &middot; {health.articlesCount} articles
            </span>
          )}
        </div>

        <div className="flex items-center gap-2.5">
          <select
            className="input max-w-[200px] !py-2"
            value={selectedCity || ''}
            onChange={(e) => onCityChange(e.target.value)}
          >
            <option value="">Select City...</option>
            {cities.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name} ({c.articleCount})
              </option>
            ))}
          </select>

          <button className="btn-secondary" onClick={onExport} disabled={!selectedCity}>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            <span className="hidden sm:inline">Export</span>
          </button>

          <button className="btn-primary" onClick={onSave} disabled={!hasUnsavedChanges || saving}>
            {saving ? (
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859" />
              </svg>
            )}
            Save
          </button>
        </div>
      </div>
    </header>
  );
}
