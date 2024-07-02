import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { config as prodConfig } from './stencil.config';

export const config: Config = {
  ...prodConfig,
  globalStyle: 'src/styles.scss',
  plugins: [
    sass({
      includePaths: ['node_modules'],
    }),
  ],
};
