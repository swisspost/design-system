import { state } from '@/data/store';

const DEFAULT_LANGUAGE = 'de';

/**
 * Determine the current user language
 *
 * @param implementorPreferredLanguage [optional] Preferred language
 * @returns The resolved language code
 */
export const getUserLang = (implementorPreferredLanguage?: string): string => {
  const url = new URL(window.location.href);

  /**
   * Build array of possible language definitions in order of importance.
   * At the end is a filter function that will weed out any undefined or null entries.
   */
  const languagesSet: Array<string> = [
    // Check if implementor overrides lang config
    implementorPreferredLanguage,

    // Check query string param
    url.searchParams.get('lang'),

    // Check url pathname
    getPathLanguage(url.pathname),

    // Check document language
    document.documentElement.lang,

    // Check browser preferred language
    getPreferredLanguageFromBrowser(),

    // Check the state
    state.currentLanguage,
  ].filter((lang): lang is string => lang != null);

  return extractLanguage(languagesSet[0] ?? DEFAULT_LANGUAGE);
};

// Returns the first path segment if it's a valid language tag, e.g. "de" in "/de/products"
const getPathLanguage = (pathname: string): string | undefined => {
  const segment = pathname.split('/').filter(Boolean)[0];
  if (!segment) return undefined;

  try {
    Intl.getCanonicalLocales(segment);
    return segment;
  } catch {
    return undefined;
  }
};

const getPreferredLanguageFromBrowser = (): string | null => {
  // IE & Chrome
  if (navigator.language != null) {
    return extractLanguage(navigator.language);
  }

  // Chrome supports a list of preferred languages: use the first one.
  if (navigator.languages != null && navigator.languages.length > 0) {
    return extractLanguage(navigator.languages[0]);
  }

  return null;
};

const extractLanguage = (language: string): string => language.substring(0, 2).toLowerCase();
