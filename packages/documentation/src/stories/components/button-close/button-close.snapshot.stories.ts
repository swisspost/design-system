import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta, { Default } from './button-close.stories';
import { html } from 'lit';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj<HTMLPostClosebuttonElement>;

export const PostClosebutton: Story = {
  render: (_args: Args, context: StoryContext<HTMLPostClosebuttonElement>) => {
    return html`
      ${['bg-white', 'bg-dark'].map(
        bg => html`
          <div class="${bg} p-40" data-color-scheme=${bg === 'bg-white' ? 'light' : 'dark'}>
            ${Default.render?.({ ...context.args }, context)}
          </div>
        `,
      )}
    `;
  },
};
