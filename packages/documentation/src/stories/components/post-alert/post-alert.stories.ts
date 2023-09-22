import { Meta, StoryContext, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { BADGE } from '../../../../.storybook/constants';

const meta: Meta<HTMLPostAlertElement> = {
  title: 'Components/Post Alert',
  component: 'post-alert',
  render: renderAlert,
  decorators: [externalControl],
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
          '1001': '1001 (Envelope)',
          '2023': '2023 (Cog)',
          '2025': '2025 (Send)',
          '2035': '2035 (Home)',
          '2101': '2101 (Bubble)',
        },
      },
      options: ['none', '1001', '2023', '2025', '2035', '2101'],
    },
  }
};

export default meta;

// DECORATORS
function externalControl(story: StoryFn, { args, context }: StoryContext) {
  let alert: HTMLPostAlertElement;

  const toggleButton = html`
    <a href="#" @click='${(e: Event) => showAlert(e)}'>
      ${args.fixed ? 'Toggle Alert' : 'Show Alert'}
    </a>
  `;

  const showAlert = (e: Event) => {
    e.preventDefault();
    if (alert.parentNode) {
      void alert.dismiss();
    } else {
      document.getElementById('alert-container')?.appendChild(alert);
    }
  }

  setTimeout(() => {
    alert = document.querySelector('post-alert') as HTMLPostAlertElement;
  });

  return args.fixed
    ? html`
      ${toggleButton}
      ${story(args, context)}
    `
    : html`
      <div class='position-relative' style="height: 7rem">
        ${toggleButton}
        <div id='alert-container' class='position-absolute top-0 start-0 end-0'>
          ${story(args, context)}
        </div>
      </div>
    `;
}

// RENDERER
function renderAlert(args: Partial<HTMLPostAlertElement>) {
  return html`
    <post-alert
      dismissible='${ifDefined(args.dismissible)}'
      dismiss-label='${ifDefined(args.dismissLabel)}'
      fixed='${ifDefined(args.fixed)}'
      icon='${ifDefined(args.icon)}'
      type='${ifDefined(args.type)}'
    >
      <h4 slot="heading">Titulum</h4>
      Contentus momentus vero siteos et accusam iretea et justo.
      <button slot="actions" class="btn btn-primary btn-animated">
        <span>Akcepti</span>
      </button>
      <button slot="actions" class="btn btn-secondary btn-animated">
        <span>Aborti</span>
      </button>
    </post-alert>
  `;
}

// STORIES
type Story = StoryObj<HTMLPostAlertElement>;

export const Default: Story = {};
