import type { StoryContext, StoryObj } from '@storybook/web-components';
import meta from './language-switch.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';

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
        ${schemes(
          () => html`
            <div class="d-flex flex-wrap align-items-center gap-16">
              ${meta.render?.({ ...context.args }, context)}
              ${meta.render?.(
                { ...context.args, variant: 'dropdown', name: `language-switch-example` },
                context,
              )}
            </div>
          `,
        )}
      </div>
    `;
  },
};
