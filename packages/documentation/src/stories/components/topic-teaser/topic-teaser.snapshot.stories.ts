import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta, { Default } from './topic-teaser.stories';
import { html } from 'lit';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const TopicTeaser: Story = {
  render: (_args: Args, context: StoryContext) => {
    const short = 'Loremipsum';
    const long = 'Vero siteos et accusam iretea et justo';
    return html`
      <div>
        ${['white', 'dark'].map(
          bg => html`
            <div class="${'row bg-' + bg}">
              ${bombArgs({
                subtitle: [short, long],
                title: [short, long],
                alignment: context.argTypes.alignment.options,
                backgroundColor: ['bg-light', 'bg-dark'],
                linkCount: [1, 5, 10],
              })
                .filter((args: Args) => args.title !== args.subtitle || args.linkCount == 5)
                .map((args: Args) => {
                  return html`
                    <div class="p-16">
                      ${Default.render?.({ ...context.args, ...Default.args, ...args }, context)}
                    </div>
                  `;
                })}
            </div>
          `,
        )}
      </div>
    `;
  },
};
