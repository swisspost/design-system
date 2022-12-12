import { extractArgTypes, extractComponentDescription, setStencilDocJson } from '@pxtrn/storybook-addon-docs-stencil';
import { defineCustomElements } from '@swisspost/design-system-components/loader';
import { renderToString } from 'react-dom/server';
import docJson from '@swisspost/design-system-components/dist/docs.json';
import JsxParser from 'react-jsx-parser';
import beautify from 'js-beautify';

if (docJson) setStencilDocJson(docJson);
defineCustomElements();

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
      order: [ 'Welcome', 'Foundations', 'Components', 'Utilities', 'Misc' ],
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
  docs: {
    extractArgTypes,
    extractComponentDescription,
    source: {
      excludeDecorators: true,
    },
    transformSource(snippet) {
      const reactElement = <JsxParser jsx={snippet} renderInWrapper={false}/>;
      const htmlString = renderToString(reactElement).replace(/<!-- -->/g, ' ');

      return beautify.html(
        htmlString,
        {
          wrap_attributes: 'force-expand-multiline',
          max_preserve_newlines: 1,
        },
      );
    },
  },
};
