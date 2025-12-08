import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import meta, * as PaginationStories from './pagination.stories';
import { schemes } from '@/shared/snapshots/schemes';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Pagination: Story = {
  render: (_args: Args, context: StoryContext) => {
    return schemes(
      () => html`
        <div class="snapshot d-flex flex-column gap-16 p-16">
          ${PaginationStories.Default.render?.({ ...context.args }, context)}
          ${PaginationStories.ManyPages.render?.({ ...context.args }, context)}
          ${PaginationStories.PageOutOfRange.render?.({ ...context.args }, context)}
          ${PaginationStories.Disabled.render?.({ ...context.args }, context)}
        </div>
      `,
      {
        // exclude dark scheme from snapshots
        filter: scheme => scheme === 'light',
      },
    );
  },
};
