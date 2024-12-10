import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaExtended } from '@root/types';

const meta: MetaExtended = {
  id: 'cfdf83ff-efa7-4b3c-ac91-6898c4f88701',
  title: 'Utilities/Elevation',
  parameters: {
    badges: [],
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => html` <div class="w-50 rounded p-16 elevation-5">I'm elevated!</div> `,
};
