import { Args, StoryContext, StoryObj } from '@storybook/web-components';
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
      { label: 'No Placeholder', placeholder: '' },
      { label: 'With Content', placeholder: 'Search...', value: 'Some content' },
    ];

    return schemes(
      () => html`
        <div class="d-flex flex-column align-items-start gap-24 p-16">
          ${argsOptions.map(
            args => html`
              <div class="search-input-container">
                <h4 class="mb-8">${args.label}</h4>
                ${meta.render?.(
                  {
                    ...context.args,
                    ...args,
                  },
                  context,
                )}
              </div>
            `,
          )}
        </div>
      `,
    );
  },
};
