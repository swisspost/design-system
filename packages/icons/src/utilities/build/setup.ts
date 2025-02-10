import fs from 'fs';
import path from 'path';

export function setup(iconOutputDirectory: string, reportOutputDirectory: string) {
  const reportOutputPath = path.join(reportOutputDirectory, 'report.json');
  const minimalReportOutputPath = path.join(reportOutputDirectory, 'report.min.json');

  // remove output folders & files
  if (fs.existsSync(iconOutputDirectory)) {
    fs.rmSync(iconOutputDirectory, { recursive: true });
  }
  if (fs.existsSync(reportOutputPath)) {
    fs.unlinkSync(reportOutputPath);
  }
  if (fs.existsSync(minimalReportOutputPath)) {
    fs.unlinkSync(minimalReportOutputPath);
  }

  // // ensure output folders exist
  if (!fs.existsSync(iconOutputDirectory)) {
    fs.mkdirSync(iconOutputDirectory, { recursive: true });
  }
}
