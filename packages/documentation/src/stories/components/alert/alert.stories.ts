// @ts-ignore
import { useArgs } from '@storybook/preview-api';
import { Args, Meta, StoryContext, StoryFn, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { getAlertClasses } from './getAlertClasses';
import { BADGE } from '../../../../.storybook/constants';

const meta: Meta = {
  title: 'Components/Alert',
  render: renderAlert,
  decorators: [externalControl],
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
    controls: {
      exclude: ['Title', 'Content'],
    },
  },
  args: {
    title: 'Titulum',
    content: '<p>Contentus momentus vero siteos et accusam iretea et justo.</p>',
    variant: 'alert-primary',
    noIcon: false,
    icon: 'null',
    dismissible: false,
    fixed: false,
    action: false,
    show: true,
  },
  argTypes: {
    title: {
      name: 'Title',
      control: { type: 'text' },
      table: { category: 'Content' },
    },
    content: {
      name: 'Content',
      control: { type: 'text' },
      table: { category: 'Content' },
    },
    variant: {
      name: 'Variant',
      description: 'Defines a style variant.',
      control: {
        type: 'radio',
        labels: {
          'alert-primary': 'Primary',
          'alert-success': 'Success',
          'alert-danger': 'Danger',
          'alert-warning': 'Warning',
          'alert-info': 'Info',
          'alert-gray': 'Gray',
        },
      },
      options: ['alert-primary', 'alert-success', 'alert-danger', 'alert-warning', 'alert-info', 'alert-gray'],
      table: {
        category: 'General',
      },
    },
    noIcon: {
      name: 'No Icon',
      description: 'Removes the predefined icon completely.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
    icon: {
      name: 'Icon',
      description: 'Defines a custom icon.' +
        '<span className="mt-mini alert alert-info alert-sm">' +
        'To use a custom icon, you must first ' +
        '<a href="/?path=/docs/icons-getting-started--docs">set up the icons in your project</a>' +
        '.</span>',
      if: {
        arg: 'noIcon',
        truthy: false,
      },
      control: {
        type: 'select',
        labels: {
          'null': 'Default',
          '1001': 'Envelope (1001)',
          '2023': 'Cog (2023)',
          '2025': 'Send (2025)',
          '2035': 'Home (2035)',
          '2101': 'Bubble (2101)',
        },
      },
      options: ['null', '1001', '2023', '2025', '2035', '2101'],
      table: {
        category: 'General',
      },
    },
    dismissible: {
      name: 'Dismissible',
      description:
        'Adds the dismissible styles.<span className="mt-mini alert alert-info alert-sm">Do not forget to add the structural adjustments!</span>',
      control: { type: 'boolean' },
      table: {
        category: 'Variations',
      },
    },
    action: {
      name: 'Action Buttons',
      description:
        'Adds the action button styles.<span className="mt-mini alert alert-info alert-sm">Do not forget to add the structural adjustments!</span>',
      control: { type: 'boolean' },
      table: {
        category: 'Variations',
      },
    },
    fixed: {
      name: 'Fixed',
      description:
        'Adds the fixed styles.<span className="mt-mini alert alert-info alert-sm">Do not forget to add the structural adjustments!</span>',
      control: { type: 'boolean' },
      table: {
        category: 'Variations',
      },
    },
    show: {
      name: 'Show',
      control: { type: 'boolean' },
      table: { disable: true },
    },
  },
};

export default meta;

// DECORATORS
function externalControl(story: StoryFn, { args, context }: StoryContext) {
  const [_, updateArgs] = useArgs();

  const button = html`
    <a href="#" @click="${(e: MouseEvent) => toggleAlert(e, args, updateArgs)}">
      ${args.fixed ? 'Toggle Alert' : 'Show Alert'}
    </a>
  `;

  return html`
    ${args.fixed || !args.show ? button : nothing} ${story(args, context)}
  `;
}

// RENDERER
function toggleAlert(e: MouseEvent, args: Args, updateArgs: Function) {
  e.preventDefault();
  updateArgs({ show: !args.show });
}

function renderAlert(args: Args) {
  const [_, updateArgs] = useArgs();

  const classes = getAlertClasses(args);

  const content = html`
    <h4 class="alert-heading">${args.title}</h4>
    ${unsafeHTML(args.content)}
  `;

  return html`
    <div class="${classes}" role="alert">
      ${
        /* Dismissible Button */
        args.dismissible
          ? html`
              <button
                class="btn-close"
                @click="${(e: MouseEvent) => toggleAlert(e, args, updateArgs)}"
              >
                <span class="visually-hidden">Close</span>
              </button>
            `
          : null
      }
      ${
        /* Alert Icon */
        !args.noIcon && args.icon !== 'null'
          ? html`
            <post-icon aria-hidden="true" name=${args.icon}/>
          `
          : null
      }
      ${
        /* Alert Content */
        args.action
          ? html`
              <div class="alert-content">${content}</div>
            `
          : content
      }
      ${
        /* Alert Action Buttons */
        args.action
          ? html`
              <div class="alert-buttons">
                <button
                  class="btn btn-primary btn-animated"
                  @click="${(e: MouseEvent) => toggleAlert(e, args, updateArgs)}"
                >
                  <span>Akcepti</span>
                </button>
                <button
                  class="btn btn-secondary btn-animated"
                  @click="${(e: MouseEvent) => toggleAlert(e, args, updateArgs)}"
                >
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
  parameters: {
    controls: {
      exclude: ['Variant', 'Icon', 'No Icon', 'Dismissible', 'Fixed', 'Action Buttons', 'Show'],
    },
  },
  args: {
    content: `<p>Contentum momentum ipsum tipsum sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
  <ul>
    <li>Un orde redlis titem</li>
    <li>An deven moreun orde redlis titem</li>
    <li>Thel astofu orde redlis titem</li>
  </ul>
<hr />
<p>An deven morecon tentum no sea takimata sanctus est magna aliquyam erat.</p>`,
    variant: 'alert-success',
  },
};

export const Dismissible: Story = {
  parameters: {
    controls: {
      exclude: ['Variant', 'Icon', 'No Icon', 'Fixed', 'Action Buttons', 'Show'],
    },
  },
  args: {
    dismissible: true,
  },
};

export const ActionButtons: Story = {
  parameters: {
    controls: {
      exclude: ['Variant', 'Icon', 'No Icon', 'Dismissible', 'Fixed', 'Show'],
    },
  },
  args: {
    variant: 'alert-info',
    action: true,
  },
};

export const Fixed: Story = {
  parameters: {
    controls: {
      exclude: ['Variant', 'Icon', 'No Icon', 'Dismissible', 'Action Buttons', 'Show'],
    },
  },
  args: {
    fixed: true,
    dismissible: true,
    show: false,
  },
};
