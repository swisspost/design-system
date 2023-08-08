import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'hidden/demos/foundations/Elevation',
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () =>
    html`
      <div class="w-50 rounded p-regular bg-aubergine elevation-5">I'm elevated!</div>
    `,
};
