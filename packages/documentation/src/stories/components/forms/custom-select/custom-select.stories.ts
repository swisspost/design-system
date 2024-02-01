import { Meta, StoryObj } from '@storybook/web-components';
import { BADGE } from '../../../../../.storybook/constants';

const meta: Meta = {
  title: 'Components/Forms/Custom-Select',
  parameters: {
    badges: [BADGE.DEPRECATED],
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
