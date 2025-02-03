import path from 'path';
import { setup } from './setup';
import { getFileGroups } from './fileGroups';
import { createFiles } from './createFiles';
import { writeReport } from './report';

import { SOURCE_PATH, OUTPUT_PATH, OUTPUT_PATH_ICONS } from '../constants';

const iconSourceDirectory = SOURCE_PATH;
const iconOutputDirectory = path.join(OUTPUT_PATH_ICONS);
const buildReportOutputPath = path.join(OUTPUT_PATH, 'report.json');

export default function buildSVGs() {
  console.log('\nCreating output icons...');

  setup(iconOutputDirectory, buildReportOutputPath);

  const groupedFilePaths = getFileGroups(iconSourceDirectory);
  createFiles(iconSourceDirectory, iconOutputDirectory, groupedFilePaths);
  const report = writeReport(iconSourceDirectory, buildReportOutputPath);

  console.log(
    `\x1b[32mOutput icons created.\x1b[0m Saved \x1b[32m${report.stats.success}\x1b[0m icons, \x1b[31m${report.stats.errors}\x1b[0m icons errored and \x1b[31m${report.stats.notFound}\x1b[0m where not found.`,
  );
}
