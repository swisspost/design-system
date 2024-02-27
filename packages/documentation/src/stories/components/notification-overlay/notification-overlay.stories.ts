import type { Meta, StoryObj } from '@storybook/web-components';
import { BADGE } from '../../../../.storybook/constants';

const meta: Meta = {
  id: 'aab3f0df-08ca-4e33-90eb-77ffda6528db',
  title: 'Components/Notification overlay',
  parameters: {
    badges: [BADGE.WEB_COMPONENT_CANDIDATE],
  },
};

export default meta;

export const Default: StoryObj = {};
