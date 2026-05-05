import { UNICODE_BIDI } from '../../utils/locales';

/**
 * The unicode bidi characters used to control the text direction in the date string.
 * These characters are used to ensure that the date string is displayed correctly in both LTR and RTL locales,
 * especially when the date format contains a separator between the date parts (e.g. " - ").
 * The TEXT_DIRECTION_MARKERS_REGEX is used to remove these characters from the localized date string when parsing it,
 * and to ensure that they are not included in the input mask.
 */
export const TEXT_DIRECTION_MARKERS = `${UNICODE_BIDI.ltr}${UNICODE_BIDI.rtl}${UNICODE_BIDI.pop}`;
export const TEXT_DIRECTION_MARKERS_REGEX = new RegExp(`[${TEXT_DIRECTION_MARKERS}]`, 'g');

/**
 * The separator used to separate the start and end date in a date range.
 * It is used in the date string and the input mask.
 */
export const DATE_FORMAT_RANGE_SEPARATOR = ' - ';
/**
 * A map of date format keys to their corresponding date format values.
 * The keys are used in this.dateFormat string and to specify the mask,
 * while the values are used to determine the order of the date parts in the localized date string.
 */
export const DATE_FORMAT_MAP = {
  y: '3333',
  m: '11',
  d: '22',
};
/**
 * The keys of the DATE_FORMAT_MAP, used to create regexes for parsing and formatting localized date strings.
 * The regexes are used to remove the date format keys from the date format string and to split the localized date string into its parts.
 */
export const DATE_FORMAT_KEYS = Object.keys(DATE_FORMAT_MAP);
export const DATE_FORMAT_KEYS_REGEX = new RegExp(`[^${DATE_FORMAT_KEYS.join('')}]`, 'g');
export const DATE_FORMAT_SEPARATOR_REGEX = new RegExp(
  `[^${DATE_FORMAT_KEYS.join('')}${TEXT_DIRECTION_MARKERS}]+`,
  'g',
);
/**
 * The options used to format the date parts in the localized date string.
 * These options are passed to the `toLocaleDateString` method when formatting the date parts.
 * The options are also used to determine the date format string for the input mask.
 */
export const DATE_FORMAT_STRING_OPTIONS = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
} as Intl.DateTimeFormatOptions;
