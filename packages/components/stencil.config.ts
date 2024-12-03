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
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'single-export-module',
      dir: 'loaders',
    },
    {
      type: 'www',
      copy: [
        {
          src: '../node_modules/@swisspost/design-system-styles/*.css',
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
      componentCorePackage: '@swisspost/design-system-components',
      proxiesFile: '../components-react/src/components/stencil-generated/index.ts',
      includeDefineCustomElements: true,
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
      '<rootDir>/www/',
      '<rootDir>/cypress',
    ],
  },
};
