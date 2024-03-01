import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  id: 'cfdf83ff-efa7-4b3c-ac91-6898c4f88701',
  title: 'Foundations/Elevation',
  parameters: {
    badges: [],
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () =>
    html` <div class="w-50 rounded p-regular bg-aubergine elevation-5">I'm elevated!</div> `,
};
