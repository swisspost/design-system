module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: 'tsconfig.eslint.json',
  },
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['.eslintrc.js', 'jest.config.js', 'public', 'svgo.config.ts'],
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
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        caughtErrors: 'none',
        destructuredArrayIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
  },
};
