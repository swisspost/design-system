import fs from 'fs';
import path from 'path';
import { format } from 'prettier';
import { coloredLogMessage } from '../shared';

function sanitizeForCSSVariable(name: string): string {
  return name.replace(/[^a-zA-Z0-9_-]/g, '-');
}

function svgToDataUrl(svgContent: string): string {
  const base64 = Buffer.from(svgContent, 'utf8').toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

function getExistingCssFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir).filter(f => f.endsWith('.css'));
}

function removeStaleCssFiles(
  dir: string,
  existingFiles: string[],
  generatedFiles: Set<string>,
): number {
  const staleFiles = existingFiles.filter(file => !generatedFiles.has(file));
  staleFiles.forEach((file: string) => fs.unlinkSync(path.join(dir, file)));
  return staleFiles.length;
}

export async function createCssFiles(
  iconOutputDirectory: string,
  cssOutputDirectory: string,
): Promise<void> {
  fs.mkdirSync(cssOutputDirectory, { recursive: true });

  const existingFiles = getExistingCssFiles(cssOutputDirectory);
  const svgFiles = fs.readdirSync(iconOutputDirectory).filter(f => f.endsWith('.svg'));
  const generatedFiles = new Set<string>();

  let createdCount = 0;

  await Promise.all(
    svgFiles.map(async file => {
      const filePath = path.join(iconOutputDirectory, file);
      const baseName = sanitizeForCSSVariable(path.parse(file).name);
      const cssFileName = `${baseName}.css`;
      const svgContent = fs.readFileSync(filePath, 'utf8');

      let cssContent = `:root, :host{ --post-icon-${baseName}: url("${svgToDataUrl(svgContent)}"); }`;

      cssContent = await format(cssContent, { parser: 'css' });

      fs.writeFileSync(path.join(cssOutputDirectory, cssFileName), cssContent);
      generatedFiles.add(cssFileName);
      createdCount++;
    }),
  );

  const removedCount = removeStaleCssFiles(cssOutputDirectory, existingFiles, generatedFiles);

  console.log(
    coloredLogMessage(
      `<green>[createCSSFiles]</green> Created ${createdCount} CSS files (removed <red>${removedCount}</red> old files)`,
    ),
  );
}
