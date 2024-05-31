module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: 'tsconfig.eslint.json',
    extraFileExtensions: ['.mdx'],
  },
  ignorePatterns: [
    'src/**/*.sample.*',
    '.eslintrc.js',
    'cypress',
    'cypress.config.js',
    'cypress.snapshot.config.js',
    'public',
    'storybook-static',
    'vite.config.js',
  ],
  overrides: [
    {
      files: ['*.{js,ts,tsx}'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:storybook/recommended',
        'prettier',
      ],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
    },
    {
      files: ['*.mdx'],
      extends: ['plugin:mdx/recommended'],
      parser: 'eslint-mdx',
      settings: {
        'mdx/code-blocks': true,
      },
    },
  ],
};
