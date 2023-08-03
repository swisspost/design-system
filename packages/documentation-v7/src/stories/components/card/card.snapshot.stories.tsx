import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta, { Default, CustomContent, CardGroup } from './card.stories';
import { html } from 'lit';
import { bombArgs } from '../../../utils/bombArgs';

export default {
  ...meta,
  title: 'Hidden/snapshots/components/Card',
};

type Story = StoryObj;

export const Card: Story = {
  render: (_args: Args, context: StoryContext) => {
    // Define default template variants
    const defaultTemplateVariants = [
      // Layout related combinations
      ...bombArgs({
        showImage: [false, true],
        imagePosition: meta.argTypes?.imagePosition?.options,
        showHeader: [false, true],
        showBody: [false, true],
        showFooter: [false, true],
      }),
      // Content related combinations
      ...bombArgs({
        showImage: [false],
        showBody: [true],
        showTitle: [false, true],
        showSubtitle: [false, true],
        action: ['none', 'button', 'links'],
        showListGroup: [false, true],
      }),
    ]
      // Has to show anything
      .filter(args => args.showHeader || args.showBody || args.showFooter || args.showImage)
      // No subtitle without title
      .filter(args => !(args.showSubtitle && !args.showTitle))
      // No single footer
      .filter(args => !(args.showFooter && !args.showBody && !args.showHeader))
      // No single header
      .filter(args => !(args.showHeader && !args.showBody && !args.showFooter))
      // No header and footer without content in between
      .filter(args => !(args.showHeader && args.showFooter && args.showBody === false))
      // Ignore header position if showHeader is false
      .filter(args => !(!args.showImage && args.imagePosition === 'bottom'))
      // Ignore header position if only img is shown
      .filter(
        args =>
          !(
            args.showImage &&
            !args.showBody &&
            !args.showHeader &&
            !args.showFooter &&
            args.imagePosition === 'bottom'
          ),
      )
      // Map default template variants
      .map(args => html`
        <div class="col-6 p-3">
          ${Default.render && Default.render({ ...meta.args, ...args }, context)}
        </div>
      `);

    // Define custom template variants
    const customTemplateVariants = [
      { story: CustomContent, colWidth: 6 },
      { story: CardGroup, colWidth: 12 },
    ]
      // Map custom template variants
      .map(({ story, colWidth }) => html`
        <div class=${'p-3 col-' + colWidth}>
          ${story.render && story.render({ ...meta.args, ...story.args }, context)}
        </div>
      `);

    // Render all variants on white and dark background
    return html`
      <div>
        ${['white', 'dark'].map(bg => html`
          <div class=${'row bg-' + bg}>
            ${defaultTemplateVariants}
            ${customTemplateVariants}
          </div>
        `)}
      </div>
    `;
  },
};
