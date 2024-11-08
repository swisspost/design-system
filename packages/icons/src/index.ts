import fs from 'fs';
import { IIcon, IJSONReport } from './models/icon.model';
import { downloadSVG } from './utilities/downloadSVG';
import { formatResponse } from './utilities/mapResponse';
import { fetchPage } from './utilities/fetchPage';
import createSprites from './utilities/createSprites';
import { url } from './utilities/environment';
import path from 'path';
import packageJSON from '../package.json';

const outputPath = './public/post-icons';
const reportPath = './public';

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
  // await Promise.all(
  //   formattedResponse.map(async icon => {
  //     try {
  //       const svg = await downloadSVG(icon, outputPath);

  //       if (svg === false) {
  //         jsonReport.noSVG.push(icon);
  //       } else {
  //         jsonReport.icons.push(icon);
  //         if (!svg.includes('viewBox="0 0 32 32"')) jsonReport.wrongViewBox.push(icon);
  //         if (!icon.meta.keywords.filter(k => k).length) jsonReport.noKeywords.push(icon);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       if (err instanceof Error) {
  //         icon.errorMessage = err.message;
  //       }
  //       jsonReport.errored.push(icon);
  //     }
  //   }),
  // );

  // if (body.page.next) {
  //   // Recursively fetch more pages
  //   return downloadAllIcons(body.page.next);
  // } else {
  //   // Write JSON
  //   jsonReport.icons = [...jsonReport.icons].sort(sortIcons);
  //   jsonReport.errored = [...jsonReport.errored].sort(sortIcons);
  //   jsonReport.noSVG = [...jsonReport.noSVG].sort(sortIcons);
  //   jsonReport.stats.errors = jsonReport.errored.length;
  //   jsonReport.stats.success = jsonReport.icons.length;
  //   jsonReport.stats.notFound = jsonReport.noSVG.length;

  // }
  await createSprites();

  return jsonReport;
};

const sortIcons = (a: IIcon, b: IIcon) => (a.file.name < b.file.name ? -1 : 1);

export const main = async () => {
  // Setup environment
  if (!fs.existsSync(outputPath)) fs.mkdirSync(outputPath, { recursive: true });

  // Start recursively downloading pages of icons
  if (url !== undefined) {
    console.log('Starting to download icons');
    const report = await downloadAllIcons(url);
    fs.writeFileSync(path.join(reportPath, 'report.json'), JSON.stringify(report, null, 2));
    console.log(
      `Download finished. Saved ${report.stats.success} icons, ${report.stats.errors} icons errored and ${report.stats.notFound} where not found.`,
    );
  }
};

// Run Forest, run
main();
