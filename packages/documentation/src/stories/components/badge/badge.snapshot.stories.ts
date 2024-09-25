import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta from './badge.stories';
import { html } from 'lit';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Badge: Story = {
  render: (_args: Args, context: StoryContext) => {
    return html`
      <div class="d-flex flex-wrap gap-4 align-items-start">
        ${['bg-white', 'bg-dark'].map(
          bg => html`
            <div class="${bg} d-flex flex-wrap align-items-start gap-16 p-16">
              ${bombArgs({
                showNumber: [true, false],
                size: context.argTypes.size.options,
                background: context.argTypes.background.options,
              })
                .filter(args => !(!args.showNumber && args.size === 'small'))
                .map((args: Args) => meta.render?.({ ...context.args, ...args }, context))}
            </div>
          `,
        )}
      </div>
    `;
  },
};
