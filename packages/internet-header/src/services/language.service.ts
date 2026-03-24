import { translations } from '@/assets/i18n/translations';
import { state } from '@/data/store';

export const getUserLang = (
  supportedLanguages: string[],
  implementorPreferredLanguage?: string,
) => {
  // If there are no supported languages, well...
  if (supportedLanguages.length === 0) {
    return 'de';
  }

  // If there is only one language in the config, use this
  if (supportedLanguages.length === 1) {
    return supportedLanguages[0];
  }

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
    url.pathname.split('/').find(segment => supportedLanguages.includes(segment)),

    // Check document language
    document.documentElement.lang,

    // Check browser preferred language
    getPreferredLanguageFromBrowser(supportedLanguages),

    // Check the state
    state.currentLanguage,
  ].filter((lang): lang is string => lang != null);

  // Check the set of languages to see if it matches
  // any of the supported languages. Return the first
  // supported language if there is none set
  const lang =
    languagesSet.find(language => supportedLanguages.includes(language)) || supportedLanguages[0];

  if (lang == null || lang.length !== 2) {
    throw new Error(
      `Current language could not be determined from settings or the language provided (${lang}) is not supported by the Header API.`,
    );
  }

  return lang;
};

const getPreferredLanguageFromBrowser = (supportedLanguages: string[]): string | null => {
  // IE & Chrome
  if (navigator.language != null) {
    const lang = extractLanguage(navigator.language);
    if (supportedLanguages.indexOf(lang) !== -1) {
      return lang;
    }
  }

  // Chrome supports a list of preferred languages: if the preferred is not supported, we go down the list.
  if (navigator.languages != null) {
    for (const l of navigator.languages) {
      const lang = extractLanguage(l);
      if (supportedLanguages.indexOf(lang) !== -1) {
        return lang;
      }
    }
  }

  return null;
};

const extractLanguage = (language: string): string => language.substring(0, 2).toLowerCase();

/**
 * Simple translate function for general header UI strings
 *
 * @param key Translation key
 * @param lang Force a language
 * @param translationObject Optionally provide translations
 * @returns Translated string or the key
 */
export const translate = (key: string, lang?: string, translationObject = translations) =>
  translationObject[key]?.[lang ?? state.currentLanguage ?? ''] ?? key;
