import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit/static-html.js';
import { MetaExtended } from '@root/types';

const meta: MetaExtended = {
  id: '6eea4ad2-d5d2-44bf-a7a5-d5621ecd6c36',
  title: 'Utilities/Focus Ring',
  render: () => {
    return html`
      <button class="focus-ring">Custom focus ring</button>
    `;
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
