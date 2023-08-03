import type { Meta, Args, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { BADGE } from '../../../../.storybook/constants';

const meta: Meta = {
  title: 'Components/Input-Group',
  parameters: {
    badges: [BADGE.TODO],
  },
  args: {},
  argTypes: {},
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: Args) => {
    return html`
      <div />
    `;
  },
};