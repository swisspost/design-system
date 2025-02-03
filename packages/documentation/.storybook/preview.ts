import type { Preview } from '@storybook/web-components';
import { extractArgTypes, extractComponentDescription } from '@kurbar/storybook-addon-docs-stencil';
import { format } from 'prettier';
import DocsLayout from './blocks/layout/layout';
import {
  fullScreenUrlDecorator,
  openFullScreenDemo,
  prettierOptions,
  resetComponents,
} from './helpers';
import './helpers/register-web-components';
import './addons/cypress-storybook/client';

import './styles/preview.scss';

import { SyntaxHighlighter } from '@storybook/components';
import scss from 'react-syntax-highlighter/dist/esm/languages/prism/scss';

SyntaxHighlighter.registerLanguage('scss', scss);

export const SourceDarkScheme = true;

const preview: Preview = {
  decorators: [fullScreenUrlDecorator],
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
            ['Breakpoints', 'Containers', 'Grid', 'Columns'],
          ],

          // Category - Raw Components (INTERNAL ONLY)
          'Raw Components',

          // Category - Components
          'Components',

          // Category - Modules
          'Modules',
          ['Header', 'Footer'],

          // Category - Utilities
          'Utilities',

          // Category - Templates
          'Templates',

          // Category - Guidelines
          'Guidelines',

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
        ],
      },
      argTypes: {
        sort: 'requiredFirst',
      },
      source: {
        excludeDecorators: true,
        dark: SourceDarkScheme,
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
