import { state } from '../../data/store';
import { GeocodeLocation, GeocodeResponse, ServiceTypesResponse } from '../../models/geocode.model';
import { gisAPIUrl, pois, placesUrl } from './places.settings';
import { hardNormalize, createSlug } from './search-utilities';

// Never load types twice
let typesCache: string | null = null;

/**
 * Convert Post POI ids to stao cache ids
 * @returns
 */
const convertTypes = async () => {
  if (typesCache === null) {
    try {
      const typesResponse = await fetch(`${gisAPIUrl}/Types?lang=${state.currentLanguage}`);
      const typesJSON = (await typesResponse.json()) as ServiceTypesResponse;
      typesCache = encodeURIComponent(
        pois
          .map(poi => {
            const foundType = typesJSON.types.find(type => type.id === poi);
            return foundType?.tag;
          })
          .filter(poi => poi !== undefined)
          .join(','),
      );
    } catch (error) {
      console.error(
        'Fetching places failed. Did you add "places.post.ch" to your connect-src content security policy?',
      );
      throw error;
    }
  }

  return typesCache;
};

/**
 * Query the Gis API for locations and localities (pois)
 * TODO: find out if certain types can be excluded via filter on the backend
 *
 * @param query User input string
 * @returns
 */
export const queryPlaces = async (query: string): Promise<GeocodeLocation[]> => {
  if (query.length === 0) {
    return [];
  }

  const limit = 8;
  const excludeTypes = ['address', 'locality', 'region'];
  const types = await convertTypes();
  const geocoderUrl = `${gisAPIUrl}/Geocode?query=${encodeURIComponent(query)}&lang=${
    state.currentLanguage
  }&pois=${types}&limit=100`;

  try {
    const geocodeResponse = await fetch(geocoderUrl);
    const geocodeJSON = (await geocodeResponse.json()) as GeocodeResponse;
    if (!geocodeJSON.ok) {
      throw new Error(geocodeJSON.info);
    }
    return geocodeJSON.locations
      .filter(location => !excludeTypes.includes(location.type))
      .slice(0, limit);
  } catch (error) {
    console.error(
      'Fetching places failed. Did you add "places.post.ch" to your connect-src content security policy?',
    );
    throw error;
  }
};

/**
 * Try to highlight place suggestions
 * Limitation: accented chars are not handled by this basic function
 *
 * @param query Search term
 * @param place Name of the suggested place
 * @returns
 */
export const highlightPlacesString = (query: string | undefined, place: string) => {
  if (query === undefined) return place;

  // Strip accents from the string
  const reference = hardNormalize(place);
  const q = hardNormalize(query);
  const indexOfQuery = reference.indexOf(q);

  if (indexOfQuery < 0) {
    return place;
  }

  return `${place.substring(0, indexOfQuery)}{${place.substring(
    indexOfQuery,
    indexOfQuery + query.length,
  )}}${place.substring(indexOfQuery + query.length, place.length)}`;
};

/**
 * Get the deeplink to any location found via geocoder
 * TODO: Check with topos if they can provide an API to get generated places URLs with their logic
 *
 * @param location A location from the Gis API Geocode endpoint
 * @returns
 */
export const getPlacesUrl = (location: GeocodeLocation): string => {
  let url: string;

  if (location.id !== '') {
    url = `${placesUrl}/${state.currentLanguage}/${location.id}/${createSlug(location.name)}`;
  } else {
    url = `${placesUrl}?preselecttext=${encodeURIComponent(location.name)}`;
  }

  return url;
};
