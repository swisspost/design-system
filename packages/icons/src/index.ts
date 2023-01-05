import fetch from 'node-fetch';
import fs from 'fs';
import { optimize, OptimizedSvg } from 'svgo';
import svgoOptions from './svgo.config';
import { CenshareResultPage, CenshareResult } from './censhare-result-page';
import { IIcon } from './icon.model';

const url =
  'https://cdn.post.ch/hcms/v2.0/entity/asset?limit=10000&query=typeFilter%3D%22pictograms%22%26%28outputChannel%3D%5E%22root.brandingnet.post.%22%29';
const user = process.env.USERNAME;
const pw = process.env.PASSWORD;
const passphrase = Buffer.from(`${user}:${pw}`).toString('base64');

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
    });
  } catch (err) {
    console.log(`Fetch error: ${err}`);
  }

  return response?.json() as Promise<CenshareResultPage>;
};

/**
 * Parses zenshare results into a useful format
 * @param response Zenshare result page
 * @returns Array of icons
 */
const mapResponse = (response: CenshareResultPage): Array<IIcon> => {
  return response.result.reduce((acc: IIcon[], item: CenshareResult) => {
    const svgVariant = item.variants?.find(variant => variant.mime === 'image/svg+xml');
    if (svgVariant) {
      acc.push({
        downloadLink: svgVariant.downloadLink,
        type: item.type,
        contentInfo: item.contentInfo,
        typeFilter: item.typeFilter,
        name: svgVariant.name,
        id: item.id,
        postInfo: item.postInfo,
        modifiedAt: item.modifiedAt,
      });
    }
    return acc;
  }, []);
};

let noSVG: IIcon[] = [];
let downloadError: IIcon[] = [];

const downloadSVG = async (icon: IIcon) => {
  if (!icon.downloadLink) {
    noSVG.push(icon);
    return false;
  }

  try {
    const svg = await fetch(icon.downloadLink, {
      headers: {
        Authorization: `Basic ${passphrase}`,
      },
    });

    const svgString = await svg.text();
    const optimizedSvg = optimize(svgString, svgoOptions);

    if (optimizedSvg.error) {
      throw new Error(optimizedSvg.error);
    }

    const symbolised = (optimizedSvg as OptimizedSvg).data.replace(
      /^(<svg[^>]*>)([\S\s]*)(<\/svg>)$/gim,
      '$1<symbol id="icon">$2</symbol>$3',
    );

    fs.writeFileSync(`./icons/${icon.name}`, symbolised);
    return svg;
  } catch (err) {
    downloadError.push(icon);
    console.log(`SVG Download error: ${err} @ ${icon.downloadLink}`);
  }
};

export default async () => {
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
