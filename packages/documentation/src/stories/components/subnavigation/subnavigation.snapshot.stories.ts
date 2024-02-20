import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta from './subnavigation.stories';
import { html } from 'lit';
import { bombArgs } from '../../../utils';

export default {
  ...meta,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Subnavigation: Story = {
  render: (_args: Args, context: StoryContext) => {
    return html`
      <div class=" d-flex gap-3 flex-column">
        ${bombArgs({
          itemCount: [2, 5],
          backgroundColor: ['default', 'bg-light', 'bg-dark'],
          badges: [true, false],
        }).map((args: Args) => meta.render?.({ ...context.args, ...args }, context))}
      </div>
    `;
  },
};
