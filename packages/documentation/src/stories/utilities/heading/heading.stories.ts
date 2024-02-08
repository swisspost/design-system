import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { BADGE } from '../../../../.storybook/constants';

const meta: Meta = {
  id: '5f93ffae-2e01-4932-aae6-1673c6adf0cf',
  title: 'Utilities/Heading',
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
  },
};

export default meta;

type Story = StoryObj;

export const OnAnHeadingElement: Story = {
  render: () => html` <h6 class="h3">Heading level 6 with h3 styles...</h6> `,
};

export const OnAParagraphElement: Story = {
  render: () => html` <p class="h3">Paragraph with h3 styles...</p> `,
};
