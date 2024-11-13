import type { StoryObj } from '@storybook/web-components';
import meta, { renderSkiplinks } from './skiplinks.stories';
import { html } from 'lit';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Skiplinks: Story = {
  render: () => {
    return html`<div class="skiplinks-container">${renderSkiplinks()}</div> `;
  },
};
