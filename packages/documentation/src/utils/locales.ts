import lcid from 'lcid';

export const LOCALE_CODES = Object.keys(lcid.all).map(l => l.replace('_', '-'));
export const LANGUAGE_CODES = Array.from(new Set(LOCALE_CODES.map(lc => lc.split('-')[0])));
export const LOCALES = Array.from(
  new Set([...LANGUAGE_CODES, ...LOCALE_CODES].sort((a, b) => a.localeCompare(b))),
);
