import type { StoryObj } from '@storybook/web-components';
import meta from './list.stories';
import { html } from 'lit';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const List: Story = {
  render: () => {
    return html`
      <div class="d-flex">
        ${['bg-white', 'bg-dark'].map(
          bg => html`
            <div class="${bg} p-5">
              <ol>
                <li>This is an ordered list.</li>
                <li>It appears in its default style.</li>
                <li>
                  Therefore it should be rendered with sequential numbers at the beginning of each
                  list item.
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
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur
                </li>
                <li>Ordered list item</li>
                <li>Ordered list item</li>
                <li>Ordered list item</li>
                <li>Ordered list item</li>
                <li>Ordered list item</li>
              </ol>
            </div>
          `,
        )}
      </div>
    `;
  },
};
