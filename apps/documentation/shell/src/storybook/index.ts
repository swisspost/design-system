import { PREVIEW_ORIGIN } from '../config';

/**
 * The subset of a Storybook `index.json` entry (v5) the shell relies on.
 */
export interface IndexEntry {
  id: string;
  type: 'docs' | 'story';
  title: string;
  name: string;
  importPath: string;
  tags?: string[];
}

interface StoryIndex {
  v: number;
  entries: Record<string, IndexEntry>;
}

/**
 * A docs page as the shell sees it: one per component or page, never individual stories.
 */
export interface DocsPage {
  id: string;
  title: string;
  /** The title split into its segments, e.g. `['Components', 'Button']` */
  segments: string[];
  /** The readable path of the page, e.g. `/components/button` */
  path: string;
  tags: string[];
}

export const HOME_PAGE_ID = 'introduction--docs';

export async function fetchIndex(): Promise<StoryIndex> {
  const response = await fetch(`${PREVIEW_ORIGIN}/index.json`, { cache: 'no-cache' });
  if (!response.ok) throw new Error(`Failed to load the Storybook index (${response.status}).`);
  return response.json() as Promise<StoryIndex>;
}

/**
 * Builds the docs pages from the index, keeping the index order (set by `storySort`).
 * Paths are derived from the title, sanitized like Storybook's ids.
 * Pages whose path would collide with another page fall back to `/docs/<id>`.
 */
export function getDocsPages(index: StoryIndex): DocsPage[] {
  const pages = Object.values(index.entries)
    .filter(entry => entry.type === 'docs')
    .map(entry => {
      const segments = entry.title.split('/').map(segment => segment.trim());
      const path =
        entry.id === HOME_PAGE_ID
          ? '/'
          : '/' + segments.map(segment => sanitize(segment)).join('/');

      return { id: entry.id, title: entry.title, segments, path, tags: entry.tags ?? [] };
    });

  const pathCount = new Map<string, number>();
  pages.forEach(page => pathCount.set(page.path, (pathCount.get(page.path) ?? 0) + 1));
  pages.forEach(page => {
    if ((pathCount.get(page.path) ?? 0) > 1) page.path = `/docs/${page.id}`;
  });

  return pages;
}

/**
 * Same rules as `sanitize` from `storybook/internal/csf`, which Storybook uses for ids.
 * Copied because importing `storybook/internal/csf` pulls `storybook/test` into the shell bundle (~1 MB).
 */
function sanitize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[ ’–—―′¿'`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}
