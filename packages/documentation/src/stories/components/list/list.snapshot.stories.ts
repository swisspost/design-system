import type { Args, StoryContext, StoryObj, StoryFn } from '@storybook/web-components';
import meta from './list.stories';
import { html } from 'lit';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const List: Story = {
  render: () => {
    return html`
      <div class="d-flex gap-16 flex-column">
        ${bombArgs({
          titleHidden: [false, true],
          horizontal: [false, true],
          itemGap: ['1rem', '2rem', '5rem'], // Variations for item gap
          headingGap: ['1rem', '5rem', '10rem'], // Variations for heading gap
        })
          .filter((args: Args) => !(args.titleHidden && args.headingGap !== '1rem'))
          .map((args: Args) => {
            return html`
              <post-list
                style="
                --post-list-item-gap: ${args.itemGap};
                --post-list-title-gap: ${args.headingGap};
              "
                title-hidden="${args.titleHidden}"
                horizontal="${args.horizontal}"
              >
                <h3 class="heading">List Title</h3>
                <post-list-item>Item 1</post-list-item>
                <post-list-item>Item 2</post-list-item>
                <post-list-item>Item 3</post-list-item>
              </post-list>
            `;
          })}
      </div>
    `;
  },
  decorators: [
    (story: StoryFn, context: StoryContext) => {
      const storyTemplate = html` <div class="list-example">${story(context.args, context)}</div> `;
      return storyTemplate;
    },
  ],
};
