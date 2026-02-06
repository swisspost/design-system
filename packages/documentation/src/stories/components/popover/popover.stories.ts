import { Args, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: '9a636763-de2d-4f72-bc81-98daf10871f7',
  title: 'Components/Popover',
  tags: ['package:WebComponents', 'status:InProgress'],
  component: 'post-popover',
  parameters: {
    badges: [],
    docs: {
      argTypes: {
        sort: 'requiredFirst',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-Next-Level?node-id=21-173&m=dev',
    },
  },
  render,
  args: {
    id: 'popover-one',
    innerHtml:
      'A longer message that needs more time to read. <a href="#">Links</a> are also possible.',
    palette: 'palette-accent',
    textClose: 'Close',
    placement: 'top',
    arrow: true,
    title: true,
    maxWidth: '',
  },
  argTypes: {
    id: {
      name: 'Id',
      description:
        'The id is used to associate the <post-popover-trigger> with the <post-popover>.',
      table: {
        category: 'General',
      },
    },
    innerHtml: {
      name: 'Content',
      table: {
        category: 'General',
      },
    },
    maxWidth: {
      name: 'Max width of the popover',
      description:
        'Value can either be in `vw`, `px` or `%`. If no max-width is defined, the popover will extend to the width of its content.',
      table: {
        category: 'General',
        defaultValue: { summary: '280px' },
      },
    },
    palette: {
      name: 'Palette',
      description: 'Define the popover color scheme.',
      control: {
        type: 'select',
      },
      options: ['palette-accent', 'palette-brand'],
      table: {
        category: 'General',
        type: {
          summary: 'HTML class attribute',
        },
      },
    },
    textClose: {
      name: 'Close',
    },
    arrow: {
      name: 'Arrow',
    },
    title: {
      name: 'Show title',
      description:
        'Show an optional title, the heading level can be chosen to match the document structure, use the <code>.h6</code> class for appropriate styling.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
    placement: {
      name: 'Placement',
    },
  },
};

function render(args: Args) {
  return html`
    <post-popover-trigger for="${args.id}">
      <button class="btn btn-secondary">Popover Trigger</button>
    </post-popover-trigger>
    <post-popover
      class="palette ${args.palette}"
      id="${args.id}"
      placement="${args.placement}"
      text-close="${args.textClose}"
      ?arrow="${args.arrow}"
      style="${args.maxWidth ? '--post-popover-max-width: ' + args.maxWidth : nothing}"
    >
      ${args.title ? html` <h2 class="h6">Optional title</h2> ` : null}
      <p class="mb-0">${unsafeHTML(args.innerHtml)}</p>
    </post-popover>
  `;
}

export default meta;
export const Default: StoryObj = {};

export const Wrapped: StoryObj = {
  render: () => {
    return html`
      <post-popover-trigger>
        <button class="btn btn-secondary">Popover Trigger</button>
        <post-popover class="palette palette-accent" placement="top" text-close="Close" arrow="">
          <h2 class="h6">Optional title</h2>
          <p class="mb-0">
            A longer message that needs more time to read. <a href="#">Links</a> are also possible.
          </p>
        </post-popover>
      </post-popover-trigger>
    `;
  },
};

export const InfoIcon: StoryObj = {
  render: () => {
    return html`
      <label>
        Tracking updates
        <post-popover-trigger>
          <button class="btn btn-link btn-icon">
            <post-icon aria-hidden="true" name="info"></post-icon>
            <span class="visually-hidden">See more information</span>
          </button>
          <post-popover class="palette palette-brand" placement="top" text-close="Close" arrow="">
            <p class="mb-0">
              Follow your letter's journey with automatic updates at key delivery milestones.
            </p>
          </post-popover>
        </post-popover-trigger>
      </label>
    `;
  },
};
