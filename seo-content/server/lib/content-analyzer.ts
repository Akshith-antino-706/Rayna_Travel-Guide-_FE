export interface SectionStat {
  name: string;
  items: number;
  status: 'COMPLETE' | 'INCOMPLETE';
}

export interface ContentStats {
  totalSections: number;
  attractionsCount: number;
  keywordsCount: number;
  faqCount: number;
  wordCount: number;
  sections: SectionStat[];
}

interface ParsedSection {
  heading: string;
  level: number;
  content: string;
}

export function extractSections(body: string): ParsedSection[] {
  const lines = body.split('\n');
  const sections: ParsedSection[] = [];
  let current: { heading: string; level: number; lines: string[] } | null = null;

  for (const line of lines) {
    const match = line.match(/^(#{1,2})\s+(.+)$/);
    if (match) {
      if (current) {
        sections.push({
          heading: current.heading,
          level: current.level,
          content: current.lines.join('\n').trim(),
        });
      }
      current = { heading: match[2], level: match[1].length, lines: [] };
    } else if (current) {
      current.lines.push(line);
    }
  }

  if (current) {
    sections.push({
      heading: current.heading,
      level: current.level,
      content: current.lines.join('\n').trim(),
    });
  }

  return sections;
}

export function analyzeContent(body: string, frontmatter: Record<string, any>): ContentStats {
  const allSections = extractSections(body);
  const h2Sections = allSections.filter((s) => s.level === 2);

  const sectionStats: SectionStat[] = h2Sections.map((section) => {
    const h3Count = (section.content.match(/^###\s+/gm) || []).length;
    const listItems = (section.content.match(/^[-*]\s+/gm) || []).length;
    const numberedItems = (section.content.match(/^\d+\.\s+/gm) || []).length;
    const items = h3Count + numberedItems || listItems;

    return {
      name: section.heading,
      items,
      status: items > 0 || section.content.length > 100 ? 'COMPLETE' : 'INCOMPLETE',
    };
  });

  // Count attractions: numbered items or H3 items under attraction-like sections
  let attractionsCount = 0;
  for (const section of h2Sections) {
    const numbered = (section.content.match(/^\d+\.\s+/gm) || []).length;
    const h3Items = (section.content.match(/^###\s+/gm) || []).length;
    attractionsCount += numbered + h3Items;
  }

  // Count FAQs
  const faqSection = allSections.find((s) => /faq|frequently asked/i.test(s.heading));
  const faqCount = faqSection
    ? (faqSection.content.match(/^###?\s+.+\?/gm) || []).length
    : 0;

  return {
    totalSections: h2Sections.length,
    attractionsCount,
    keywordsCount: (frontmatter.keywords || []).length,
    faqCount,
    wordCount: body.split(/\s+/).filter(Boolean).length,
    sections: sectionStats,
  };
}
