module.exports = {
  "framework": "@storybook/html",
  "stories": [
    "../**/*.stories.@(js|mdx)"
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
  ]
}
