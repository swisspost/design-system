// this config was created using https://eslint.org/blog/2024/04/eslint-config-inspector/

import js from '@eslint/js';
import ts from 'typescript-eslint';
import globals from 'globals';
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';

import reactPlugin from 'eslint-plugin-react';
import stencilCommunityPlugin from '@stencil-community/eslint-plugin';
import pluginCypress from 'eslint-plugin-cypress/flat';
import { configs as dsEslintConfigs } from '@swisspost/design-system-eslint';

const compatStencilCommunityBaseRules = fixupConfigRules(stencilCommunityPlugin.configs.base)[0]
  .overrides[0].rules;
const compatStencilCommunityRecommendedRules = fixupConfigRules(
  stencilCommunityPlugin.configs.recommended,
)[0].rules;

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    name: 'post/global/ignores',
    ignores: [
      'prebuild.ts',
      'dist/*',
      'loader/*',
      'hydrate/*',
      'www/*',
      'stencil.config.ts',
      'stencil.config.play.ts',
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
        tsconfigRootDir: import.meta.dirname,
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
  dsEslintConfigs.stencilRecommended,
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
      '@stencil-community/prefer-vdom-listener': 'off',
      '@stencil-community/required-prefix': ['error', ['post-']],
      '@stencil-community/class-pattern': [
        'error',
        {
          pattern: '^Post.*(?!Component)$',
        },
      ],
    },
  },
  {
    name: 'cypress/config',
    files: ['cypress/**/*.ts'],
    ...pluginCypress.configs.recommended,
    rules: {},
  },
  ...dsEslintConfigs.unicornRecommended,
  {
    name: 'post/unicorn/overrides',
    files: ['**/*.{js,ts,jsx,tsx}'],
    rules: {
      'unicorn/no-null': 'off',
      'unicorn/consistent-function-scoping': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/prefer-ternary': 'off',
      'unicorn/no-negated-condition': 'off',
      'unicorn/switch-case-braces': 'off',
      'unicorn/no-lonely-if': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/prefer-spread': 'off',
      'unicorn/no-invalid-remove-event-listener': 'off',
      'unicorn/no-abusive-eslint-disable': 'off',
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/catch-error-name': 'off',
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/no-object-as-default-parameter': 'off',
      'unicorn/prefer-switch': 'off',
      'unicorn/prefer-add-event-listener': 'off',
      'unicorn/prefer-modern-dom-apis': 'off',
      'unicorn/prefer-query-selector': 'off',
      'unicorn/no-useless-fallback-in-spread': 'off',
      'unicorn/numeric-separators-style': 'off',
    },
  },
  {
    // environment.ts intentionally uses typeof global/window to distinguish Node vs browser environments
    name: 'post/unicorn/environment-overrides',
    files: ['**/utils/environment.ts'],
    rules: {
      'unicorn/prefer-global-this': 'off',
    },
  },
  {
    // getFocusableElements() returns a jQuery object which does not support .at()
    name: 'post/unicorn/cypress-overrides',
    files: ['cypress/**/*.{ts,js}'],
    rules: {
      'unicorn/prefer-at': 'off',
    },
  },
];
