import JsxParser from 'react-jsx-parser'
import { renderToStaticMarkup } from 'react-dom/server';
import * as prettier from 'prettier';
import * as htmlParser from 'prettier/parser-html';

import DocsLayout from './components/docs/layout';
import postThemes from './post-themes';
import './preview.scss';

import { defineCustomElements } from '@swisspost/design-system-components/dist/esm/loader';
import { setStencilDocJson } from '@pxtrn/storybook-addon-docs-stencil';
import docJson from '@swisspost/design-system-components/dist/docs.json';

defineCustomElements();
if (docJson) setStencilDocJson(docJson);

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
  arrowParens: "always",
  htmlWhitespaceSensitivity: 'css',
  endOfLine: 'lf',
  embeddedLanguageFormatting: 'off',
  singleAttributePerLine: false
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
      order: ['Welcome', 'Foundations', ['Typography', 'Color', 'Accessibility'], 'Components', 'Utilities', 'Misc', ['Migration', 'ChangeLog']],
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
      const reactElements = <JsxParser jsx={snippet} renderInWrapper={false}/>;
      const htmlSnippet = renderToStaticMarkup(reactElements);
      const formattedSnippet = prettier.format(htmlSnippet, PRETTIER_OPTIONS)
        // replace "className" attributes with "class"
        .replace(/className/g, 'class')
    
        // replace "htmlFor" attributes with "for"
        .replace(/htmlFor/g, 'for')
    
        // replace react fragments
        .replace(/<\/?react\.fragment>/g, '');

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
};
