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
  pre: 'pre',
  majorminor: 'majorminor',
  Mm: 'majorminor',
  majorminorpatch: 'majorminorpatch',
  Mmp: 'majorminorpatch',
};

export function getVersion(version: string, filter = '') {
  const cleanVersion = version.replace(/^[^\d]+/, '');

  if (filter) {
    const filterRegex = versionFilterRegexes[versionFilterMap[filter]];
    let matchArray = null;

    if (filterRegex) matchArray = cleanVersion.match(filterRegex);

    return matchArray !== null && matchArray[1] ? matchArray[1] : null;
  } else {
    return cleanVersion.length > 0 ? cleanVersion : version ?? null;
  }
}
