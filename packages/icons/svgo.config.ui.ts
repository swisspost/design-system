import { Config } from 'svgo';

export default {
  multipass: true,
  js2svg: {
    indent: 2,
    pretty: true,
  },
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
          mergePaths: {
            force: true,
            floatPrecision: 2,
            noSpaceAfterFlags: true,
          },
          sortAttrs: {
            xmlnsOrder: 'alphabetical',
          },
        },
      },
    },
    {
      name: 'removeAttrs',
      params: {
        elemSeparator: '::',
        attrs: ['style', 'fill', 'stroke', 'data-.*', 'svg::(width|height|xml:space)'],
      },
    },
  ],
} as Config;
