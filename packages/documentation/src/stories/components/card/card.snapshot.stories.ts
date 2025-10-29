import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import meta, { CustomContent, Default, ListGroup } from './card.stories';
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
        showImage: [false, true],
        imagePosition: meta.argTypes?.imagePosition?.options,
        action: ['none', 'button', 'links'],
      })
        .filter(args => !(!args.showImage && args.imagePosition === 'bottom'))
        // Map default template variants
        .map(
          args => html`
            <div class="col-6 col-md-4 p-16">
              ${Default.render && Default.render({ ...meta.args, ...args }, context)}
            </div>
          `,
        );

    // Define custom template variant
    const customTemplateVariant = html`
      <div class="p-16 col-6">
        ${CustomContent.render &&
        CustomContent.render({ ...meta.args, ...CustomContent.args }, context)}
      </div>
    `;

    // Define list group variant
    const listGroupVariant = html`
      <div class="p-16 col-6">
        ${ListGroup.render && ListGroup.render({ ...meta.args, ...ListGroup.args }, context)}
      </div>
    `;

    return schemes(
      () =>
        html`
          <div class="row">
            <h1>Cards</h1>
            <h2 class="mt-32">Default template variants cards</h2>
            ${defaultTemplateVariants}
            <h2 class="mt-32">Custom template variants cards</h2>
            ${customTemplateVariant}
            <h2 class="mt-32">Custom template variants cards</h2>
            ${listGroupVariant}
          </div>
        `,
      {
        // dark mode is not yet implemented corretly
        filter: scheme => scheme === 'light',
      },
    );
  },
};
