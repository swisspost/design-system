import lcid from 'lcid';

export const LOCALE_CODES = Object.keys(lcid.all).map(l => l.replace('_', '-'));
export const LANGUAGE_CODES = Array.from(new Set(LOCALE_CODES.map(lc => lc.split('-')[0])));
export const LANGUAGE_CODES_RTL = [
  'ae', // Avestan
  'ar', // Arabic (generic)
  'arc', // Aramaic
  'bcc', // Southern Balochi
  'bqi', // Bakthiari
  'ckb', // Sorani Kurdish
  'dv', // Dhivehi
  'fa', // Persian (generic)
  'glk', // Gilaki
  'he', // Hebrew (he)
  'iw', // Hebrew (iw, legacy)
  'kd', // Kurdish (Sorani) RTL
  'ku', // Kurdish (generic)
  'mzn', // Mazanderani
  'nqo', // N'Ko
  'pk', // Panjabi-Shahmuki (generic)
  'pnb', // Western Punjabi
  'prs', // Darī
  'ps', // Pashto
  'sd', // Sindhi
  'syr', // Syriac
  'ug', // Uighur; Uyghur
  'ur', // Urdu
  'yi', // Yiddish
];
export const LOCALES = Array.from(
  new Set([...LANGUAGE_CODES, ...LOCALE_CODES].sort((a, b) => a.localeCompare(b))),
);
export const FALLBACK_LANGUAGE_CODE = 'en';
export const FALLBACK_LOCALE_CODE = 'en-GB';

// https://de.wikipedia.org/wiki/Bidirektionales_Steuerzeichen
export const UNICODE_BIDI = {
  ltr: '\u200E', // Left-to-right mark (LRM)
  rtl: '\u200F', // Right-to-left mark (RLM)
  pop: '\u202C', // Pop (end) directional formatting (PDF)
};
