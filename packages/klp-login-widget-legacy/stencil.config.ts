import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'klp-login-widget-legacy',
  sourceMap: true,
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'bundle',
    },
    {
      // Serves src/index.html, which the Playwright suite loads as the host page.
      type: 'www',
      serviceWorker: null,
    },
  ],
  plugins: [
    sass({
      includePaths: ['node_modules', '../../node_modules'],
    }),
  ],
  extras: {
    enableImportInjection: true,
  },
};
