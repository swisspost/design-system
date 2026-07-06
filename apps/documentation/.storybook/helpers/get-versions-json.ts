import { DEPENDENCIES, getVersion } from '../../src/utils/version';
const currentMajorVersion =
  getVersion(DEPENDENCIES['@swisspost/design-system-styles'], 'major') ?? '';

const VERSIONS_URL = 'https://design-system.post.ch/assets/versions.json';
const PRE_FLAG_REGEX = /-(alpha|beta|rc|pre|next|canary|snapshot)/i;

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
 * Fetch versions.json once and cache the result across all Storybook contexts.
 */
function loadVersionsJson(url: string = VERSIONS_URL): Promise<Versions> {
  const store = getVersionsStore();

  // Already loaded: reuse the cached data.
  if (store.cache.length > 0) return Promise.resolve(store.cache);

  // Already loading: reuse the in-flight request instead of fetching again.
  if (store.promise !== null) return store.promise;

  store.promise = fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(`Failed to load versions.json from ${url}`);
      return response.json() as Promise<Version[]>;
    })
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
 * Get cached versions data as a Promise
 * @returns Promise that resolves to the cached versions data
 */
export function getVersions(): Promise<Versions> {
  return loadVersionsJson();
}

export function getCurrentVersion(): Promise<Version> {
  // use pkg.dependencies['@swisspost/design-system-styles'] to find the current version in the versionsCache
  return getVersions().then(versions => {
    return (
      versions?.find((v: Version) => v.version.startsWith(currentMajorVersion)) ?? {
        title: '',
        version: '',
        description: '',
        url: '',
        dependencies: {},
        peerDependencies: {},
      }
    );
  });
}

export function getDistTag(): Promise<string> {
  return Promise.all([getVersions(), getCurrentVersion()]).then(([versions, currentVersion]) => {
    const currentPreFlag = PRE_FLAG_REGEX.exec(currentVersion.version ?? '')?.[1]?.toLowerCase();

    if (currentPreFlag) return currentPreFlag;

    const currentIndex = versions?.indexOf(currentVersion) ?? -1;
    const previousVersion = versions?.[currentIndex - 1];
    const previousHasPreFlag = previousVersion && PRE_FLAG_REGEX.test(previousVersion.version);

    if (currentIndex !== 0 && !previousHasPreFlag) {
      const major = currentVersion.version.split('.')[0];
      return `version-${major}`;
    }

    return 'latest';
  });
}
