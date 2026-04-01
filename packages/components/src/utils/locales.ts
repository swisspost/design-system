import lcid from 'lcid';

export const LOCALE_CODES = Object.keys(lcid.all).map(l => l.replace('_', '-'));
export const LANGUAGE_CODES = new Set(LOCALE_CODES.map(lc => lc.split('-')[0]));
export const LOCALES = [...LANGUAGE_CODES, ...LOCALE_CODES].sort();
export const FALLBACK_LANGUAGE_CODE = 'en';
export const FALLBACK_LOCALE_CODE = 'en-GB';
