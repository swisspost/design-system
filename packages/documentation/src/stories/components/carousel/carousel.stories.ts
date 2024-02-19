import { Meta, StoryObj } from '@storybook/web-components';
import { BADGE } from '../../../../.storybook/constants';

const meta: Meta = {
  id: 'cb3ba4a2-1265-4a20-b184-b85443146efa',
  title: 'Components/Carousel',
  parameters: {
    badges: [BADGE.WEB_COMPONENT_CANDIDATE],
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
