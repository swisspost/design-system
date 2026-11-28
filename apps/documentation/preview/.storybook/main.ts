import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import type { StorybookConfig } from '@storybook/web-components-vite';
import type { InlineConfig } from 'vite';
import { mergeConfig } from 'vite';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { NODE_MODULES, PUBLIC_DIR } from '../../paths';

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

  // MDX files inside `content-tabs/` folders are tab panel partials imported by a docs page, so they must not be indexed.
  stories: [
    '../src/stories/*.mdx',
    '../src/stories/**/!(content-tabs)/*.mdx',
    '../src/stories/**/*.stories.@(ts|tsx)',
  ],

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
                  behavior: 'wrap',
                },
              ],
            ],
          },
        },
      },
    },
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@kurbar/storybook-addon-docs-stencil'),
  ],

  staticDirs: [
    {
      from: join(PUBLIC_DIR, 'assets'),
      to: '/assets',
    },
    {
      from: join(NODE_MODULES, '@swisspost/design-system-styles'),
      to: '/styles',
    },
    {
      from: join(NODE_MODULES, '@swisspost/design-system-icons/public/post-icons'),
      to: '/post-icons',
    },
  ],

  async viteFinal(config: InlineConfig) {
    return mergeConfig(config, {
      css: {
        devSourcemap: true,
        preprocessorOptions: {
          scss: {
            loadPaths: [NODE_MODULES],
          },
        },
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
