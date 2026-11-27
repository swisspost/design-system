import {
  BOOKMARK_PATH,
  bookmarkUrl,
  normalizePath,
  HOME_PAGE_ID,
  pageUrl,
  titleToPath,
  toDocsId,
  type UrlOptions,
} from '@shared/urls';
import { PREVIEW_ORIGIN } from '../config';

interface Index {
  entries: Record<string, IndexEntry>;
}

export interface IndexEntry {
  id: string;
  type: 'docs' | 'story';
  title: string;
  tags?: string[];
}

export interface Page {
  id: string;
  title: string;
  path: string;
  segments: string[];
  tags: string[];
}

/**
 * The pages of the Storybook index (`/index.json`), by id and by path, with
 * their readable URLs.
 */
export class Catalog {
  public readonly home: Page | null;
  public readonly pages: Page[];

  private readonly pagesById = new Map<string, Page>();
  private readonly pagesByPath = new Map<string, Page>();

  private readonly storyTitles = new Map<string, string>();

  public static async load(): Promise<Catalog> {
    const response = await fetch(`${PREVIEW_ORIGIN}/index.json`, { cache: 'no-cache' });
    if (!response.ok) throw new Error(`Failed to load the Storybook index (${response.status}).`);

    const index: Index = await response.json();
    return new Catalog(Object.values(index.entries));
  }

  constructor(entries: IndexEntry[]) {
    this.pages = entries
      .filter(entry => entry.type === 'docs')
      .map(entry => ({
        id: entry.id,
        title: entry.title,
        path: titleToPath(entry.title),
        segments: entry.title.split('/').map(segment => segment.trim()),
        tags: entry.tags ?? [],
      }));

    for (const page of this.pages) {
      const owner = this.pagesByPath.get(page.path);

      this.pagesById.set(page.id, page);

      if (owner || page.path === BOOKMARK_PATH) {
        if (import.meta.env.DEV) {
          const reason = owner ? `is also used by "${owner.title}"` : 'is reserved';
          console.warn(
            `The path ${page.path} of "${page.title}" ${reason}, using its bookmark URL.`,
          );
        }
        continue;
      }

      this.pagesByPath.set(page.path, page);
    }

    for (const entry of entries) {
      if (entry.type === 'story') this.storyTitles.set(entry.id, entry.title);
    }

    this.home = this.pagesById.get(HOME_PAGE_ID) ?? null;
    if (this.home) this.pagesByPath.set('/', this.home);
  }

  public byId(id: string): Page | null {
    return this.pagesById.get(toDocsId(id)) ?? null;
  }

  public byPath(path: string): Page | null {
    return this.pagesByPath.get(normalizePath(path)) ?? null;
  }

  public isStory(id: string): boolean {
    return this.storyTitles.has(id);
  }

  /**
   * The readable URL of a page, or its bookmark URL if another page has the
   * same path.
   */
  public canonicalURL(page: Page, options?: UrlOptions): string {
    if (page === this.home) return pageUrl(page.title, options).replace(page.path, '/');
    if (this.pagesByPath.get(page.path) === page) return pageUrl(page.title, options);
    return bookmarkUrl(page.id, options);
  }
}
