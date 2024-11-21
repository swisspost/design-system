import fs from 'fs';
import { IIcon, IJSONReport } from './models/icon.model';
import { downloadSVG } from './utilities/downloadSVG';
import { formatResponse } from './utilities/mapResponse';
import { fetchPage } from './utilities/fetchPage';
import buildSVGs from './utilities/buildSVGs';
import { url } from './utilities/environment';
import path from 'path';
import packageJSON from '../package.json';

import { SOURCE_PATH, OUTPUT_PATH } from './constants';

// v2 icons will be loaded from a different icon set (url) from censhare
const downloadUrls: (string | undefined)[] = [url];
// v2 icons will need to be saved under {SOURCE_PATH}/v2
const iconDownloadDirectories: string[] = [path.join(SOURCE_PATH, 'v1')];
// v2 icons will end up in the same output folder
// icon names of v1 icons are number-based (e.g. 1000.svg, etc.)
// while v2 icon names are letter-based (e.g. accessibility.svg, etc.)
const iconBuildDirectory: string = path.join(OUTPUT_PATH, 'post-icons');

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

export const fetchAndBuildSVGs = async () => {
  setup();

  let i = 0;

  await fetchSVGs();
  buildSVGs();

  async function fetchSVGs() {
    for (const directory of iconDownloadDirectories) {
      const downloadUrl = downloadUrls[i++];

      // Start recursively downloading pages of icons
      if (downloadUrl !== undefined) {
        console.log('Starting to download icons');

        const report = await downloadAllIcons(downloadUrl, directory);
        fs.writeFileSync(path.join(directory, 'report.json'), JSON.stringify(report, null, 2));

        console.log(
          `\x1b[32mDownload finished.\x1b[0m Saved \x1b[32m${report.stats.success}\x1b[0m icons, \x1b[31m${report.stats.errors}\x1b[0m icons errored and \x1b[31m${report.stats.notFound}\x1b[0m where not found.`,
        );
      }
    }
  }
};

function setup() {
  // remove generated files & folders
  iconDownloadDirectories.forEach(directory => {
    if (fs.existsSync(directory)) fs.rmSync(directory, { recursive: true });
  });
  if (fs.existsSync(iconBuildDirectory)) fs.rmSync(iconBuildDirectory, { recursive: true });

  // ensure used folders exist
  iconDownloadDirectories.forEach(directory => {
    if (!fs.existsSync(directory)) fs.mkdirSync(directory, { recursive: true });
  });
  if (!fs.existsSync(iconBuildDirectory)) fs.mkdirSync(iconBuildDirectory, { recursive: true });
}

const sortIcons = (a: IIcon, b: IIcon) => (a.file.name < b.file.name ? -1 : 1);

const downloadAllIcons = async (
  downloadUrl: string,
  downloadFolder: string,
): Promise<IJSONReport> => {
  const body = await fetchPage(downloadUrl);

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
        const svg = await downloadSVG(icon, downloadFolder);

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
    return downloadAllIcons(body.page.next, downloadFolder);
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
fetchAndBuildSVGs();
