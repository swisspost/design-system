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
  managerWebpack: (config, options) => {
    options.cache.set = () => Promise.resolve();
    return config;
  },
};
