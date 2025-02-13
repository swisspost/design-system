import type { SourceIcon, IconSet, SourceReport } from '../../models/icon.model';
import fs from 'fs';
import path from 'path';
import { getNameParts, sortIcons } from '../shared';

export function updateReport(
  iconSet: IconSet,
  svg: string | false,
  icon: SourceIcon,
  report: SourceReport,
): SourceReport {
  if (svg === false) {
    report.noSVG.push(icon);
  } else {
    // avoid duplicates
    const existingIconIndex = report.icons.findIndex(i => i.file.name === icon.file.name);

    if (existingIconIndex >= 0) {
      report.duplicates.push(icon);
      // override existing icon in report (because the svg file gets overridden as well)
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

export function writeReport(iconSet: IconSet, report: SourceReport) {
  report.icons.sort(sortIcons);
  report.errored.sort(sortIcons);
  report.noSVG.sort(sortIcons);
  report.wrongViewBox.sort(sortIcons);
  report.noKeywords.sort(sortIcons);
  report.stats.success = report.icons.length;
  report.stats.errors = report.errored.length;
  report.stats.noSVG = report.noSVG.length;
  report.stats.wrongViewBox = report.wrongViewBox.length;
  report.stats.noKeywords = report.noKeywords.length;
  report.stats.duplicates = report.duplicates.length;

  fs.writeFileSync(
    path.join(iconSet.downloadDirectory, 'report.json'),
    JSON.stringify(report, null, 2),
  );

  return report;
}
