import fetch from 'node-fetch';
import { CenshareError, CenshareResultPage } from '../../models/censhare-result-page.model';
import { getRequestInit } from '../environment';

/**
 * Fetch a page of SVG results from zenshare
 * @param url Zenshare URL
 * @returns Result page
 */
export const fetchPage = async (
  url: string,
): Promise<CenshareResultPage | CenshareError | undefined> => {
  const response = await fetch(url, {
    ...getRequestInit(),
    method: 'GET',
  });

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<CenshareResultPage | CenshareError>;
};
