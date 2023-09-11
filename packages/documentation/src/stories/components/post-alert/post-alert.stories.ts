import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { BADGE } from '../../../../.storybook/constants';
import { spread } from '@open-wc/lit-helpers';
import { definedProperties, getAttributes } from '../../../utils';

const meta: Meta<HTMLPostAlertElement> = {
  title: 'Components/Post Alert',
  component: 'post-alert',
  render: renderAlert,
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
  },
  args: {
    dismissLabel: 'Dismiss'
  },
  argTypes: {
    dismissLabel: {
      if: {
        arg: 'dismissible',
      },
    },
    icon: {
      control: {
        type: 'select',
        labels: {
          'null': 'No Icon',
          '1001': 'Envelope (1001)',
          '2023': 'Cog (2023)',
          '2025': 'Send (2025)',
          '2035': 'Home (2035)',
          '2101': 'Bubble (2101)',
        },
      },
      options: ['null', '1001', '2023', '2025', '2035', '2101'],
    },
    type: {
      control: {
        type: 'select',
      },
      options: [ 'primary', 'success', 'danger', 'warning', 'info' ],
    }
  }
};

export default meta;

// RENDERER
function renderAlert(args: Partial<HTMLPostAlertElement>) {
  return html`
    <post-alert ${spread(getAttributes(args))}>
      <h4 slot="heading">Titulum</h4>
      Contentus momentus vero siteos et accusam iretea et justo.
    </post-alert>
  `;
}

// STORIES
type Story = StoryObj<HTMLPostAlertElement>;

export const Default: Story = {};
