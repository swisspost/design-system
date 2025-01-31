import fs from 'fs';
import { IIconSet, IIcon, IJSONReport } from './models/icon.model';
import { downloadSVG } from './utilities/downloadSVG';
import { formatResponse } from './utilities/mapResponse';
import { fetchPage } from './utilities/fetchPage';
import buildSVGs from './utilities/buildSVGs';
import { urls } from './utilities/environment';
import path from 'path';
import packageJSON from '../package.json';

import { SOURCE_PATH, OUTPUT_PATH_ICONS } from './constants';

const iconSets: IIconSet[] = [
  {
    name: 'post',
    apiUrl: urls.post,
    downloadDirectory: path.join(SOURCE_PATH, 'post'),
  },
  {
    name: 'ui',
    apiUrl: urls.ui,
    downloadDirectory: path.join(SOURCE_PATH, 'ui'),
  },
];

const iconOutputDirectory = path.join(OUTPUT_PATH_ICONS);

const baseReport: IJSONReport = {
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

  await fetchSVGs();
  buildSVGs();

  async function fetchSVGs() {
    for (const iconSet of iconSets) {
      if (iconSet.apiUrl) {
        // Start recursively downloading pages of icons
        console.log('Starting to download icons');

        const report = await downloadAllIcons(iconSet, JSON.parse(JSON.stringify(baseReport)));
        fs.writeFileSync(
          path.join(iconSet.downloadDirectory, 'report.json'),
          JSON.stringify(report, null, 2),
        );

        console.log(
          `\x1b[32mDownload finished.\x1b[0m Saved \x1b[32m${report.stats.success}\x1b[0m icons, \x1b[31m${report.stats.errors}\x1b[0m icons errored and \x1b[31m${report.stats.notFound}\x1b[0m where not found.`,
        );
      }
    }
  }
};

function setup() {
  // remove generated files & folders
  iconSets.forEach(set => {
    if (fs.existsSync(set.downloadDirectory)) fs.rmSync(set.downloadDirectory, { recursive: true });
  });
  if (fs.existsSync(iconOutputDirectory)) fs.rmSync(iconOutputDirectory, { recursive: true });

  // ensure used folders exist
  iconSets.forEach(set => {
    if (!fs.existsSync(set.downloadDirectory))
      fs.mkdirSync(set.downloadDirectory, { recursive: true });
  });
  if (!fs.existsSync(iconOutputDirectory)) fs.mkdirSync(iconOutputDirectory, { recursive: true });
}

const sortIcons = (a: IIcon, b: IIcon) => (a.file.name < b.file.name ? -1 : 1);

const downloadAllIcons = async (
  iconSet: IIconSet,
  jsonReport: IJSONReport,
  nextPage?: string,
): Promise<IJSONReport> => {
  const body = await fetchPage(nextPage ?? iconSet.apiUrl);

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
        const svg = await downloadSVG(icon, iconSet.downloadDirectory);

        if (svg === false) {
          jsonReport.noSVG.push(icon);
        } else {
          // avoid duplicates
          const existingIconIndex = jsonReport.icons.findIndex(i => i.file.name === icon.file.name);

          if (existingIconIndex >= 0) {
            jsonReport.icons[existingIconIndex] = icon;
          } else {
            jsonReport.icons.push(icon);
          }

          // check for wrong viewBox in svg
          // ui icons must contain the viewBox width/height in their file.basename
          // all other icons should have a viewBox of 32
          let viewBox = '32';

          if (iconSet.name === 'ui') {
            const iconNameParts = icon.file.basename.split('_');
            viewBox = iconNameParts[iconNameParts.length - 1];
          }

          if (!svg.includes(`viewBox="0 0 ${viewBox} ${viewBox}"`)) {
            jsonReport.wrongViewBox.push(icon);
          }

          // check for keywords
          if (!icon.meta.keywords.filter(k => k).length) {
            jsonReport.noKeywords.push(icon);
          }
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
    return downloadAllIcons(iconSet, jsonReport, body.page.next);
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
