import { DEPENDENCIES, getVersion, compareVersions } from '../../src/utils/version';
const currentMajorVersion =
  getVersion(DEPENDENCIES['@swisspost/design-system-styles'], 'major') ?? '';

const LOCAL_VERSIONS_URL = '/assets/versions.json';
const REMOTE_VERSIONS_URL = 'https://design-system.post.ch/assets/versions.json';

const NEXT_FLAG_REGEX = /-(next)/i;
const NEXT_VERSION_URLS = [
  'next.design-system.post.ch',
  'swisspost-design-system-next.netlify.app',
];

export interface Version {
  title: string;
  version: string;
  description: string;
  url: string;
  dependencies: {
    [key: string]: string;
  };
  peerDependencies: {
    [key: string]: string;
  };
}

export type Versions = Version[];

interface VersionsStore {
  cache: Versions;
  promise: Promise<Versions> | null;
}

/**
 * The versions helper is evaluated in two separate Storybook realms: the manager
 * window (version switcher addon) and the preview iframe (package shields). As both
 * run on the same origin, we keep a single cache and in-flight request on the top
 * window so versions.json is fetched only once across all contexts.
 */
function getVersionsStore(): VersionsStore {
  let host: unknown = globalThis;

  if (globalThis.window !== undefined) {
    try {
      host = globalThis.window.top ?? globalThis.window;
    } catch {
      // Accessing window.top may throw when framed cross-origin; fall back locally.
      host = globalThis.window;
    }
  }

  const target = host as { __postDesignSystemVersions__?: VersionsStore };

  if (!target.__postDesignSystemVersions__) {
    target.__postDesignSystemVersions__ = { cache: [], promise: null };
  }

  return target.__postDesignSystemVersions__;
}

/**
 * Fetch versions.json from a single URL, throwing if the response is not ok.
 */
function fetchVersionsJson(url: string): Promise<Versions> {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`Failed to load versions.json from ${url}`);
    return response.json() as Promise<Version[]>;
  });
}

/**
 * Fetch versions.json once and cache the result across all Storybook contexts.
 * Prefer the local copy and fall back to the remote origin when unavailable.
 */
function loadVersionsJson(): Promise<Versions> {
  const store = getVersionsStore();

  // Already loaded: reuse the cached data.
  if (store.cache.length > 0) return Promise.resolve(store.cache);

  // Already loading: reuse the in-flight request instead of fetching again.
  if (store.promise !== null) return store.promise;

  store.promise = fetchVersionsJson(LOCAL_VERSIONS_URL)
    .catch(() => fetchVersionsJson(REMOTE_VERSIONS_URL))
    .then(data => {
      store.cache = data;
      return store.cache;
    })
    .catch(error => {
      console.error('Error loading versions.json:', error);
      store.cache = [];
      return [];
    })
    .finally(() => {
      // Clear the in-flight marker so a failed load can be retried later.
      store.promise = null;
    });

  return store.promise;
}

/**
 * The "next" documentation site is the only place pre-release versions may be listed.
 * Matches the canonical host and any Netlify deploy/branch preview of the next site.
 */
function isNextDocs(): boolean {
  if (globalThis.window === undefined) return false;
  return NEXT_VERSION_URLS.some(url => globalThis.window.location.hostname.endsWith(url));
}

/**
 * Get cached versions data as a Promise, always sorted newest to oldest.
 * Sorting happens on read so the result is stable regardless of the file order
 * or of a shared cache populated by another Storybook realm. Pre-release versions
 * are excluded unless the docs are served from the "next" site.
 * @returns Promise that resolves to the sorted versions data
 */
export function getVersions(): Promise<Versions> {
  const includePrereleases = isNextDocs();

  return loadVersionsJson().then(versions =>
    [...versions]

      .filter(version => includePrereleases || !NEXT_FLAG_REGEX.test(version.version))
      .sort((a, b) => compareVersions(b.version, a.version)),
  );
}

/**
 * Resolve the version entry that matches the current major version of the bundled
 * styles package, or null when no matching entry exists so consumers can tell the
 * difference between "found" and "not found".
 * @returns Promise that resolves to the current version entry or null
 */
export function getCurrentVersion(): Promise<Version | null> {
  // use pkg.dependencies['@swisspost/design-system-styles'] to find the current version in the versionsCache
  return getVersions().then(
    versions => versions?.find((v: Version) => v.version.startsWith(currentMajorVersion)) ?? null,
  );
}

/**
 * Get the npm dist-tag for the current version.
 * @returns Promise that resolves to the dist-tag of the current version
 */
export function getCurrentDistTag(): Promise<string> {
  return getCurrentVersion().then(currentVersion =>
    currentVersion ? getDistTag(currentVersion) : 'latest',
  );
}

/**
 * Determine the npm dist-tag for a version: the pre-release flag for pre-releases,
 * `latest` for the newest stable release, or `version-<major>` for older stable releases.
 * @param version - The version entry to resolve the dist-tag for
 * @returns Promise that resolves to the dist-tag
 */
export function getDistTag(version: Version): Promise<string> {
  return getVersions().then(versions => {
    const nextFlag = NEXT_FLAG_REGEX.exec(version.version ?? '')?.[1]?.toLowerCase();

    if (nextFlag) return nextFlag;

    // A stable release is `latest` only when no other stable release has a higher
    // version. Deriving this from semver keeps the tag independent of the entry
    // order in versions.json (reordering entries no longer breaks the badges).
    const hasNewerStableVersion = (versions ?? []).some(
      other =>
        !NEXT_FLAG_REGEX.test(other.version) && compareVersions(other.version, version.version) > 0,
    );

    if (hasNewerStableVersion) {
      const major = version.version.split('.')[0];
      return `version-${major}`;
    }

    return 'latest';
  });
}
