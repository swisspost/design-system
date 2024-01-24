import { Meta, StoryObj } from '@storybook/web-components';
import { BADGE } from '../../../../../.storybook/constants';

const meta: Meta = {
  title: 'Foundations/Layout/Gutters',
  parameters: {
    badges: [BADGE.TODO],
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
