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

function prebuild() {
  createComponentNameOutput(componentNameOutputOptions);
}

prebuild();
