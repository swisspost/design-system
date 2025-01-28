// this config was created using https://eslint.org/blog/2024/04/eslint-config-inspector/

import js from '@eslint/js';
import ts from 'typescript-eslint';
import jest from 'eslint-plugin-jest';
import globals from 'globals';
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';

import reactPlugin from 'eslint-plugin-react';
import stencilCommunityPlugin from '@stencil-community/eslint-plugin';

const compatStencilCommunityBaseRules = fixupConfigRules(stencilCommunityPlugin.configs.base)[0]
  .overrides[0].rules;
const compatStencilCommunityRecommendedRules = fixupConfigRules(
  stencilCommunityPlugin.configs.recommended,
)[0].rules;

/** @type {import('eslint').Linter.Config[]} */
export default ts.config(
  {
    name: 'post/global/ignores',
    ignores: [
      'cypress/*',
      'src/assets/*',
      'dist/*',
      'loader/*',
      'www/*',
      'stencil.config.ts',
      'stencil.config.dev.ts',
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
  ...ts.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    ...ts.configs.disableTypeChecked,
  },
  {
    name: 'stencil/community/recommended',
    files: ['**/*.{ts,mts,cts,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
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
    },
  },
  {
    name: 'post/stencil/recommended/overrides',
    files: ['**/*.{ts,mts,cts,tsx}'],
    rules: {
      'react/jsx-no-bind': 'off',
    },
  },
  {
    name: 'jest/base',
    languageOptions: {
      globals: jest.environments.globals.globals,
    },
    plugins: {
      jest: jest,
    },
  },
  {
    name: 'jest/recommended',
    files: ['**/*.spec.{js,mjs,cjs,ts,mts,cts}'],
    rules: {
      ...jest.configs['flat/recommended'].rules,
    },
  },
);
