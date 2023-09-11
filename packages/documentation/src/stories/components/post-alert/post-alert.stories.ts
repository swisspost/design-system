import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { BADGE } from '../../../../.storybook/constants';

const meta: Meta<HTMLPostAlertElement> = {
  title: 'Components/Post Alert',
  component: 'post-alert',
  render: renderAlert,
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
  },
};

export default meta;

// RENDERER
function renderAlert() {
  return html`
    <post-alert>
      <h4 slot="heading">Titulum</h4>
      Contentus momentus vero siteos et accusam iretea et justo.
    </post-alert>
  `;
}

// STORIES
type Story = StoryObj<HTMLPostAlertElement>;

export const Default: Story = {};
