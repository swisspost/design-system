import type { StoryContext, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import meta, { createAutocompleteRenderer } from './autocomplete.stories';
import { schemes } from '@/shared/snapshots/schemes';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Autocomplete: Story = {
  render: (_args, context: StoryContext) => {
    const renderNested = createAutocompleteRenderer();
    const renderDetached = createAutocompleteRenderer({ detached: true });

    return schemes(
      () => html`
        <div class="d-flex flex-column gap-32">
          <div>
            <h2 class="h5">Nested Listbox</h2>
            ${renderNested(
              { ...context.args, clearable: true },
              { ...context, id: `${context.id}-nested` } as StoryContext,
            )}
          </div>
          <div>
            <h2 class="h5">Detached Listbox</h2>
            ${renderDetached(
              { ...context.args, filterThreshold: 3 },
              { ...context, id: `${context.id}-detached` } as StoryContext,
            )}
          </div>
        </div>
      `,
    );
  },
};
