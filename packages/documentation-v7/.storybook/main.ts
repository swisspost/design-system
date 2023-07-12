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
  stories: ['../src/**/*.stories.@(mdx|tsx)'],
  addons: [
    // essential addons
    '@storybook/addon-essentials',

    // community addons
    'storybook-dark-mode',
    // '@pxtrn/storybook-addon-docs-stencil',
    '@storybook/addon-links',
    // '@geometricpanda/storybook-addon-badges',
    // '@storybook/addon-a11y',
  ],
  staticDirs: ['../public', '../node_modules/@swisspost/design-system-icons/public'],
  docs: {
    autodocs: 'tag',
  },
};

export default config;
