import { defineConfig } from 'eslint/config';

import unicorn from 'eslint-plugin-unicorn';

export default defineConfig({
  name: 'post/unicorn',
  files: ['**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}'],
  extends: [unicorn.configs['flat/recommended']],
  rules: {
    'unicorn/filename-case': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/catch-error-name': 'off',
    'unicorn/numeric-separators-style': 'off',
    'unicorn/no-null': 'off',

    'unicorn/consistent-function-scoping': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-lonely-if': 'off',
    'unicorn/no-negated-condition': 'off',
    'unicorn/prefer-switch': 'off',
    'unicorn/prefer-ternary': 'off',
    'unicorn/switch-case-braces': 'off',

    'unicorn/no-array-callback-reference': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/no-object-as-default-parameter': 'off',
    'unicorn/no-useless-fallback-in-spread': 'off',
    'unicorn/prefer-add-event-listener': 'off',
    'unicorn/prefer-modern-dom-apis': 'off',
    'unicorn/prefer-query-selector': 'off',
    'unicorn/prefer-spread': 'off',
    'unicorn/prefer-top-level-await': 'off',

    'unicorn/no-invalid-remove-event-listener': 'off',
    'unicorn/no-abusive-eslint-disable': 'off',
  },
});
