import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import meta, { Default } from './target-group.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const TargetGroup: Story = {
  render: (_args: Args, context: StoryContext) => {
    return schemes(
      () => html`
        <div class="d-flex flex-column gap-32">
          ${[0, 1, 2].map(
            (activeArg: number) =>
              html` ${Default.render?.({ ...context.args, active: activeArg }, context)}`,
          )}
        </div>
      `,
    );
  },
};
