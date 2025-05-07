import type { StorybookConfig } from '@storybook/web-components-vite';
import type { InlineConfig } from 'vite';
import pkg from '@/../package.json';
import { mergeConfig } from 'vite';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import fs from 'fs';
import path from 'path';

const isDev = process.env.NODE_ENV === 'development';

// Directories to exclude (in int/prod environments)
const excludedDirs = ['health', 'raw-components'];

const storiesBaseDir = path.resolve(__dirname, '../src/stories');

async function findStories(): Promise<string[]> {
  if (isDev) {
    // In development, include all stories
    return ['../src/stories/**/*.mdx', '../src/stories/**/*.stories.@(ts|tsx)'];
  } else {
    // In int/prod, exclude the specified directories
    const storyPatterns: string[] = [];
    storyPatterns.push('../src/stories/*.mdx', '../src/stories/*.stories.@(ts|tsx)');

    const directories = fs
      .readdirSync(storiesBaseDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .filter(dirName => !excludedDirs.includes(dirName));

    // Create story patterns for each allowed directory
    for (const dir of directories) {
      storyPatterns.push(
        `../src/stories/${dir}/**/*.mdx`,
        `../src/stories/${dir}/**/*.stories.@(ts|tsx)`,
      );
    }

    return storyPatterns;
  }
}

const config: StorybookConfig = {
  logLevel: 'info',
  core: {
    disableTelemetry: true,
  },
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  stories: async () => {
    return await findStories();
  },
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
    {
      from: '../node_modules/@swisspost/design-system-icons/public/post-icons',
      to: '/post-icons',
    },
  ],
  docs: {
    autodocs: 'tag',
  },
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
  }),
  async viteFinal(config: InlineConfig) {
    return mergeConfig(config, {
      css: {
        devSourcemap: true,
      },
    });
  },
};

export default config;
