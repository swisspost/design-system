import type { StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { MetaExtended } from '@root/types';

const meta: MetaExtended = {
  id: 'b0154a21-1138-4a69-953a-c17c3cb7c538',
  title: 'Utilities/Flex',
  decorators: [story => html`<div class="flex-story-container">${story()}</div>`],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () =>
    html`
      <div class="d-flex flex-row">
        <div class="p-8">Content</div>
        <div class="p-8">Content</div>
      </div>
    `,
};

export const AlignItems: Story = {
  render: () =>
    html`
      <div class="d-flex align-items-end">
        <div class="p-8">Small content</div>
        <div class="px-8 py-48">Big content</div>
      </div>
    `,
};

export const AlignSelf: Story = {
  render: () =>
    html`
      <div class="d-flex">
        <div class="px-8 py-48">Content</div>
        <div class="align-self-end p-8">Content</div>
        <div class="px-8 py-48">Content</div>
      </div>
    `,
};

export const JustifyContent: Story = {
  render: () =>
    html`
      <div class="d-flex justify-content-between">
        <div class="p-8">Content</div>
        <div class="p-8">Content</div>
      </div>
    `,
};

export const GrowShrink: Story = {
  render: () =>
    html`
      <div class="d-flex">
        <div class="flex-grow-1 p-8">I'm growing</div>
        <div class="flex-shrink-1 p-8">I'm shrinking</div>
      </div>
    `,
};

export const AlignContent: Story = {
  render: () =>
    html`
      <div style="height: 14rem" class="d-flex flex-wrap align-content-around">
        ${Array.from({ length: 14 }).map(() => html` <div class="p-8">Content</div> `)}
      </div>
    `,
};

export const Order: Story = {
  render: () =>
    html`
      <div class="d-flex">
        <div class="p-8 order-3">First element, positioned last</div>
        <div class="p-8 order-2">Second element</div>
        <div class="p-8 order-1">Last element, positioned first</div>
      </div>
    `,
};

export const Wrap: Story = {
  render: () =>
    html`
      <div class="d-flex flex-wrap">
        <div class="p-8">Content</div>
        <div class="p-8">Content</div>
        <div class="p-8">Content</div>
        <div class="p-8">Content</div>
        <div class="p-8">Content</div>
        <div class="p-8">Content</div>
        <div class="p-8">Content</div>
        <div class="p-8">Content</div>
        <div class="p-8">Content</div>
        <div class="p-8">Content</div>
        <div class="p-8">Content</div>
        <div class="p-8">Content</div>
        <div class="p-8">Content</div>
        <div class="p-8">Content</div>
      </div>
    `,
};

export const FillEqual: Story = {
  render: () =>
    html`
      <div class="d-flex">
        <div class="p-8 flex-fill">Same content, same width</div>
        <div class="p-8 flex-fill">Same content, same width</div>
        <div class="p-8 flex-fill">Same content, same width</div>
      </div>
    `,
};

export const Fill: Story = {
  render: () =>
    html`
      <div class="d-flex">
        <div class="p-8 flex-fill">Content</div>
        <div class="p-8 flex-fill">Element with more content than the others</div>
        <div class="p-8 flex-fill">Content</div>
      </div>
    `,
};
