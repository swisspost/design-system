import { Meta, StoryObj } from '@storybook/web-components';
import { BADGE } from '../../../../.storybook/constants';

const meta: Meta = {
  title: 'Components/Card-Button',
  parameters: {
    badges: [BADGE.WEB_COMPONENT_CANDIDATE],
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
