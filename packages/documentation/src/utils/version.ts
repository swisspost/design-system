import * as packageJson from '../../package.json';

const DEPENCENCIES: any = {
  [packageJson.name]: packageJson.version,
  ...packageJson.dependencies,
  ...packageJson.devDependencies,
  ...packageJson.peerDependencies,
};

const versionFilterRegexes: any = {
  major: /^(?:(\d+)\.\d+\.\d+)/,
  minor: /^(?:\d+\.(\d+)\.\d+)/,
  patch: /^(?:\d+\.\d+\.(\d+))/,
  pre: /^(?:\d+\.\d+\.\d+[ .:,;!?_~`'"^*+\-=<>#&$%@|\/()[\]{}]?(.*))/,
  majorminor: /^(?:(\d+\.\d+)\.\d+)/,
  majorminorpatch: /^(\d+\.\d+\.\d+)/,
};

const versionFilterMap: any = {
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

export function getVersion(version: string, filter: string = '') {
  const cleanVersion = DEPENCENCIES[version].replace(/^[^\d]+/, '');

  if (filter) {
    const filterRegex = versionFilterRegexes[versionFilterMap[filter]];
    let matchArray = null;

    if (filterRegex) matchArray = cleanVersion.match(filterRegex);

    return matchArray !== null && matchArray[1] ? matchArray[1] : null;
  } else {
    return cleanVersion.length > 0 ? cleanVersion : DEPENCENCIES[version] ?? null;
  }
}
