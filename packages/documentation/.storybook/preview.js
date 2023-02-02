import { extractArgTypes, extractComponentDescription, setStencilDocJson } from '@pxtrn/storybook-addon-docs-stencil';
import docJson from '@swisspost/design-system-components/dist/docs.json';
import * as Components from '@swisspost/design-system-components-react';
import beautify from 'js-beautify';
import React from 'react';
import { renderToString } from 'react-dom/server';
import JsxParser from 'react-jsx-parser';
import DocsLayout from './components/docs/layout';
import postThemes from './post-themes';
import { defineCustomElements as defineInternetHeader } from '@swisspost/internet-header';
import 'cypress-storybook/react';
import './preview.scss';

if (docJson) setStencilDocJson(docJson);
defineInternetHeader();

Object.entries(Components).forEach(([name, component]) => {
  component.displayName = name.replace(/\B([A-Z])/g, '-$1').toLowerCase();
});

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
        'Welcome',
        'Foundations',
        [
          'Typography',
          'Color',
          'Layout',
          'Elevation',
          'Accessibility'
        ],
        'Templates',
        'Components',
        'Utilities',
        'Misc',
        [
          'Migration',
          'ChangeLog'
        ],
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
