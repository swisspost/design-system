import { extractArgTypes, extractComponentDescription, setStencilDocJson } from '@pxtrn/storybook-addon-docs-stencil';
import docJson from '@swisspost/design-system-components/dist/docs.json';
import { defineCustomElements } from '@swisspost/design-system-components/loader';

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
      order: ['Welcome', 'Foundations', 'Components', 'Utilities', 'Misc'],
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
      return snippet
        // remove "key" attributes
        .replace(/(\t+|\s+)?key=".*"/g, '')

        // replace noRefCheck functions
        .replace(/function noRefCheck\(\){}/g, '() => {}')

        // remove brackets from "{value}" attribute-values
        .replace(/([a-zA-Z][a-zA-Z0-9-_:.]+)={([^}]*}?)}/g, (_m, g1, g2) => `${g1}="${g2}"`)

        // replace "className" attributes with "class"
        .replace(/className/g, 'class')

        // replace "htmlFor" attributes with "for"
        .replace(/htmlFor/g, 'for')

        // remove brackets from "{' '}" spaces
        .replace(/{' '}/g, ' ');
    }
  }
};
