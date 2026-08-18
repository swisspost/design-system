import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import meta from './stepper.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Stepper: Story = {
  render: (_args: Args, context: StoryContext) => {
    return schemes(
      () => html`
        <div class="d-flex flex-column gap-16 p-16">
          ${bombArgs({
            stepsAmount: [3, 8],
            currentIndex: meta.argTypes?.currentIndex?.options,
            selectedIndex: meta.argTypes?.currentIndex?.options,
          })
            .filter(args => args.selectedIndex <= args.currentIndex)
            .filter(args => args.currentIndex <= args.stepsAmount)
            .map((args: Args) => meta.render?.({ ...context.args, ...args }, context))}
        </div>
      `,
    );
  },
};
