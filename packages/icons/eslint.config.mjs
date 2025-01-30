// this config was created using https://eslint.org/blog/2024/04/eslint-config-inspector/

import js from '@eslint/js';
import ts from 'typescript-eslint';
import jest from 'eslint-plugin-jest';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    name: 'post/global/ignores',
    ignores: ['public/*'],
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
    files: ['**/*.{ts,mts,cts}'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
    },
    rules: {
      'indent': [
        'error',
        2,
        {
          SwitchCase: 1,
        },
      ],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
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
];
