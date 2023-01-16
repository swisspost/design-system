import DocsLayout from './components/docs/layout';
import postThemes from './post-themes';
import './preview.scss';

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
      return (
        snippet
          // remove react fragments
          .replace(/(<>|<\/>)/g, '')

          // remove "key" attributes
          .replace(/(\t+|\s+)?key=".*"/g, '')

          // remove "{' '}" placeholders
          .replace(/{' '}/g, ' ')

          // repalce noRefCheck functions
          .replace(/function noRefCheck\(\)\s?{}/g, '() => {}')

          // remove brackets from "{value}" attribute-values
          .replace(/([a-zA-Z][a-zA-Z0-9-_:.]+)={([^}]*}?)}/g, (_m, g1, g2) => `${g1}="${g2}"`)

          // replace "className" attributes with "class"
          .replace(/className/g, 'class')

          // replace "htmlFor" attributes with "for"
          .replace(/htmlFor/g, 'for')
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
