import React from 'react';

import { addons, types } from '@storybook/addons';
import FigmaLink from './FigmaLink';

const ADDON_ID = 'postFigmaLink';

addons.register(ADDON_ID, () => {
  addons.add(ADDON_ID, {
    title: 'Figma Design Link for component',
    type: types.TOOL,
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: () => {
      return <FigmaLink />;
    },
  });
});
