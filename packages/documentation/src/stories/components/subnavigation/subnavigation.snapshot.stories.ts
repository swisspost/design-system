import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta from './subnavigation.stories';
import { html } from 'lit';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Subnavigation: Story = {
  render: (_args: Args, context: StoryContext) => {
    return html`
      <div class=" d-flex gap-16 flex-column">
        ${bombArgs({
          backgroundColor: ['default', 'bg-light', 'bg-dark'],
          badges: [false, true],
          itemCount: [2, 5],
        })
          .filter(args => !(args.backgroundColor !== 'default' && args.badges === true))
          .filter(args => !(args.itemCount !== 5 && args.badges === true))
          .map((args: Args) => meta.render?.({ ...context.args, ...args }, context))}
      </div>
    `;
  },
};
