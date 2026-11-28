import {
  GLOBAL_NAMES,
  type Globals,
  normalizeGlobals,
  SHARABLE_GLOBAL_NAMES,
} from '@shared/globals';
import { BOOKMARK_PATH, decodeUrlComponent, normalizePath } from '@shared/urls';
import type { Catalog } from '../catalog/catalog';
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
    globals: readGlobals(params),
    canonical: new URL(canonical, url).href === url.href ? null : canonical,
  };
}

/**
 * A shared URL holds all its globals, the missing ones are the defaults.
 * Hidden globals are never shared, a missing one keeps its current value.
 */
function readGlobals(params: Record<string, string>): Partial<Globals> | null {
  const isShared = SHARABLE_GLOBAL_NAMES.some(name => Object.hasOwn(params, name));
  const names = GLOBAL_NAMES.filter(
    name => Object.hasOwn(params, name) || (isShared && SHARABLE_GLOBAL_NAMES.includes(name)),
  );
  if (names.length === 0) return null;

  const globals = normalizeGlobals(params);
  return Object.fromEntries(names.map(name => [name, globals[name]]));
}

function withoutGlobals(params: Record<string, string>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(params).filter(([name]) => !(GLOBAL_NAMES as string[]).includes(name)),
  );
}
