import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { BADGE } from '../../../../.storybook/constants';

const meta: Meta = {
  title: 'Foundations/Elevation',
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () =>
    html`
      <div class="w-50 rounded p-regular bg-aubergine elevation-5">I'm elevated!</div>
    `,
};
