import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'post-components',
  plugins: [
    sass({
      outputStyle: 'compressed',
      includePaths: ['node_modules'],
    }),
  ],
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'single-export-module',
    },
    {
      type: 'docs-json',
      file: 'dist/docs.json',
    },
    {
      type: 'docs-readme',
    },
    reactOutputTarget({
      componentCorePackage: '@swisspost/design-system-components',
      proxiesFile: '../components-react/src/components/stencil-generated/index.ts',
      includeDefineCustomElements: true,
    }),
  ],
  testing: {
    testPathIgnorePatterns: ['cypress'],
  },
};
