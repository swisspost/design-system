import { defineConfig } from 'eslint/config';

import angular from 'angular-eslint';

export default defineConfig(
  {
    name: 'post/angular/ts',
    files: ['**/*.{ts,tsx,mts,cts}'],
    extends: [angular.configs.tsRecommended],
    processor: angular.processInlineTemplates,
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
    },
  },
  {
    name: 'post/angular/template',
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
  },
);
