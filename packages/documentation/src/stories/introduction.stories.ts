import { StoryObj } from '@storybook/web-components';
import { MetaExtended } from '@root/types';

const meta: MetaExtended = {
  id: 'Introduction',
  title: 'Introduction',
  parameters: {
    badges: [],
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
