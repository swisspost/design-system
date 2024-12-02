import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta from './search.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const SearchInput: Story = {
  render: (_args: Args, context: StoryContext) => {
    const argsOptions = [
      { label: 'Default', placeholder: 'Search...' },
      { label: 'No Placeholder', placeholder: null },
    ];

    return schemes(
      scheme => html`
        <div class="d-flex flex-wrap align-items-start gap-16 p-16">
          ${argsOptions.map(
            args => html`
              <div class="search-input-container">
                <h4>${args.label}</h4> <!-- Remove scheme from label -->
                <div
                  class=${scheme === 'light' ? 'bg-white' : 'bg-dark'}
                  data-color-scheme=${scheme}
                >
                  ${meta.render?.({ ...context.args, ...args }, context)}
                </div>
              </div>
            `,
          )}
        </div>
      `,
    );
  },
};
