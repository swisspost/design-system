import type { TSESLint } from '@typescript-eslint/utils';
import unicornPlugin from 'eslint-plugin-unicorn';

/**
 * ESLint configuration for eslint-plugin-unicorn rules.
 * @see https://github.com/sindresorhus/eslint-plugin-unicorn
 */
export default (): TSESLint.FlatConfig.ConfigArray => [
  {
    name: '@swisspost/design-system-eslint/unicorn-recommended',
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: {
      unicorn: unicornPlugin,
    },
    rules: {
      ...unicornPlugin.configs.recommended.rules,
      // Disable rules that may conflict with the project's conventions
      'unicorn/filename-case': 'off',
      'unicorn/prevent-abbreviations': 'off',
    },
  },
];
