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
import { ArgTypes } from '@storybook/blocks';

SyntaxHighlighter.registerLanguage('scss', scss);

export const SourceDarkScheme = true;

const preview: Preview = {
  decorators: [fullScreenUrlDecorator],
  parameters: {
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Home',

          // Category - Getting Started
          'Getting Started',
          [
            'Introduction',
            'Design Principles',
            'Mission',
            'Angular',
            'Compatibility',
            'Changelogs',
            'Migration Guide',
          ],

          // Category - Packages
          'Packages',

          // Category - Foundations
          'Foundations',
          [
            'Typography',
            'Color',
            'Search for Icons',
            'Layout',
            ['Breakpoints', 'Containers', 'Grid', 'Columns', 'TODOS'],
            'Elevation',
            'Accessibility',
            ['Regulation'],
          ],

          // Category - Components
          'Components',

          // Category - Utilities
          'Utilities',

          // Category - Templates
          'Templates',

          // Category - Guidelines
          'Guidelines',

          // Category - Misc
          'Misc',
          ['Mission', 'Design Principles', 'Migration'],

          // Category - Snapshots (hidden)
          'Snapshots',
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
