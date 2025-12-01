import type { StoryContext, StoryObj } from '@storybook/web-components-vite';
import meta from './language-switch.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
  decorators: [],
};

type Story = StoryObj<HTMLPostLanguageMenuElement>;

export const LanguageSwitch: Story = {
  render: (
    _args: HTMLPostLanguageMenuElement,
    context: StoryContext<HTMLPostLanguageMenuElement>,
  ) => {
    return html`
      <div class="language-switch">
        ${schemes(
          () => html`
            <div class="d-flex flex-wrap align-items-center gap-16">
              ${meta.render?.({ ...context.args }, context)}
              ${meta.render?.({ ...context.args, variant: 'menu' }, context)}
            </div>
          `,
        )}
      </div>
    `;
  },
};
