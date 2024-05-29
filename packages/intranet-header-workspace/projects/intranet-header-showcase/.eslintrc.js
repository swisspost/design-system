module.exports = {
  extends: '../../.eslintrc.js',
  ignorePatterns: ['!**/*', 'node_modules'],
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['tsconfig.app.json', 'tsconfig.spec.json'],
        createDefaultProgram: true,
      },
      rules: {
        '@angular-eslint/directive-selector': 0,
        '@angular-eslint/component-selector': 0,
      },
    },
    {
      files: ['*.html'],
      rules: {},
    },
  ],
};
