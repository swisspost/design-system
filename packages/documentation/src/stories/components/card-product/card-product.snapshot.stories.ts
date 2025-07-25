import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import meta, { Default, Groupped, Multipart } from './card-product.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';
import ProductCardSyncHeights from './card-product.sample.js?raw';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const ProductCard: Story = {
  render: (_args: Args, context: StoryContext) => {
    // Define default template variants
    const defaultTemplateVariants = [
      ...bombArgs({
        level: ['h1', 'h3'],
      }),
    ]
      // Map default template variants
      .map(argOverrides => {
        const args: Partial<{ [key: string]: string }> = { ...meta.args, ...argOverrides };
        args.title = `${args.title} (${args.level})`;

        return html`
          <div class="col-12 mb-24">${Default.render && Default.render(args, context)}</div>
        `;
      });

    // Define custom template variants
    const customTemplateVariants = [Groupped, Multipart]
      // Map custom template variants
      .map(
        story => html`
          <div class="mb-24">
            ${story.render && story.render({ ...meta.args, ...story.args }, context)}
          </div>
        `,
      );

    // Render all variants on white and dark background
    return schemes(
      () => html`
        <div>
          <div class="row gap-16 row-cols-md-2 row-cols-xl-3">${defaultTemplateVariants}</div>
          ${customTemplateVariants}
          <script>
            ${ProductCardSyncHeights};
          </script>
        </div>
      `,
      {
        // dark mode is not yet implemented corretly
        filter: scheme => scheme === 'light',
      },
    );
  },
};
