import path from 'path';
import { IIconSet, IJSONReport } from './models/icon.model';
import { urls } from './utilities/environment';
import { SOURCE_PATH } from './utilities/constants';

import { setup } from './utilities/download/setup';
import { getBaseReport } from './utilities/helpers';
import { fetchPage } from './utilities/download/fetchPage';
import { fetchFile } from './utilities/download/fetchFile';
import { format } from './utilities/download/format';
import { updateReport, writeReport } from './utilities/download/report';

import buildSVGs from './utilities/build';

const iconSets: IIconSet[] = [
  // {
  //   name: 'post',
  //   apiUrl: urls.post,
  //   downloadDirectory: path.join(SOURCE_PATH, 'post'),
  // },
  {
    name: 'ui',
    apiUrl: urls.ui,
    downloadDirectory: path.join(SOURCE_PATH, 'ui'),
  },
];

async function fetchSVGs() {
  setup(iconSets);

  for (const iconSet of iconSets) {
    if (iconSet.apiUrl) {
      console.log('\x1b[32mStarting to download icons...\x1b[0m');
      const report = await downloadIconSet(iconSet, getBaseReport());
      console.log(
        `\x1b[32mDownload finished.\x1b[0m Saved \x1b[32m${report.stats.success}\x1b[0m icons, \x1b[31m${report.stats.errors}\x1b[0m errored, \x1b[31m${report.stats.notFound}\x1b[0m not found.`,
      );
    }
  }

  buildSVGs();
}

async function downloadIconSet(
  iconSet: IIconSet,
  report: IJSONReport,
  nextPage?: string,
): Promise<IJSONReport> {
  const body = await fetchPage(nextPage ?? iconSet.apiUrl);

  if (body === undefined) {
    throw new Error(`Fetch icons failed, response was ${body}`);
  }

  if ('error' in body) {
    throw new Error(`Fetch icons failed: ${body.error}`);
  }

  console.log(
    `Fetching icons ${body.offset} - ${body.offset + body.count} of ${body['total-count']}`,
  );

  await Promise.all(
    format(body).map(async icon => {
      let svg: string | false = false;

      try {
        svg = await fetchFile(icon, iconSet.downloadDirectory);
      } catch (err) {
        console.log(err);
        icon.errored = true;

        if (err instanceof Error) {
          icon.errorMessage = err.message;
        }
      }

      report = updateReport(iconSet, svg, icon, report);
    }),
  );

  if (body.page.next) {
    // Recursively fetch more pages
    return downloadIconSet(iconSet, report, body.page.next);
  }

  return writeReport(iconSet, report);
}

fetchSVGs();
