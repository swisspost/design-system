import { isIsoDate } from '../is-iso-date';

export function checkIsoDate<T extends { host: HTMLElement }>(component: T, prop: keyof T) {
  const value = component[prop];
  if (!value) return;

  if (!isIsoDate(String(value))) {
    console.error(
      `The prop \`${String(prop)}\` of the \`${component.host.localName}\` component must be in ISO format (YYYY-MM-DD).`,
    );
  }
}
