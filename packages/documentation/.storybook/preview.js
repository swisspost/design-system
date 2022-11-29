import { setStencilDocJson } from '@pxtrn/storybook-addon-docs-stencil';
import docJson from '@swisspost/design-system-components/dist/docs.json';
import postTheme from './theme';
import { styled } from '@storybook/theming';

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
