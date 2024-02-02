import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { BADGE } from '../../../../.storybook/constants';

const meta: Meta = {
  title: 'Components/Datepicker',
  parameters: {
    badges: [BADGE.WEB_COMPONENT_CANDIDATE],
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => html``,
};
