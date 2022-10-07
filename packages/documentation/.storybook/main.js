module.exports = {
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/web-components',
  refs: {
    styles: {
      title: 'Basics',
      url: 'http://localhost:6007',
    },
    components: {
      title: 'Components',
      url: 'http://localhost:6008',
    },
  },
  // Storybook composition
  // https://storybook.js.org/docs/react/sharing/storybook-composition#compose-storybooks-per-environment
  refs: (_config, { configType }) => {
    const dev = configType === 'DEVELOPMENT';
    return {
      styles: {
        title: 'Foundation',
        url: dev ? 'http://localhost:9201' : 'https://styles.design-system.post.ch',
      },
      components: {
        title: 'Components',
        url: dev ? 'http://localhost:9203' : 'https://components.design-system.post.ch',
      },
    };
  },
};
