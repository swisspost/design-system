import type { StoryObj } from '@storybook/web-components';
import meta from './list.stories';
import { html } from 'lit';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const OrderedList: Story = {
  render: () => {
    const listItems = Array.from({ length: 10 }, (_, i) => ({
      text: `List item ${i + 1}`,
      children: i === 0 ? Array.from({ length: 3 }, (_, j) => `Nested item ${j + 1}`) : null,
    }));

    return html`
      <div class="d-flex flex-wrap gap-4 align-items-start">
        ${['bg-white', 'bg-dark'].map(
          bg => html`
            <div class="${bg} p-5">
              <ol>
                ${listItems.map(
                  item => html`
                    <li>
                      ${item.text}
                      ${item.children
                        ? html`
                            <ol>
                              ${item.children.map(child => html`<li>${child}</li>`)}
                            </ol>
                          `
                        : ''}
                    </li>
                  `,
                )}
              </ol>
            </div>
          `,
        )}
      </div>
    `;
  },
};
