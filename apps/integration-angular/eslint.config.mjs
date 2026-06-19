import js from '@eslint/js';
import ng from 'angular-eslint';
import globals from 'globals';
import ts from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
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
  {
    name: 'post/ts/overrides',
    files: ['**/*.{ts,mts,cts}'],
    rules: {
      '@angular-eslint/component-class-suffix': 'off',
      '@angular-eslint/directive-class-suffix': 'off',
    },
  },
  ...ng.configs.templateRecommended.map(config => ({
    ...config,
    files: ['**/*.{html,htm}'],
  })),
);
