import type { Args, StoryObj } from '@storybook/web-components';
import meta from './close-button.stories';
import { html } from 'lit';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const CloseButton: Story = {
  render: (_args: Args) => {
    return html`
      ${['bg-white', 'bg-dark'].map(
        bg => html`
          <div class="${bg} p-40" data-color-scheme=${bg === 'bg-white' ? 'light' : 'dark'}>
            <post-closebutton label="${_args.label}"></post-closebutton>
          </div>
        `,
      )}
    `;
  },
};
