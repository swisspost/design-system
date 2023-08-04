import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  logLevel: 'info',
  core: {
    disableTelemetry: true,
  },
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  stories: ['../src/stories/**/*.mdx', '../src/stories/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-designs',
    // '@storybook/addon-a11y',
    'storybook-dark-mode',
    '@geometricpanda/storybook-addon-badges',
    '@pxtrn/storybook-addon-docs-stencil',
    {
      name: '@storybook/addon-essentials',
      options: {
        actions: false,
        backgrounds: false,
        highlight: false,
        outline: false,
        toolbars: false,
      },
    },
  ],
  staticDirs: ['../public', '../node_modules/@swisspost/design-system-icons/public'],
  docs: {
    autodocs: 'tag',
  },
};

export default config;
