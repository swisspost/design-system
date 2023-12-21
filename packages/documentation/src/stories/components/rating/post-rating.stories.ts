import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { BADGE } from '../../../../.storybook/constants';

const meta: Meta<HTMLPostAlertElement> = {
  title: 'Components/Post Rating',
  component: 'post-rating',
  render: render,
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
  },
};

export default meta;

// RENDERER
function render() {
  return html`
    <post-rating></post-rating>
  `;
}

// STORIES
type Story = StoryObj<HTMLPostAlertElement>;

export const Default: Story = {};
