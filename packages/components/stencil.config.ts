import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { reactOutputTarget } from '@stencil/react-output-target';
import { angularOutputTarget } from '@stencil/angular-output-target';
import { angularValueAccessorBindings } from './.config/bindings.angular';

export const config: Config = {
  namespace: 'post-components',
  sourceMap: false,
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'www',
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
  testing: {
    testPathIgnorePatterns: [
      '<rootDir>/dist/',
      '<rootDir>/loader/',
      '<rootDir>/www/',
      '<rootDir>/cypress',
    ],
  },
};
