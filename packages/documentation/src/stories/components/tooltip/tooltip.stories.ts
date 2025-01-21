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
    palette: 'palette-accent',
    placement: 'top',
    animation: 'pop-in'
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
    palette: {
      name: 'Palette',
      description: 'Define the color scheme of the tooltip.',
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
    placement: {
      name: 'Placement',
    },
    arrow: {
      name: 'Arrow',
      control: {
        type: 'boolean',
      },
    },
    animation: {
      options: ['none', 'pop-in'],
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
    <post-tooltip-trigger for="${args.id}"
      ><button class="btn btn-secondary btn-large">Button</button></post-tooltip-trigger
    >
    <post-tooltip
      id="${args.id}"
      class="hydrated bg-${args.backgroundColor}"
      placement="${ifDefined(args.placement)}"
      animation="${ifDefined(args.animation)}"
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
      <post-tooltip-trigger for="${args.id}">
        <cite>This is a cite element with a tooltip on it.</cite>
      </post-tooltip-trigger>
      <post-tooltip
        id="${args.id}"
        class="hydrated"
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
      <post-tooltip-trigger for="${args.id}">
        <button class="btn btn-secondary btn-large">Tooltip button</button>
      </post-tooltip-trigger>
      <post-tooltip-trigger for="${args.id}">
        <button class="btn btn-secondary btn-large">Same tooltip, different button</button>
      </post-tooltip-trigger>
      <post-tooltip
        id="${args.id}"
        class="hydrated bg-${args.background}"
        placement="${ifDefined(args.placement)}"
      >
        I'm the same, no matter what
      </post-tooltip>
    `;
  },
};