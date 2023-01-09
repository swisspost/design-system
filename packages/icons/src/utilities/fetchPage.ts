import fetch from 'node-fetch';
import { CenshareError, CenshareResultPage } from '../models/censhare-result-page.model';
import { getRequestInit } from './getRequestInit';

/**
 * Fetch a page of SVG results from zenshare
 * @param url Zenshare URL
 * @returns Result page
 */

export const fetchPage = async (
  url: string,
): Promise<CenshareResultPage | CenshareError | undefined> => {
  try {
    const response = await fetch(url, {
      ...getRequestInit(),
      method: 'GET',
    });

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    return response.json() as Promise<CenshareResultPage | CenshareError>;
  } catch (err) {
    console.log(`Fetch error: ${err}`);
    // TODO: write error log to somewhere useful and bubble up the error
  }
};
