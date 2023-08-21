import {
  version as styles,
  dependencies as stylesDeps,
} from '@swisspost/design-system-styles/package.json';
import { version as components } from '@swisspost/design-system-components/package.json';
import { version as internetheader } from '@swisspost/internet-header/package.json';
import { version as intranetheader } from './../../../components-angular/projects/intranet-header/package.json';
import { version as icons } from '@swisspost/design-system-icons/package.json';
import { version as documentation } from './../../package.json';

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

const versions: any = {
  styles,
  components,
  internetheader,
  intranetheader,
  icons,
  documentation,
  bootstrap: stylesDeps.bootstrap,
};

export function getVersion(version: string, filter: string = '') {
  const cleanVersion = versions[version].replace(/^[^\d]+/, '');

  if (filter) {
    const filterRegex = versionFilterRegexes[versionFilterMap[filter]];
    let matchArray = null;

    if (filterRegex) matchArray = cleanVersion.match(filterRegex);

    return matchArray !== null && matchArray[1] ? matchArray[1] : null;
  } else {
    return cleanVersion.length > 0 ? cleanVersion : versions[version] ?? null;
  }
}
