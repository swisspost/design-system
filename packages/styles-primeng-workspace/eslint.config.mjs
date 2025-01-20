// this config was created using https://eslint.org/blog/2024/04/eslint-config-inspector/

import js from '@eslint/js';
import ts from 'typescript-eslint';
import ng from 'angular-eslint';
import globals from 'globals';

export default ts.config(
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
  {
    name: 'post/ts/styles-primeng/defaults',
    files: ['projects/styles-primeng/**/*.{ts,mts,cts}'],
    languageOptions: {
      parserOptions: {
        project: [
          './projects/styles-primeng/tsconfig.lib.json',
          './projects/styles-primeng/tsconfig.spec.json',
        ],
      },
    },
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'sp',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'sp',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    name: 'post/ts/styles-primeng-showcase/defaults',
    files: ['projects/styles-primeng-showcase/**/*.{ts,mts,cts}'],
    languageOptions: {
      parserOptions: {
        project: [
          './projects/styles-primeng-showcase/tsconfig.app.json',
          './projects/styles-primeng-showcase/tsconfig.spec.json',
        ],
      },
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
