import React from 'react';
import { DocsContainer as BaseContainer } from '@storybook/addon-docs/blocks';
import { useDarkMode } from 'storybook-dark-mode';
import { styled } from '@storybook/theming';

import DocsContainer from './docs-container';
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
    container: DocsContainer,
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
    },
    source: {
      excludeDecorators: true,
    },
    transformSource(snippet) {
      return (
        snippet
          // remove "key" attributes
          .replace(/(\t+|\s+)?key=".*"/g, '')

          // repalce noRefCheck functions
          .replace(/function noRefCheck\(\){}/g, '() => {}')

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
