import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import meta from './palette.stories';
import './display.styles.scss';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Palette: Story = {
  render: () => {
    return html` <div>Hello, world!</div> `;
  },
};