import { addons } from '@storybook/addons';
import './manager.css';

document.documentElement.setAttribute('data-env', process.env.NODE_ENV);

addons.setConfig({
  panelPosition: 'right',
  sidebar: {
    collapsedRoots: [],
  },
});
