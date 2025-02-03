// this config was created using https://eslint.org/blog/2024/04/eslint-config-inspector/

import js from '@eslint/js';
import ts from 'typescript-eslint';
import ng from 'angular-eslint';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default ts.config(
  {
    name: 'post/global/ignores',
    ignores: ['dist/*', '**/stencil-generated/*'],
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
        createDefaultProgram: true,
      },
    },
    processor: ng.processInlineTemplates,
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          caughtErrors: 'none',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'post',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'post',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    name: 'post/ts/components/defaults',
    files: ['projects/components/**/*.{ts,mts,cts}'],
    languageOptions: {
      parserOptions: [
        './projects/components/tsconfig.lib.json',
        './projects/components/tsconfig.spec.json',
      ],
    },
  },
  {
    name: 'post/ts/consumer-app/defaults',
    files: ['projects/consumer-app/**/*.{ts,mts,cts}'],
    languageOptions: {
      parserOptions: [
        './projects/consumer-app/tsconfig.app.json',
        './projects/consumer-app/tsconfig.spec.json',
      ],
    },
    rules: {
      '@angular-eslint/directive-selector': 'off',
      '@angular-eslint/component-selector': 'off',
    },
  },
  {
    files: ['**/*.{ts,mts,cts}'],
    extends: [
      ...ts.configs.recommended,
      {
        files: ['**/*.{js,mjs,cjs}'],
        ...ts.configs.disableTypeChecked,
      },
      ...ng.configs.tsRecommended,
    ],
  },
  ...ng.configs.templateRecommended.map(config => ({
    ...config,
    files: ['**/*.{html,htm}'],
  })),
);
