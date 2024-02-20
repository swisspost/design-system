import React from 'react';

import { addons, types } from '@storybook/addons';
import VersionSwitcher from './VersionSwitcher';

const ADDON_ID = 'postVersionSwitcher';

addons.register(ADDON_ID, () => {
  addons.add(ADDON_ID, {
    title: 'Switch to another version',
    type: types.TOOLEXTRA,
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: () => {
      return <VersionSwitcher />;
    },
  });
});
