import fs from 'fs';
import mockFs from 'mock-fs';
import { createComponentNameOutput, componentNameOutputOptions } from './prebuild';

describe('prebuild', () => {
  it('should read out component folders', async () => {
    mockFs({
      'src/components': {
        'post-accordion': {},
        'post-avatar': {},
        'post-back-to-tlop': {},
        'post-breadcrumbs': {},
        'post-breadcrumbs-item': {},
        'post-123-component': {},
        'some-other-folder': {},
        'folder_name_with_different_notation': {},
      },
      'src/_generated': {},
    });

    await createComponentNameOutput(componentNameOutputOptions);

    const componentNamesJson = fs.readFileSync('src/_generated/component-names.json', 'utf8');
    const componentNamesScss = fs.readFileSync('src/_generated/component-names.scss', 'utf8');

    mockFs.restore();

    expect(componentNamesJson).toMatchSnapshot();
    expect(componentNamesScss).toMatchSnapshot();
  });
});
