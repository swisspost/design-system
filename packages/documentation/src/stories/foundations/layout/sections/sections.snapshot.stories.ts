import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import meta, { Default } from './sections.stories';
import { html } from 'lit';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Sections: Story = {
  render: (args: Args, context: StoryContext) => {
    return html`${Default.render?.(args, context)}`;
  },
};
