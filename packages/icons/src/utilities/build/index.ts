import path from 'path';
import { setup } from './setup';
import { getIconSetGroups } from './iconSetGroups';
import { createFiles } from './createFiles';
import { writeReport } from './report';

import { OUTPUT_PATH, OUTPUT_PATH_ICONS } from '../constants';

const iconOutputDirectory = path.resolve(OUTPUT_PATH_ICONS);
const reportOutputPath = path.join(OUTPUT_PATH, 'report.json');

export default function buildSVGs() {
  console.log('\n\x1b[32mStarting to build icons...\x1b[0m');

  setup(iconOutputDirectory, reportOutputPath);

  const iconSetGroups = getIconSetGroups();
  createFiles(iconOutputDirectory, iconSetGroups);
  const report = writeReport(reportOutputPath, iconSetGroups);

  console.log(
    `\x1b[32mBuild finished.\x1b[0m Created \x1b[32m${report.stats.output}\x1b[0m output icons out of \x1b[32m${report.stats.success}\x1b[0m source icons.`,
  );
}
