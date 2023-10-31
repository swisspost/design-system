import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { BADGE } from '../../../../.storybook/constants';

const meta: Meta = {
  title: 'Utilities/Background',
  parameters: {
    badges: [BADGE.TODO],
  },
};

export default meta;

type Story = StoryObj;

export const ColoredBackground: Story = {
  render: () => html`
    <div class="bg-yellow p-3">Content</div>
  `,
};

export const NestedBackgrounds: Story = {
  render: () => html`
    <div class="bg-gray p-3">
      Content in
      <code>.bg-gray</code>
      container.
      <div class="bg-dark p-3">
        Content in
        <code>.bg-dark</code>
        container.
        <div class="bg-light p-3">
          Content in
          <code>.bg-light</code>
          container.
        </div>
      </div>
    </div>
  `,
};

export const TranslucentBackgrounds: Story = {
  render: () => html`
    <div class="bg-aubergine p-3">Container with default opacity (1).</div>
    <div class="bg-aubergine p-3" style="--post-bg-opacity: 0.8">Container with opacity 0.8.</div>
    <div class="bg-aubergine p-3" style="--post-bg-opacity: 0.6">Container with opacity 0.6.</div>
    <div class="bg-aubergine p-3" style="--post-bg-opacity: 0.4">Container with opacity 0.4.</div>
    <div class="bg-aubergine p-3" style="--post-bg-opacity: 0.2">Container with opacity 0.2.</div>
  `,
};
