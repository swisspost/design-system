import { html } from 'lit/static-html.js';

import './story-container';
import { StoryFn } from '@storybook/web-components';

/**
 * Configuration of the buttons displayed in the Storybook toolbar
 */
export const toolbarConfig = {
  // Theme: Post, Cargo, etc.
  theme: {
    description: 'Switch component themes between different branding colors.',
    defaultValue: 'post',
    toolbar: {
      items: [
        {
          title: 'Post Theme', // label of the option in the dropdown list
          value: 'post', // value of the option in the decorator (see `applyToolbarSelection` bellow)
        },
      ],
      dynamicTitle: true, // dynamic title so that the option label replaces the button label when selected
    },
  },

  // Channel: External, Internal
  channel: {
    description: 'Toggle component appearance between internal and external application styles.',
    defaultValue: 'external',
    toolbar: {
      items: [
        { value: 'external', title: 'External' },
        { value: 'internal', title: 'Internal' },
      ],
      dynamicTitle: true,
    },
  },

  // Mode: Light, Dark
  mode: {
    description: 'Switch component color schemes between light and dark modes.',
    defaultValue: 'light',
    toolbar: {
      items: [
        { value: 'light', title: 'Light' },
        { value: 'dark', title: 'Dark' },
      ],
      dynamicTitle: true,
    },
  },
};

/**
 * Decorator to apply the toolbar selection to all stories.
 * Stories are then rendered in a shadow dom were the expected styles are applied
 */
export const applyToolbarSelection = (story: StoryFn, context: object) => {
  // mode is added through the `data-color-mode` attribute, we also set a dark background color when necessary
  const mode = context.globals.mode || 'light';

  return html`
    <story-container
      class=${mode === 'dark' ? 'bg-dark' : ''}
      data-color-mode=${mode}
      theme=${context.globals.theme}
      channel=${context.globals.channel}
      .story=${story}
      .context=${context}
    />
  `;
};
