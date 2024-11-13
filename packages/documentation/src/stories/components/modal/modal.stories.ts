import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: '9a512414-84c5-473c-a7c8-a434eda9578d',
  title: 'Components/Modal (deprecated)',
  tags: ['package:Angular'],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=20215-22938&mode=design&t=HksCTWa2MMccgMl4-0',
    },
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => html``,
};
