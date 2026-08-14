import * as packageJson from '../../package.json';

interface IPackageJson {
  name: string;
  version: string;
  dependencies?: object;
  devDependencies?: object;
  peerDependencies?: object;
  [key: string]: unknown;
}

interface IDependencies {
  [key: string]: string;
}

interface IVersionFilterRegexes {
  [key: string]: RegExp;
}

interface IVersionFilterMap {
  [key: string]: string;
}

const pkg = packageJson as IPackageJson;

export const DEPENDENCIES: IDependencies = {
  [pkg.name]: pkg.version,
  ...pkg.dependencies,
  ...pkg.devDependencies,
  ...pkg.peerDependencies,
};

const versionFilterRegexes: IVersionFilterRegexes = {
  major: /^(?:(\d+)\.\d+\.\d+)/,
  minor: /^(?:\d+\.(\d+)\.\d+)/,
  patch: /^(?:\d+\.\d+\.(\d+))/,
  pre: /^(?:\d+\.\d+\.\d+[ .:,;!?_~`'"^*+\-=<>#&$%@|/()[\]{}]?(.*))/,
  majorminor: /^(?:(\d+\.\d+)\.\d+)/,
  majorminorpatch: /^(\d+\.\d+\.\d+)/,
};

const versionFilterMap: IVersionFilterMap = {
  major: 'major',
  M: 'major',
  minor: 'minor',
  m: 'minor',
  patch: 'patch',
  p: 'patch',
  pre: 'pre',
  majorminor: 'majorminor',
  Mm: 'majorminor',
  majorminorpatch: 'majorminorpatch',
  Mmp: 'majorminorpatch',
};

export function getVersion(version: string, filter = ''): string | null {
  const cleanVersion = version.replace(/^[^\d]+/, '');

  if (filter) {
    const filterRegex = versionFilterRegexes[versionFilterMap[filter]];
    let matchArray = null;

    if (filterRegex) matchArray = cleanVersion.match(filterRegex);

    return matchArray !== null && matchArray[1] ? matchArray[1] : null;
  } else {
    return cleanVersion.length > 0 ? cleanVersion : (version ?? null);
  }
}

/**
 * Compare two semver-like version strings by their numeric major.minor.patch parts.
 * Returns > 0 when `a` is newer than `b`, < 0 when older, and 0 when equal.
 */
export function compareVersions(a: string, b: string): number {
  const parts = ['major', 'minor', 'patch'] as const;

  for (const part of parts) {
    const diff =
      Number.parseInt(getVersion(a, part) ?? '0', 10) -
      Number.parseInt(getVersion(b, part) ?? '0', 10);
    if (diff !== 0) return diff;
  }

  return 0;
}
