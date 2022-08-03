module.exports = {
  "framework": "@storybook/html",
  "stories": [
    "../src/**/*.stories.@(js|mdx|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-scss",
    "storybook-dark-mode"
  ],
}
