import { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import meta, { Default, Concatenated } from './breadcrumbs.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const BreadcrumbsSnapshots: Story = {
  render: (_args: Args, context: StoryContext) => {
    const scenarios = [
      {
        label: 'Default',
        story: Default.render?.(context.args, context) || html`<p>Error rendering Default</p>`,
      },
      {
        label: 'Concatenated',
        story:
          Concatenated.render?.(context.args, context) || html`<p>Error rendering Concatenated</p>`,
      },
      {
        label: 'Long Text',
        story: html`
          <post-breadcrumbs
            home-url="/"
            home-text="Home"
            label="Breadcrumbs"
            menu-label="More breadcrumb items"
          >
            <post-breadcrumb-item url="/section1"
              >This is a very long breadcrumb item
            </post-breadcrumb-item>
            <post-breadcrumb-item url="/section2"
              >Another long breadcrumb item</post-breadcrumb-item
            >
            <post-breadcrumb-item url="/section3"
              >Yet another long item that tests wrapping behavior</post-breadcrumb-item
            >
          </post-breadcrumbs>
        `,
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
