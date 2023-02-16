module.exports = {
  framework: '@storybook/react',
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-links',
    '@storybook/addon-measure',
    '@storybook/addon-viewport',
    '@storybook/addon-a11y',
    '@pxtrn/storybook-addon-docs-stencil',
    'storybook-dark-mode',
    '@geometricpanda/storybook-addon-badges',
    {
      name: '@storybook/preset-scss',
      options: {
        sassLoaderOptions: {
          implementation: require('sass'),
        },
      },
    },
  ],
  staticDirs: ['../public', '../node_modules/@swisspost/design-system-icons/public'],
  webpackFinal: (config, options) => {
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
