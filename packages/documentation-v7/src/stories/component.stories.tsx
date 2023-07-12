import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Group/Folder/Component',
  component: 'demo-button',
};

type Story = StoryObj;

export const Primary: Story = {
  render: () =>
    html`
      <test></test>
    `,
};

export const Secondary: Story = {
  render: () =>
    html`
      <test></test>
    `,
};

export default meta;
