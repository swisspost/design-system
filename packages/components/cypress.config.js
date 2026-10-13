import { defineConfig } from 'cypress';

import post from '@swisspost/design-system-cypress-config';

import pkg from './package.json' with { type: 'json' };

export default defineConfig({
  ...post,
  e2e: {
    ...post.e2e,
    baseUrl: 'http://localhost:9001',
    expose: {
      PACKAGE_VERSION: pkg.version,
    },
  },
});
