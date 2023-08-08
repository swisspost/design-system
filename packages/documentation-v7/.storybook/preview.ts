import type { Preview } from '@storybook/web-components';

import {
  extractArgTypes,
  extractComponentDescription,
  setStencilDocJson,
} from '@pxtrn/storybook-addon-docs-stencil';
import { StencilJsonDocs } from '@pxtrn/storybook-addon-docs-stencil/dist/types';
import { format } from 'prettier';
import DocsLayout from './blocks/layout';
import { badgesConfig, prettierOptions, resetComponents } from './helpers';
import './helpers/register-web-components';

import './styles/preview.scss';

import { SyntaxHighlighter } from '@storybook/components';
import scss from 'react-syntax-highlighter/dist/esm/languages/prism/scss';

SyntaxHighlighter.registerLanguage('scss', scss);

import docJson from '@swisspost/design-system-components/dist/docs.json';

if (docJson) setStencilDocJson(docJson as StencilJsonDocs);

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
          ['Getting started', 'Migration Guide', 'Components', ['Header', 'Breadcrumbs', 'Footer']],
          'Intranet Header',
          ['Getting started'],
          'Icons',
          ['Getting started', 'Search Icons', 'Components'],
          'Templates',
          'Utilities',
          'Misc',
          ['Migration Guide', 'ChangeLog', 'Versions'],
          'Hidden',
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
    badgesConfig,
  },
};

export default preview;
