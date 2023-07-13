import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [ '../src/stories/**/*.mdx', '../src/stories/**/*.stories.@(js|jsx|ts|tsx)' ],
  staticDirs: [ '../public', '../node_modules/@swisspost/design-system-icons/public' ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    'storybook-dark-mode',
    '@geometricpanda/storybook-addon-badges',
    {
      name: '@storybook/addon-essentials',
      options: {
        actions: false,
        backgrounds: false,
        highlight: false,
        outline: false,
        toolbars: false,
      },
    }
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  core: {
    disableTelemetry: true,
  },
};

export default config;
