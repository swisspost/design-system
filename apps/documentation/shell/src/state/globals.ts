import {
  DEFAULT_GLOBALS,
  DOCS_GLOBALS,
  DocsGlobals,
  GLOBAL_NAMES,
  getGlobalsQueryParams,
  normalizeGlobals,
  parseGlobalsParam,
} from '../storybook/docs-globals';

/** Where the last used globals are kept; they apply when a URL has none. */
const STORAGE_KEY = 'spds-docs:globals';

/** Keys of the old styles-switcher addon (`swisspost-documentation-theme`, …), with capitalized labels as values. */
const LEGACY_STORAGE_PREFIX = 'swisspost-documentation-';

/**
 * Reads the globals from the URL: `?theme=cargo&appearance=compact&scheme=dark&palette=accent`, defaults omitted.
 * The old Storybook form `?globals=theme:cargo;scheme:dark` is accepted too.
 * Returns `null` when the URL has no globals at all, so the caller can keep the current ones.
 */
export function readGlobalsFromUrl(url: URL): DocsGlobals | null {
  const params = url.searchParams;
  const legacy = params.get('globals');
  const hasParams = GLOBAL_NAMES.some(name => params.has(name));
  if (!hasParams && legacy === null) return null;

  const fromParams = Object.fromEntries(
    GLOBAL_NAMES.filter(name => params.has(name)).map(name => [name, params.get(name)]),
  );
  return normalizeGlobals({ ...parseGlobalsParam(legacy ?? ''), ...fromParams });
}

/**
 * Returns a copy of the URL whose query holds exactly the given globals (non-default values only).
 */
export function writeGlobalsToUrl(url: URL, globals: DocsGlobals): URL {
  const result = new URL(url);
  result.searchParams.delete('globals');
  GLOBAL_NAMES.forEach(name => result.searchParams.delete(name));
  Object.entries(getGlobalsQueryParams(globals)).forEach(([name, value]) =>
    result.searchParams.set(name, value),
  );
  return result;
}

export function loadStoredGlobals(): DocsGlobals {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return normalizeGlobals(JSON.parse(stored));
    return loadLegacyGlobals();
  } catch {
    return DEFAULT_GLOBALS;
  }
}

export function storeGlobals(globals: DocsGlobals) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(globals));
  } catch {
    // storage may be unavailable (e.g. privacy mode); the globals then only last for this page load
  }
}

/**
 * Picks up a choice made with the old manager toolbar, e.g. `swisspost-documentation-scheme: "Dark"`.
 * There was no palette then.
 */
function loadLegacyGlobals(): DocsGlobals {
  const legacy: Record<string, string> = {};
  GLOBAL_NAMES.forEach(name => {
    const label = localStorage.getItem(`${LEGACY_STORAGE_PREFIX}${name}`);
    const entry = Object.entries(DOCS_GLOBALS[name].options).find(([, text]) => text === label);
    if (entry) legacy[name] = entry[0];
  });
  return normalizeGlobals(legacy);
}
