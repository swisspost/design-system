import { html, unsafeStatic } from 'lit/static-html.js';
import { classMap } from 'lit-html/directives/class-map.js';

import './post-external';
import './post-internal';

export const toolbarConfig = {
  theme: {
    toolbar: {
      title: 'Post Theme',
      items: [{ value: 'post', title: 'Post Theme' }],
      dynamicTitle: true,
    },
  },
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

export const applyToolbarSelection = (story, context) => {
  const theme = context.globals.theme || 'post';
  const channel = context.globals.channel || 'external';
  const tag = `${theme}-${channel}`;

  const mode = context.globals.mode || 'light';
  const classes = {
    'custom-story-container': true,
    'bg-dark': mode === 'dark',
  };

  return html`
        <${unsafeStatic(tag)} class=${classMap(classes)} data-color-mode=${mode}>
          ${story(context, context.args)}
        </${unsafeStatic(tag)}>
      `;
};
