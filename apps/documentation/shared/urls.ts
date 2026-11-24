import { type Globals, withoutDefaultValues } from './globals';

export const HOME_PAGE_ID = 'introduction--docs';
export const BOOKMARK_PATH = '/bookmark';

const DOCS_SUFFIX = '--docs';

export type UrlParams = Record<string, string | undefined>;

export interface UrlOptions {
  hash?: string;
  globals?: Partial<Globals>;
  params?: UrlParams;
}

export function bookmarkUrl(pageId: string, options: UrlOptions = {}): string {
  const { params, globals = {} }: UrlOptions = options;
  return buildUrl(
    BOOKMARK_PATH,
    { page: toBookmarkId(pageId), ...params, ...withoutDefaultValues(globals) },
    options.hash,
  );
}

export function pageUrl(title: string, options: UrlOptions = {}): string {
  const { params, globals = {} }: UrlOptions = options;
  return buildUrl(
    titleToPath(title),
    { ...params, ...withoutDefaultValues(globals) },
    options.hash,
  );
}

export function previewUrl(
  id: string,
  viewMode: 'docs' | 'story',
  params: UrlParams = {},
  origin = '',
): string {
  return buildUrl(`${origin}/iframe.html`, { id, viewMode, ...params });
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

function buildUrl(path: string, params: UrlParams, hash = ''): string {
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
