module.exports = {
  extends: '../../.eslintrc.json',
  ignorePatterns: ['!**/*', 'node_modules'],
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['tsconfig.lib.json', 'tsconfig.spec.json'],
        createDefaultProgram: true,
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
      files: ['*.html'],
      rules: {},
    },
  ],
};
