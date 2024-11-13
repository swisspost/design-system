import { state } from '../../data/store';
import { ISearchConfig } from '../../models/header.model';
import { getTrackAndTraceRedirectUrl, isParcel } from './parcel.service';

/**
 * Construct a search page url from a query
 *
 * @param query Search term
 * @returns
 */
export const getSearchRedirectUrl = async (
  query: string,
  searchConfig: ISearchConfig,
): Promise<string | undefined> => {
  const isTrackTraceId = await isParcel(query, searchConfig);
  return isTrackTraceId
    ? getTrackAndTraceRedirectUrl(query, searchConfig)
    : getSearchPageUrl(query);
};

/**
 * Stitch toghether the search page URL
 *
 * @param query Search term
 * @returns Search page URL
 */
export const getSearchPageUrl = (query: string): string | undefined => {
  if (state.localizedConfig?.header.search === undefined) {
    return;
  }
  const { searchPageUrl } = state.localizedConfig.header.search;
  const searchParam = `#q=${encodeURIComponent(query)}`;
  return `${searchPageUrl}${searchParam}&t=AllTab`;
};

/**
 * Equalize the length of two arrays while filling up empty slots up to max. length
 *
 * @param arrayA First array
 * @param arrayB Second array
 * @param maxLength Max. length of result array
 * @returns Array with two resulting arrays
 */
export const equalizeArrays = <A, B>(arrayA: A[], arrayB: B[], maxLength = 7): [A[], B[]] => {
  const coveoSliced = arrayA.slice(0, Math.max(maxLength / 2, maxLength - arrayB.length));
  return [coveoSliced, arrayB.slice(0, maxLength - coveoSliced.length)];
};
