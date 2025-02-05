import iconSets from './iconsets.config';
import { IconSet, JsonReport } from './models/icon.model';

import { setup } from './utilities/download/setup';
import { getBaseReport, coloredLogMessage } from './utilities/shared';
import { fetchPage } from './utilities/download/fetchPage';
import { fetchFile } from './utilities/download/fetchFile';
import { format } from './utilities/download/format';
import { updateReport, writeReport } from './utilities/download/report';
import buildSVGs from './utilities/build';

import { MESSAGE_ENV_VARS_MISSING_ERROR } from './utilities/constants';

async function fetchSVGs() {
  setup();

  for (const iconSet of iconSets) {
    console.log(coloredLogMessage(`<blue>Start downloading "${iconSet.name}" icons...</blue>`));
    const report = await downloadIconSet(iconSet, getBaseReport());
    console.log(
      coloredLogMessage(
        `<blue>Downloading "${iconSet.name}" finished.</blue>\nDownloaded <green>${report.stats.success}</green> icons, <red>${report.stats.errors}</red> errored, <red>${report.stats.notFound}</red> not found.\n`,
      ),
    );
  }

  buildSVGs();
}

async function downloadIconSet(
  iconSet: IconSet,
  report: JsonReport,
  nextPage?: string,
): Promise<JsonReport> {
  const body = await fetchPage(nextPage ?? iconSet.apiUrl);

  if (body === undefined) {
    throw new Error(`Fetch icons failed, response was ${body}`);
  }

  if ('error' in body) {
    throw new Error(`Fetch icons failed: ${body.error}`);
  }

  console.log(
    coloredLogMessage(
      `<yellow>Fetching icons</yellow> ${body.offset} - ${body.offset + body.count} of ${
        body['total-count']
      }`,
    ),
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

// start fetching icons if every iconSet has an "apiUrl" defined
if (iconSets.every(iconSet => iconSet.apiUrl)) {
  fetchSVGs();
} else {
  throw new Error(MESSAGE_ENV_VARS_MISSING_ERROR);
}
