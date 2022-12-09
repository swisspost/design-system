import { setStencilDocJson } from '@pxtrn/storybook-addon-docs-stencil';
import docJson from '@swisspost/design-system-components/dist/docs.json';
import postTheme from './theme';
import { styled } from '@storybook/theming';

import './preview.scss';

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
    theme: postTheme,
    components: {
      // Remove default storybook styles from most of things (helps with dark mode in mdx files)
      h1: styled.h1(() => {}),
      h2: styled.h2(() => {}),
      h3: styled.h3(() => {}),
      h4: styled.h4(() => {}),
      h5: styled.h5(() => {}),
      h6: styled.h6(() => {}),
      p: styled.p(() => {}),
      ul: styled.ul(() => {}),
      li: styled.li(() => {}),
      dl: styled.dl(() => {}),
      dt: styled.dt(() => {}),
      dd: styled.dd(() => {}),
      code: styled.code(() => {}),
    },
    source: {
      excludeDecorators: true,
    },
    transformSource(snippet) {
      return snippet
        // remove "key" attributes
        .replace(/(\t+|\s+)?key=".*"/g, '')

        // repalce noRefCheck functions
        .replace(/function noRefCheck\(\){}/g, '() => {}')

        // remove brackets from "{value}" attribute-values
        .replace(/([a-zA-Z][a-zA-Z0-9-_:.]+)={([^}]*}?)}/g, (_m, g1, g2) => `${g1}="${g2}"`)

        // replace "className" attributes with "class"
        .replace(/className/g, 'class')

        // replace "htmlFor" attributes with "for"
        .replace(/htmlFor/g, 'for');
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
  darkMode: {
    darkClass: 'bg-primary',
    lightClass: 'bg-white',
    stylePreview: true,
  },
};
