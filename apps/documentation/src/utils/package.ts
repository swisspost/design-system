import { DEPENDENCIES, getVersion } from '@/utils/version';
import { IPackage } from '@/shared/packages.data';

function getVersionForPackage(pkg: IPackage) {
  return getVersion(DEPENDENCIES[pkg.dependencyName]);
}

export function getHumanReadableVersionForPackage(pkg: IPackage) {
  const version = getVersionForPackage(pkg);
  return version !== null ? `v${version}` : '';
}

export function getDocsLinkForPackage(pkg: IPackage) {
  return `/?path=/docs/${pkg.docs.storyId}--docs`;
}

export function getGithubLinkForPackage(pkg: IPackage) {
  const version = getVersionForPackage(pkg);

  return version !== null
    ? `https://github.com/swisspost/design-system/tree/${pkg.dependencyName}@${version}/packages/${pkg.packageName}`
    : `https://github.com/swisspost/design-system/tree/main/packages/${pkg.packageName}`;
}
