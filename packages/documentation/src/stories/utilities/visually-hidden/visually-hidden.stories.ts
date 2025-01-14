import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit/static-html.js';
import { MetaExtended } from '@root/types';

const meta: MetaExtended = {
  id: 'e8d66106-1c50-4edd-a52c-985a3625f0be',
  title: 'Utilities/Visually Hidden',
  render: () => {
    return html`
      <div class="visually-hidden">Hidden from the screen, available to screen readers.</div>
    `;
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
