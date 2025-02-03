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
  console.log('\n\x1b[32mStarting to build icons...\x1b[0m');

  setup(iconOutputDirectory, buildReportOutputPath);

  const fileGroups = getFileGroups(iconSourceDirectory);
  createFiles(iconSourceDirectory, iconOutputDirectory, fileGroups);
  const report = writeReport(iconSourceDirectory, buildReportOutputPath, fileGroups);

  console.log(
    `\x1b[32mBuild finished.\x1b[0m Saved \x1b[32m${report.stats.success}\x1b[0m icons, \x1b[31m${report.stats.errors}\x1b[0m errored, \x1b[31m${report.stats.notFound}\x1b[0m not found.`,
  );
}
