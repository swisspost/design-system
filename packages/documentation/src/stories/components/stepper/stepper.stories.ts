import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaComponent } from '../../../../types';

const meta: MetaComponent = {
  id: '7dc546d9-e248-4d06-befe-3ad62fcd310f',
  title: 'Components/Stepper',
  tags: ['package:Angular'],
  parameters: {
    badges: [],
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => html``,
};
