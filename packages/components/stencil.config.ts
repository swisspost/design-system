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
    /*
     * This output-target type is to generate the component(s) as a reusable, tree-shakable, self lazy-loading library.
     * It is required for the angular-output-target, if `outputType: 'component'`!
     * The loader folder is a single JS entry point, containing lazy-loaded components
     * This is an alternative approach to e.g. loading the components directly through a script tag like: <script type="module" src='https://cdn.jsdelivr.net/npm/{{library-name}}@1.0.0/dist/{{library-name}}.js'></script>
     */
    {
      type: 'dist',
    },
    /**
     * This output-target type creates custom elements that directly extend HTMLElement.
     * It is required for the react-output-target. To work for the react-output-target, `externalRuntime: false` is required!
     * Thanks to `customElementsExportBehavior: 'auto-define-custom-elements'`, the components are self-defining themself.
     */
    {
      type: 'dist-custom-elements',
      dir: 'dist/components/react',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    /**
     * This output-target type creates custom elements that directly extend HTMLElement.
     * It's the default standalone ouptut and required for the angular-output-target, if `outputType: 'scam|standalone'`!
     * Thanks to `customElementsExportBehavior: 'single-export-module'`, all components can be consumed through a single entry point.
     */
    {
      type: 'dist-custom-elements',
      dir: 'dist/components',
      customElementsExportBehavior: 'single-export-module',
    },
    /**
     * This output-target type generates a module that can be used on a NodeJS server to hydrate HTML and implement server side rendering (SSR).
     * It is required for the react-output-target, if SSR functionality is needed!
     */
    {
      type: 'dist-hydrate-script',
      dir: './hydrate',
    },
    /**
     * This output-target type is oriented for webapps and websites, hosted from an http server, which can benefit from prerendering and service workers.
     * Even if a project is meant to only build a reusable component library, the www output target is useful to build out and test the components throughout development.
     */
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
    /**
     * This output-target type automates the creation of React component wrappers for the Stencil web-components.
     * When SSR is needed, the `hydrate` output must be included in the build as well.
     * Setting `externalRuntime: false` in the used `dist-custom-elements` output is required.
     */
    reactOutputTarget({
      customElementsDir: 'react',
      outDir: '../components-react/src/stencil-generated',
      hydrateModule: '@swisspost/design-system-components/hydrate',
      clientModule: '@swisspost/design-system-components-react',
      serializeShadowRoot: 'declarative-shadow-dom',
    }),
    /**
     * This output-target type automates the creation of Angular component wrappers for the Stencil web-components.
     * With `outputType: 'component'` the `dist` output is used to create the Angular compoments.
     * While `outputType: 'scam|standalone` uses the default `dist-custom-elements` output.
     * With these outputTypes, setting the `dist-custom-elements` option `customElementsExportBehavior` to `single-export-module` is required.
     */
    angularOutputTarget({
      customElementsDir: 'components',
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
      '<rootDir>/vrt',
    ],
  },
};
