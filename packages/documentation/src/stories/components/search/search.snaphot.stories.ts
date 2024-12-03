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
      { label: 'Default', placeholder: 'Search...', hint: meta.args?.hint },
      { label: 'No Placeholder', placeholder: null, hint: meta.args?.hint },
      { label: 'With Content', placeholder: 'Search...', value: 'Some content', hint: meta.args?.hint },
      { label: 'Without Helper Text', placeholder: 'Search...' },
    ];

    return schemes(
      () => html`
        <div class="d-flex flex-wrap align-items-start gap-16 p-16">
          ${argsOptions.map(
            args => html`
              <div class="search-input-container">
                <h4>${args.label}</h4>
                  ${meta.render?.(
                    {
                      ...context.args,
                      ...args,
                      placeholder: args.placeholder || '',
                      value: args.value || '',
                      hint: args.hint || '',
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
