import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta, { AlignContainerGrid } from './align-container.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const AlignContainer: Story = {
  render: (_args: Args, context: StoryContext) => {
    return schemes(
      () => html`
        ${['none', 'align-container-start', 'align-container-end'].map(
          alignContainer =>
            html`
              ${meta.render({ alignContainer }, context)}
              ${AlignContainerGrid.render({ alignContainer }, context)}
            `,
        )}
      `,
    );
  },
};
