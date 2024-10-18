import { Args, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { useArgs } from '@storybook/preview-api';
import { ifDefined } from 'lit/directives/if-defined.js';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: 'cd684d90-e7a7-41a9-8923-b1b72ad9b384',
  title: 'Components/Tooltip',
  tags: ['package:WebComponents'],
  component: 'post-tooltip',
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=18199-6303&mode=design&t=rXQXLIbDtUBHn9jE-4',
    },
  },
  render,
  args: {
    id: 'tooltip-one',
    innerHTML: 'Hi there 👋',
    backgroundColor: 'primary',
    placement: 'top',
    delayed: false,
  },
  argTypes: {
    id: {
      table: {
        disable: true,
      },
    },
    innerHTML: {
      name: 'Content',
      description:
        'Defines the HTML markup contained in the tooltip. Markup accepted: <a href="https://developer.mozilla.org/en-US/docs/Glossary/Inline-level_content">inline content</a> like `<span>` or `<post-icon>`, but no interactive content like `<a>` or `<button>`.',
      table: {
        category: 'General',
        type: {
          summary: 'string',
        },
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
    arrow: {
      name: 'Arrow',
      control: {
        type: 'boolean',
      },
    },
  },
};

function render(args: Args) {
  const [currentArgs, updateArgs] = useArgs();
  // Just for fun
  const innerHTML =
    args.backgroundColor === 'yellow'
      ? args.innerHTML.replace('👋', '🤘🏾')
      : args.innerHTML.replace('🤘🏾', '👋');

  if (currentArgs.innerHTML !== innerHTML) updateArgs({ innerHTML });

  return html`
    <button class="btn btn-secondary btn-large" data-tooltip-target="${args.id}">Button</button>
    <post-tooltip
      id="${args.id}"
      class="bg-${args.backgroundColor}"
      placement="${ifDefined(args.placement)}"
      arrow="${ifDefined(args.arrow)}"
      delayed="${ifDefined(args.delayed)}"
    >
      ${unsafeHTML(innerHTML)}
    </post-tooltip>
  `;
}

export default meta;
export const Default: StoryObj = {};

export const NonFocusable: StoryObj = {
  args: {
    id: 'tooltip-non-focusable',
  },
  render: (args: Args) => {
    return html`
      <cite data-tooltip-target="${args.id}">This is a cite element with a tooltip on it.</cite>
      <post-tooltip
        id="${args.id}"
        background-color=" ${ifDefined(args.backgroundColor)}"
        placement="${ifDefined(args.placement)}"
      >
        This is not the link you are looking for
      </post-tooltip>
    `;
  },
};

export const Multiple: StoryObj = {
  args: {
    id: 'tooltip-multiple',
  },
  render: (args: Args) => {
    return html`
      <button class="btn btn-secondary btn-large" data-tooltip-target="${args.id}">
        Tooltip button
      </button>
      <button class="btn btn-secondary btn-large" data-tooltip-target="${args.id}">
        Same tooltip, different button
      </button>
      <post-tooltip
        id="${args.id}"
        class="bg-${args.background}"
        placement="${ifDefined(args.placement)}"
      >
        I'm the same, no matter what
      </post-tooltip>
    `;
  },
};
