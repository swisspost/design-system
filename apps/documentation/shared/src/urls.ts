import type { Globals } from './globals';

export const HOME_PAGE_ID = 'introduction--docs';
export const BOOKMARK_PATH = '/bookmark';

const DOCS_SUFFIX = '--docs';

export type UrlParams = Record<string, string | null>;

export interface UrlOptions {
  hash?: string;
  /** Written into the URL as they are, see `filterGlobals` to leave some out. */
  globals?: Partial<Globals>;
  params?: UrlParams;
}

export function bookmarkUrl(pageId: string, options?: UrlOptions): string {
  return serializeUrl(
    BOOKMARK_PATH,
    { page: toBookmarkId(pageId), ...options?.params, ...options?.globals },
    options?.hash,
  );
}

export function pageUrl(title: string, options?: UrlOptions): string {
  return serializeUrl(
    titleToPath(title),
    { ...options?.params, ...options?.globals },
    options?.hash,
  );
}

export function previewUrl(
  id: string,
  viewMode: 'docs' | 'story',
  params: UrlParams = {},
  origin = '',
): string {
  return serializeUrl(`${origin}/iframe.html`, { ...params, id, viewMode });
}

export function titleToPath(title: string): string {
  return '/' + title.split('/').map(slugify).join('/');
}

export function toDocsId(id: string): string {
  return id.endsWith(DOCS_SUFFIX) ? id : `${id}${DOCS_SUFFIX}`;
}

function toBookmarkId(id: string): string {
  return id.endsWith(DOCS_SUFFIX) ? id.slice(0, -DOCS_SUFFIX.length) : id;
}

function serializeUrl(path: string, params: UrlParams, hash = ''): string {
  const search = new URLSearchParams();

  for (const [name, value] of Object.entries(params)) {
    if (value) search.set(name, value);
  }

  // `:`, `;` and `!` are valid in a query and keep Storybook's `key:value;flag:!true` syntax readable
  const query = search.toString().replace(/%(3A|3B|21)/gi, decodeURIComponent);
  const fragment = hash.replace(/^#/, '');

  let result = path;
  if (query) result += `?${query}`;
  if (fragment) result += `#${fragment}`;

  return result;
}

export function decodeUrlComponent(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function normalizePath(path: string): string {
  return decodeUrlComponent(path).replace(/\/+$/, '').toLowerCase() || '/';
}

/**
 * Slugifies a value following the same rules as Storybook.
 * @see https://github.com/storybookjs/storybook/blob/v9.1.21/code/core/src/csf/index.ts
 */
function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[ ’–—―′¿'`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/]/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}
