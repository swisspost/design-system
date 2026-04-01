import type { AirDatepickerLocale } from 'air-datepicker';

const SUPPORTED_LOCALES = [
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

export const airDatepickerLocales: Record<
  string,
  () => Promise<{ default: AirDatepickerLocale }>
> = SUPPORTED_LOCALES.reduce(
  (acc, locale) => ({
    ...acc,
    [locale]: () => import(`./locales/${locale}.js`),
  }),
  {},
);
