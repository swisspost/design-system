import DocsLayout from './components/docs/layout';
import postThemes from './post-themes';
import './preview.scss';

import { extractArgTypes, extractComponentDescription, setStencilDocJson } from '@pxtrn/storybook-addon-docs-stencil';
import { renderToString } from 'react-dom/server';
import docJson from '@swisspost/design-system-components/dist/docs.json';
import JsxParser from 'react-jsx-parser';
import beautify from 'js-beautify';

if (docJson) setStencilDocJson(docJson);

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
      order: ['Welcome', 'Foundations', 'Components', 'Utilities', 'Misc'],
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
    extractArgTypes,
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
      const reactElement = <JsxParser jsx={snippet} renderInWrapper={false}/>;
      const htmlString = renderToString(reactElement);

      return beautify.html(
        htmlString,
        {
          inline: [],
          indent_size: 2,
          max_preserve_newlines: 1,
          wrap_attributes: 'force-expand-multiline',
        },
      );
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
