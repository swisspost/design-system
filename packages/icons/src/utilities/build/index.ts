import path from 'path';
import { setup } from './setup';
import { getIconSetGroups } from './iconSetGroups';
import { createFiles } from './createFiles';
import { writeReport } from './report';
import { coloredLogMessage } from '../shared';
import { OUTPUT_PATH, OUTPUT_PATH_ICONS } from '../constants';

const iconOutputDirectory = path.resolve(OUTPUT_PATH_ICONS);
const reportOutputDirectory = path.resolve(OUTPUT_PATH);

export default function buildSVGs() {
  console.log(coloredLogMessage('<blue>Building icons...</blue>'));

  setup(iconOutputDirectory, reportOutputDirectory);

  const iconSetGroups = getIconSetGroups();
  createFiles(iconOutputDirectory, iconSetGroups);
  const report = writeReport(reportOutputDirectory, iconSetGroups);

  console.log(
    coloredLogMessage(
      `<blue>Build finished.</blue>\nCreated <green>${
        report.icons.length
      }</green> output icons out of <yellow>${report.stats.sources}</yellow> source icons, <red>${
        report.icons.length - report.stats.success
      }</red> with one or more issues.`,
    ),
  );
}
