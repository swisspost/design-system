import type { StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { MetaExtended } from '@root/types';

const meta: MetaExtended = {
  id: '1bb8a4a7-8205-4dcb-a41c-8f7ab1de1c99',
  title: 'Utilities/Display',
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  decorators: [story => html` <div class="display-story">${story()}</div> `],
  render: () =>
    html`
      <div class="d-inline p-8">Content</div>
      <div class="d-inline p-8">Content</div>
    `,
};
