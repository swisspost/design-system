import type { IconSet, SourceReport } from './models/icon.model';
import iconSets from './iconsets.config';
import { checkEnvVarsExist } from './utilities/environment';
import { setup } from './utilities/download/setup';
import { getBaseSourceReport, coloredLogMessage } from './utilities/shared';
import { fetchPage } from './utilities/download/fetchPage';
import { fetchFile } from './utilities/download/fetchFile';
import { format } from './utilities/download/format';
import { updateReport, writeReport } from './utilities/download/report';
import buildSVGs from './utilities/build';

async function fetchSVGs() {
  setup();

  for (const iconSet of iconSets) {
    console.log(coloredLogMessage(`<blue>Start downloading "${iconSet.name}" icons...</blue>`));
    const report = await downloadIconSet(iconSet, getBaseSourceReport());
    console.log(
      coloredLogMessage(
        `<blue>Downloading "${iconSet.name}" finished.</blue>\nDownloaded <green>${report.stats.success}</green> icons, <red>${report.stats.errors}</red> errored, <red>${report.stats.noSVG}</red> with wrong format (no SVG).\n`,
      ),
    );
  }

  buildSVGs();
}

async function downloadIconSet(
  iconSet: IconSet,
  report: SourceReport,
  nextPage?: string,
): Promise<SourceReport> {
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

if (checkEnvVarsExist()) {
  fetchSVGs();
}
