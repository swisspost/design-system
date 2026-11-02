import { defineConfig, globalIgnores } from 'eslint/config';

import post from '@swisspost/design-system-eslint-config/base';

export default defineConfig(globalIgnores(['dist/', 'out-tsc/']), post, {
  // Pre-existing debt. Drop once sources are clean.
  rules: {
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/require-await': 'off',
  },
});
