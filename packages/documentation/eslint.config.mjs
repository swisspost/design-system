// this config was created using https://eslint.org/blog/2024/04/eslint-config-inspector/

import js from '@eslint/js';
import ts from 'typescript-eslint';
import sb from 'eslint-plugin-storybook';
import mdx from 'eslint-plugin-mdx';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    name: 'post/global/ignores',
    ignores: ['cypress/*', 'public/*', 'src/**/*.sample.*', 'storybook-static/*'],
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
  ...sb.configs['flat/recommended'],
  {
    name: 'mdx/recommended',
    ...mdx.flat,
  },
  {
    name: 'mdx/codeblocks/recommended',
    ...mdx.flatCodeBlocks,
  },
  {
    name: 'mdx/react/recommended',
    files: ['**/*.{md,mdx}'],
    ...reactPlugin.configs.flat.recommended,
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    name: 'post/mdx/react/recommended/overrides',
    files: ['**/*.{md,mdx}'],
    rules: {
      'react/no-unescaped-entities': 'off',
    },
  },
];
