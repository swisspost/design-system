import type { StorybookConfig } from '@storybook/web-components-vite';
import pkg from '@/../package.json';
import { mergeConfig } from 'vite';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

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
        docs: false,
        measure: false,
        viewport: false,
      },
    },
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            rehypePlugins: [
              rehypeSlug,
              [
                rehypeAutolinkHeadings,
                {
                  content: {
                    type: 'element',
                    tagName: 'post-icon',
                    properties: { name: 2037 },
                  },
                  headingProperties: { className: 'docs-autolink' },
                  behavior: 'append',
                },
              ],
            ],
          },
        },
      },
    },
    '@storybook/addon-links',
    '@kurbar/storybook-addon-docs-stencil',
    './addons/version-switcher/register',
    './addons/styles-switcher/register',
  ],
  staticDirs: [
    {
      from: '../public/assets',
      to: '/assets',
    },
    {
      from: '../node_modules/@swisspost/design-system-styles',
      to: '/styles',
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
    STORYBOOK_GTM_PAGE_CONTEXT_CONTENT_LANGUAGE: 'en',
    STORYBOOK_GTM_PAGE_CONTEXT_CONTENT_GEO_REGION: 'national',
    STORYBOOK_GTM_PAGE_CONTEXT_SOURCE_CODE_VERSION: pkg.version,
    STORYBOOK_GTM_PAGE_CONTEXT_ENVIRONMENT_DEV: 'localhost',
    STORYBOOK_GTM_PAGE_CONTEXT_ENVIRONMENT_INT: 'preview-',
    STORYBOOK_GTM_PAGE_CONTEXT_ENVIRONMENT_PROD: 'design-system.post.ch',
    STORYBOOK_GTM_PAGE_CONTEXT_ENVIRONMENT_FALLBACK: 'dev',
    STORYBOOK_BASE_URL: 'https://design-system.post.ch',
  }),
  async viteFinal(config) {
    return mergeConfig(config, {
      css: {
        devSourcemap: true,
      },
    });
  },
};

export default config;
