import { GLOBAL_NAMES } from '@shared/globals';
import { BOOKMARK_PATH, decodeUrlComponent, normalizePath } from '@shared/urls';
import type { Catalog } from '../catalog';
import { migrateLegacyUrl } from './legacy';
import type { Route } from './route';

export function resolve(url: URL, catalog: Catalog): Route {
  const migrated = migrateLegacyUrl(url, catalog);
  if (!(migrated instanceof URL)) return migrated;

  const { page: pageId, ...params } = Object.fromEntries(migrated.searchParams);
  const isBookmark = normalizePath(migrated.pathname) === BOOKMARK_PATH;

  const page = isBookmark ? pageId && catalog.byId(pageId) : catalog.byPath(migrated.pathname);
  if (!page) return { type: 'not-found' };

  if (!isBookmark && pageId !== undefined) params.page = pageId;

  const hash = decodeUrlComponent(migrated.hash.slice(1));
  const canonical = catalog.canonicalURL(page, { params, hash });

  return {
    type: 'page',
    page,
    hash,
    params: withoutGlobals(params),
    canonical: new URL(canonical, url).href === url.href ? null : canonical,
  };
}

function withoutGlobals(params: Record<string, string>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(params).filter(([name]) => !(GLOBAL_NAMES as string[]).includes(name)),
  );
}
