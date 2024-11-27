import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta, { renderHint } from './hint.stories';
import { html } from 'lit';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Hint: Story = {
  render: (_args: Args, context: StoryContext) => {
    return html`
      <div>
        ${['bg-white', 'bg-dark'].map(
          bg => html`
            <div
              class="${bg} d-flex gap-16 flex-column p-16"
              data-color-scheme=${bg === 'bg-white' ? 'light' : 'dark'}
            >
              ${renderHint({ ..._args }, context, 'example-input-' + bg)}
            </div>
          `,
        )}
      </div>
    `;
  },
};
