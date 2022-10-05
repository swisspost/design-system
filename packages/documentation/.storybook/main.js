module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "framework": "@storybook/web-components",
  "refs": {
    styles: {
      title: "Basics",
      url: "http://localhost:6007"
    },
    components: {
      title: "Components",
      url: "http://localhost:6008"
    }
  }
}