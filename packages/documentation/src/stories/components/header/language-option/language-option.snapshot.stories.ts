import type { StoryContext, StoryObj } from '@storybook/web-components';
import meta from './language-option.stories';
import { html } from 'lit';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
  decorators: [],
};

type Story = StoryObj<HTMLPostLanguageOptionElement>;

export const LanguageOption: Story = {
  render: (
    _args: HTMLPostLanguageOptionElement,
    context: StoryContext<HTMLPostLanguageOptionElement>,
  ) => {
    return html`
      <div>
        ${['bg-white', 'bg-dark'].map(
          bg => html`
            <div
              class="${bg} d-flex flex-column gap-16 p-16 mt-16"
              data-color-scheme=${bg === 'bg-white' ? 'light' : 'dark'}
              role="list"
            >
              ${meta.render?.({ ...context.args }, context)}
            </div>
          `,
        )}
      </div>
    `;
  },
};
