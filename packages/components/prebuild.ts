import fs from 'fs';
import path from 'path';
import { format } from 'prettier';

interface ComponentNameOutputOptions {
  type: 'json' | 'scss';
  template: string;
  lineSeparator: string;
  // https://prettier.io/docs/options#parser
  // if formatParser is null, the parser will be derived from the "type" field above
  formatParser: 'json' | 'scss' | null;
}

const DEFAULT_OUTPUT_OPTIONS: ComponentNameOutputOptions = {
  type: 'json',
  template: '{{names}}',
  lineSeparator: ',',
  formatParser: null,
};

export const componentNameOutputOptions: Partial<ComponentNameOutputOptions>[] = [
  {
    template: '{ componentNames: [{{names}}] }',
  },
  {
    type: 'scss',
    template: '$component-names: ({{names}});',
  },
];

export async function createComponentNameOutput(
  outputOptionsArray: Partial<ComponentNameOutputOptions>[],
) {
  // Define the source and output paths
  const SOURCE_PATH: string[] = [path.resolve('src/components')];
  const OUTPUT_PATH: string = path.resolve('src/_generated');

  // Process component names
  const componentNames: string[] = SOURCE_PATH.reduce((names: string[], srcPath: string) => {
    if (fs.existsSync(srcPath)) {
      const fileNames: string[] = fs.readdirSync(srcPath);
      const camelCaseNames: string[] = fileNames.map((name: string) =>
        name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),
      );
      names.push(...camelCaseNames);
    }
    return names;
  }, []);

  // Ensure the output directory exists
  fs.mkdirSync(OUTPUT_PATH, { recursive: true });

  await Promise.all(
    outputOptionsArray.map(async (outputOptions = {}) => {
      const options: ComponentNameOutputOptions = { ...DEFAULT_OUTPUT_OPTIONS, ...outputOptions };
      const names = componentNames.map(n => `'${n}'`).join(options.lineSeparator);
      const template = options.template.replace('{{names}}', names);
      const output = await format(template, { parser: options.formatParser || options.type });

      // Write the SCSS file
      fs.writeFileSync(`${OUTPUT_PATH}/component-names.${options.type}`, output, 'utf8');
    }),
  );
}

export function copyAirDatepickerLocales() {
  // air-datepicker is in the package-level node_modules
  const SOURCE_LOCALE_PATH = path.resolve('./node_modules/air-datepicker/locale');
  const DEST_LOCALE_PATH = path.resolve('./src/components/post-date-picker/locales');

  // Clean destination directory before copying
  fs.rmSync(DEST_LOCALE_PATH, { recursive: true, force: true });
  // Ensure the destination directory exists
  fs.mkdirSync(DEST_LOCALE_PATH, { recursive: true });

  // Copy .js locale files as-is (CJS to ESM conversion is handled by @rollup/plugin-commonjs at build time)
  // and generate proper ESM .d.ts files (the originals use ambient module declarations which aren't valid ESM modules)
  if (fs.existsSync(SOURCE_LOCALE_PATH)) {
    fs.readdirSync(SOURCE_LOCALE_PATH)
      .filter(file => file.endsWith('.js'))
      .forEach(file => {
        const src = path.join(SOURCE_LOCALE_PATH, file);
        const dest = path.join(DEST_LOCALE_PATH, file);
        fs.copyFileSync(src, dest);

        // Generate a proper ESM type declaration
        const dtsPath = path.join(DEST_LOCALE_PATH, file.replace(/\.js$/, '.d.ts'));
        fs.writeFileSync(
          dtsPath,
          "import type { AirDatepickerLocale } from 'air-datepicker';\ndeclare const locale: AirDatepickerLocale;\nexport default locale;\n",
          'utf8',
        );
      });
  } else {
    console.warn('air-datepicker locale directory not found, skipping copy');
  }
}

function prebuild() {
  createComponentNameOutput(componentNameOutputOptions);
  copyAirDatepickerLocales();
}

// run prebuild automatically if script is executed directly in node
if (process.argv[0].match(/node(\.exe)?$/) && process.argv[1]?.endsWith('prebuild.ts')) {
  prebuild();
}
