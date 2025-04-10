import fs from 'fs';
import path from 'path';

// Define the source and output paths
const SOURCE_PATH: string[] = [path.resolve('src/components')];
const OUTPUT_PATH: string = path.resolve('src/styles/generated');

// Process component names
const webComponentNames: string[] = SOURCE_PATH.reduce((names: string[], srcPath: string) => {
  if (fs.existsSync(srcPath)) {
    const componentNames: string[] = fs.readdirSync(srcPath);
    const camelCaseNames: string[] = componentNames.map((name: string) =>
      name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),
    );
    names.push(...camelCaseNames);
  }
  return names;
}, []);

// Generate the SCSS output
const output: string = `$component-names: (\n  ${webComponentNames.join(',\n  ')}\n);\n`;

// Ensure the output directory exists
fs.mkdirSync(OUTPUT_PATH, { recursive: true });

// Write the SCSS file
fs.writeFileSync(`${OUTPUT_PATH}/component-names.scss`, output, 'utf8');
