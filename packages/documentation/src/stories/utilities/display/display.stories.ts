import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaExtended } from '@root/types';

const meta: MetaExtended = {
  id: '1bb8a4a7-8205-4dcb-a41c-8f7ab1de1c99',
  title: 'Utilities/Display',
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () =>
    html`
      <div class="d-inline bg-yellow p-8">Content</div>
      <div class="d-inline bg-black p-8">Content</div>
    `,
};
