import path from 'path';
import { setup } from './setup';
import { getIconSetGroups } from './iconSetGroups';
import { writeReport } from './report';
import { coloredLogMessage } from '../shared';
import { OUTPUT_PATH, OUTPUT_PATH_ICONS, OUTPUT_PATH_SCSS } from '../constants';
import { createSvgs } from './createSvgs';
import { createScssFiles } from './createScssFiles';

const iconOutputDirectory = path.resolve(OUTPUT_PATH_ICONS);
const reportOutputDirectory = path.resolve(OUTPUT_PATH);
const scssOutputDirectory = path.resolve(OUTPUT_PATH_SCSS);

export default function buildSVGs() {
  console.log(coloredLogMessage('<blue>Building icons...</blue>'));

  setup(iconOutputDirectory, reportOutputDirectory);

  const iconSetGroups = getIconSetGroups();
  createSvgs(iconOutputDirectory, iconSetGroups);
  createScssFiles(iconOutputDirectory, scssOutputDirectory);
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
