import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaExtended } from '@root/types';

const meta: MetaExtended = {
  id: 'b0154a21-1138-4a69-953a-c17c3cb7c538',
  title: 'Utilities/Flex',
  parameters: {
    badges: [],
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () =>
    html`
      <div class="d-flex flex-row">
        <div class="bg-yellow p-8">Content</div>
        <div class="bg-black p-8">Content</div>
      </div>
    `,
};

export const AlignItems: Story = {
  render: () =>
    html`
      <div class="d-flex align-items-end">
        <div class="bg-yellow p-8">Content</div>
        <div class="bg-black p-8">Content<br />that's a bit bigger</div>
      </div>
    `,
};

export const AlignSelf: Story = {
  render: () =>
    html`
      <div class="d-flex">
        <div class="bg-black p-8">Content<br />that's a bit bigger</div>
        <div class="bg-yellow align-self-end p-8">Content</div>
        <div class="bg-black p-8">Content<br />that's a bit bigger</div>
      </div>
    `,
};

export const JustifyContent: Story = {
  render: () =>
    html`
      <div class="d-flex justify-content-between">
        <div class="bg-yellow p-8">Content</div>
        <div class="bg-black p-8">Content</div>
      </div>
    `,
};
