import { StoryContext, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { spreadArgs } from '@/utils';
import { MetaComponent } from '@root/types';

const meta: MetaComponent<HTMLPostAlertElement> = {
  id: '8fd36823-966e-46a8-8432-a4439f6e208f',
  title: 'Components/Banner',
  tags: ['package:WebComponents', 'redirect:105e67d8-31e9-4d0b-87ff-685aba31fd4c'],
  component: 'post-alert',
  render: renderAlert,
  decorators: [externalControl],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=1447-8848&node-type=instance&t=NVtE44T0sX5wsag9-0',
    },
  },
  args: {
    innerHTML: '<p>Contentus momentus vero siteos et accusam iretea et justo.</p>',
    dismissible: false,
    dismissLabel: 'Dismiss',
    fixed: false,
  },
  argTypes: {
    dismissLabel: {
      if: {
        arg: 'dismissible',
      },
      type: {
        name: 'string',
        required: true,
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
    innerHTML: {
      description: 'Defines the HTML markup contained in the alert.',
      table: {
        category: 'content',
        type: {
          summary: 'string',
        },
      },
    },
  },
};

export default meta;

// DECORATORS
function externalControl(story: StoryFn, context: StoryContext) {
  const { args, canvasElement } = context;
  let alert: HTMLPostAlertElement;
  let button: HTMLButtonElement;

  const toggleAlert = async (e: Event) => {
    e.preventDefault();

    const alertContainer = canvasElement.querySelector('.alert-container') as HTMLElement;

    if (alert.parentNode) {
      await alert.dismiss();
    } else {
      alertContainer.appendChild(alert);
      if (!args.fixed) button.hidden = true;
      else button.focus();
    }
  };

  setTimeout(() => {
    alert = canvasElement.querySelector('post-alert') as HTMLPostAlertElement;
    button = canvasElement.querySelector('.alert-button') as HTMLButtonElement;

    if (args.fixed) {
      button.hidden = false;
      if (context.storyName !== 'Default') alert.remove();
    } else {
      button.hidden = true;
      alert.addEventListener('postDismissed', () => {
        button.hidden = false;
        button.focus();
      });
    }
  });

  return html`
    <a
      class="btn btn-secondary btn-animated alert-button"
      href="#"
      @click="${(e: Event) => toggleAlert(e)}"
    >
      <span>${args.fixed ? 'Toggle Fixed Alert' : 'Reset Alert'}</span>
    </a>
    <div class="alert-container">${story(args, context)}</div>
  `;
}

// RENDERER
function renderAlert(args: Partial<HTMLPostAlertElement>) {
  return html` <post-alert ${spreadArgs(args)}></post-alert> `;
}

// STORIES
type Story = StoryObj<HTMLPostAlertElement>;

export const Default: Story = {};

export const Contents: Story = {
  args: {
    innerHTML:
      '<h4 slot="heading">Titulum</h4>' +
      '<ul class="list-unstyled">' +
      '<li class="d-flex gap-8"><post-icon name="1027"></post-icon>Un orde redlis titem</li>' +
      '<li class="d-flex gap-8"><post-icon name="1028"></post-icon>An deven moreun orde redlis titem</li>' +
      '</ul>' +
      '<hr/>' +
      '<p>Contentum momentum ipsum tipsum sit amet, consetetur sadipscing elitr.</p>' +
      '<button slot="actions" class="btn btn-secondary btn-animated"><span>Aborti</span></button>' +
      '<button slot="actions" class="btn btn-primary btn-animated"><span>Akcepti</span></button>',
  },
};

export const CustomIcon: Story = {
  args: {
    icon: '1001',
  },
};

export const NoIcon: Story = {
  args: {
    icon: 'none',
  },
};

export const Dismissible: Story = {
  args: {
    dismissible: true,
  },
};

export const Fixed: Story = {
  args: {
    fixed: true,
    dismissible: true,
  },
};
