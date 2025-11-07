import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import meta from './chip.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Chip: Story = {
  render: (_args: Args, context: StoryContext) => {
    return schemes(
      () => html`
        <div class="d-flex flex-wrap gap-16">
          ${bombArgs({
            text: ['Small chip', 'A very large chip which contains a very long text.'],
            type: context.argTypes.type.options,
            badge: [false, true],
            selected: [false, true],
            disabled: [false, true],
            dismissed: [false],
          })
            .filter(args => !(args.type !== 'selectable' && args.selected === true))
            .filter(args => !(args.type !== 'selectable' && args.badge === true))
            .map((args: Args, i: number) => {
              context.name = `input-${i}`;
              return meta.render?.({ ...context.args, ...args }, context);
            })}
        </div>
      `,
    );
  },
};
