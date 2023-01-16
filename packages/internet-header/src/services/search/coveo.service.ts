import { state } from '../../data/store';
import { CoveoCompletion, CoveoResponse } from '../../models/coveo.model';
import { coveo } from './coveo.settings';
import { getSearchPageUrl } from './search.service';

/**
 * Get suggestions from coveo
 * TODO: analytics, especially when user is logged in
 * https://docs.coveo.com/en/1459/build-a-search-ui/get-query-suggestions#context-object
 *
 * @param query Search term
 * @returns
 */
export const getCoveoSuggestions = async (query: string): Promise<CoveoCompletion[]> => {
  if (state.localizedConfig?.header?.search === undefined) return [];
  const config = state.localizedConfig.header.search;
  const { token, organisation } = coveo.environment[state.environment];
  const url = `${coveo.url}?q=${query}&locale=${state.currentLanguage}&searchHub=${config.searchHubName}&pipeline=${config.searchPipelineName}&organizationId=${organisation}`;
  let coveoCompletions: CoveoCompletion[] | undefined;

  try {
    const coveoResponse = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const coveoJSON = (await coveoResponse.json()) as CoveoResponse;
    coveoCompletions = coveoJSON.completions.map(completion => ({
      ...completion,
      redirectUrl: getSearchPageUrl(completion.expression),
    }));
  } catch (error) {
    console.error(
      'Connection to coveo failed. Did you add "*.coveo.com" to your connect-src content security policy and tried turning off your adblocker?',
    );
  }

  return coveoCompletions === undefined ? [] : coveoCompletions;
};
