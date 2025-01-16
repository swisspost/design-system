import js from '@eslint/js';
import ts from 'typescript-eslint';

import stencilPlugin from '@stencil-community/eslint-plugin';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import typescriptEslintParser from '@typescript-eslint/parser';

export default ts.config(
  {
    ignores: [
      'dist/*',
      'loader/*',
      'loaders/*',
      'www/*',
      'cypress.config.js',
      'cypress/*',
      'stencil.config.ts',
      '**/tests/*',
    ],
  },
  // improve this config as soon as https://github.com/stencil-community/stencil-eslint/issues/119 has been released
  {
    files: ['src/**/*.{ts, tsx}'],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
      sourceType: 'module',
      globals: globals.browser,
    },
    extends: [js.configs.recommended, ts.configs.recommendedTypeChecked],
    plugins: {
      '@stencil-community': stencilPlugin,
      'react': reactPlugin,
    },
    rules: {
      ...stencilPlugin.configs.strict.rules,
      '@typescript-eslint/semi': 'off',
      '@typescript-eslint/brace-style': 'off',
      '@typescript-eslint/func-call-spacing': 'off',

      'indent': [
        'error',
        2,
        {
          SwitchCase: 1,
        },
      ],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'func-style': ['error', 'declaration'],
      'comma-dangle': 'off',
      'react/jsx-no-bind': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          caughtErrors: 'none',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
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
  // do not type-check *.js and *.spec.* files
  {
    ...ts.configs.disableTypeChecked,
    files: ['**/*.{js,mjs,cjs}', '**/*.spec.*'],
  },
);
