import fs from 'fs';
import path from 'path';
import { format } from 'prettier';
import { coloredLogMessage } from '../../shared';

function sanitizeForCSSVariable(name: string): string {
  return name.replace(/[^a-zA-Z0-9_-]/g, '-');
}

function svgToDataUrl(svgContent: string): string {
  const base64 = Buffer.from(svgContent, 'utf8').toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

function removeExistingCssFiles(dir: string): number {
  if (!fs.existsSync(dir)) return 0;

  const existingFiles = fs.readdirSync(dir).filter(f => f.endsWith('.css'));
  existingFiles.forEach(file => fs.unlinkSync(path.join(dir, file)));
  return existingFiles.length;
}

export async function createCssFiles(
  iconOutputDirectory: string,
  cssOutputDirectory: string,
): Promise<void> {
  fs.mkdirSync(cssOutputDirectory, { recursive: true });

  const removedCount = removeExistingCssFiles(cssOutputDirectory);

  const svgFiles = fs.readdirSync(iconOutputDirectory).filter(f => f.endsWith('.svg'));

  let createdCount = 0;

  await Promise.all(
    svgFiles.map(async file => {
      const filePath = path.join(iconOutputDirectory, file);
      const baseName = sanitizeForCSSVariable(path.parse(file).name);
      const svgContent = fs.readFileSync(filePath, 'utf8');

      let cssContent = `:root { --post-icon-${baseName}: url("${svgToDataUrl(svgContent)}"); }`;

      cssContent = await format(cssContent, { parser: 'css' });

      fs.writeFileSync(path.join(cssOutputDirectory, `${baseName}.css`), cssContent);
      createdCount++;
    }),
  );

  console.log(
    coloredLogMessage(
      `<green>[createCSSFiles]</green> Created ${createdCount} CSS files (removed <red>${removedCount}</red> old files)`,
    ),
  );
}
