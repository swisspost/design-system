import { check } from 'language-tags';

export const FALLBACK_LANGUAGE_CODE = 'en';
export const FALLBACK_LOCALE_CODE = 'en-GB';

export const BUDDHIST_CALENDAR_YEAR_OFFSET = 543;
export const BUDDHIST_CALENDAR_LOCALES = ['th', 'th-TH'];

// https://de.wikipedia.org/wiki/Bidirektionales_Steuerzeichen
export const UNICODE_BIDI = {
  ltr: '\u200E', // Left-to-right mark (LRM)
  rtl: '\u200F', // Right-to-left mark (RLM)
  pop: '\u202C', // Pop (end) directional formatting (PDF)
};

export function getLocaleTextDirection(locale: string) {
  return new Date().toLocaleDateString(locale).includes(UNICODE_BIDI.rtl) ? 'rtl' : 'ltr';
}

export function isValidLocale(locale: string | undefined): boolean {
  return locale !== undefined && check(locale);
}
