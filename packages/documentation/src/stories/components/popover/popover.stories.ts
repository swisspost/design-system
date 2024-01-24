import { Args, Meta, StoryObj } from '@storybook/web-components';
import { BADGE } from '../../../../.storybook/constants';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const meta: Meta = {
  title: 'Components/Popover',
  component: 'post-popover',
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
    docs: {
      argTypes: {
        sort: 'requiredFirst',
      },
    },
  },
  render,
  args: {
    id: 'popover-one',
    innerHtml:
      'A longer message that needs more time to read. <a href="#">Links</a> are also possible.',
    backgroundColor: 'primary',
    closeButtonCaption: 'Close',
    placement: 'top',
    arrow: true,
    title: true,
  },
  argTypes: {
    id: {
      name: 'Id',
      description:
        'The id is used to connect a trigger element with the popover. <div className="mt-mini alert alert-info alert-sm">`<button data-popover-target="...">` is the only valid trigger element for `post-popover`.</div>',
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
    backgroundColor: {
      name: 'Background color',
      description: 'Define a background color, either `bg-primary` or `bg-yellow`.',
      control: {
        type: 'radio',
        labels: {
          yellow: 'Yellow',
          primary: 'Primary',
        },
      },
      options: ['primary', 'yellow'],
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
  },
};

function render(args: Args) {
  return html`
    <button class="btn btn-secondary btn-large" data-popover-target="${args.id}">
      Click here to see a popover
    </button>
    <post-popover
      class="hydrated bg-${args.backgroundColor}"
      id="${args.id}"
      placement="${args.placement}"
      ?arrow="${args.arrow}"
    >
      ${args.title
        ? html`
            <h2 class="h6">Optional title</h2>
          `
        : null}
      <p class="mb-0">${unsafeHTML(args.innerHtml)}</p>
    </post-popover>
  `;
}

export default meta;
export const Default: StoryObj = {};
