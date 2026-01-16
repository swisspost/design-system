import { promises as fs } from 'node:fs';
import path from 'node:path';

const SOURCE_DIR = path.resolve(
  process.cwd(),
  'node_modules/@swisspost/design-system-icons/public/post-icons',
);
const OUTPUT_DIR = path.resolve(process.cwd(), 'src/icons-generated');

/**
 * Generate a TSX component template for a given icon.
 * @param {string} iconName
 * @param {string} svgInnerContent
 * @returns
 */
const getComponentTemplate = (iconName, base64) => `/* eslint-disable */
/* Auto-generated file. Do not edit directly. */
import * as React from "react";
import { PostIcon } from "../index.server";
import type { StencilReactComponent } from "@stencil/react-output-target/runtime";

const ${iconName}: StencilReactComponent<HTMLPostIconElement & {}> = props => (
  <PostIcon
    name="${iconName}"
    url="${`data:image/svg+xml;base64,${base64}`}"
    {...props}
  ></PostIcon>
);

export default ${iconName};
`;

/**
 * Generate an index.ts file exporting all icons.
 * @param {string[]} iconNames
 * @returns
 */
const getIndexFileTemplate = iconNames => `/* eslint-disable */
/* Auto-generated file. Do not edit directly. */
${iconNames.map(name => `export { default as ${name} } from './${name}';`).join('\n')}
`;

/**
 * Convert an SVG filename into a PascalCase React component name.
 * Numeric-leading names are prefixed to keep identifiers valid.
 */
const toComponentName = fileName => {
  const lowerName = fileName.toLowerCase();
  const baseName = lowerName.endsWith('.svg') ? fileName.slice(0, -4) : fileName;

  // Convert to PascalCase - https://stackoverflow.com/questions/4068573/how-to-convert-a-string-to-pascal-case
  const pascalCase = baseName
    .replaceAll(/([a-z])([A-Z])/g, '$1 $2') // Splits camelCase words into separate words
    .replaceAll(/[-_]+|[^\p{L}\p{N}]/gu, ' ') // Replaces dashes, underscores, and special characters with spaces
    .toLowerCase() // Converts the entire string to lowercase
    .replaceAll(/(?:^|\s)(\p{L})/gu, (_, letter) => letter.toUpperCase()) // Capitalizes the first letter of each word
    .replaceAll(/\s+/g, ''); // Removes all spaces

  return `PostIcon${pascalCase}`;
};

/**
 * Ensure that the icon source directory exists before generation.
 */
const ensureSourceDir = async () => {
  try {
    await fs.access(SOURCE_DIR);
  } catch {
    throw new Error(
      `Icon source directory not found: ${SOURCE_DIR}. Running pnpm install in the workspace could solve the issue.`,
    );
  }
};

/**
 * List SVG files from the icon source directory.
 */
const getSvgFiles = async dir => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return (
    entries
      // Filter to files only and keep SVGs, excluding v1 numeric named icons.
      .filter(
        entry =>
          entry.isFile() &&
          entry.name.endsWith('.svg') &&
          Number.isNaN(Number.parseInt(entry.name)),
      )
      .map(entry => entry.name)
      .sort()
  );
};

/**
 * Generate a TSX component file for a single SVG.
 */
const writeComponentFile = async (fileName, svgContent) => {
  const componentName = toComponentName(fileName);
  // Convert inline styles, then escape for safe template literal injection.
  const base64 = Buffer.from(svgContent.trim()).toString('base64');
  const outputPath = path.join(OUTPUT_DIR, `${componentName}.tsx`);
  const fileContent = getComponentTemplate(componentName, base64);

  await fs.writeFile(outputPath, fileContent, 'utf8');
};

/**
 * Write an index.ts file exporting all generated icons.
 * @param {string[]} iconNames
 */
const writeIconsIndexFile = async iconNames => {
  const indexContent = getIndexFileTemplate(iconNames);
  const indexPath = path.join(OUTPUT_DIR, 'index.ts');
  await fs.writeFile(indexPath, indexContent, 'utf8');
};

/**
 * Orchestrate the icon generation process from disk to TSX output.
 */
const run = async () => {
  await ensureSourceDir();
  // Clean previous generated output to keep results deterministic.
  await fs.rm(OUTPUT_DIR, { recursive: true, force: true });
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const svgFiles = await getSvgFiles(SOURCE_DIR);

  if (svgFiles.length === 0) {
    throw new Error(`No SVG files found in ${SOURCE_DIR}.`);
  }

  // Parallelize file generation for speed on large icon sets.
  await Promise.all(
    svgFiles.map(async fileName => {
      const svgPath = path.join(SOURCE_DIR, fileName);
      const svgContent = await fs.readFile(svgPath, 'utf8');
      await writeComponentFile(fileName, svgContent);
    }),
    await writeIconsIndexFile(svgFiles.map(toComponentName)),
  );

  console.log(`Generated ${svgFiles.length} icon components in ${OUTPUT_DIR}.`);
};

try {
  await run();
} catch (error) {
  console.error(error);
  process.exitCode = 1;
}
