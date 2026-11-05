import { DocsPage, HOME_PAGE_ID, IndexEntry, getDocsPages, fetchIndex } from '../storybook';

/**
 * Lookups over the docs pages of the Storybook index.
 */
export class Catalog {
  readonly pages: DocsPage[];
  private readonly byId = new Map<string, DocsPage>();
  private readonly byPath = new Map<string, DocsPage>();
  private readonly byTitle = new Map<string, DocsPage>();
  private readonly storyTitles = new Map<string, string>();

  static async load(): Promise<Catalog> {
    const index = await fetchIndex();
    return new Catalog(getDocsPages(index), Object.values(index.entries));
  }

  constructor(pages: DocsPage[], entries: IndexEntry[]) {
    this.pages = pages;
    pages.forEach(page => {
      this.byId.set(page.id, page);
      this.byPath.set(page.path, page);
      this.byTitle.set(page.title, page);
    });
    entries.forEach(entry => this.storyTitles.set(entry.id, entry.title));
  }

  get home(): DocsPage | undefined {
    return this.byId.get(HOME_PAGE_ID);
  }

  /**
   * Finds a docs page by its id. Story ids (`<component>--<story>`) resolve to the docs page of their component.
   */
  getById(id: string): DocsPage | undefined {
    const title = this.storyTitles.get(id);
    return this.byId.get(id) ?? (title ? this.byTitle.get(title) : undefined);
  }

  /**
   * Finds a docs page by its path, as written (`/foundations/🔀-table`) or as in `URL.pathname`
   * (`/foundations/%F0%9F%94%80-table`).
   */
  getByPath(path: string): DocsPage | undefined {
    const decoded = decodePath(path);
    const normalized = decoded.length > 1 ? decoded.replace(/\/+$/, '').toLowerCase() : decoded;
    return this.byPath.get(normalized);
  }

  getByTitle(title: string): DocsPage | undefined {
    return this.byTitle.get(title);
  }

  /** Whether the id is a story (not a docs page) in the index. */
  isStory(id: string): boolean {
    return this.storyTitles.has(id) && !this.byId.has(id);
  }
}

/**
 * Decodes the percent-encoded characters of a URL path, e.g. emoji and umlauts in page titles.
 */
export function decodePath(path: string): string {
  try {
    return decodeURIComponent(path);
  } catch {
    return path;
  }
}
