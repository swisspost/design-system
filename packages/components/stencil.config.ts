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
  globalStyle: 'src/styles/index.scss',
  hydratedFlag: {
    name: 'data-hydrated',
    selector: 'attribute',
  },
  invisiblePrehydration: false,
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
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
      outDir: '../components-react/src/stencil-generated',
    }),
    reactOutputTarget({
      outDir: '../components-react/src/stencil-generated/server',
      hydrateModule: '@swisspost/design-system-components/hydrate',
    }),
    angularOutputTarget({
      componentCorePackage: '@swisspost/design-system-components',
      outputType: 'standalone',
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
