import type { Args, StoryContext, StoryObj, StoryFn } from '@storybook/web-components';
import meta from './listbox.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  label: 'Snapshots',
};

type Story = StoryObj;

export const PostListbox: Story = {
  render: () => {
    return html`
      <div class="d-flex gap-16 flex-column">
        ${bombArgs({
          labelHidden: [false, true],
          multiselect: [false, true],
          itemGap: ['1rem', '2rem', '5rem'], // Variations for item gap
          labelGap: ['1rem', '5rem', '10rem'], // Variations for label gap
        })
          .filter((args: Args) => !(args.labelHidden && args.labelGap !== '1rem'))
          .map((args: Args) => {
            return html`
              <post-listbox
                style="
                --post-listbox-item-gap: ${args.itemGap};
                --post-listbox-label-gap: ${args.labelGap};
              "
                label-hidden="${args.labelHidden}"
                multiselect="${args.multiselect}"
              >
                <h3 class="label">Listbox label</h3>
                <post-listbox-item>Item 1</post-listbox-item>
                <post-listbox-item>Item 2</post-listbox-item>
                <post-listbox-item>Item 3</post-listbox-item>
              </post-listbox>
            `;
          })}
      </div>
    `;
  },
  decorators: [
    (story: StoryFn, context: StoryContext) => {
      return schemes(
        () => html` <div class="listbox-example">${story(context.args, context)}</div> `,
      );
    },
  ],
};
