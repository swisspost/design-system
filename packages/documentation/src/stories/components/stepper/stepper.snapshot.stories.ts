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
    const longSteps = [
      'Curabitur sed velit ullamcorper, molestie nunc a, dignissim ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Ut sed consectetur odio. Curabitur vel pulvinar est. Maecenas quam arcu, sagittis et libero aliquet, egestas luctus nisi.',
      'Nam pretium nec neque sed vulputate. Sed non augue libero. Vivamus consequat mauris id ligula cursus, sit amet faucibus ipsum.',
      'Sed vulputate lacinia eros, sit amet mattis sem luctus sit amet. Vestibulum pharetra tortor a laoreet malesuada.',
    ];
    return html`
      <div class="d-flex flex-column gap-4">
        ${['bg-white', 'bg-dark'].map(
          bg => html`
            <div class="${bg} d-flex flex-column gap-16 p-16">
              ${bombArgs({
                currentStepNumber: meta.argTypes?.currentStepNumber?.options,
              }).map((args: Args) => meta.render?.({ ...context.args, ...args }, context))}
              ${meta.render?.({ ...context.args, ...{ steps: longSteps } }, context)}
            </div>
          `,
        )}
      </div>
    `;
  },
};
