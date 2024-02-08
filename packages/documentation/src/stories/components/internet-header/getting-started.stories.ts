import { Meta, StoryObj } from '@storybook/web-components';
import { BADGE } from '../../../../.storybook/constants';

const meta: Meta = {
  id: '9b02bcb2-3b6a-4271-b550-675a62ff3890',
  title: 'Components/Internet Header/Getting Started',
  parameters: {
    badges: [BADGE.STABLE],
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
