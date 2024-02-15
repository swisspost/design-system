import { Meta, StoryObj } from '@storybook/web-components';
import { BADGE } from '../../../../.storybook/constants';

const meta: Meta = {
  id: 'a6e4dfe1-0272-425b-9980-0ad40822c2c1',
  title: 'Components/Internet Header/Migration Guide',
  parameters: {
    badges: [BADGE.STABLE],
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
