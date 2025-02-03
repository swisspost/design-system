import fs from 'fs';
import path from 'path';
import { version } from '../../../package.json';
import { IJSONReport } from '../../models/icon.model';
import { getBaseReport } from '../helpers';

export function writeReport(
  iconSourceDirectory: string,
  buildReportOutputPath: string,
): IJSONReport {
  const filePaths = fs
    .readdirSync(iconSourceDirectory, { recursive: true })
    .map(p => p.toString())
    .filter(p => path.basename(p) === 'report.json');

  const aggregatedReport = filePaths.reduce(
    (report: IJSONReport, filePath: string): IJSONReport => {
      const file = JSON.parse(fs.readFileSync(path.join(iconSourceDirectory, filePath), 'utf-8'));

      return {
        icons: [...report.icons, ...(file.icons ?? [])],
        wrongViewBox: [...report.wrongViewBox, ...(file.wrongViewBox ?? [])],
        noKeywords: [...report.noKeywords, ...(file.noKeywords ?? [])],
        noSVG: [...report.noSVG, ...(file.noSVG ?? [])],
        errored: [...report.errored, ...(file.errored ?? [])],
        stats: {
          errors: report.stats.errors + file.stats.errors,
          notFound: report.stats.notFound + file.stats.notFound,
          success: report.stats.success + file.stats.success,
        },
        created: report.created,
        version: report.version,
      };
    },
    getBaseReport(),
  );

  aggregatedReport.created = new Date();
  aggregatedReport.version = version;

  fs.writeFileSync(buildReportOutputPath, JSON.stringify(aggregatedReport, null, 2));

  return aggregatedReport;
}
