import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { BADGE } from '../../../../.storybook/constants';

const meta: Meta = {
  id: '7dc546d9-e248-4d06-befe-3ad62fcd310f',
  title: 'Components/Stepper',
  parameters: {
    badges: [BADGE.WEB_COMPONENT_CANDIDATE],
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => html``,
};
