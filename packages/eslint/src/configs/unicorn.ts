import type { TSESLint } from '@typescript-eslint/utils';
import unicornPlugin from 'eslint-plugin-unicorn';

/**
 * ESLint configuration for eslint-plugin-unicorn rules.
 *
 * This configuration includes recommended best practices for:
 * - Prefer modern JavaScript APIs (Date.now() over Date#getTime())
 * - Prefer globalThis over window
 * - Prefer String#replaceAll() over String#replace()
 * - And 100+ other code quality improvements
 *
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
      // Disable rules that may conflict with your project's conventions
      'unicorn/filename-case': 'off',
      'unicorn/prevent-abbreviations': 'off',
    },
  },
];
