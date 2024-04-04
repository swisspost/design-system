import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import scss from 'rollup-plugin-scss';

export const config: Config = {
  namespace: 'swisspost-internet-header',
  globalStyle: 'src/styles.scss',
  buildEs5: 'prod',
  sourceMap: false,
  bundles: [
    {
      components: ['swisspost-internet-header'],
    },
  ],
  outputTargets: [
    {
      type: 'dist',
      empty: false,
      esmLoaderPath: '../loader',
      copy: [
        {
          src: 'assets/config/test-configuration.json',
          dest: 'assets/config/test-configuration.json',
        },
      ],
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'bundle',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'docs-json',
      file: 'dist/docs.json',
    },
  ],
  plugins: [
    sass({
      outputStyle: 'compressed',
      includePaths: ['node_modules'],
    }),
  ],
  rollupPlugins: {
    before: [
      scss({
        output: false,
      }),
    ],
  },
  extras: {
    enableImportInjection: true,
  },
};
