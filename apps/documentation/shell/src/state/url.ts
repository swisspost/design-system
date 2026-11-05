import type { DocsPage } from '../storybook';
import { PREVIEW_ORIGIN } from '../config';
import { DocsGlobals, GLOBAL_NAMES, stringifyGlobalsParam } from '../storybook/docs-globals';
import { type Catalog, decodePath } from './catalog';

export type Resolution =
  /** Show a docs page. `canonical` is set when the URL must be rewritten (old or alias URL). */
  | { type: 'page'; page: DocsPage; hash: string; canonical?: string }
  /** Leave the shell, e.g. for an old story URL that now opens the bare preview. */
  | { type: 'redirect'; url: string }
  | { type: 'not-found' };

/** Query params of the old manager URLs that are consumed by the URL compat layer. */
const MANAGER_PARAMS = ['path', 'full', 'nav', 'panel', 'addons', 'shortcuts', 'singleStory'];

/** Query params of the preview URL that say which entry it renders; a page must not change them. */
const PREVIEW_PARAMS = ['id', 'viewMode'];

/** Query params that are forwarded to the bare preview when an old story URL is opened. */
const STORY_PARAMS = ['args'];

/** Query params the shell itself reads: the globals (also in the old `globals` form) and dev mode. */
const SHELL_PARAMS = new Set<string>([
  ...GLOBAL_NAMES,
  'globals',
  'devModeEnabled',
  ...MANAGER_PARAMS,
  ...PREVIEW_PARAMS,
]);

/**
 * Maps a URL to what the shell shows.
 *
 * New URLs: `/components/button#heading`, `/docs/<id>` (permanent alias), `/` (home).
 * Old manager URLs: `/?path=/docs/<id>`, `/?path=/story/<id>`.
 * `globals` are the shell's current globals; old story URLs open the bare preview with them.
 */
export function resolveUrl(url: URL, catalog: Catalog, globals: DocsGlobals): Resolution {
  const legacyPath = url.searchParams.get('path');
  if (legacyPath !== null) return resolveLegacyPath(legacyPath, url, catalog, globals);

  const alias = /^\/docs\/([^/]+)\/?$/.exec(url.pathname);
  if (alias) {
    const page = catalog.getById(decodeURIComponent(alias[1]));
    return page ? pageResolution(page, url, true) : { type: 'not-found' };
  }

  const page = url.pathname === '/' ? catalog.home : catalog.getByPath(url.pathname);
  if (!page) return { type: 'not-found' };

  return pageResolution(page, url, page.path !== decodePath(url.pathname));
}

/**
 * The query params of a shell URL that belong to the page content, e.g. `story` and `args` of a deep
 * link or `spds-iconset` of the icon search. They are forwarded to the preview.
 */
export function getPageParams(search: URLSearchParams): Record<string, string> {
  const params: Record<string, string> = {};
  search.forEach((value, name) => {
    if (!SHELL_PARAMS.has(name)) params[name] = value;
  });
  return params;
}

/**
 * Builds the shell URL of a page, keeping the given query params and hash.
 */
export function buildPageUrl(page: DocsPage, search: URLSearchParams, hash = ''): string {
  const query = search.toString();
  return `${page.path}${query ? `?${query}` : ''}${hash}`;
}

/**
 * URL of the bare preview, used for the embedded iframe and for fullscreen stories.
 */
export function buildPreviewUrl(
  id: string,
  viewMode: 'docs' | 'story',
  params?: URLSearchParams,
): string {
  const search = new URLSearchParams({ id, viewMode });
  params?.forEach((value, key) => search.set(key, value));

  // Storybook's arg and global syntax (`key:value;flag:!true`) must not be URL encoded
  return `${PREVIEW_ORIGIN}/iframe.html?${search.toString().replace(/%3A/gi, ':').replace(/%3B/gi, ';')}`;
}

function pageResolution(page: DocsPage, url: URL, rewrite: boolean): Resolution {
  const search = new URLSearchParams(url.search);
  MANAGER_PARAMS.forEach(param => search.delete(param));

  const canonical = buildPageUrl(page, search, url.hash);
  const current = `${decodePath(url.pathname)}${url.search}${url.hash}`;

  return {
    type: 'page',
    page,
    hash: url.hash,
    canonical: rewrite || canonical !== current ? canonical : undefined,
  };
}

function resolveLegacyPath(
  path: string,
  url: URL,
  catalog: Catalog,
  globals: DocsGlobals,
): Resolution {
  const [, viewMode, id] = /^\/(docs|story)\/([^/?#]+)/.exec(path) ?? [];
  if (!id) {
    const home = catalog.home;
    return home && (path === '/' || path === '') ? pageResolution(home, url, true) : notFound();
  }

  if (viewMode === 'story' && catalog.isStory(id)) {
    const params = new URLSearchParams();
    STORY_PARAMS.forEach(param => {
      const value = url.searchParams.get(param);
      if (value) params.set(param, value);
    });
    const globalsParam = stringifyGlobalsParam(globals);
    if (globalsParam) params.set('globals', globalsParam);
    return { type: 'redirect', url: buildPreviewUrl(id, 'story', params) };
  }

  const page = catalog.getById(id);
  if (!page) return notFound();

  // old deep links ("Copy deep link") end with the story id; the story's element is `story--<id>`
  const storyId = decodeURIComponent(url.hash.slice(1));
  if (storyId && catalog.isStory(storyId)) {
    const withStoryHash = new URL(url);
    withStoryHash.hash = `story--${storyId}`;
    return pageResolution(page, withStoryHash, true);
  }

  return pageResolution(page, url, true);
}

function notFound(): Resolution {
  return { type: 'not-found' };
}
