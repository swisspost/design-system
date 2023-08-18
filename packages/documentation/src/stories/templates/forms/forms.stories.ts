import { Meta, StoryObj } from '@storybook/web-components';
import { BADGE } from '../../../../.storybook/constants';

const meta: Meta = {
  title: 'Templates/Forms',
  parameters: {
    badges: [BADGE.TODO],
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
