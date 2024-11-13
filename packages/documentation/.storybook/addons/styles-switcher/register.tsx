import React from 'react';

import { addons, types } from '@storybook/manager-api';
import StylesSwitcher from './StylesSwitcher';

const ADDON_ID = 'postStylesSwitcher';

addons.register(ADDON_ID, () => {
  addons.add(ADDON_ID, {
    title: 'Switch the documentation styles',
    type: types.TOOL,
    render: () => {
      return <StylesSwitcher />;
    },
  });
});
