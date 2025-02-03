import fs from 'fs';

export function setup(iconOutputDirectory: string, buildReportOutputPath: string) {
  // remove generated files & folders
  if (fs.existsSync(iconOutputDirectory)) fs.rmSync(iconOutputDirectory, { recursive: true });
  if (fs.existsSync(buildReportOutputPath)) fs.unlinkSync(buildReportOutputPath);

  // // ensure used folders exist
  if (!fs.existsSync(iconOutputDirectory)) fs.mkdirSync(iconOutputDirectory, { recursive: true });
}
