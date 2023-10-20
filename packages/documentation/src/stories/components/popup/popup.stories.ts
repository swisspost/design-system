import { Args, Meta, StoryObj } from '@storybook/web-components';
import { BADGE } from '../../../../.storybook/constants';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const meta: Meta = {
  title: 'Components/Popup',
  component: 'post-popup',
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
  },
  render,
  args: {
    id: 'popup-one',
    innerHtml:
      'A longer message that needs more time to read. <a href="#">Links</a> are also possible.',
    backgroundColor: 'primary',
    placement: 'right-end',
  },
  argTypes: {
    id: {
      name: 'Id',
      description:
        'The id is used to connect a trigger element with the popup. <div className="mt-mini alert alert-info alert-sm">`<button data-popup-target="...">` is the only valid trigger element for `post-popup`.</div>',
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
    placement: {
      name: 'Placement',
    },
  },
};

function render(args: Args) {
  return html`
    <button class="btn btn-secondary btn-large" data-popup-target="${args.id}">
      Click here for popup
    </button>
    <post-popup
      class="hydrated bg-${args.backgroundColor}"
      id="${args.id}"
      placement="${args.placement}"
    >
      ${unsafeHTML(args.innerHtml)}
    </post-popup>
  `;
}

export default meta;
export const Default: StoryObj = {};
