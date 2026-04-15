import type { AirDatepickerLocale } from 'air-datepicker';

const SUPPORTED_LANGUAGES = [
  'ar',
  'bg',
  'ca',
  'cs',
  'da',
  'de',
  'el',
  'en',
  'es',
  'eu',
  'fi',
  'fr',
  'hr',
  'hu',
  'id',
  'it',
  'ja',
  'ko',
  'nb',
  'nl',
  'pl',
  'pt',
  'ro',
  'ru',
  'si',
  'sk',
  'sl',
  'sv',
  'th',
  'tr',
  'uk',
  'zh',
] as const;

export const airDatepickerLocales: Record<string, () => Promise<{ default: AirDatepickerLocale }>> =
  SUPPORTED_LANGUAGES.reduce(
    (acc, locale) => ({
      ...acc,
      [locale]: () => import(`./locales/${locale}.js`),
    }),
    {},
  );
