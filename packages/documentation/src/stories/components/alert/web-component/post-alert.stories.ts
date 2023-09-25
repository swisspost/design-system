import { Meta, StoryContext, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { BADGE } from '../../../../../.storybook/constants';
import { spreadArgs } from '../../../../utils';

const meta: Meta<HTMLPostAlertElement> = {
  title: 'Components/Post Alert',
  component: 'post-alert',
  render: renderAlert,
  decorators: [externalControl],
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
  },
  args: {
    dismissible: false,
    dismissLabel: 'Dismiss',
    fixed: false,
    innerHTML: '<p>Contentus momentus vero siteos et accusam iretea et justo.</p>',
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
function externalControl(story: StoryFn, context: StoryContext) {
  const {args, canvasElement} = context;
  let alert: HTMLPostAlertElement;

  const toggleButton = html`
    <a id="alert-button" href="#" @click='${(e: Event) => toggleAlert(e)}'>Show Alert</a>
  `;

  const toggleAlert = (e?: Event) => {
    if (e) e.preventDefault();

    const alertButton = canvasElement.querySelector('#alert-button') as HTMLElement;
    const alertContainer = canvasElement.querySelector('#alert-container') as HTMLElement;

    if (alert.parentNode) {
      void alert.dismiss();
      alertButton.textContent = 'Show Alert';
    } else {
      alertContainer.appendChild(alert);
      alertButton.textContent = 'Hide Alert';
    }
  }

  setTimeout(() => {
    alert = canvasElement.querySelector('post-alert') as HTMLPostAlertElement;
    if (args.fixed) void alert.remove();
  });

  return html`
    <div class=${args.fixed ? '' : 'position-relative'} style=${args.fixed ? '' : 'height: 7rem'}>
      ${toggleButton}
      <div id='alert-container' class=${args.fixed ? '' : 'position-absolute top-0 start-0 end-0'}>
        ${story(args, context)}
      </div>
    </div>
  `;
}



// RENDERER
function renderAlert(args: Partial<HTMLPostAlertElement>) {
  return html`
    <post-alert ${spreadArgs(args)}></post-alert>
  `;
}

// STORIES
type Story = StoryObj<HTMLPostAlertElement>;

export const Default: Story = {};

export const Contents: Story = {
  args: {
    innerHTML:
      '<h4 slot="heading">Titulum</h4>' +
      '<ul class="list-unstyled">' +
      '<li class="d-flex gap-mini"><post-icon name="1027"></post-icon>Un orde redlis titem</li>' +
      '<li class="d-flex gap-mini"><post-icon name="1028"></post-icon>An deven moreun orde redlis titem</li>' +
      '</ul>' +
      '<hr/>' +
      '<p>Contentum momentum ipsum tipsum sit amet, consetetur sadipscing elitr.</p>' +
      '<button slot="actions" class="btn btn-secondary btn-animated"><span>Aborti</span></button>' +
      '<button slot="actions" class="btn btn-primary btn-animated"><span>Akcepti</span></button>',
  }
}

export const CustomIcon: Story = {
  args: {
    icon: '1001',
  }
};

export const NoIcon: Story = {
  args: {
    icon: 'none',
  }
};

export const Dismissible: Story = {
  args: {
    dismissible: true,
  }
};

export const Fixed: Story = {
  args: {
    dismissible: true,
    fixed: true,
  }
};
