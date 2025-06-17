import fs from 'fs';
import mockFs from 'mock-fs';
import { createComponentNamesScssMap } from './prebuild';

describe('prebuild', () => {
  it('should read out component folders', () => {
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
      'src/styles/generated': {},
    });

    createComponentNamesScssMap();
    const componentNamesScssMap = fs.readFileSync(
      'src/styles/generated/component-names.scss',
      'utf8',
    );

    mockFs.restore();

    expect(componentNamesScssMap).toMatchSnapshot();
  });
});
