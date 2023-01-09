import fs from 'fs';
import { IJSONReport } from './models/icon.model';
import { downloadSVG } from './utilities/downloadSVG';
import { mapResponse } from './utilities/mapResponse';
import { fetchPage } from './utilities/fetchPage';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const url = process.env.CEN_URL;
const user = process.env.CEN_USERNAME;
const pw = process.env.CEN_PASSWORD;
const outputPath = './public/svg';
export const passphrase = Buffer.from(`${user}:${pw}`).toString('base64');

const jsonReport: IJSONReport = {
  icons: [],
  noSVG: [],
  errored: [],
  created: new Date(),
  stats: {
    errors: 0,
    notFound: 0,
    success: 0,
  },
};

const fetch = async (currentUrl: string): Promise<IJSONReport> => {
  try {
    const body = await fetchPage(currentUrl);

    if (body === undefined) {
      throw new Error(`Fetch icons failed, response was ${body}`);
    }

    if ('error' in body) {
      throw new Error(`Fetch icons failed: ${body.error}`);
    }

    const mappedResponse = mapResponse(body);

    // Fetch SVGs
    console.log(
      `Fetching icons ${body.offset} - ${body.offset + body.count} of ${body['total-count']}`,
    );
    await Promise.all(
      mappedResponse.map(async icon => {
        try {
          const svg = await downloadSVG(icon, outputPath);

          if (svg === false) {
            jsonReport.noSVG.push(icon);
          } else {
            jsonReport.icons.push(icon);
          }
        } catch {
          jsonReport.errored.push(icon);
        }
      }),
    );

    if (body.page.next) {
      // Recursively fetch more pages
      return fetch(body.page.next);
    } else {
      // Write JSON
      jsonReport.errored = jsonReport.errored.sort((a, b) => (a.name < b.name ? 1 : -1));
      jsonReport.stats.errors = jsonReport.errored.length;
      jsonReport.stats.success = jsonReport.icons.length;
      jsonReport.stats.notFound = jsonReport.noSVG.length;
    }
  } catch (error) {
    console.error(error);
  }

  return jsonReport;
};

export const main = async () => {
  // Setup environment
  if (!fs.existsSync(outputPath)) fs.mkdirSync(outputPath, { recursive: true });

  // Start recursively downloading pages of icons
  if (url !== undefined) {
    console.log('Starting to download icons');
    const report = await fetch(url);
    fs.writeFile(
      path.join(outputPath, 'icons.json'),
      JSON.stringify(report, null, 2),
      {},
      () => {},
    );
    console.log(
      `Download finished. Saved ${report.stats.success} icons, ${report.stats.errors} icons errored and ${report.stats.notFound} where not found.`,
    );
  }
};

// Run Forest, run
main();
