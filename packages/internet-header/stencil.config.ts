import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import scss from 'rollup-plugin-scss';

export const config: Config = {
  namespace: 'swisspost-internet-header',
  globalStyle: 'src/styles.scss',
  buildEs5: 'prod',
  bundles: [
    {
      components: ['swisspost-internet-header'],
    },
  ],
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [
        {
          src: 'config/test-configuration.json',
          dest: 'config/test-configuration.json',
        },
      ],
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers,
    },
  ],
  plugins: [
    sass({
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
};
