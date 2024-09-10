module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@stencil-community/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  ignorePatterns: [
    '.eslintrc.js',
    '.stencil',
    'cypress',
    'cypress.config.js',
    'dist',
    'loader',
    'loaders',
    'stencil.config.ts',
    'www',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: 'tsconfig.eslint.json',
  },
  plugins: ['@typescript-eslint'],
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
};
