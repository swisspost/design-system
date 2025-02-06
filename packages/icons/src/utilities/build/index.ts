import path from 'path';
import { setup } from './setup';
import { getIconSetGroups } from './iconSetGroups';
import { createFiles } from './createFiles';
import { writeReport } from './report';
import { coloredLogMessage } from '../shared';
import { OUTPUT_PATH, OUTPUT_PATH_ICONS } from '../constants';

const iconOutputDirectory = path.resolve(OUTPUT_PATH_ICONS);
const reportOutputPath = path.join(OUTPUT_PATH, 'report.json');

export default function buildSVGs() {
  console.log(coloredLogMessage('<blue>Building icons...</blue>'));

  setup(iconOutputDirectory, reportOutputPath);

  const iconSetGroups = getIconSetGroups();
  createFiles(iconOutputDirectory, iconSetGroups);
  const report = writeReport(reportOutputPath, iconSetGroups);

  console.log(
    coloredLogMessage(
      `<blue>Build finished.</blue>\nCreated <green>${report.stats.output}</green> output icons out of <yellow>${report.stats.success}</yellow> source icons.`,
    ),
  );
}
