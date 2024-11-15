import fs from 'fs';
import { IIcon, IJSONReport } from './models/icon.model';
import { downloadSVG } from './utilities/downloadSVG';
import { formatResponse } from './utilities/mapResponse';
import { fetchPage } from './utilities/fetchPage';
import createUIIcons from './utilities/uiIcons';
import { url } from './utilities/environment';
import path from 'path';
import packageJSON from '../package.json';

import { SOURCE_PATH, OUTPUT_PATH } from './constants';

const iconDownloadPath = path.join(SOURCE_PATH, 'v1');
const iconOutputPath = path.join(OUTPUT_PATH, 'post-icons');
const reportOutputPath = path.join(OUTPUT_PATH, 'report.json');

const jsonReport: IJSONReport = {
  icons: [],
  wrongViewBox: [],
  noKeywords: [],
  noSVG: [],
  errored: [],
  created: new Date(),
  stats: {
    errors: 0,
    notFound: 0,
    success: 0,
  },
  version: packageJSON.version,
};

export const main = async () => {
  setup();

  // Start recursively downloading pages of icons
  if (url !== undefined) {
    console.log('Starting to download icons');

    const report = await downloadAllIcons(url);
    fs.writeFileSync(path.join(OUTPUT_PATH, 'report.json'), JSON.stringify(report, null, 2));

    console.log(
      `\x1b[32mDownload finished.\x1b[0m Saved \x1b[32m${report.stats.success}\x1b[0m icons, \x1b[31m${report.stats.errors}\x1b[0m icons errored and \x1b[31m${report.stats.notFound}\x1b[0m where not found.`,
    );
  }

  createUIIcons();
};

function setup() {
  // remove generated files & folders
  if (fs.existsSync(iconDownloadPath)) fs.rmSync(iconDownloadPath, { recursive: true });
  if (fs.existsSync(iconOutputPath)) fs.rmSync(iconOutputPath, { recursive: true });
  if (fs.existsSync(reportOutputPath)) fs.unlinkSync(reportOutputPath);

  // ensure used folders exist
  if (!fs.existsSync(iconDownloadPath)) fs.mkdirSync(iconDownloadPath, { recursive: true });
  if (!fs.existsSync(iconOutputPath)) fs.mkdirSync(iconOutputPath, { recursive: true });
}

const sortIcons = (a: IIcon, b: IIcon) => (a.file.name < b.file.name ? -1 : 1);

const downloadAllIcons = async (currentUrl: string): Promise<IJSONReport> => {
  const body = await fetchPage(currentUrl);

  if (body === undefined) {
    throw new Error(`Fetch icons failed, response was ${body}`);
  }

  if ('error' in body) {
    throw new Error(`Fetch icons failed: ${body.error}`);
  }

  const formattedResponse = formatResponse(body);

  // Fetch SVGs
  console.log(
    `Fetching icons ${body.offset} - ${body.offset + body.count} of ${body['total-count']}`,
  );
  await Promise.all(
    formattedResponse.map(async icon => {
      try {
        const svg = await downloadSVG(icon, iconDownloadPath);

        if (svg === false) {
          jsonReport.noSVG.push(icon);
        } else {
          jsonReport.icons.push(icon);
          if (!svg.includes('viewBox="0 0 32 32"')) jsonReport.wrongViewBox.push(icon);
          if (!icon.meta.keywords.filter(k => k).length) jsonReport.noKeywords.push(icon);
        }
      } catch (err) {
        console.log(err);
        if (err instanceof Error) {
          icon.errorMessage = err.message;
        }
        jsonReport.errored.push(icon);
      }
    }),
  );

  if (body.page.next) {
    // Recursively fetch more pages
    return downloadAllIcons(body.page.next);
  } else {
    // Write JSON
    jsonReport.icons = [...jsonReport.icons].sort(sortIcons);
    jsonReport.errored = [...jsonReport.errored].sort(sortIcons);
    jsonReport.noSVG = [...jsonReport.noSVG].sort(sortIcons);
    jsonReport.stats.errors = jsonReport.errored.length;
    jsonReport.stats.success = jsonReport.icons.length;
    jsonReport.stats.notFound = jsonReport.noSVG.length;
  }

  return jsonReport;
};

// Run Forest, run
main();
