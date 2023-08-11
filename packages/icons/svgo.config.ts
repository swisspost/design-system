import { Config } from 'svgo';

export default {
  js2svg: {
    indent: 2,
    pretty: true,
  },
  plugins: [
    'mergePaths',
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
        },
      },
    },
    {
      name: 'removeAttrs',
      params: {
        attrs: '(width|height|style)',
      },
    },
    {
      name: 'sortAttrs',
      params: {
        xmlnsOrder: 'alphabetical',
      },
    },
  ],
} as Config;
