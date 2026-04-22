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
  copyAirDatepickerLocales,
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

describe('Prebuild - Copy AirDatepicker locales', () => {
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

  it('should copy .js locale files to the destination directory', () => {
    copyAirDatepickerLocales();

    expect(memfs.existsSync(`${destDir}/en.js`)).toBe(true);
    expect(memfs.existsSync(`${destDir}/de.js`)).toBe(true);
  });

  it('should copy .js files without modifying their content', () => {
    copyAirDatepickerLocales();

    const output = memfs.readFileSync(`${destDir}/en.js`, 'utf8') as string;
    expect(output).toBe(LOCALE);
  });

  it('should generate ESM .d.ts files for each locale', () => {
    copyAirDatepickerLocales();

    const dts = memfs.readFileSync(`${destDir}/en.d.ts`, 'utf8') as string;
    expect(dts).toContain("import type { AirDatepickerLocale } from 'air-datepicker'");
    expect(dts).toContain('export default locale');
  });

  it('should only copy .js files', () => {
    copyAirDatepickerLocales();

    expect(memfs.existsSync(`${destDir}/readme.txt`)).toBe(false);
  });

  it('should warn when the source directory does not exist', () => {
    vol.reset();
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    copyAirDatepickerLocales();

    expect(consoleSpy).toHaveBeenCalledWith(
      'air-datepicker locale directory not found, skipping copy',
    );
    consoleSpy.mockRestore();
  });
});
