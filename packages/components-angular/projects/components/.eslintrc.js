module.exports = {
  extends: '../../.eslintrc.js',
  ignorePatterns: ['!**/*', 'src/lib/stencil-generated', 'node_modules'],
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
            prefix: 'post',
            style: 'camelCase',
          },
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'post',
            style: 'kebab-case',
          },
        ],
        '@angular-eslint/component-class-suffix': ['off'],
      },
    },
    {
      files: ['*.html'],
      rules: {},
    },
  ],
};
