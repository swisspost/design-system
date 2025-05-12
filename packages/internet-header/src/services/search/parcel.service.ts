import { state } from '../../data/store';
import { ISearchConfig } from '../../models/header.model';
import { TrackAndTraceInfo } from '../../models/track-and-trace.model';

let parcelController: AbortController;

// https://www.post.ch/api/trackandtrace?id=99.00.306600.01004883

// Track and trace URL
export const getTrackAndTraceApiUrl = (id: string) => {
  const lang = state.currentLanguage;
  return `https://www.post.ch/${lang}/api/trackandtrace?id=${encodeURIComponent(id)}`;
};

// Get the redire
export const getTrackAndTraceRedirectUrl = (
  query: string,
  { packageTrackingRedirectUrl }: ISearchConfig,
) => {
  return packageTrackingRedirectUrl.replace('{trackingNumber}', encodeURIComponent(query));
};

/**
 * Check whether a query is a tracking id
 *
 * @param query User query
 * @returns Boolean
 */
export const isParcel = async (query: string, searchConfig: ISearchConfig): Promise<boolean> => {
  const parcelInfo = await getParcelInfo(query, searchConfig);
  return 'sending' in parcelInfo;
};

/**
 * Try to get parcel info from a query that is possibly a tracking id.
 * This is mainly used to check if a search should redirect to track&trace instead of the regular search.
 *
 * @param query User query that is possibly a tracking number
 * @returns Track and trace info
 */
export const getParcelInfo = async (
  query: string,
  { redirectPattern }: ISearchConfig,
): Promise<TrackAndTraceInfo> => {
  const trackingNrPattern = new RegExp(redirectPattern);

  if (trackingNrPattern.test(query)) {
    const url = getTrackAndTraceApiUrl(query);

    if (parcelController !== undefined) parcelController.abort();
    parcelController = new AbortController();

    return new Promise((resolve, reject) => {
      fetch(url, { signal: parcelController.signal })
        .then(response => response.json())
        .then((trackAndTraceResult: TrackAndTraceInfo) => {
          resolve({ ...trackAndTraceResult, ok: trackAndTraceResult.ok });
        })
        .catch(error => {
          if (error.name !== 'AbortError') {
            console.error(`Could not check track and trace API due to error: ${error.message}`);
            reject(error);
          }
        });
    });
  }

  return { ok: false, timestamp: new Date().toDateString() };
};

/**
 * Get parcel info if query is a parcel or null
 *
 * @param query Parcel id
 * @returns Parcel info and a redirect url or null if not a parcel
 */
export const getParcelSuggestion = async (
  query: string,
  searchConfig: ISearchConfig,
): Promise<(TrackAndTraceInfo & { url: string }) | null> => {
  const parcelInfo = await getParcelInfo(query, searchConfig);

  return parcelInfo.ok
    ? { ...parcelInfo, url: getTrackAndTraceRedirectUrl(query, searchConfig) }
    : null;
};
