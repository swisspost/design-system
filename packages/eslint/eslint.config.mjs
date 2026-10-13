import { defineConfig, globalIgnores } from 'eslint/config';

import post from '@swisspost/design-system-eslint-config/base';
import postJest from '@swisspost/design-system-eslint-config/jest';

export default defineConfig(
  globalIgnores(['dist/', 'out-tsc/', 'eslint.play.js']),
  post,
  postJest,

  // Pre-existing debt. Drop once sources are clean.
  {
    rules: {
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-enum-comparison': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
    },
  },
);
