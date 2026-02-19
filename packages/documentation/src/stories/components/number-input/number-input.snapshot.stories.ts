import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import meta from './number-input.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const NumberInput: Story = {
  render: (_args: Args, context: StoryContext) => {
    return schemes(
      () => html`
        <div class="d-flex flex-wrap align-items-end gap-16 pb-16">
          ${bombArgs({
            floatingLabel: [true, false],
            hiddenLabel: [false, true],
            value: [undefined, 0],
            max: [undefined, 0],
            min: [undefined, 0],
            placeholder: ['', 'ex: 25'],
          })
            .filter(args => !(args.floatingLabel && args.hiddenLabel))
            .filter(args => !(args.floatingLabel && args.placeholder !== ''))
            .filter(args => args.value === undefined || args.placeholder === '')
            .filter(args => args.min === undefined || args.value === args.min)
            .filter(args => args.max === undefined || args.value === args.max)
            .filter(args => args.min === undefined || args.max === undefined)
            .map((args: Args, i: number) =>
              meta.render?.({ ...context.args, ...args }, { ...context, name: String(i) }),
            )}
        </div>
      `,
    );
  },
};
