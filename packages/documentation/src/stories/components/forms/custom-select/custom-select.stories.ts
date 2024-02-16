import { Meta, StoryObj } from '@storybook/web-components';
import { BADGE } from '../../../../../.storybook/constants';

const meta: Meta = {
  id: 'e5a39d4f-4448-4398-9380-7c9fcae4a514',
  title: 'Components/Forms/Custom Select',
  parameters: {
    badges: [BADGE.DEPRECATED],
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
