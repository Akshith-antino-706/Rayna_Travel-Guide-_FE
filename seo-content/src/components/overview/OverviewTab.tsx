import type { ArticleDetail } from '../../lib/types';
import SeoScoreCard from './SeoScoreCard';
import StatsCards from './StatsCards';
import ContentSectionsTable from './ContentSectionsTable';
import SeoChecklist from './SeoChecklist';

interface OverviewTabProps {
  article: ArticleDetail;
}

export default function OverviewTab({ article }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <SeoScoreCard score={article.seo.score} />
        <StatsCards stats={article.stats} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <ContentSectionsTable sections={article.stats.sections} />
        <SeoChecklist checks={article.seo.checks} />
      </div>
    </div>
  );
}
