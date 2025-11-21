import type { StoryObj } from '@storybook/web-components-vite';
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
  render: () => {
    return schemes(
      () => html`
        <div class="snapshot d-flex flex-column gap-16 p-16">
          ${PaginationStories.Default.render?.({}, {} as any)}
          ${PaginationStories.ManyPages.render?.({}, {} as any)}
          ${PaginationStories.PageOutOfRange.render?.({}, {} as any)}
          ${PaginationStories.Disabled.render?.({}, {} as any)}
        </div>
      `,
      {
        // exclude dark scheme from snapshots
        filter: scheme => scheme === 'light',
      },
    );
  },
};
