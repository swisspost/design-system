import fs from 'node:fs';
import { vol, fs as memfs } from 'memfs';

const LOCALE = fs.readFileSync('./node_modules/air-datepicker/locale/en.js', 'utf8');

// Mock the built-in 'fs' module so all fs calls inside prebuild use memfs
jest.mock('fs', () => memfs);

// Mock prettier to avoid triggering dynamic import inside Jest VM (Prettier v3 ESM)
jest.mock('prettier', () => ({
  format: (code: string) => code,
}));

import {
  createComponentNameOutput,
  componentNameOutputOptions,
  copyAndConvertAirDatepickerLocales,
} from './prebuild';

describe('Prebuild - ComponentNames', () => {
  beforeEach(() => {
    vol.reset();
    // Create directory structure; null values create directories in vol.fromJSON
    vol.fromJSON(
      {
        'folder_name_with_different_notation': '',
        'post-123-component': '',
        'post-accordion': '',
        'post-avatar': '',
        'post-back-to-tlop': '',
        'post-breadcrumbs': '',
        'post-breadcrumbs-item': '',
        'some-other-folder': '',
      },
      'src/components/',
    );
  });

  afterEach(() => {
    vol.reset();
  });

  it('should read out component folders', async () => {
    await createComponentNameOutput(componentNameOutputOptions);

    const componentNamesJson = memfs.readFileSync('src/_generated/component-names.json', 'utf8');
    const componentNamesScss = memfs.readFileSync('src/_generated/component-names.scss', 'utf8');

    expect(componentNamesJson).toMatchSnapshot();
    expect(componentNamesScss).toMatchSnapshot();
  });
});

describe('Prebuild - Copy and convert AirDatepicker locales', () => {
  const sourceDir = 'node_modules/air-datepicker/locale';
  const destDir = 'src/components/post-date-picker/locales';

  beforeEach(() => {
    vol.reset();
    vol.fromJSON(
      {
        'en.js': LOCALE,
        'de.js': LOCALE,
        'readme.txt': 'not a locale file',
      },
      sourceDir,
    );
  });

  afterEach(() => {
    vol.reset();
  });

  it('should write all .js locale files to the destination directory', () => {
    copyAndConvertAirDatepickerLocales();

    expect(memfs.existsSync(`${destDir}/en.js`)).toBe(true);
    expect(memfs.existsSync(`${destDir}/de.js`)).toBe(true);
  });

  it('should convert CJS syntax to ESM syntax', () => {
    copyAndConvertAirDatepickerLocales();

    const output = memfs.readFileSync(`${destDir}/en.js`, 'utf8') as string;

    expect(output).not.toContain('"use strict"');
    expect(output).not.toContain('Object.defineProperty');
    expect(output).not.toContain('exports.default = void 0');
    expect(output).not.toContain('var _default');
    expect(output).toContain('const _default =');
    expect(output).toContain('export default _default;');
  });

  it('should only process .js files', () => {
    copyAndConvertAirDatepickerLocales();

    expect(memfs.existsSync(`${destDir}/readme.txt`)).toBe(false);
  });

  it('should warn when the source directory does not exist', () => {
    vol.reset();
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    copyAndConvertAirDatepickerLocales();

    expect(consoleSpy).toHaveBeenCalledWith(
      'air-datepicker locale directory not found, skipping conversion',
    );
    consoleSpy.mockRestore();
  });
});
