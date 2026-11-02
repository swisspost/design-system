import { defineConfig, globalIgnores } from 'eslint/config';

import post from '@swisspost/design-system-eslint-config/base';
import postJest from '@swisspost/design-system-eslint-config/jest';

export default defineConfig(
  globalIgnores(['dist/', 'public/']),
  post,
  postJest,
  {
    files: ['**/*.{spec,test}.{js,jsx,mjs,cjs,ts,tsx,mts,cts}'],
    rules: {
      'jest/expect-expect': [
        'warn',
        {
          assertFunctionNames: [
            'expect',
            'expectReportJsonStructure',
            'expectIconStructure',
            'expectMetaStructure',
            'expectFileStructure',
            'expectBuildStatsStructure',
            'expectIconStatsStructure',
            'expectDownloadStatsStructure',
            'expectIconsSortedByBasename',
          ],
        },
      ],
    },
  },

  // Pre-existing debt. Drop once sources are clean.
  {
    rules: {
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-enum-comparison': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/prefer-promise-reject-errors': 'off',
    },
  },
);
