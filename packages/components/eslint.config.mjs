// this config was created using https://eslint.org/blog/2024/04/eslint-config-inspector/

import js from '@eslint/js';
import ts from 'typescript-eslint';
import globals from 'globals';
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';

import reactPlugin from 'eslint-plugin-react';
import stencilCommunityPlugin from '@stencil-community/eslint-plugin';
// import tsParser from '@typescript-eslint/parser';

const compatStencilCommunityBaseRules = fixupConfigRules(stencilCommunityPlugin.configs.base)[0]
  .overrides[0].rules;
const compatStencilCommunityRecommendedRules = fixupConfigRules(
  stencilCommunityPlugin.configs.recommended,
)[0].rules;

export default [
  {
    name: 'post/global/ignores',
    ignores: [
      'dist/*',
      'loader/*',
      'loaders/*',
      'www/*',
      'cypress.config.js',
      'cypress/*',
      'stencil.config.ts',
      '**/*.spec.*',
    ],
  },
  {
    name: 'post/defaults',
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    name: 'eslint/recommended',
    ...js.configs.recommended,
  },
  {
    name: 'post/ts/defaults',
    files: ['**/*.{ts,tsx,mts,cts}'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          caughtErrors: 'none',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    ...ts.configs.disableTypeChecked,
  },
  ...ts.configs.recommended,
  {
    name: 'stencil/community/recommended',
    files: ['**/*.{ts,mts,cts,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'react': fixupPluginRules(reactPlugin),
      '@stencil-community': fixupPluginRules(stencilCommunityPlugin),
    },
    rules: {
      ...compatStencilCommunityBaseRules,
      ...compatStencilCommunityRecommendedRules,
      'indent': [
        'error',
        2,
        {
          SwitchCase: 1,
        },
      ],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'react/jsx-no-bind': 'off',
      '@stencil-community/strict-boolean-conditions': 'off',
      '@stencil-community/required-prefix': ['error', ['post-']],
      '@stencil-community/class-pattern': [
        'error',
        {
          pattern: '^Post.*(?!Component)$',
        },
      ],
    },
  },
];
