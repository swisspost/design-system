import { state } from '../../data/store';
import { CoveoCompletion, CoveoResponse } from '../../models/coveo.model';
import { coveo } from './coveo.settings';
import { getSearchPageUrl } from './search.service';

let suggestionsController: AbortController;

/**
 * Get suggestions from coveo
 * https://docs.coveo.com/en/1459/build-a-search-ui/get-query-suggestions#context-object
 *
 * @param query Search term
 * @returns
 */
export const getCoveoSuggestions = async (query: string): Promise<CoveoCompletion[]> => {
  if (
    state.localizedConfig?.header?.search === undefined ||
    state.localizedConfig?.header?.search.isCustomSuggestionHidden === true
  )
    return [];
  const config = state.localizedConfig.header.search;
  const { token, organisation } = coveo.environment[state.environment];
  const url = `${coveo.url}?q=${query}&locale=${state.currentLanguage}&searchHub=${config.searchHubName}&pipeline=${config.searchPipelineName}&organizationId=${organisation}`;

  if (suggestionsController) suggestionsController.abort();
  suggestionsController = new AbortController();

  return new Promise((resolve, reject) => {
    fetch(url, {
      signal: suggestionsController.signal,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then((coveoJSON: CoveoResponse) => {
        resolve(
          coveoJSON.completions.map(completion => ({
            ...completion,
            redirectUrl: getSearchPageUrl(completion.expression),
          })),
        );
      })
      .catch(error => {
        if (error.name !== 'AbortError') {
          console.error(
            `Fetching coveo suggestions failed, ${error}\nDid you add "*.coveo.com" to your connect-src content security policy and tried turning off your adblocker?`,
          );
          reject(error);
        }
      });
  });
};
