import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import meta, { Default } from './breadcrumb-default.stories';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const BreadcrumbSnapshots: Story = {
  render: (_args: Args, context: StoryContext) => {
    const breadcrumbVariants = [
      ...bombArgs({
        homeUrl: ['/', '/home'],
        homeText: ['Home', 'Dashboard'],
        items: [
          [
            { url: '/section1', label: 'Section 1' },
            { url: '/section2', label: 'Section 2' },
          ],
          [
            { url: '/section1', label: 'Section 1' },
            { url: '/section2', label: 'Section 2' },
            { url: '/section3', label: 'Section 3' },
          ],
        ],
      }),
    ];

    // Render each variant
    const snapshots = breadcrumbVariants.map(args => {
      const breadcrumbItems = args.items.map(
        (item: { url: string; label: string }) =>
          html`<post-breadcrumb-item url=${item.url}>${item.label}</post-breadcrumb-item>`
      );

      return html`
        <div class="mb-24">
          <post-breadcrumb home-url=${args.homeUrl} home-text=${args.homeText}>
            ${breadcrumbItems}
          </post-breadcrumb>
        </div>
      `;
    });

    // Render all snapshots with white and dark background
    return schemes(() => html`
      <div class="d-flex flex-wrap gap-16">${snapshots}</div>
    `);
  },
};
