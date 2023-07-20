import type { Preview } from '@storybook/web-components';
import {
  extractArgTypesFactory,
  extractComponentDescription,
  setStencilDocJson,
} from '@pxtrn/storybook-addon-docs-stencil';
import { StencilJsonDocs } from '@pxtrn/storybook-addon-docs-stencil/dist/types';
import { Options as PrettierOptions } from 'prettier';
import prettierPluginHtml from 'prettier/parser-html';
import prettier from 'prettier/standalone';

import DocsLayout from './blocks/layout';
import { BADGE } from './constants';
import './helpers/register-web-components';
import { resetComponents } from './helpers/reset-sb-styled-components';

import './styles/preview.scss';
import themes from './styles/themes';

import docJson from '@swisspost/design-system-components/dist/docs.json';

if (docJson) setStencilDocJson(docJson as StencilJsonDocs);

const PRETTIER_OPTIONS: PrettierOptions = {
  parser: 'html',
  plugins: [prettierPluginHtml],
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  quoteProps: 'consistent',
  jsxSingleQuote: false,
  trailingComma: 'es5',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  htmlWhitespaceSensitivity: 'css',
  endOfLine: 'lf',
  embeddedLanguageFormatting: 'off',
  singleAttributePerLine: false,
};

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
    darkMode: {
      current: 'light',
      dark: themes.dark,
      light: themes.light,
      darkClass: 'bg-dark',
      lightClass: 'bg-white',
      stylePreview: true,
    },
    docs: {
      container: DocsLayout,
      source: {
        excludeDecorators: true,
        transform: (htmlSnippet: string) => {
          const formattedSnippet = prettier.format(htmlSnippet, PRETTIER_OPTIONS);

          // ensure the string is not empty ('') because the Source component breaks if it is
          return formattedSnippet || ' ';
        },
      },
      components: {
        ...resetComponents,
      },
      extractArgTypes: extractArgTypesFactory({ dashCase: true }),
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
    badgesConfig: {
      [BADGE.BETA]: {
        styles: {
          backgroundColor: 'var(--post-yellow)',
          color: '#000',
          borderColor: 'transparent',
        },
        title: 'Beta',
        tooltip: {
          desc: 'This documentation page is still in beta mode and might not be complete yet.',
        },
      },
      [BADGE.NEEDS_REVISION]: {
        styles: {
          backgroundColor: 'var(--post-gray-10)',
          color: '#000',
          borderColor: 'transparent',
        },
        title: 'Needs revision',
        tooltip: {
          desc: 'This page is pending revision from a UX Designer.',
        },
      },
      [BADGE.STABLE]: {
        styles: {
          backgroundColor: 'var(--post-success)',
          color: '#fff',
          borderColor: 'transparent',
        },
        title: 'Stable',
        tooltip: {
          desc: 'The content of this page is ready to be used in production.',
        },
      },
      [BADGE.TODO]: {
        styles: {
          backgroundColor: 'var(--post-danger)',
          color: '#fff',
          borderColor: 'transparent',
        },
        title: 'TODO',
        tooltip: {
          desc: 'This page needs to be filled with content and serves as a placeholder in the meantime.',
        },
      },
    },
  },
};

export default preview;
