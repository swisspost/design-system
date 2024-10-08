import type { Args, StoryObj } from '@storybook/web-components';
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

export const Direction: Story = {
  render: () => {
    return html`
      <div class="flex-example flex-direction-example gap-8 d-flex flex-column">
        ${flexDirectionValues.map(
          val => html`
            <div class="d-flex flex-${val}">
              <div class="bg-yellow p-12">Content</div>
              <div class="bg-gray p-12">Content</div>
            </div>
          `,
        )}
      </div>
    `;
  },
};

export const AlignItems: Story = {
  render: () => {
    return html`
      <div class="flex-example flex-align-items-example gap-8 d-flex flex-column">
        ${flexAlignItemsValues.map(
          val => html`
            <div class="d-flex align-items-${val}">
              <div class="bg-yellow p-12">Content</div>
              <div class="bg-gray px-12 py-48">Content</div>
            </div>
          `,
        )}
      </div>
    `;
  },
};

export const JustifyContent: Story = {
  render: () => {
    return html`
      <div class="flex-example flex-justify-content-example gap-8 d-flex flex-column">
        ${flexJustifyContentValues.map(
          val => html`
            <div class="d-flex justify-content-${val}">
              <div class="bg-yellow p-12">Content</div>
              <div class="bg-gray p-12">Content</div>
            </div>
          `,
        )}
      </div>
    `;
  },
};

export const AlignSelf: Story = {
  render: () => {
    return html`
      <div class="flex-example flex-align-self-example gap-8 d-flex flex-column">
        ${flexAlignSelfValues.map(
          val => html`
            <div class="d-flex align-items-start">
              <div class="bg-gray px-12 py-48">Content</div>
              <div class="bg-yellow p-12 align-self-${val}">Content with align-self</div>
              <div class="bg-gray px-12 py-48">Content</div>
            </div>
          `,
        )}
      </div>
    `;
  },
};

export const GrowShrink: Story = {
  render: () => {
    return html`
      <div class="flex-example flex-grow-shrink-example gap-8 d-flex flex-column">
        ${bombArgs({
          type: ['grow', 'shrink'],
          value: [0, 1],
        })
          .map(args => ({ ...args, show: true } as Args))

          .map(
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
      </div>
    `;
  },
};

export const AlignContent: Story = {
  render: () => {
    return html`
      <div class="flex-example flex-align-content-example gap-8 d-flex flex-column">
        ${flexAlignContentValues.map(
          val => html`
            <div class="align-content-container d-flex flex-wrap align-content-${val}">
              <div class="bg-yellow p-12">Content</div>
              <div class="bg-gray p-12">Content</div>
              <div class="bg-yellow p-12">Content</div>
              <div class="bg-gray p-12">Content</div>
              <div class="bg-yellow p-12">Content</div>
              <div class="bg-gray p-12">Content</div>
            </div>
          `,
        )}
      </div>
    `;
  },
};

export const Wrap: Story = {
  render: () => {
    return html`
      <div class="flex-example flex-wrap-example gap-8 d-flex flex-column">
        ${flexWrapValues.map(
          val => html`
            <div class="d-flex flex-${val}">
              <div class="bg-yellow p-12">Content</div>
              <div class="bg-gray p-12">Content</div>
              <div class="bg-yellow p-12">Content</div>
              <div class="bg-gray p-12">Content</div>
              <div class="bg-yellow p-12">Content</div>
              <div class="bg-gray p-12">Content</div>
              <div class="bg-yellow p-12">Content</div>
              <div class="bg-gray p-12">Content</div>
              <div class="bg-yellow p-12">Content</div>
              <div class="bg-gray p-12">Content</div>
              <div class="bg-yellow p-12">Content</div>
              <div class="bg-gray p-12">Content</div>
              <div class="bg-yellow p-12">Content</div>
              <div class="bg-gray p-12">Content</div>
              <div class="bg-yellow p-12">Content</div>
              <div class="bg-gray p-12">Content</div>
              <div class="bg-yellow p-12">Content</div>
              <div class="bg-gray p-12">Content</div>
              <div class="bg-yellow p-12">Content</div>
              <div class="bg-gray p-12">Content</div>
            </div>
          `,
        )}
      </div>
    `;
  },
};

export const Order: Story = {
  render: () => {
    return html`
      <div class="flex-example flex-order-example gap-8 d-flex flex-column">
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
      </div>
    `;
  },
};

export const Fill: Story = {
  render: () => {
    return html`
      <div class="flex-example flex-order-example gap-8 d-flex flex-column">
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
      </div>
    `;
  },
};
