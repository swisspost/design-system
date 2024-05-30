import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta from './chip.stories';
import { html } from 'lit';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Chip: Story = {
  render: (_args: Args, context: StoryContext) => {
    return html`
      <div class="d-flex flex-wrap gap-1 align-items-start">
        ${['bg-white', 'bg-dark'].map(
          bg => html`
            <div class="${bg} d-flex flex-wrap align-items-start gap-regular p-regular">
              ${bombArgs({
                text: [
                  'Malakceptebla Insigno',
                  'Contentus momentus vero siteos et accusam iretea et justo.',
                ],
                size: context.argTypes.size.options,
                type: context.argTypes.type.options,
                badge: [false, true],
                active: [false, true],
                disabled: [false, true],
                dismissed: [false],
              })
                .filter(args => !(args.type !== 'filter' && args.active === true))
                .filter(args => !(args.type !== 'filter' && args.badge === true))
                .map((args: Args) => meta.render?.({ ...context.args, ...args }, context))}
            </div>
          `,
        )}
      </div>
    `;
  },
};
