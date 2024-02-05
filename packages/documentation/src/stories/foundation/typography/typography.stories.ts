import { Meta, StoryObj } from '@storybook/web-components';
import { BADGE } from '../../../../.storybook/constants';

const meta: Meta = {
  id: 'Typography',
  title: 'Foundations/Typography',
  parameters: {
    badges: [BADGE.BETA, BADGE.NEEDS_REVISION],
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
