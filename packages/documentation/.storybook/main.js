module.exports = {
  framework: '@storybook/react',
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-essentials',
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
