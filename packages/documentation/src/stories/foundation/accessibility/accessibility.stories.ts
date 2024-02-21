import { Meta, StoryObj } from '@storybook/web-components';
import { BADGE } from '../../../../.storybook/constants';

const meta: Meta = {
  id: '46da78e8-e83b-4ca1-aaf6-bbc662efef14',
  title: 'Foundations/Accessibility',
  parameters: {
    badges: [BADGE.TODO],
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
