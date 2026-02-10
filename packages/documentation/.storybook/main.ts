import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import type { StorybookConfig } from '@storybook/web-components-vite';
import type { InlineConfig } from 'vite';
import pkg from '@/../package.json';
import { mergeConfig } from 'vite';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  logLevel: 'info',

  core: {
    disableTelemetry: true,
  },

  framework: {
    name: getAbsolutePath('@storybook/web-components-vite'),
    options: {},
  },

  stories: ['../src/stories/**/*.mdx', '../src/stories/**/*.stories.@(ts|tsx)'],

  addons: [
    {
      name: getAbsolutePath('@storybook/addon-docs'),
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
                    properties: { name: 'link' },
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
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@kurbar/storybook-addon-docs-stencil'),
    './addons/styles-switcher/register',
    './addons/version-switcher/register',
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
    {
      from: '../node_modules/@swisspost/design-system-icons/public/post-icons',
      to: '/post-icons',
    },
  ],

  env: (config: Record<string, string> | undefined) => ({
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
    STORYBOOK_DISABLE_TELEMETRY: '1',
  }),

  async viteFinal(config: InlineConfig) {
    return mergeConfig(config, {
      css: {
        devSourcemap: true,
      },
    });
  },

  features: {
    actions: false,
    backgrounds: false,
    highlight: false,
    outline: false,
    measure: false,
    viewport: false,
  },
};

export default config;

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')));
}
