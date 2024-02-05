import { Meta, StoryObj } from '@storybook/web-components';
import { BADGE } from '../../../../.storybook/constants';

const meta: Meta = {
  id: 'Components/Internet Header/Getting Started',
  title: 'Components/Internet Header/Getting Started',
  parameters: {
    badges: [BADGE.STABLE],
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
