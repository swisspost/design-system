import type { Args, StoryContext, StoryObj, StoryFn } from '@storybook/web-components';
import meta from './list.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const PostList: Story = {
  render: () => {
    return html`
      <div class="d-flex gap-16 flex-column">
        ${bombArgs({
          titleHidden: [false, true],
          horizontal: [false, true],
          itemGap: ['1rem', '2rem', '5rem'], // Variations for item gap
          titleGap: ['1rem', '5rem', '10rem'], // Variations for title gap
        })
          .filter((args: Args) => !(args.titleHidden && args.titleGap !== '1rem'))
          .map((args: Args) => {
            return html`
              <post-list
                style="
                --post-list-item-gap: ${args.itemGap};
                --post-list-title-gap: ${args.titleGap};
              "
                title-hidden="${args.titleHidden}"
                horizontal="${args.horizontal}"
              >
                <h3 class="title">List Title</h3>
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
      return schemes(() => html` <div class="list-example">${story(context.args, context)}</div> `);
    },
  ],
};

export const List: Story = {
  render: () => {
    return schemes(
      () => html`
        <ol>
          <li>This is an ordered list.</li>
          <li>It appears in its default style.</li>
          <li>
            Therefore it should be rendered with sequential numbers at the beginning of each list
            item.
          </li>
          <li>
            Nested list:
            <ol>
              <li>This is a nested list</li>
              <li>It is further indented, depending on the depth of nesting.</li>
              <li>Nested lists numbers are independent form the numbers of their parents.</li>
            </ol>
            After nested list item
          </li>
          <li>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
          </li>
          <li>Ordered list item</li>
          <li>Ordered list item</li>
          <li>Ordered list item</li>
          <li>Ordered list item</li>
          <li>Ordered list item</li>
        </ol>
      `,
    );
  },
};

export const CheckList: Story = {
  render: () => {
    return html`
      <div class="d-flex">
        ${['bg-white', 'bg-dark'].map(
          bg => html`
            <div class="${bg} p-5" data-color-scheme=${bg === 'bg-white' ? 'light' : 'dark'}>
              <ul class="list-check">
                <li>
                 A check list item
                </li>
                <li>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                  velit esse cillum dolore eu fugiat nulla pariatur
                </li>
                <li>And one more</li>
                <li>
                  Nested check list:
                  <ul class="list-check">
                        <li>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                          velit esse cillum dolore eu fugiat nulla pariatur
                        </li>
                      </ul>
                    </li>
                    <li>And another one</li>
                    <li>And one more</li>
                  </ul>
                </li>
              </ul>
            </div>
          `,
        )}
      </div>
    `;
  },
};
