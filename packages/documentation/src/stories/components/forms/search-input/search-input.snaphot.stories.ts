import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta from './search-input.stories';
import { html } from 'lit';
import { getCombinations } from '@/utils/inputComponentsGetCombinations';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
  render: renderSearchInputSnapshot,
};

function renderSearchInputSnapshot(_args: Args, context: StoryContext) {
  const combinations = [
    {
      label: `Label - Default`,
      placeholder: 'Search...',
    },
    {
      label: `Label - No Placeholder`,
      placeholder: null,
    },
  ];

  return html`
    <div class="d-flex flex-wrap align-items-start gap-16">
      ${['bg-white', 'bg-dark'].map(
        bg => html`
          <div
            class="${bg} d-flex gap-16 flex-column p-16"
            data-color-scheme=${bg === 'bg-white' ? 'light' : 'dark'}
          >

            <h4>Default</h4>
            ${getCombinations('floatingLabel', [false], combinations)
              .filter(combination => combination.label === 'Label - Default')
              .map((args: Args) => {
                context.id = `default-${crypto.randomUUID()}`;
                return html`
                  <div>
                    <div>${meta.render?.({ ...context.args, ...args }, context)}</div>
                  </div>
                `;
              })}

            <h4>Without Placeholder</h4>
            ${getCombinations('floatingLabel', [false], combinations)
              .filter(combination => combination.label === 'Label - No Placeholder')
              .map((args: Args) => {
                context.id = `no-placeholder-${crypto.randomUUID()}`;
                return html`
                  <div>
                    <div>${meta.render?.({ ...context.args, ...args }, context)}</div>
                  </div>
                `;
              })}
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
