import { addons } from '@storybook/manager-api';

if (process.env.NODE_ENV) document.documentElement.setAttribute('data-env', process.env.NODE_ENV);

addons.setConfig({
  panelPosition: 'right',
  sidebar: {
    collapsedRoots: [],
  },
});
