import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta from './list-group.stories';
import { html } from 'lit';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const ListGroup: Story = {
  render: (_args: Args, context: StoryContext) => {
    return html`
      ${meta.render?.({ ...context.args }, context)}
    `;
  },
};
