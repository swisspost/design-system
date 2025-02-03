import fs from 'fs';
import path from 'path';
import { IIconSet, IIcon, IJSONReport } from '../../models/icon.model';
import { getNameParts } from '../helpers';

export function updateReport(
  iconSet: IIconSet,
  svg: string | false,
  icon: IIcon,
  report: IJSONReport,
): IJSONReport {
  if (svg === false) {
    report.noSVG.push(icon);
  } else {
    // avoid duplicates
    const existingIconIndex = report.icons.findIndex(i => i.file.name === icon.file.name);

    if (existingIconIndex >= 0) {
      // override existing icon in report (because the file gets overridden as well)
      report.icons[existingIconIndex] = icon;
    } else {
      // add non-existing icon to report
      report.icons.push(icon);
    }

    // check for wrong viewBox in svg
    // ui icons must contain the viewBox width/height in their file.basename
    // all other icons should have a viewBox of 32
    let viewBox = '32';

    if (iconSet.name === 'ui') {
      const nameParts = getNameParts(icon.file.basename);
      viewBox = nameParts[nameParts.length - 1];
    }

    if (!svg.includes(`viewBox="0 0 ${viewBox} ${viewBox}"`)) {
      report.wrongViewBox.push(icon);
    }

    // check for keywords
    if (!icon.meta.keywords.filter(k => k).length) {
      report.noKeywords.push(icon);
    }
  }

  // check for errored
  if (icon.errored) {
    report.errored.push(icon);
  }

  return report;
}

export function writeReport(iconSet: IIconSet, report: IJSONReport) {
  report.icons = report.icons.toSorted(sortIcons);
  report.errored = report.errored.toSorted(sortIcons);
  report.noSVG = report.noSVG.toSorted(sortIcons);
  report.stats.errors = report.errored.length;
  report.stats.success = report.icons.length;
  report.stats.notFound = report.noSVG.length;

  fs.writeFileSync(
    path.join(iconSet.downloadDirectory, 'report.json'),
    JSON.stringify(report, null, 2),
  );

  return report;

  function sortIcons(a: IIcon, b: IIcon) {
    return a.file.name < b.file.name ? -1 : 1;
  }
}
