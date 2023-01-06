import fs from 'fs';
import { IIcon } from './models/icon.model';
import { downloadError, downloadSVG, noSVG } from './utilities/downloadSVG';
import { mapResponse } from './utilities/mapResponse';
import { fetchPage } from './utilities/fetchPage';
import * as dotenv from 'dotenv';

dotenv.config();
const url = process.env.CEN_URL;
const user = process.env.CEN_USERNAME;
const pw = process.env.CEN_PASSWORD;
export const passphrase = Buffer.from(`${user}:${pw}`).toString('base64');

export const main = async () => {
  let buffer: Array<IIcon> = [];
  const fetch = async (currentUrl: string) => {
    try {
      const body = await fetchPage(currentUrl);

      if (body === undefined) {
        throw new Error(`Fetch icons failed, response was ${body}`);
      }

      if ('error' in body) {
        throw new Error(`Fetch icons failed: ${body.error}`);
      }

      const mappedResponse = mapResponse(body);
      buffer = buffer.concat(mappedResponse);

      // Fetch SVGs
      console.log('Starting to download icons');
      await Promise.all(mappedResponse.map(icon => downloadSVG(icon)));
      console.log('Download finished', body.page.next);

      if (body.page.next) {
        // Recursively fetch more pages
        console.log(
          `Fetching icons ${body.offset} - ${body.offset + body.count} of ${body['total-count']}`,
        );
        fetch(body.page.next);
      } else {
        // Write JSON
        fs.writeFile('icons.json', JSON.stringify(buffer, null, 2), {}, () => {});
        fs.writeFile(
          'no-svgs.json',
          JSON.stringify({ noSVG, downloadError }, null, 2),
          {},
          () => {},
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  if (url !== undefined) fetch(url);
};

// Run Forest, run
main();
