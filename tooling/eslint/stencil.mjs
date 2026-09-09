import { defineConfig } from 'eslint/config';

import stencil from '@stencil/eslint-plugin';

export default defineConfig({
  name: 'post/stencil',
  files: ['**/*.{ts,tsx,mts,cts}'],
  extends: [stencil.configs.flat['recommended']],
  rules: {
    'react/jsx-no-bind': 'off',
    'stencil/prefer-vdom-listener': 'off',
    'stencil/required-prefix': ['error', ['post-']],
    'stencil/class-pattern': ['error', { pattern: '^Post.*(?!Component)$' }],
    'stencil/decorators-style': ['error', { prop: 'ignore' }],
  },
});
