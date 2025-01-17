// this config was created using https://eslint.org/blog/2024/04/eslint-config-inspector/

import js from '@eslint/js';
import ts from 'typescript-eslint';
import ng from 'angular-eslint';
import globals from 'globals';

export default [
  {
    name: 'post/global/ignores',
    ignores: ['dist/*', '**projects/**/stencil-generated/*'],
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
  ...ng.configs.tsRecommended.map(config => ({
    ...config,
    files: ['**/*.{ts,mts,cts}'],
    processor: ng.processInlineTemplates,
  })),
  {
    name: 'post/ng/ts-recommended/overrides',
    files: ['**/*.{ts,mts,cts}'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
  ...ng.configs.templateRecommended.map(config => ({
    ...config,
    files: ['**/*.{html,htm}'],
  })),
];
