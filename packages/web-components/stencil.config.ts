import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'swisspost-web-components',
  outputTargets: [
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
      file: 'dist/docs.json'
    }
  ],
  plugins: [
    sass({
      includePaths: ['node_modules'],
    }),
  ],
  testing: {
    testPathIgnorePatterns: ['cypress']
  }
};
