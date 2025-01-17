// this config was created using https://eslint.org/blog/2024/04/eslint-config-inspector/

import rootConfig from '../../eslint.config.mjs';

export default [
  ...rootConfig.map(config => {
    if (config.name === 'post/ts/defaults') {
      config.languageOptions.parserOptions = {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.lib.json', './tsconfig.spec.json'],
        createDefaultProgram: true,
      };
    } else if (config.name === 'post/ng/ts-recommended/overrides') {
      config.rules['@angular-eslint/directive-selector'] = [
        'error',
        {
          type: 'attribute',
          prefix: 'post',
          style: 'camelCase',
        },
      ];
      config.rules['@angular-eslint/component-selector'] = [
        'error',
        {
          type: 'element',
          prefix: 'post',
          style: 'kebab-case',
        },
      ];
      config.rules['@angular-eslint/component-class-suffix'] = 'off';
    }

    return config;
  }),
  {
    name: 'post/project/ts-overrides',
    files: ['**/*.{ts,mts,cts}'],
    rules: {
      // add your customizations for *.ts files here
    },
  },
  {
    name: 'post/project/template-overrides',
    files: ['**/*.{html,htm}'],
    rules: {
      // add your customizations for *.html files here
    },
  },
];
