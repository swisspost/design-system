import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta from './stepper.stories';
import { html } from 'lit';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Stepper: Story = {
  render: (_args: Args, context: StoryContext) => {
    return html`
      <div class="d-flex flex-column gap-1">
        ${['bg-white', 'bg-dark'].map(
          bg => html`
            <div class="${bg} d-flex flex-column gap-regular p-regular">
              ${bombArgs({
                currentStepNumber: meta.argTypes?.currentStepNumber?.options,
              }).map((args: Args) => meta.render?.({ ...context.args, ...args }, context))}
            </div>
          `,
        )}
      </div>
    `;
  },
};
