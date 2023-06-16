import JsxParser from 'react-jsx-parser';
import { renderToStaticMarkup } from 'react-dom/server';
import * as prettier from 'prettier';
import * as htmlParser from 'prettier/parser-html';

import DocsLayout from './components/docs/layout';
import postThemes from './post-themes';
import './preview.scss';

import { defineCustomElements as defineInternetHeader } from '@swisspost/internet-header';
import docJson from '@swisspost/design-system-components/dist/docs.json';
import {
  extractArgTypesFactory,
  extractComponentDescription,
  setStencilDocJson,
} from '@pxtrn/storybook-addon-docs-stencil';

import React from 'react';
import 'cypress-storybook/react';
import * as Components from '@swisspost/design-system-components-react';
import { BADGE } from '@geometricpanda/storybook-addon-badges';

if (docJson) setStencilDocJson(docJson);
defineInternetHeader();

Object.entries(Components).forEach(([name, component]) => {
  component.displayName = name.replace(/\B([A-Z])/g, '-$1').toLowerCase();
});

const PRETTIER_OPTIONS = {
  parser: 'html',
  plugins: [htmlParser],
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

export const parameters = {
  previewTabs: {
    'storybook/docs/panel': {
      title: 'Documentation',
    },
    'canvas': {
      title: 'Playground',
    },
  },
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
    dark: postThemes.dark,
    light: postThemes.light,
    darkClass: 'bg-dark',
    lightClass: 'bg-white',
    stylePreview: true,
  },
  docs: {
    extractArgTypes: extractArgTypesFactory({ dashCase: true }),
    extractComponentDescription,
    container: DocsLayout,
    components: {
      // Remove default storybook styles from most of things (helps with dark mode in mdx files)
      h1: null,
      h2: null,
      h3: null,
      h4: null,
      h5: null,
      h6: null,
      p: null,
      ul: null,
      li: null,
      dl: null,
      dt: null,
      dd: null,
      a: null,
    },
    source: {
      excludeDecorators: true,
    },
    transformSource(snippet) {
      const reactElements = <JsxParser jsx={snippet} renderInWrapper={false} />;
      const htmlSnippet = renderToStaticMarkup(reactElements)
        .replace(/className/g, 'class')
        .replace(/checked=""/g, 'checked');
      const formattedSnippet = prettier.format(htmlSnippet, PRETTIER_OPTIONS);

      // ensure the string is not empty ('') because the Source component breaks if it is
      return formattedSnippet || ' ';
    },
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
    TODO: {
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
};
