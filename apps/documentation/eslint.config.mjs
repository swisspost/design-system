import { defineConfig, globalIgnores } from 'eslint/config';

import post from '@swisspost/design-system-eslint-config/base';
import postCypress from '@swisspost/design-system-eslint-config/cypress';
import postMdx from '@swisspost/design-system-eslint-config/mdx';
import postStorybook from '@swisspost/design-system-eslint-config/storybook';

export default defineConfig(
  globalIgnores(['public/', 'storybook-static/', 'src/**/*.sample.*']),
  post,
  postStorybook,
  postMdx,
  postCypress,

  // Pre-existing debt. Drop once sources are clean.
  {
    rules: {
      '@typescript-eslint/no-floating-promises': 'off',
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
      'cypress/no-unnecessary-waiting': 'off',
    },
  },
);
