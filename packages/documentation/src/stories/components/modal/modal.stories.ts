import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaExtended } from '../../../../types';

const meta: MetaExtended = {
  id: '9a512414-84c5-473c-a7c8-a434eda9578d',
  title: 'Components/Modal',
  parameters: {
    badges: [],
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => html``,
};
