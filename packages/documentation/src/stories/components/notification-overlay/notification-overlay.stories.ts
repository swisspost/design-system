import type { StoryObj } from '@storybook/web-components';
import { MetaComponent } from '../../../../types';
import { getComponentFigmaLink } from '../../../utils';

const meta: MetaComponent = {
  id: 'aab3f0df-08ca-4e33-90eb-77ffda6528db',
  title: 'Components/Notification Overlay',
  tags: ['package:Angular'],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: getComponentFigmaLink('24367-60516'),
    },
  },
};

export default meta;

export const Default: StoryObj = {};
