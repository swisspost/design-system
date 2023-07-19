import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'post-components',
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: '@swisspost/design-system-components',
      proxiesFile: '../components-react/src/components/stencil-generated/index.ts',
      includeDefineCustomElements: true,
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
    {
      type: 'docs-json',
      file: 'dist/docs.json',
    },
  ],
  plugins: [
    sass({
      includePaths: ['node_modules'],
    }),
  ],
  testing: {
    testPathIgnorePatterns: ['cypress'],
  },
};
