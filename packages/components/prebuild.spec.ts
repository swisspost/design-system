import { vol, fs as memfs } from 'memfs';

// Mock the built-in 'fs' module so all fs calls inside prebuild use memfs
jest.mock('fs', () => memfs);

// Mock prettier to avoid triggering dynamic import inside Jest VM (Prettier v3 ESM)
jest.mock('prettier', () => ({
  format: (code: string) => code,
}));

import { createComponentNameOutput, componentNameOutputOptions } from './prebuild';

describe('prebuild', () => {
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
        'some-other-folder': ''
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
