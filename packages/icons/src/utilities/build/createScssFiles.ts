import fs from 'fs';
import path from 'path';
import { coloredLogMessage } from '../shared';

function sanitizeForCSSVariable(name: string): string {
  return name.replace(/[^a-zA-Z0-9_-]/g, '-');
}

function svgToDataUrl(svgContent: string): string {
  const base64 = Buffer.from(svgContent, 'utf8').toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

function removeExistingScssFiles(dir: string): number {
  if (!fs.existsSync(dir)) return 0;

  const existingFiles = fs.readdirSync(dir).filter(f => f.endsWith('.scss'));
  existingFiles.forEach(file => fs.unlinkSync(path.join(dir, file)));
  return existingFiles.length;
}

export function createScssFiles(iconOutputDirectory: string, scssOutputDirectory: string): void {
  fs.mkdirSync(scssOutputDirectory, { recursive: true });

  const removedCount = removeExistingScssFiles(scssOutputDirectory);

  const svgFiles = fs.readdirSync(iconOutputDirectory)
    .filter(f => f.endsWith('.svg'));

  let createdCount = 0;

  svgFiles.forEach(file => {
    const filePath = path.join(iconOutputDirectory, file);
    const baseName = sanitizeForCSSVariable(path.parse(file).name);
    const svgContent = fs.readFileSync(filePath, 'utf8');

    const scssContent = `:root {
  --post-icon-${baseName}: url("${svgToDataUrl(svgContent)}");
}
`;

    fs.writeFileSync(path.join(scssOutputDirectory, `${baseName}.scss`), scssContent);
    createdCount++;
  });

  console.log(
    coloredLogMessage(
      `<green>[createSCSSFiles]</green> Created ${createdCount} SCSS files (removed <red>${removedCount}</red> old files)`
    )
  );
}
