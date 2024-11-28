import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta from './search-input.stories';
import { html } from 'lit';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
  render: renderSearchInputSnapshot,
};

function renderSearchInputSnapshot(_args: Args, context: StoryContext) {
  const argsOptions = [
    { label: 'Default', placeholder: 'Search...' },
    { label: 'No Placeholder', placeholder: null },
  ];

  return html`
    <div class="d-flex flex-wrap align-items-start gap-16">
      ${['bg-white', 'bg-dark'].map(
        bg => html`
          <div
            class="${bg} d-flex gap-16 flex-column p-16"
            data-color-scheme=${bg === 'bg-white' ? 'light' : 'dark'}
          >
            ${argsOptions.map(
              args => html`
                <div>
                  <h4>${args.label}</h4>
                  <div>${meta.render?.({ ...context.args, ...args }, context)}</div>
                </div>
              `,
            )}
          </div>
        `,
      )}
    </div>
  `;
}

type Story = StoryObj;

export const SearchInputDefault: Story = {
  args: {
    placeholder: 'Search...',
  },
};
