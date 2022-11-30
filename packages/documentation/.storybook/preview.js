import { setStencilDocJson } from '@pxtrn/storybook-addon-docs-stencil';
import docJson from '@swisspost/design-system-components/dist/docs.json';

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
  docs: {
    transformSource(snippet) {
      return snippet
        // remove "key" attributes
        .replace(/(\t+|\s+)?key=".*"/g, '')
        // remove brackets from "{value}" attribute-values 
        .replace(/={([^}]+)}/g, (match, g1) => `="${g1}"`)
        // replace "className" attributes with "class"
        .replace(/className/g, 'class')
        // replace "htmlFor" attributes with "for"
        .replace(/htmlFor/g, 'for');
    }
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
