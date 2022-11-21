import { setStencilDocJson } from '@pxtrn/storybook-addon-docs-stencil';
import docJson from '@swisspost/design-system-components/dist/docs.json';

if(docJson) setStencilDocJson(docJson);

export const parameters = {
  viewMode: 'docs',
  previewTabs: {
    'storybook/docs/panel': {
      title: 'Documentation',
      index: -1,
    },
    canvas: {
      title: 'Playground'
    }
  },
  options: {
    storySort: {
      order: [
        'Welcome',
        'Foundations',
        'Components',
        'Utilities',
        'Misc'
      ]
    }
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    hideNoControlsWarning: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};
