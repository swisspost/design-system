import { Meta, StoryObj } from '@storybook/web-components';
import { BADGE } from '../../../../.storybook/constants';

const meta: Meta = {
  id: 'Utilities/Common',
  title: 'Utilities/Common',
  parameters: {
    badges: [BADGE.TODO],
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
