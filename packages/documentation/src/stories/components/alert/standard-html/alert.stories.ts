import { useArgs } from '@storybook/preview-api';
import { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { getAlertClasses } from './getAlertClasses';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: '105e67d8-31e9-4d0b-87ff-685aba31fd4c',
  title: 'Components/Banner',
  tags: ['package:HTML'],
  render: renderAlert,
  decorators: [externalControl],
  parameters: {
    badges: [],
    controls: {
      exclude: ['Title', 'Content'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=1447-8848&node-type=instance&t=NVtE44T0sX5wsag9-0',
    },
  },
  args: {
    content: '<p>Contentus momentus vero siteos et accusam iretea et justo.</p>',
    show: true,
    action: true,
    fixed: false,
    noIcon: false,
    icon: undefined,
    type: 'alert-neutral',
  },
  argTypes: {
    title: {
      name: 'Title',
      control: { type: 'text' },
    },
    content: {
      name: 'Content',
      control: { type: 'text' },
    },
    show: {
      name: 'Show',
      control: { type: 'boolean' },
      table: { disable: true },
    },
    action: {
      name: 'Action Buttons',
      description:
        'If `true`, the alert contains action buttons on its right side.<span className="mt-8 alert alert-info alert-sm">Alert content must then be wrapped in a `.alert-content` container.</span>',
      control: { type: 'boolean' },
    },
    fixed: {
      name: 'Fixed',
      description: 'If `true`, the alert anchored at the bottom of the page, from edge to edge.',
      control: { type: 'boolean' },
    },
    noIcon: {
      name: 'No Icon',
      description: 'If `true`, no icon is displayed on the left side of the alert.',
      control: {
        type: 'boolean',
      },
    },
    icon: {
      name: 'Icon',
      description:
        'The icon to display in the alert. By default, the icon depends on the alert type.' +
        '<span className="mt-8 alert alert-info alert-sm">' +
        'To use a custom icon, you must first ' +
        '<a href="/?path=/docs/40ed323b-9c1a-42ab-91ed-15f97f214608--docs">set up the icons in your project</a>' +
        '.</span>',
      if: {
        arg: 'noIcon',
        truthy: false,
      },
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
      options: ['1001', '2023', '2025', '2035', '2101'],
    },
    type: {
      name: 'Type',
      description: 'The type of the alert.',
      control: {
        type: 'select',
      },
      options: ['alert-neutral', 'alert-info', 'alert-success', 'alert-error', 'alert-warning'],
    },
  },
};

export default meta;

// DECORATORS
function externalControl(story: StoryFn, { args, context }: StoryContext) {
  const [_, updateArgs] = useArgs();

  const toggleAlert = (e: MouseEvent, args: Args, updateArgs: (newArgs: Partial<Args>) => void) => {
    e.preventDefault();
    updateArgs({ show: !args.show });
  };

  if (!args.fixed && !args.show) updateArgs({ show: true });

  const button = html`
    <a
      class="btn btn-secondary btn-animated"
      href="#"
      @click="${(e: MouseEvent) => toggleAlert(e, args, updateArgs)}"
    >
      <span>Toggle Fixed Alert</span>
    </a>
  `;

  return html` ${args.fixed ? button : nothing} ${story(args, context)} `;
}

// RENDERER

function renderAlert(args: Args) {
  const classes = getAlertClasses(args);

  const content = html`
    ${args.title ? html` <h4 class="alert-heading">${args.title}</h4> ` : nothing}
    ${unsafeHTML(args.content)}
  `;

  return html`
    <div class="${classes}" role="alert">
      ${
        /* Alert Icon */
        args.icon ? html` <post-icon name=${args.icon}></post-icon> ` : nothing
      }
      ${
        /* Alert Content */
        args.action ? html` <div class="alert-content">${content}</div> ` : content
      }
      ${
        /* Alert Action Buttons */
        args.action
          ? html`
              <div class="alert-buttons">
                <button class="btn btn-primary btn-animated">
                  <span>Akcepti</span>
                </button>
                <button class="btn btn-secondary btn-animated">
                  <span>Aborti</span>
                </button>
              </div>
            `
          : null
      }
    </div>
  `;
}

// STORIES
type Story = StoryObj;

export const Default: Story = {};

export const AdditionalContent: Story = {
  args: {
    title: 'Titulum',
    content: `<p>Contentum momentum ipsum tipsum sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
  <ul>
    <li>Un orde redlis titem</li>
    <li>An deven moreun orde redlis titem</li>
    <li>Thel astofu orde redlis titem</li>
  </ul>
<hr />
<p>An deven morecon tentum no sea takimata sanctus est magna aliquyam erat.</p>`,
  },
};

export const CustomIcon: Story = {
  args: {
    icon: '1001',
  },
};

export const NoIcon: Story = {
  args: {
    noIcon: true,
  },
};

export const ActionButtons: Story = {
  args: {
    action: true,
  },
};

export const Fixed: Story = {
  args: {
    fixed: true,
    show: false,
  },
};
