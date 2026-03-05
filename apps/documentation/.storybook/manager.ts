import { addons } from '@storybook/manager-api';
import themes from './styles/themes';
import { defineCustomElement as definePostIcon } from '@swisspost/design-system-components/dist/components/post-icon.js';

definePostIcon();

if (process.env.NODE_ENV) document.documentElement.setAttribute('data-env', process.env.NODE_ENV);

addons.setConfig({
  panelPosition: 'right',
  theme: themes.light,
  sidebar: {
    collapsedRoots: [],
  },
});
