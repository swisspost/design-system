import { filterGlobals, normalizeGlobals, parseGlobals, stringifyGlobals } from '@shared/globals';
import { BOOKMARK_PATH, decodeUrlComponent, normalizePath, previewUrl } from '@shared/urls';
import { PREVIEW_ORIGIN } from '../config';
import type { Catalog } from '../catalog';
import type { NotFoundRoute, RedirectRoute } from './route';

const MANAGER_PATHS = new Set(['/', '/index.html']);
const MANAGER_PARAMS = ['path', 'full', 'nav', 'panel', 'addons', 'shortcuts', 'singleStory'];

/**
 * Rewrites URLs of the former Storybook manager UI (`/?path=/docs/<id>`, `?globals=…`, `?devModeEnabled=…`) to current URLs.
 * Old story URLs (`/?path=/story/<id>`) leave the shell and open the bare story.
 */
export function migrateLegacyUrl(url: URL, catalog: Catalog): URL | RedirectRoute | NotFoundRoute {
  const migrated = new URL(url);
  migrateGlobalsParam(migrated);
  migrateDevModeParam(migrated);

  const path = migrated.searchParams.get('path');
  if (path === null || !MANAGER_PATHS.has(normalizePath(migrated.pathname))) return migrated;

  MANAGER_PARAMS.forEach(param => migrated.searchParams.delete(param));

  const [, viewMode, id] = /^\/(docs|story)\/([^/?#]+)/.exec(path) ?? [];

  if (!id) {
    if (path !== '' && path !== '/') return { type: 'not-found' };

    migrated.pathname = '/';
    return migrated;
  }

  if (viewMode === 'story' && catalog.isStory(id)) {
    return { type: 'redirect', href: migrateStoryUrl(id, migrated.searchParams) };
  }

  // old "Copy deep link" URLs end with the story id, the story's anchor is `story--<id>`
  const storyId = decodeUrlComponent(migrated.hash.slice(1));
  if (catalog.isStory(storyId)) migrated.hash = `story--${storyId}`;

  migrated.pathname = BOOKMARK_PATH;
  migrated.searchParams.set('page', id);
  return migrated;
}

function migrateGlobalsParam(url: URL) {
  const value = url.searchParams.get('globals');
  if (value === null) return;

  url.searchParams.delete('globals');
  const globals = filterGlobals(parseGlobals(value), { defaultValues: false });
  for (const [name, global] of Object.entries(globals)) {
    if (!url.searchParams.has(name)) url.searchParams.set(name, global);
  }
}

function migrateDevModeParam(url: URL) {
  const value = url.searchParams.get('devModeEnabled');
  if (value === null) return;

  url.searchParams.delete('devModeEnabled');

  if (!url.searchParams.has('mode')) {
    url.searchParams.set('mode', value === 'true' ? 'dev' : 'default');
  }
}

function migrateStoryUrl(storyId: string, search: URLSearchParams): string {
  const globals = normalizeGlobals(Object.fromEntries(search));
  const params = {
    args: search.get('args'),
    globals: stringifyGlobals(globals),
  };

  return previewUrl(storyId, 'story', params, PREVIEW_ORIGIN);
}
