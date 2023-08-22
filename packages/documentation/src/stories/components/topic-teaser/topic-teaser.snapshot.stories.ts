import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta, { Default } from './topic-teaser.stories';
import { html } from 'lit';
import { bombArgs } from '../../../utils/bombArgs';

export default {
  ...meta,
  title: 'Snapshots',
};

type Story = StoryObj;

export const TopicTeaser: Story = {
  render: (_args: Args, context: StoryContext) => {
    const templateVariants = bombArgs({
      subtitle: ['Loremipsum', 'Vero siteos et accusam iretea et justo'],
      title: ['Loremipsum', 'Vero siteos et accusam iretea et justo'],
      alignment: ['topic-teaser-reverse', 'null'],
      backgroundColor: ['bg-nightblue', 'bg-coral-bright'],
      linkCount: [1, 5, 10],
    }).map((args: Args) => {
      return html`
        <div class="p-3">
          ${Default.render?.({ ...context.args, ...Default.args, ...args }, context)}
        </div>
      `;
    });

    return html`
      <div>
        ${['white', 'dark'].map(
          bg => html`
            <div class=${'row bg-' + bg}>${templateVariants}</div>
          `,
        )}
      </div>
    `;
  },
};