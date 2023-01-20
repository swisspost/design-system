module.exports = {
  framework: '@storybook/react',
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-measure',
    '@storybook/addon-viewport',
    '@pxtrn/storybook-addon-docs-stencil',
    'storybook-dark-mode',
    {
      name: '@storybook/preset-scss',
      options: {
        sassLoaderOptions: {
          implementation: require('sass'),
        },
      },
    },
  ],
  staticDirs: ['../public'],
  webpackFinal: config => {
    // allow scss :export statments (scss variables to js)
    config.module.rules.forEach(rule => {
      if (rule.test.toString() === /\.s[ca]ss$/.toString()) {
        rule.use.find(r => r.loader.indexOf('css-loader') >= 0).options = {
          importLoaders: 1,
          modules: { compileType: 'icss' },
        };
      }
    });

    return config;
  },
  managerWebpack: (config, options) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    });

    options.cache.set = () => Promise.resolve();
    return config;
  },
};
