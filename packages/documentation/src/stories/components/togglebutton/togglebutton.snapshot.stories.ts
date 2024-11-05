import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta from './togglebutton.stories';
import { html } from 'lit';
import { bombArgs } from '@/utils';
import { Default } from '@/stories/components/button/button.stories';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const ToggleButton: Story = {
  render: (_args: Args, context: StoryContext) => {
    const renderContent = (bg: string) => {
      const colorScheme = bg === 'bg-white' ? 'light' : 'dark';
      return html`
        <div
          class="${bg} d-flex flex-wrap align-items-start gap-16 p-16"
          data-color-scheme=${colorScheme}
        >
          ${bombArgs({
            variant: context.argTypes.variant.options,
            size: context.argTypes.size.options,
            icon: ['null', '2069'],
          })
            .filter(args => args.icon !== 'null')
            .map((args: Args) =>
              Default.render?.({ ...context.args, ...args, animated: false }, context),
            )}
        </div>
      `;
    };

    return html`
      <div class="d-flex flex-wrap gap-4 align-items-start">
        ${['bg-white', 'bg-dark'].map(bg => renderContent(bg))}
      </div>
    `;
  },
};
