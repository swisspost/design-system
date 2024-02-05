import { Meta, StoryObj } from '@storybook/web-components';
import { BADGE } from '../../../../../.storybook/constants';

const meta: Meta = {
  id: 'Layout/Breakpoints',
  title: 'Foundations/Layout/Breakpoints',
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
