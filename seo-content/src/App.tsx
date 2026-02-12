import { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import TabBar from './components/TabBar';
import ArticleSelector from './components/ArticleSelector';
import Toast from './components/Toast';
import OverviewTab from './components/overview/OverviewTab';
import SeoSettingsTab from './components/seo/SeoSettingsTab';
import ContentEditorTab from './components/content/ContentEditorTab';
import RawJsonTab from './components/raw/RawJsonTab';
import { useHealth, useCities, useArticles, useArticleDetail } from './hooks/useArticles';
import { useSaveArticle } from './hooks/useSaveArticle';
import { useExport } from './hooks/useExport';
import type { TabId } from './lib/types';

export default function App() {
  const { health } = useHealth();
  const { cities } = useCities();
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const { articles, loading: articlesLoading } = useArticles(selectedCity);
  const { article, loading: articleLoading, reload, setArticle } = useArticleDetail(selectedCity, selectedSlug);
  const { save, saving, toast, dismissToast } = useSaveArticle();
  const { exportCity } = useExport();

  // Reset slug when city changes
  useEffect(() => {
    setSelectedSlug(null);
    setHasUnsavedChanges(false);
  }, [selectedCity]);

  const handleCityChange = useCallback((city: string) => {
    setSelectedCity(city || null);
  }, []);

  const handleSlugChange = useCallback((slug: string) => {
    setSelectedSlug(slug || null);
    setHasUnsavedChanges(false);
  }, []);

  const handleSave = useCallback(async () => {
    if (!selectedCity || !selectedSlug || !article) return;
    const result = await save(selectedCity, selectedSlug, article.frontmatter, article.body);
    if (result) {
      setHasUnsavedChanges(false);
      reload();
    }
  }, [selectedCity, selectedSlug, article, save, reload]);

  const handleExport = useCallback(() => {
    if (selectedCity) exportCity(selectedCity);
  }, [selectedCity, exportCity]);

  // Update frontmatter in local state
  const updateFrontmatter = useCallback((updates: Record<string, any>) => {
    if (!article) return;
    setArticle({
      ...article,
      frontmatter: { ...article.frontmatter, ...updates },
    });
    setHasUnsavedChanges(true);
  }, [article, setArticle]);

  // Update body in local state
  const updateBody = useCallback((newBody: string) => {
    if (!article) return;
    setArticle({ ...article, body: newBody });
    setHasUnsavedChanges(true);
  }, [article, setArticle]);

  // Apply full frontmatter from raw JSON
  const applyFrontmatter = useCallback((fm: Record<string, any>) => {
    if (!article) return;
    setArticle({ ...article, frontmatter: fm });
    setHasUnsavedChanges(true);
  }, [article, setArticle]);

  // Keyboard shortcut: Ctrl+S
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (hasUnsavedChanges && !saving) handleSave();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [hasUnsavedChanges, saving, handleSave]);

  const noArticle = !article || articleLoading;

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        health={health}
        cities={cities}
        selectedCity={selectedCity}
        onCityChange={handleCityChange}
        onExport={handleExport}
        onSave={handleSave}
        saving={saving}
        hasUnsavedChanges={hasUnsavedChanges}
      />
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} disabled={noArticle} />

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-6">
        {!selectedCity ? (
          <div className="flex flex-col items-center justify-center py-24 text-center animate-fadeIn">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100">
              <svg className="h-10 w-10 text-orange-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Select a city to get started</h2>
            <p className="mt-2 text-sm text-gray-400 max-w-sm">
              Choose a city from the dropdown above to view and edit your travel blog content
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <ArticleSelector
                articles={articles}
                selectedSlug={selectedSlug}
                onSelect={handleSlugChange}
                loading={articlesLoading}
              />
            </div>

            {articleLoading ? (
              <div className="flex flex-col items-center justify-center py-24 animate-fadeIn">
                <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-gray-200 border-t-orange-500" />
                <p className="mt-4 text-sm text-gray-400">Loading article...</p>
              </div>
            ) : !article ? (
              <div className="flex flex-col items-center justify-center py-24 text-center animate-fadeIn">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50">
                  <svg className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Select an article</h2>
                <p className="mt-2 text-sm text-gray-400 max-w-sm">
                  Choose an article from the dropdown above to start editing
                </p>
              </div>
            ) : (
              <div className="animate-fadeIn">
                {hasUnsavedChanges && (
                  <div className="mb-5 flex items-center gap-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 px-5 py-3 text-sm text-amber-800 shadow-sm">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-100">
                      <svg className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>
                    </div>
                    <span>
                      Unsaved changes &mdash; press{' '}
                      <kbd className="rounded-md border border-amber-300 bg-amber-100 px-1.5 py-0.5 font-mono text-xs font-semibold">
                        {navigator.platform.includes('Mac') ? 'Cmd' : 'Ctrl'}+S
                      </kbd>{' '}
                      or click Save
                    </span>
                  </div>
                )}

                {activeTab === 'overview' && <OverviewTab article={article} />}
                {activeTab === 'seo' && (
                  <SeoSettingsTab
                    frontmatter={article.frontmatter}
                    onUpdate={updateFrontmatter}
                  />
                )}
                {activeTab === 'content' && (
                  <ContentEditorTab
                    article={article}
                    onUpdateFrontmatter={updateFrontmatter}
                    onUpdateBody={updateBody}
                  />
                )}
                {activeTab === 'raw' && (
                  <RawJsonTab
                    frontmatter={article.frontmatter}
                    onApply={applyFrontmatter}
                  />
                )}
              </div>
            )}
          </>
        )}
      </main>

      {toast && <Toast type={toast.type} message={toast.message} onDismiss={dismissToast} />}
    </div>
  );
}
