import { Meta, StoryObj } from '@storybook/web-components';
import { BADGE } from '../../../.storybook/constants';

const meta: Meta = {
  title: 'Components/Internet Header/Migration Guide',
  parameters: {
    badges: [BADGE.STABLE],
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
