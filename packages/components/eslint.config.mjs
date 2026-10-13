import { defineConfig, globalIgnores } from 'eslint/config';

import post from '@swisspost/design-system-eslint-config/base';
import postCypress from '@swisspost/design-system-eslint-config/cypress';
import postJest from '@swisspost/design-system-eslint-config/jest';
import postStencil from '@swisspost/design-system-eslint-config/stencil';
import postUnicorn from '@swisspost/design-system-eslint-config/unicorn';

import postDesignSystem from '@swisspost/design-system-eslint';

export default defineConfig(
  globalIgnores([
    'dist/',
    'hydrate/',
    'loader/',
    'loaders/',
    'www/',
    'coverage/',
    'src/_generated/',
    'src/styles/generated/',
    'prebuild.ts',
    'stencil.config*.ts',
  ]),
  post,
  postStencil,
  postCypress,
  postJest,
  postUnicorn,
  postDesignSystem.configs.stencilRecommended,
  {
    // `environment.ts` intentionally uses `typeof global`/`window` to tell Node and browser apart.
    files: ['**/utils/environment.ts'],
    rules: {
      'unicorn/prefer-global-this': 'off',
    },
  },
  {
    // `getFocusableElements()` returns a jQuery object, which does not support `.at()`.
    files: ['cypress/**/*.{js,ts}'],
    rules: {
      'unicorn/prefer-at': 'off',
    },
  },

  // Pre-existing debt. Drop once sources are clean.
  {
    rules: {
      '@typescript-eslint/no-base-to-string': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-unnecessary-type-assertion': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-enum-comparison': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/unbound-method': 'off',
      'stencil/ban-side-effects': 'off',
      'stencil/enforce-slot-jsdoc': 'off',
      'stencil/strict-boolean-conditions': 'off',
      'cypress/no-async-tests': 'off',
      'cypress/no-unnecessary-waiting': 'off',
      'cypress/unsafe-to-chain-command': 'off',
      'jest/no-conditional-expect': 'off',
      'jest/no-done-callback': 'off',
      'jest/no-export': 'off',
    },
  },
);
