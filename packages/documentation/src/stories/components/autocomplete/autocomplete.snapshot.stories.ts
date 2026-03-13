import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import meta, { Default, Clearable, DisabledOptions, EmptyState } from './autocomplete.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Autocomplete: Story = {
  render: (_args: Args, context: StoryContext) => {
    return schemes(
      () => html`
        <div class="d-flex gap-16 flex-column">
          <h1>Autocomplete</h1>

          <h2 class="h4">Default</h2>
          <div>
            ${Default.render?.(
              { ...context.args, ...Default.args },
              { ...context, id: `snap-default-${crypto.randomUUID()}` },
            )}
          </div>

          <h2 class="h4">Clearable</h2>
          <div>
            ${Clearable.render?.(
              { ...context.args, ...Clearable.args },
              { ...context, id: `snap-clearable-${crypto.randomUUID()}` },
            )}
          </div>

          <h2 class="h4">Disabled Options</h2>
          <div>
            ${DisabledOptions.render?.(
              { ...context.args, ...DisabledOptions.args },
              { ...context, id: `snap-disabled-${crypto.randomUUID()}` },
            )}
          </div>

          <h2 class="h4">Empty State</h2>
          <div>
            ${EmptyState.render?.(
              { ...context.args, ...EmptyState.args },
              { ...context, id: `snap-empty-${crypto.randomUUID()}` },
            )}
          </div>
        </div>
      `,
    );
  },
};
