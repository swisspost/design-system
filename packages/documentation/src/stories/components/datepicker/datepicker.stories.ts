import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: '6561b345-9d64-4f95-8ea6-2389586410bd',
  title: 'Components/Datepicker',
  tags: ['package:Angular'],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=20098-6912&mode=design&t=3lniLiZhl7q9Gqgn-4',
    },
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => html``,
};
