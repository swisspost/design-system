import { coerce, gt, major, prerelease, rcompare } from 'semver';
import docsPackage from '../../package.json';

const LOCAL_VERSIONS_URL = '/assets/versions.json';
const REMOTE_VERSIONS_URL = 'https://design-system.post.ch/assets/versions.json';

const NEXT_DOCS_HOSTS = ['next.design-system.post.ch', 'swisspost-design-system-next.netlify.app'];

export interface Release {
  title: string;
  version: string;
  description: string;
  url: string;
  dependencies: Record<string, string>;
  peerDependencies: Record<string, string>;
  distTag: string;
}

type ReleaseEntry = Omit<Release, 'distTag'>;

const docsDependencies: Record<string, string> = {
  ...docsPackage.dependencies,
  ...docsPackage.devDependencies,
};

let request: Promise<Release[]> | null = null;

/**
 * The releases listed in `versions.json`, newest first. Pre-releases are only
 * included on the "next" documentation site.
 */
export function getReleases(): Promise<Release[]> {
  request ??= fetchReleases(LOCAL_VERSIONS_URL)
    .catch(() => fetchReleases(REMOTE_VERSIONS_URL))
    .then(entries => {
      const listed = entries
        .filter(entry => includePrereleases() || !prerelease(entry.version))
        .sort((a, b) => rcompare(a.version, b.version));

      return listed.map(entry => ({ ...entry, distTag: getDistTag(entry, listed) }));
    })
    .catch((error: unknown) => {
      console.error('Error loading versions.json:', error);
      request = null; // allows a retry
      return [];
    });

  return request;
}

export function getPackageVersion(name: string): string | null {
  const range = docsDependencies[name];
  return range ? (coerce(range, { includePrerelease: true })?.version ?? null) : null;
}

export async function getLatestRelease(): Promise<Release | null> {
  const currentVersion = getPackageVersion('@swisspost/design-system-styles');
  if (!currentVersion) return null;

  const releases = await getReleases();
  return releases.find(release => major(release.version) === major(currentVersion)) ?? null;
}

function getDistTag(release: ReleaseEntry, releases: ReleaseEntry[]): string {
  const [prereleaseTag] = prerelease(release.version) ?? [];
  if (prereleaseTag !== undefined) return String(prereleaseTag).toLowerCase();

  const hasNewerStableRelease = releases.some(
    other => !prerelease(other.version) && gt(other.version, release.version),
  );

  return hasNewerStableRelease ? `version-${major(release.version)}` : 'latest';
}

function includePrereleases() {
  const hostname = globalThis.location?.hostname;
  if (!hostname) return false;

  return NEXT_DOCS_HOSTS.some(host => hostname.endsWith(host));
}

async function fetchReleases(url: string): Promise<ReleaseEntry[]> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to load versions.json from ${url}`);

  return await response.json();
}
