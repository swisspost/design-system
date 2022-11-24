module.exports = {
  framework: '@storybook/react',
  addons: [
    '@storybook/addon-essentials',
    {
      name: '@storybook/preset-scss',
      options: {
        sassLoaderOptions: {
          implementation: require('sass')
        }
      }
    },
    '@pxtrn/storybook-addon-docs-stencil'
  ],
  stories: ['../stories/**/*.stories.@(ts|tsx|mdx)'],
  staticDirs: ['../static'],

  managerWebpack: (config, options) => {
    // workaround, to prevent storybook from crashing, because of a EBUSY error, which occures on a npm cache file on storybook startup and when saving new content
    options.cache.set = () => Promise.resolve();

    return config;
  }
};
