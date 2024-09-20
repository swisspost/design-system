import React from 'react';

import { addons, types } from '@storybook/manager-api';
import VersionSwitcher from './VersionSwitcher';

const ADDON_ID = 'postVersionSwitcher';

addons.register(ADDON_ID, () => {
  addons.add(ADDON_ID, {
    title: 'Switch to another version',
    type: types.TOOLEXTRA,
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(docs)$/)),
    render: () => {
      return <VersionSwitcher />;
    },
  });
});
