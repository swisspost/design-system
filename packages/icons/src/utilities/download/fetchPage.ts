import type { CenshareError, CenshareResultPage } from '../../models/censhare-result-page.model';
import fetch from 'node-fetch';
import { requestInit } from '../environment';
import { coloredLogMessage } from '../shared';
import { DOWNLOAD_PAGE_DELAY } from '../constants';

/**
 * Fetch a page of SVG results from zenshare
 * @param url Zenshare URL
 * @returns Result page
 */
export const fetchPage = async (
  url: string,
): Promise<CenshareResultPage | CenshareError | undefined> => {
  const response = await fetch(url, {
    ...requestInit,
    method: 'GET',
  });

  if (response.status !== 200) {
    throw new Error(coloredLogMessage(`<red>${response.statusText}</red>`));
  }

  // Delay downloading next page, to avoid download errors
  await new Promise(resolve => setTimeout(resolve, DOWNLOAD_PAGE_DELAY));
  return response.json() as Promise<CenshareResultPage | CenshareError>;
};
