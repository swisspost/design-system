import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta from './badge.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Badge: Story = {
  render: (_args: Args, context: StoryContext) => {
    return schemes(
      () => html`
        <div class="d-flex flex-wrap align-items-start gap-16">
          ${bombArgs({
            showNumber: [true, false],
            size: context.argTypes.size.options,
            background: context.argTypes.background.options,
          })
            .filter(args => !(!args.showNumber && args.size === 'small'))
            .map((args: Args) => meta.render?.({ ...context.args, ...args }, context))}
        </div>
      `,
    );
  },
};
