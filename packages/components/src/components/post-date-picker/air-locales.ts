import type { AirDatepickerLocale } from 'air-datepicker';

export type AirDatepickerLocales = Record<string, () => Promise<{ default: AirDatepickerLocale }>>;

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
];

export const airDatepickerLocales = SUPPORTED_LANGUAGES.reduce(
  (locales, languageCode) => ({
    ...locales,
    [languageCode]: () => import(`./locales/${languageCode}.js`),
  }),
  {} as AirDatepickerLocales,
);
