// this config was created using https://eslint.org/blog/2024/04/eslint-config-inspector/

import js from '@eslint/js';
import ts from 'typescript-eslint';
import globals from 'globals';

import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    name: 'post/global/ignores',
    ignores: ['dist/*'],
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
  // https://github.com/vercel/next.js/discussions/49337#discussioncomment-6009130
  {
    name: 'next-eslint/base',
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'react': reactPlugin,
      'react-hooks': hooksPlugin,
      '@next/next': nextPlugin,
    },
  },
  {
    name: 'next-eslint/recommended',
    rules: {
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...hooksPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
  {
    name: 'next-eslint/core-vitals',
    rules: {
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
];
