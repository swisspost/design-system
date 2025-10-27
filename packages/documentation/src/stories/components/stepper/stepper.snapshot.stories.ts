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
            stepsAmount: meta.argTypes?.stepsAmount?.options,
            currentStepNumber: meta.argTypes?.currentStepNumber?.options,
          })
            .filter(args => args.currentStepNumber <= args.stepsAmount)
            .map((args: Args) => meta.render?.({ ...context.args, ...args }, context))}
        </div>
      `,
    );
  },
};
