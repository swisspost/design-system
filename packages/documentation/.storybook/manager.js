import { addons } from '@storybook/addons';
import Theme from './theme';

import './manager.scss';

addons.setConfig({
  theme: Theme,
  panelPosition: 'right',
  sidebar: {
    collapsedRoots: []
  }
});
