import { BUDDHIST_CALENDAR_YEAR_OFFSET } from '@/utils';
import {
  DATE_FORMAT_KEYS,
  DATE_FORMAT_KEYS_REGEX,
  DATE_FORMAT_MAP,
  DATE_FORMAT_SEPARATOR_REGEX,
  DATE_FORMAT_STRING_OPTIONS,
  TEXT_DIRECTION_MARKERS_REGEX,
} from './constants';

/**
 * Pad the year component of an ISO date string to 4 digits.
 * @param isoDateString An ISO formatted date string (YYYY-MM-DD).
 * @returns The padded ISO date string.
 */
export function padIsoDate(isoDateString: string): string {
  const valueParts = isoDateString.split('-');
  return `${valueParts[0].padStart(4, '0')}-${valueParts[1]}-${valueParts[2]}`;
}

/**
 * Convert an ISO 8601 formatted date string (YYYY-MM-DD) to a localtime date object.
 * @param isoDateString An ISO formatted, localtime date string.
 * @returns A localtime date object.
 */
export function isoToDate(isoDateString: string): Date | null {
  return new Date(`${padIsoDate(isoDateString)}T00:00`);
}

/**
 * Convert a date object to an ISO 8601 formatted date string (YYYY-MM-DD).
 * @param date A localtime date object.
 * @returns An ISO formatted, localtime date string.
 */
export function dateToIso(date: Date): string {
  // The swedish locale (`sv`) happens to format the date in the exact ISO format (YYYY-MM-DD),
  // so we can use it as a shortcut instead of manually constructing the string from the date parts.
  return date.toLocaleDateString('sv', DATE_FORMAT_STRING_OPTIONS);
}

/**
 * Convert a date object to a localized date string.
 * @param date A localtime date object.
 * @param localeCode The BCP 47 locale code to use for formatting.
 * @returns A localized date string, depending on the given `localeCode`.
 */
export function dateToString(date: Date, localeCode: string) {
  const dateString = date.toLocaleDateString(localeCode, DATE_FORMAT_STRING_OPTIONS);
  const yearString = date.getFullYear().toString();

  if (yearString.length < 4) {
    return dateString.replace(yearString, yearString.padStart(4, '0'));
  }

  return dateString;
}

/**
 * Convert a localized date string to a date object.
 * The date string should be in the same format as the date picker's `dateFormat`, which depends on the given `localeCode`.
 * @param localeDateString A localized date string.
 * @param dateFormat The date format string (e.g. "dd.mm.yyyy").
 * @param isBuddhistCalendar Whether the locale uses the Buddhist calendar.
 * @returns A localtime date object.
 */
export function stringToDate(
  localeDateString: string,
  dateFormat: string,
  isBuddhistCalendar: boolean,
) {
  // Match the separator chars in the date format (e.g. "." for "dd.mm.yyyy", etc.).
  const dateSeparator = dateFormat.match(DATE_FORMAT_SEPARATOR_REGEX)[0];
  // Remove the text direction markers, split the date string into its parts (e.g. ["31", "01", "2026"], etc.)
  // and make sure its values only contains digits (e.g. for "bg-BG", etc.).
  const dateParts: string[] = localeDateString
    .replace(TEXT_DIRECTION_MARKERS_REGEX, '')
    .split(dateSeparator)
    .map(p => p.replaceAll(/[^\d]/g, ''));
  // Split the dateFormat into its parts to get the year, month, day order (e.g. ["d", "m", "y"], etc.).
  // Removing everything else but the DATE_FORMAT_KEYS is necessary to support date formats with additional chars (e.g. "d.m.y г.", etc.).
  const formatParts: string[] = dateFormat.replace(DATE_FORMAT_KEYS_REGEX, '').split('');

  // Map the datePart values to their corresponding keys (e.g. y, m, d),
  // to construct an ISO date string (e.g. "2026-01-31") that can be parsed by the Date constructor.
  // This is necessary because different locale date formats may have different orders (e.g. "ymd", "dmy", "mdy", etc.).
  const { y, m, d } = DATE_FORMAT_KEYS.reduce(
    (parts, key) => ({
      ...parts,
      [key]: dateParts[formatParts.indexOf(key)],
    }),
    {} as Record<string, string>,
  );

  // Adjust for Thai Buddhist calendar
  const year = isBuddhistCalendar ? (Number(y) - BUDDHIST_CALENDAR_YEAR_OFFSET).toString() : y;

  return isoToDate([year, m, d].join('-'));
}

/**
 * Get the date format string for a locale, by formatting a sample date and replacing the date parts
 * with format keys (y, m, d). For example, it will return "dd.mm.yyyy" for "de-CH" locale and "mm/dd/yyyy" for "en-US" locale.
 * @param localeCode The BCP 47 locale code.
 * @param isBuddhistCalendar Whether the locale uses the Buddhist calendar.
 * @returns The date format string.
 */
export function getDateFormat(localeCode: string, isBuddhistCalendar: boolean): string {
  const date = new Date(Object.values(DATE_FORMAT_MAP).join('-'));
  // get the locale date format e.g. `22.11.3333` for `de-CH` or `11/22/3333` for `en-US`
  let localeDateString = date.toLocaleDateString(localeCode, DATE_FORMAT_STRING_OPTIONS);

  // replace the date parts (3333, 11, 22) with the corresponding format keys (y, m, d)
  for (const [key, value] of Object.entries(DATE_FORMAT_MAP)) {
    // for Thai locale, the year is in Buddhist calendar which is 543 years ahead of Gregorian calendar, so we need to adjust the year value accordingly
    localeDateString = localeDateString.replace(
      isBuddhistCalendar && value.length === 4
        ? (Number(value) + BUDDHIST_CALENDAR_YEAR_OFFSET).toString()
        : value,
      key,
    );
  }

  return localeDateString;
}

/**
 * Check if a value is a valid Date object.
 * @param date The value to check.
 * @returns `true` if the value is a valid Date, `false` otherwise.
 */
export function isValidDate(date: Date): boolean {
  return date instanceof Date && !Number.isNaN(date.getTime());
}
