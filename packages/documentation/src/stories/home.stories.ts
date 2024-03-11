import { StoryObj } from '@storybook/web-components';
import { MetaExtended } from '../../types';

const meta: MetaExtended = {
  id: 'Home',
  title: 'Home',
  parameters: {
    badges: [],
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
