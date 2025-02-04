import fs from 'fs';

export function setup(iconOutputDirectory: string, reportOutputPath: string) {
  // remove output folders & files
  if (fs.existsSync(iconOutputDirectory)) {
    fs.rmSync(iconOutputDirectory, { recursive: true });
  }
  if (fs.existsSync(reportOutputPath)) {
    fs.unlinkSync(reportOutputPath);
  }

  // // ensure output folders exist
  if (!fs.existsSync(iconOutputDirectory)) {
    fs.mkdirSync(iconOutputDirectory, { recursive: true });
  }
}
