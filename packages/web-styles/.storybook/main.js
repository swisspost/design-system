module.exports = {
  "framework": "@storybook/html",
  "stories": [
    "../src/**/*.stories.@(js|mdx|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/preset-scss",
      options: {
        sassLoaderOptions: {
          implementation: require('sass')
        }
      }
    }
  ],
  // workaround, to prevent storybook from crashing, because of a EBUSY error, which occures on a npm cache file on storybook startup and when saving new content
  managerWebpack: (config, options) => {
    options.cache.set = () => Promise.resolve();
    return config;
  }
}
