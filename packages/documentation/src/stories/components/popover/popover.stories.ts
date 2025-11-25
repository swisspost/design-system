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
    closeButtonCaption: 'Close',
    placement: 'top',
    arrow: true,
    title: true,
    maxWidth: '',
    triggerDelay: null,
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
    closeButtonCaption: {
      name: 'Close button caption',
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
    triggerDelay: {
      name: 'delay',
      description: 'Delay (in milliseconds) before the popover is shown.',
      table: {
        category: 'General',
      },
      control: {
        type: 'number',
      },
    },
  },
};

function render(args: Args) {
  return html`
    <post-popover-trigger for="${args.id}" delay="${args.triggerDelay ?? nothing}">
      <button class="btn btn-secondary">Popover Trigger</button>
    </post-popover-trigger>
    <post-popover
      class="palette ${args.palette}"
      id="${args.id}"
      placement="${args.placement}"
      close-button-caption="${args.closeButtonCaption}"
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
