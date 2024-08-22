import { html, unsafeStatic } from 'lit/static-html.js';
import { classMap } from 'lit-html/directives/class-map.js';

import './story-container-post-external';
import './story-container-post-internal';
import { StoryFn } from '@storybook/web-components';
import { TemplateResult } from 'lit';

/**
 * Configuration of the buttons displayed in the Storybook toolbar
 */
export const toolbarConfig = {
  // Theme: Post, Cargo, etc.
  theme: {
    toolbar: {
      title: 'Post Theme', // label when no option is selected (default value)
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
    toolbar: {
      title: 'External',
      items: [
        { value: 'external', title: 'External' },
        { value: 'internal', title: 'Internal' },
      ],
      dynamicTitle: true,
    },
  },

  // Mode: Light, Dark
  mode: {
    toolbar: {
      title: 'Light',
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
  // theme and channel require importing a specific CSS file, this is handled by specific web-components
  const theme = context.globals.theme || 'post';
  const channel = context.globals.channel || 'external';
  const storyContainerComponentName = `${theme}-${channel}`;

  // mode is added through the `data-color-mode` attribute, we also set a dark background color when necessary
  const mode = context.globals.mode || 'light';
  const classes = {
    'custom-story-container': true,
    'bg-dark': mode === 'dark',
  };

  return html`
    <${unsafeStatic(storyContainerComponentName)}
      class=${classMap(classes)}
      data-color-mode=${mode}
      .story=${story}
      .context=${context}
    />
  `;
};
