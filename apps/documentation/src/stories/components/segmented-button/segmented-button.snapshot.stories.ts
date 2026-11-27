import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import meta, { Default } from './segmented-button.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const SegmentedButton: Story = {
  render: (_args: Args, context: StoryContext) =>
    schemes(
      () => html`
        <div class="d-flex flex-column gap-16 p-16">
          ${bombArgs({
            content: ['text', 'icon', 'text-icon'],
            labelCount: [2, 4, 6, 8],
          }).map(args => Default.render?.({ ...context.args, ...args }, context))}
        </div>
      `,
    ),
};
