import { defineConfig, globalIgnores } from 'eslint/config';

import post from '@swisspost/design-system-eslint-config/base';
import postCypress from '@swisspost/design-system-eslint-config/cypress';
import postJest from '@swisspost/design-system-eslint-config/jest';
import postStencil from '@swisspost/design-system-eslint-config/stencil';

export default defineConfig(
  globalIgnores(['dist/', 'loader/', 'www/', 'src/assets/', 'stencil.config*.ts']),
  post,
  postStencil,
  postCypress,
  postJest,
  {
    files: ['**/*.{ts,tsx,mts,cts}'],
    rules: {
      // The internet header predates the `post-` element prefix convention.
      'stencil/required-prefix': ['error', ['swisspost-']],
      'stencil/class-pattern': 'off',
    },
  },

  // Pre-existing debt. Drop once sources are clean.
  {
    rules: {
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      '@typescript-eslint/no-unnecessary-type-assertion': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/unbound-method': 'off',
      'stencil/ban-side-effects': 'off',
      'cypress/unsafe-to-chain-command': 'off',
    },
  },
);
