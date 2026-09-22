import { defineConfig, globalIgnores } from 'eslint/config';

import post from '@swisspost/design-system-eslint-config/base';
import postNext from '@swisspost/design-system-eslint-config/next';

export default defineConfig(
  globalIgnores(['.next/']),
  post,
  postNext,

  // Pre-existing debt. Drop once sources are clean.
  {
    rules: {
      '@typescript-eslint/no-unnecessary-type-assertion': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
  },
);
