import type { StoryContext, StoryObj } from '@storybook/web-components';
import meta from './language-switch.stories';
import { html } from 'lit';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
  decorators: [],
};

type Story = StoryObj<HTMLPostLanguageOptionSwitchElement>;

export const LanguageOptionSwitch: Story = {
  render: (
    _args: HTMLPostLanguageOptionSwitchElement,
    context: StoryContext<HTMLPostLanguageOptionSwitchElement>,
  ) => {
    return html`
      <div class="language-option-switch">
        ${['bg-white', 'bg-dark'].map(
          bg => html`
            <div
              class="${bg} d-flex flex-column gap-16 p-16 mt-16"
              data-color-scheme=${bg === 'bg-white' ? 'light' : 'dark'}
            >
              ${meta.render?.({ ...context.args }, context)}
              ${meta.render?.(
                { ...context.args, variant: 'dropdown', name: `language-switch-example-${bg}` },
                context,
              )}
            </div>
          `,
        )}
      </div>
    `;
  },
};
