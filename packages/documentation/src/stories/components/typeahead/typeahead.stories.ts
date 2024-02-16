import { Meta, StoryObj } from '@storybook/web-components';
import { BADGE } from '../../../../.storybook/constants';

const meta: Meta = {
  id: '0456901c-3713-4f1f-b592-1f4dbd65a500',
  title: 'Components/Typeahead',
  parameters: {
    badges: [BADGE.WEB_COMPONENT_CANDIDATE],
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
