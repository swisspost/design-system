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
const getComponentTemplate = (iconName, svgInnerContent) => `/* eslint-disable */
/* Auto-generated file. Do not edit directly. */
import * as React from "react";
import type { SVGProps } from "react";

const PostIcon${iconName} = (props: (SVGProps<SVGSVGElement> & { size?: string | number; color?: string })) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...(props.size ? { width: props.size, height: props.size } : { width: "1em", height: "1em" })}  {...props} fill={props.color ?? "currentColor"}>
    ${svgInnerContent}
  </svg>
);

export default PostIcon${iconName};
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
  const baseName = fileName.replaceAll(/\.svg$/gi, '');

  // Collapse separators into PascalCase and remove non-alphanumerics.
  const pascalCase = baseName
    .replaceAll(/(^|[^a-zA-Z0-9]+)([a-zA-Z0-9])/g, (_, __, char) => char.toUpperCase())
    .replaceAll(/[^a-zA-Z0-9]/g, '');

  return `PostIcon${pascalCase}`;
};

/**
 * Escape template literal delimiters for safe embedding in generated TSX.
 */
const escapeTemplateLiteral = value =>
  // Escape backticks and interpolation markers to avoid breaking the template string.
  value.replaceAll('`', '\\`').replaceAll('${', '\\${');

/**
 * Convert a CSS inline style string to a JSX style object literal string.
 */
const toStyleObjectLiteral = styleValue => {
  // Split and normalize the inline style declaration list.
  const entries = styleValue
    .split(';')
    .map(entry => entry.trim())
    .filter(Boolean);

  const pairs = entries
    .map(entry => {
      // Preserve colons in values by rejoining the remainder.
      const [prop, ...rest] = entry.split(':');
      if (!prop || rest.length === 0) return null;
      // Convert kebab-case CSS property names to camelCase for JSX.
      const key = prop.trim().replaceAll(/-([a-z])/g, (_, c) => c.toUpperCase());
      const value = rest
        .join(':')
        .trim()
        // Escape quotes inside the style value for safe string output.
        .replaceAll('"', String.raw`\"`);
      return `${key}: "${value}"`;
    })
    .filter(Boolean);

  return pairs.join(', ');
};

/**
 * Escape raw CSS text so it can live inside a JSX string literal.
 */
const escapeCssForJsxString = styleContent =>
  // Escape backslashes, quotes, and newlines for a safe JS string literal.
  styleContent
    .replaceAll('\\', '\\\\')
    .replaceAll('"', String.raw`\"`)
    .replaceAll('\r\n', '\n')
    .replaceAll('\n', String.raw`\n`);

/**
 * Convert inline style attributes and <style> tags to JSX-compatible output.
 */
const convertSvgMarkupToJsx = svgContent => {
  return (
    svgContent
      // Strip the outer <svg> wrapper so only inner markup is returned.
      .replaceAll(/^\s*<svg[^>]*>/gi, '')
      .replaceAll(/<\/svg>\s*$/gi, '')

      // Convert <style> tag content into JSX string literals.
      .replaceAll(/<style(\s[^>]*)?>([\s\S]*?)<\/style>/gi, (_, attrs, styleContent) => {
        const escapedContent = escapeCssForJsxString(styleContent);
        return `<style${attrs || ''}>{"${escapedContent}"}</style>`;
      })

      // Convert class attributes to JSX className.
      .replaceAll(/\sclass=(['"])([^'"]*)\1/g, (_, __, classValue) =>
        classValue ? ` className="${classValue}"` : '',
      )

      // Convert inline style attributes from CSS string to JSX object literal.
      .replaceAll(/\sstyle=(["'])([^"']*)\1/g, (_, __, styleValue) => {
        const styleLiteral = toStyleObjectLiteral(styleValue);
        return styleLiteral ? ` style={{ ${styleLiteral} }}` : '';
      })
  );
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
  const jsxContent = escapeTemplateLiteral(convertSvgMarkupToJsx(svgContent.trim()));
  const outputPath = path.join(OUTPUT_DIR, `${componentName}.tsx`);
  const fileContent = getComponentTemplate(componentName, jsxContent);

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
