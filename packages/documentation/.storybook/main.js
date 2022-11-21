module.exports = {
  framework: '@storybook/react',
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
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

  // workaround, to prevent storybook from crashing, because of a EBUSY error, which occures on a npm cache file on storybook startup and when saving new content
  managerWebpack: (config, options) => {
    options.cache.set = () => Promise.resolve();
    return config;
  }
};
