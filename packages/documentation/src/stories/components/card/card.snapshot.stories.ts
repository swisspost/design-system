import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import meta, { Default } from './card.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Card: Story = {
  render: (_args: Args, context: StoryContext) => {
    // Define basic content template variants
    const defaultTemplateVariants =
      // Layout related combinations
      bombArgs({
        action: ['none', 'button', 'link'],
      }).map(
        args => html`
          <div class="col-6 col-md-4 p-16">
            ${Default.render && Default.render({ ...meta.args, ...args }, context)}
          </div>
        `,
      );

    return schemes(
      () => html`
        <div class="row">
          <h1>Cards</h1>
          <h2 class="mt-32">Default template variants cards</h2>
          ${defaultTemplateVariants}
        </div>
      `,
      {
        // dark mode is not yet implemented corretly
        filter: scheme => scheme === 'light',
      },
    );
  },
};
