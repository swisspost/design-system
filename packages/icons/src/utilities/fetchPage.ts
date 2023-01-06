import fetch from 'node-fetch';
import { CenshareError, CenshareResultPage } from '../models/censhare-result-page.model';
import { passphrase } from '../index';
import HttpsProxyAgent from 'https-proxy-agent';

/**
 * Fetch a page of SVG results from zenshare
 * @param url Zenshare URL
 * @returns Result page
 */

export const fetchPage = async (
  url: string,
): Promise<CenshareResultPage | CenshareError | undefined> => {
  let response;

  try {
    const proxyAgent = new (HttpsProxyAgent as any)(process.env.HTTPS_PROXY);
    response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${passphrase}`,
      },
      agent: proxyAgent,
      // TODO: Proxy
    });
  } catch (err) {
    console.log(`Fetch error: ${err}`);
    // TODO: write error log to somewhere useful and bubble up the error
  }

  return response?.json() as Promise<CenshareResultPage | CenshareError>;
};
