import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { BADGE } from '../../../../.storybook/constants';

const meta: Meta = {
  id: '9a512414-84c5-473c-a7c8-a434eda9578d',
  title: 'Components/Modal',
  parameters: {
    badges: [BADGE.WEB_COMPONENT_CANDIDATE],
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => html``,
};
