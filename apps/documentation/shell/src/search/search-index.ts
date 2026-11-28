import Fuse from 'fuse.js';
import { KEYWORD_TAG_PREFIX } from '@shared/tags';
import type { Catalog, Page } from '../catalog';
import { getRootDefinition } from '../navigation/root';
import { isListed } from '../navigation/tree';

/** A page as the search sees it. */
export interface SearchEntry {
  page: Page;
  href: string;
  /** The last segment of the title, e.g. "Form Input". */
  name: string;
  /** Where the page is, e.g. "Foundations / Layout", empty for top-level pages. */
  context: string;
  /** The words the page is also found by, from its `keyword:` tags. */
  keywords: string[];
  title: string;
}

export interface SearchResult {
  entry: SearchEntry;
  /** The keyword that matched, if the page was found by a keyword rather than its name. */
  keyword: string | null;
}

export class SearchIndex {
  private readonly fuse: Fuse<SearchEntry>;

  /** Outside the dev mode, the search finds the pages of the navigation; in dev mode, all pages. */
  constructor(catalog: Catalog, devMode: boolean) {
    const entries: SearchEntry[] = [];

    for (const page of catalog.pages) {
      if (!devMode && !isListed(page, false)) continue;

      const keywords: string[] = [];
      for (const tag of page.tags) {
        if (!tag.startsWith(KEYWORD_TAG_PREFIX)) continue;

        const keyword = tag.slice(KEYWORD_TAG_PREFIX.length).trim();
        if (keyword) keywords.push(keyword);
      }

      entries.push({
        page,
        href: catalog.canonicalURL(page),
        name: page.segments[page.segments.length - 1],
        context: getContext(page),
        keywords,
        title: page.segments.join(' '),
      });
    }

    this.fuse = new Fuse(entries, {
      keys: [
        { name: 'name', weight: 3 },
        { name: 'keywords', weight: 2 },
        { name: 'title', weight: 1 },
      ],
      threshold: 0.3,
      ignoreLocation: true,
      ignoreDiacritics: true,
      includeMatches: true,
    });
  }

  /** The matching pages, best matches first. */
  public search(query: string): SearchResult[] {
    const text = query.trim();
    if (!text) return [];

    const results: SearchResult[] = [];

    for (const result of this.fuse.search(text)) {
      const matches = result.matches ?? [];
      const isNameMatch = matches.some(match => match.key === 'name');
      const keywordMatch = matches.find(match => match.key === 'keywords');

      const keyword =
        !isNameMatch && keywordMatch?.refIndex !== undefined
          ? result.item.keywords[keywordMatch.refIndex]
          : null;

      results.push({ entry: result.item, keyword });
    }

    return results;
  }
}

function getContext(page: Page): string {
  const [root, ...rest] = page.segments;
  const layout = getRootDefinition(root).layout;

  if (layout === 'home') return 'Home';

  // a page titled with its root only (e.g. "Introduction") has no context
  if (rest.length === 0) return '';

  const folders = rest.slice(0, -1);
  return (layout === 'flat' ? folders : [root, ...folders]).join(' / ');
}
