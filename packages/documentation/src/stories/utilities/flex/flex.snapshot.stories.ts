import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import meta from './flex.stories';
import './flex.styles.scss';
import {
  flexAlignContentValues,
  flexAlignItemsValues,
  flexAlignSelfValues,
  flexDirectionValues,
  flexJustifyContentValues,
  flexWrapValues,
} from './flex.docs.mdx';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

function getFlex(type: string) {
  switch (type) {
    case 'Direction':
      return html`
        ${flexDirectionValues.map(
          val => html`
            <div class="d-flex flex-${val}">
              <div class="bg-yellow p-12">Content</div>
              <div class="bg-gray p-12">Content</div>
            </div>
          `,
        )}
      `;
    case 'Align Items':
      return html`
        ${flexAlignItemsValues.map(
          val => html`
            <div class="d-flex align-items-${val}">
              <div class="bg-yellow p-12">Content</div>
              <div class="bg-gray px-12 py-48">Content</div>
            </div>
          `,
        )}
      `;
    case 'Justify Content':
      return html`
        ${flexJustifyContentValues.map(
          val => html`
            <div class="d-flex justify-content-${val}">
              <div class="bg-yellow p-12">Content</div>
              <div class="bg-gray p-12">Content</div>
            </div>
          `,
        )}
      `;
    case 'Align Self':
      return html`
        ${flexAlignSelfValues.map(
          val => html`
            <div class="d-flex align-items-start">
              <div class="bg-gray px-12 py-48">Content</div>
              <div class="bg-yellow p-12 align-self-${val}">Content with align-self</div>
              <div class="bg-gray px-12 py-48">Content</div>
            </div>
          `,
        )}
      `;
    case 'Grow / Shrink':
      return html`
        ${bombArgs({
          type: ['grow', 'shrink'],
          value: [0, 1],
        }).map(
          args => html`
            <div class="d-flex align-items-start grow-shrink-container">
              <div class="bg-yellow p-12 flex-${args.type}-${args.value}">
                I'm ${args.value === 0 ? 'not' : ''} ${args.type}ing
              </div>
              <div class="bg-gray p-12">
                ${args.type === 'grow'
                  ? 'Content'
                  : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
              </div>
            </div>
          `,
        )}
      `;
    case 'Align Content':
      return html`
        ${flexAlignContentValues.map(
          val => html`
            <div class="align-content-container d-flex flex-wrap align-content-${val}">
              ${Array.from({ length: 8 }).map(
                (_, i) =>
                  html` <div class="${i % 2 === 0 ? 'bg-gray' : 'bg-yellow'} p-12">Content</div> `,
              )}
            </div>
          `,
        )}
      `;
    case 'Wrap':
      return html`
        ${flexWrapValues.map(
          val => html`
            <div class="d-flex flex-${val}">
              ${Array.from({ length: 30 }).map(
                (_, i) => html`
                  <div class="${i % 2 === 0 ? 'bg-gray' : 'bg-yellow'} p-12">Content ${i + 1}</div>
                `,
              )}
            </div>
          `,
        )}
      `;
    case 'Order':
      return html`
        ${[
          [4, 5, 2, 3, 'last', 'first', 0, 1],
          ['last', 5, 4, 3, 2, 1, 0, 'first'],
        ].map(
          arr => html`
            <div class="d-flex flex-wrap">
              ${arr.map(
                (order, i) =>
                  html`<div class="bg-${i % 2 === 0 ? 'gray' : 'yellow'} p-8 order-${order}">
                    Element ${i} with position: ${order}
                  </div>`,
              )}
            </div>
          `,
        )}
      `;
    case 'Fill':
      return html`
        ${[true, false].map(
          isEqual => html`
            <div class="d-flex">
              <div class="bg-yellow p-8 flex-fill">Content</div>
              <div class="bg-gray p-8 flex-fill">
                ${isEqual ? 'Content' : 'Element with more content than the others'}
              </div>
              <div class="bg-yellow p-8 flex-fill">Content</div>
            </div>
          `,
        )}
      `;
  }
}

export const Flex: Story = {
  render: () => {
    return html` <div class="flex-example">
      ${[
        'Direction',
        'Align Items',
        'Justify Content',
        'Align Self',
        'Grow / Shrink',
        'Align Content',
        'Wrap',
        'Order',
        'Fill',
      ].map(
        val => html`
          <h1>${val}</h1>
          <div class="flex-example-child gap-8 d-flex flex-column">${getFlex(val)}</div>
        `,
      )}
    </div>`;
  },
};
