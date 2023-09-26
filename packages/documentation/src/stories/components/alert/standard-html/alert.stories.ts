// @ts-ignore
import { useArgs } from '@storybook/preview-api';
import { Args, Meta, StoryContext, StoryFn, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { getAlertClasses } from './getAlertClasses';
import { BADGE } from '../../../../../.storybook/constants';

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
    show: true,
    action: false,
    fixed: false,
    icon: undefined,
    type: 'alert-primary',
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
        'If `true`, the alert contains action buttons on its right side.<span className="mt-mini alert alert-info alert-sm">Alert content must then be wrapped in a `.alert-content` container.</span>',
      control: { type: 'boolean' },
    },
    fixed: {
      name: 'Fixed',
      description:
        'If `true`, the alert anchored at the bottom of the page, from edge to edge.',
      control: { type: 'boolean' },
    },
    icon: {
      name: 'Icon',
      description: 'The icon to display in the alert. By default, the icon depends on the alert type.',
      control: {
        type: 'select',
        labels: {
          'pi-1001': 'pi-1001 (Envelope)',
          'pi-2023': 'pi-2023 (Cog)',
          'pi-2025': 'pi-2025 (Send)',
          'pi-2035': 'pi-2035 (Home)',
          'pi-2101': 'pi-2101 (Bubble)',
        },
      },
      options: ['no-icon', 'pi-1001', 'pi-2023', 'pi-2025', 'pi-2035', 'pi-2101'],
    },
    type: {
      name: 'Type',
      description: 'The type of the alert.',
      control: {
        type: 'select',
      },
      options: ['alert-primary', 'alert-success', 'alert-danger', 'alert-warning', 'alert-info', 'alert-gray'],
    },
  },
};

export default meta;

// DECORATORS
function externalControl(story: StoryFn, { args, context }: StoryContext) {
  const [_, updateArgs] = useArgs();

  const toggleAlert = (e: MouseEvent, args: Args, updateArgs: Function) => {
    e.preventDefault();
    updateArgs({ show: !args.show });
  }

  if (!args.fixed && !args.show) updateArgs({ show: true });

  const button = html`
    <a
      class="btn btn-default btn-animated"
      href="#"
      @click="${(e: MouseEvent) => toggleAlert(e, args, updateArgs)}"
    ><span>Toggle Fixed Alert</span></a>
  `;

  return html`
    ${args.fixed ? button : nothing}
    ${story(args, context)}
  `;
}

// RENDERER


function renderAlert(args: Args) {
  const classes = getAlertClasses(args);

  const content = html`
    <h4 class="alert-heading">${args.title}</h4>
    ${unsafeHTML(args.content)}
  `;

  return html`
    <div class="${classes}" role="alert">
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
