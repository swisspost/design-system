import type { Preview } from '@storybook/web-components';

import { extractArgTypes, extractComponentDescription } from '@pxtrn/storybook-addon-docs-stencil';
import { format } from 'prettier';
import DocsLayout from './blocks/layout';
import { badgesConfig, prettierOptions, resetComponents } from './helpers';
import './helpers/register-web-components';

import './styles/preview.scss';

import { SyntaxHighlighter } from '@storybook/components';
import scss from 'react-syntax-highlighter/dist/esm/languages/prism/scss';

SyntaxHighlighter.registerLanguage('scss', scss);

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          'Home',
          'Getting Started',
          ['Styles', 'Components'],
          'Foundations',
          ['Typography', 'Color', 'Layout', 'Elevation', 'Accessibility'],
          'Components',
          'Internet Header',
          ['Getting started', 'Migration Guide', 'Header Component', 'Breadcrumbs Component', 'Footer Component'],
          'Intranet Header',
          ['Getting started'],
          'Icons',
          ['Getting started', 'Search Icons', 'Icon Component'],
          'Templates',
          'Utilities',
          'Misc',
          ['Migration Guide', 'ChangeLog', 'Versions'],
          'Snapshots',
        ],
      },
    },
    docs: {
      container: DocsLayout,
      source: {
        excludeDecorators: true,
        transform: (snippet: string) => format(snippet, prettierOptions),
      },
      components: resetComponents,
      extractArgTypes,
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      hideNoControlsWarning: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    badgesConfig,
  },
};

export default preview;
