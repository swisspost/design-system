import { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import meta, { Default, ManyPages, PageOutOfRange, Disabled } from './pagination.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';

const { id, ...metaWithoutId } = meta as any;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const PaginationSnapshots: Story = {
  render: (_args: Args, context: StoryContext) => {
    const scenarios = [
      {
        label: 'Default',
        story: Default.render?.(context.args, context) || html`<p>Error rendering Default</p>`,
      },
      {
        label: 'Many Pages',
        story: ManyPages.render?.(context.args, context) || html`<p>Error rendering ManyPages</p>`,
      },
      {
        label: 'Page Out Of Range',
        story:
          PageOutOfRange.render?.(context.args, context) || html`<p>Error rendering PageOutOfRange</p>`,
      },
      {
        label: 'Disabled',
        story: Disabled.render?.(context.args, context) || html`<p>Error rendering Disabled</p>`,
      },
    ];

    return schemes(
      () => html`
        <div class="d-flex flex-column gap-24">
          ${scenarios.map(
            scenario => html`
              <div>
                <h4>${scenario.label}</h4>
                ${scenario.story}
              </div>
            `,
          )}
        </div>
      `,
    );
  },
};
