import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaExtended } from '../../../../types';

const meta: MetaExtended = {
  id: '6561b345-9d64-4f95-8ea6-2389586410bd',
  title: 'Components/Datepicker',
  parameters: {
    badges: [],
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => html``,
};
