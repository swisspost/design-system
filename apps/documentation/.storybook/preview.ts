import type { Preview } from '@storybook/web-components-vite';
import { extractArgTypes, extractComponentDescription } from '@kurbar/storybook-addon-docs-stencil';
import { format } from 'prettier';
import DocsLayout from './blocks/layout/layout';
import { prettierOptions, resetComponents } from './helpers';
import './helpers/register-web-components';
import {
  copyDeepLink,
  openFullScreenDemo,
  withDeepLinks,
  withShellGlobals,
} from './helpers/shell-bridge';
import { DEFAULT_GLOBALS, DOCS_GLOBALS } from '../shell/src/storybook/docs-globals';
import './addons/cypress-storybook/client';

import './styles/preview.scss';

import { SyntaxHighlighter } from 'storybook/internal/components';
import scss from 'react-syntax-highlighter/dist/esm/languages/prism/scss';

import '../src/demo-components';

SyntaxHighlighter.registerLanguage('scss', scss);

export const SourceDarkScheme = true;

const preview: Preview = {
  decorators: [withShellGlobals, withDeepLinks],
  // set by the shell toolbar (`shell/src/topbar`) and applied by `helpers/shell-bridge.ts`
  globalTypes: Object.fromEntries(
    Object.entries(DOCS_GLOBALS).map(([name, { label }]) => [name, { name: label }]),
  ),
  initialGlobals: { ...DEFAULT_GLOBALS },
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
            onClick: copyDeepLink,
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
