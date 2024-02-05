import { Meta, StoryObj } from '@storybook/web-components';
import { BADGE } from '../../../../.storybook/constants';

const meta: Meta = {
  id: 'Components/Carousel',
  title: 'Components/Carousel',
  parameters: {
    badges: [BADGE.WEB_COMPONENT_CANDIDATE],
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
