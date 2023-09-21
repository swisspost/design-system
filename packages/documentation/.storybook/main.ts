import type { StorybookConfig } from '@storybook/web-components-vite';
import pkg from '../package.json';

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
    '@storybook/addon-links',
    '@storybook/addon-designs',
    '@storybook/addon-a11y',
    '@geometricpanda/storybook-addon-badges',
    '@pxtrn/storybook-addon-docs-stencil',
  ],
  staticDirs: [
    {
      from: '../public/assets',
      to: '/assets',
    },
    '../public',
    '../node_modules/@swisspost/design-system-icons/public',
  ],
  docs: {
    autodocs: 'tag',
  },
  env: config => ({
    ...config,
    STORYBOOK_GTM_KEY: 'GTM-WKSKHGJ',
  }),
};

export default config;
