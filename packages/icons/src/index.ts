import fs from 'fs';
import { IIcon } from './models/icon.model';
import { downloadError, downloadSVG, noSVG } from './utilities/downloadSVG';
import { mapResponse } from './utilities/mapResponse';
import { fetchPage } from './utilities/fetchPage';

const url =
  'https://cdn.post.ch/hcms/v2.0/entity/asset?limit=10000&query=typeFilter%3D%22pictograms%22%26%28outputChannel%3D%5E%22root.brandingnet.post.%22%29';
const user = process.env.USERNAME;
const pw = process.env.PASSWORD;
export const passphrase = Buffer.from(`${user}:${pw}`).toString('base64');

export const main = async () => {
  let buffer: Array<IIcon> = [];
  const fetch = async (currentUrl: string) => {
    try {
      const body = await fetchPage(currentUrl);
      if (body === undefined) {
        throw new Error(`Fetch icons failed, response was ${body}`);
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
  fetch(url);
};
