import type { Preview } from '@storybook/web-components-vite';
import { extractArgTypes, extractComponentDescription } from '@kurbar/storybook-addon-docs-stencil';
import { format } from 'prettier';
import DocsLayout from '@preview/blocks/layout/layout';
import {
  fullScreenUrlDecorator,
  openFullScreenDemo,
  copyStoryConfigUrl,
} from '@preview/decorators/open-full-screen-demo';
import { withUrlParams } from '@preview/decorators/with-url-params';
import { prettierOptions } from '@preview/setup/prettier-options';
import { resetComponents } from '@preview/setup/reset-sb-styled-components';
import '@preview/setup/register-web-components';
import '@preview/setup/sync-iframe-story-args';
import '@preview/bridge/storybook-adapter';
import '@preview/setup/cypress-storybook/client';

import '@preview/styles/preview.scss';

import { SyntaxHighlighter } from 'storybook/internal/components';
import scss from 'react-syntax-highlighter/dist/esm/languages/prism/scss';

import '@preview/demo-components/demo-button';
import '@preview/demo-components/demo-input';
import '@preview/demo-components/demo-label';
import '@preview/demo-components/demo-list';
import '@preview/demo-components/demo-list-item';
import '@preview/demo-components/demo-list-item-group';
import '@preview/demo-components/demo-span';

SyntaxHighlighter.registerLanguage('scss', scss);

const preview: Preview = {
  decorators: [fullScreenUrlDecorator, withUrlParams],
  parameters: {
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Introduction',

          // Category - Getting Started
          'Getting Started',

          // Category - Packages
          'Packages',

          // Category - Foundations
          'Foundations',
          [
            'Logo',
            'Icons',
            'Palettes',
            'Typography',
            ['Overview'],
            'Layout',
            ['Breakpoints', 'Sections', 'Containers', 'Grid', 'Columns'],
          ],

          // Category - Raw Components (INTERNAL ONLY)
          'Raw Components',

          // Category - Components
          'Components',

          // Category - Utilities
          'Utilities',

          // Category - Templates
          'Templates',

          // Category - Guidelines
          'Guidelines',

          // Category - Accessibility (INTERNAL ONLY)
          'Accessibility Practices',

          // Category - Misc
          'Misc',
          ['Mission', 'Design Principles', 'Migration'],
        ],
      },
    },
    docs: {
      container: DocsLayout,
      canvas: {
        additionalActions: [
          {
            title: 'View full screen',
            onClick: openFullScreenDemo,
          },
          {
            title: 'Copy deep link',
            onClick: copyStoryConfigUrl,
          },
        ],
      },
      argTypes: {
        sort: 'requiredFirst',
      },
      source: {
        excludeDecorators: true,
        dark: true,
        transform: (snippet: string) => format(snippet, prettierOptions),
      },
      components: resetComponents,
      extractArgTypes,
      extractComponentDescription,
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      hideNoControlsWarning: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
