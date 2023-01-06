import fetch from 'node-fetch';
import { CenshareResultPage } from '../models/censhare-result-page.model';
import { passphrase } from '../index';

/**
 * Fetch a page of SVG results from zenshare
 * @param url Zenshare URL
 * @returns Result page
 */

export const fetchPage = async (url: string): Promise<CenshareResultPage | undefined> => {
  let response;

  try {
    response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${passphrase}`,
      },
      // TODO: Proxy
    });
  } catch (err) {
    console.log(`Fetch error: ${err}`);
    // TODO: write error log to somewhere useful and bubble up the error
  }

  return response?.json() as Promise<CenshareResultPage>;
};
