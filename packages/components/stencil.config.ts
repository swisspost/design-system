import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import postcss from 'rollup-plugin-postcss';
import { reactOutputTarget } from '@stencil/react-output-target';
import { angularOutputTarget } from '@stencil/angular-output-target';
import { angularValueAccessorBindings } from './.config/bindings.angular';

export const config: Config = {
  namespace: 'post-components',
  buildDist: true,
  sourceMap: false,
  validatePrimaryPackageOutputTarget: true,
  hydratedFlag: {
    name: 'data-hydrated',
    selector: 'attribute',
  },
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      isPrimaryPackageOutputTarget: true,
    },
    {
      type: 'dist-custom-elements',
      externalRuntime: false,
      customElementsExportBehavior: 'auto-define-custom-elements',
    },
    {
      type: 'dist-custom-elements',
      dir: 'loaders',
      externalRuntime: false,
      customElementsExportBehavior: 'single-export-module',
    },
    {
      type: 'dist-hydrate-script',
      dir: './hydrate',
    },
    {
      type: 'www',
      copy: [
        {
          src: '../node_modules/@swisspost/design-system-styles/*.css',
          dest: 'assets/css',
        },
        {
          src: '../node_modules/@swisspost/design-system-styles/palettes/*.css',
          dest: 'assets/css',
        },
        {
          src: '../node_modules/@swisspost/design-system-icons/public/post-icons/*.svg',
          dest: 'assets/icons',
        },
      ],
      serviceWorker: null, // disable service workers,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'docs-json',
      file: 'dist/docs.json',
    },
    reactOutputTarget({
      stencilPackageName: '@swisspost/design-system-components',
      outDir: '../components-react/src/components/stencil-generated/',
      hydrateModule: '@swisspost/design-system-components/hydrate',
      excludeServerSideRenderingFor: [
        'post-accordion',
        'post-accordion-item',
        'post-avatar',
        'post-back-to-top',
        'post-banner',
        'post-breadcrumb',
        'post-breadcrumb-item',
        'post-card-control',
        'post-closebutton',
        'post-collapsible',
        'post-collapsible-trigger',
        'post-footer',
        'post-header',
        'post-icon',
        'post-language-option',
        'post-language-switch',
        'post-linkarea',
        'post-list',
        'post-list-item',
        'post-logo',
        'post-mainnavigation',
        'post-megadropdown',
        'post-megadropdown-trigger',
        'post-menu',
        'post-menu-item',
        'post-menu-trigger',
        'post-popover',
        'post-popovercontainer',
        'post-rating',
        'post-tab-header',
        'post-tab-panel',
        'post-tabs',
        'post-tag',
        'post-togglebutton',
        'post-tooltip',
      ],
    }),
    angularOutputTarget({
      componentCorePackage: '@swisspost/design-system-components',
      outputType: 'component',
      directivesProxyFile:
        '../components-angular/projects/components/src/lib/stencil-generated/components.ts',
      directivesArrayFile:
        '../components-angular/projects/components/src/lib/stencil-generated/index.ts',
      valueAccessorConfigs: angularValueAccessorBindings,
    }),
  ],
  extras: {
    enableImportInjection: true,
  },
  plugins: [
    sass({
      outputStyle: 'compressed',
      includePaths: ['node_modules'],
    }),
  ],
  rollupPlugins: {
    before: [
      postcss({
        use: {
          sass: {
            includePaths: ['node_modules'],
          },
          stylus: false,
          less: false,
        },
      }),
    ],
  },
  testing: {
    testPathIgnorePatterns: [
      '<rootDir>/dist/',
      '<rootDir>/loader/',
      '<rootDir>/loaders/',
      '<rootDir>/hydrate/',
      '<rootDir>/www/',
      '<rootDir>/cypress',
    ],
  },
};
