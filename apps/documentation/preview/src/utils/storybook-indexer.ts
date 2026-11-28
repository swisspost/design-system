import { bookmarkUrl } from '@shared/urls';

export function getTitleFromPath(path: string) {
  return path.split('/').at(-1);
}

export function getDocsPath(id: string) {
  return bookmarkUrl(id.split('--')[0]);
}
