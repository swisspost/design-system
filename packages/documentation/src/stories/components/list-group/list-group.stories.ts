import type { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: '5a47ba70-7831-4e59-b83e-81b6e6c32372',
  title: 'Components/List Group',
  tags: ['package:HTML'],
  decorators: [paddedContainer],
  parameters: {
    badges: [],
    controls: {
      exclude: ['Custom Body'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=21-170',
    },
  },
  args: {
    listType: 'links',
  },
  argTypes: {
    listType: {
      name: 'List type',
      description: 'Type of list elements to show in the list group.',
      options: ['links', 'documents', 'switch'],
      control: {
        type: 'radio',
      },
      table: {
        category: 'General',
      },
    },
  },
};

export default meta;

function paddedContainer(story: StoryFn, context: StoryContext) {
  return html` <div class="p-8">${story(context.args, context)}</div> `;
}

function gridContainer(story: StoryFn, context: StoryContext) {
  return html`
    <div class="row">
      <div class="col-lg-4 col-rg-6 col-12">${story(context.args, context)}</div>
    </div>
  `;
}

function getSwitchList() {
  return html`
    ${['Ero', 'Dua ero', 'Alio ero'].map(
      label => html` <li class="list-group-item">${label}</li> `,
    )}
  `;
}

function getLinksList() {
  return html`
    ${[
      '<a href="#">Label <post-icon name="3020"></post-icon></a>',
      '<a href="#">Label <post-icon name="3020"></post-icon></a>',
      '<a href="#">Label <post-icon name="3020"></post-icon></a>',
    ].map(
      label =>
        html` <li class="list-group-item list-group-item-animate">${unsafeHTML(label)}</li> `,
    )}
  `;
}

function getDocumentsList() {
  return html`
    ${[
      '<a href="#" download><post-icon name="3169"></post-icon> Label <post-icon name="2066"></post-icon></a>',
      '<a href="#" download><post-icon name="3169"></post-icon> Label <post-icon name="2066"></post-icon></a>',
      '<a href="#" download><post-icon name="3169"></post-icon> Label <post-icon name="2066"></post-icon></a>',
    ].map(label => html` <li class="list-group-item">${unsafeHTML(label)}</li> `)}
  `;
}

function renderListGroup(args: Args) {
  const { listType } = args;
  let content;
  switch (listType) {
    case 'links':
      content = getLinksList();
      break;
    case 'documents':
      content = getDocumentsList();
      break;
    case 'switch':
      content = getSwitchList();
      break;

    default:
      break;
  }

  return html`
    <ul class="list-group list-group-${listType}">
      ${content}
    </ul>
  `;
}

// STORIES
type Story = StoryObj;

const listGroupStory: Story = {
  decorators: [gridContainer],
  render: renderListGroup,
};

export const Default: Story = {
  ...listGroupStory,
  parameters: {
    controls: {
      exclude: ['Show List Group'],
    },
  },
  args: {
    showSimpleList: true,
  },
};

export const ListGroup: Story = {
  ...listGroupStory,
  parameters: {
    controls: {
      include: ['Show Header', 'Show Body'],
    },
  },
  args: {
    showImage: false,
    showBody: false,
    showSimpleList: true,
  },
};

export const ListLinks: Story = {
  ...listGroupStory,
  parameters: {},
  args: {
    listType: 'links',
  },
};

export const ListDocuments: Story = {
  ...listGroupStory,
  parameters: {},
  args: {
    listType: 'documents',
  },
};

export const ListSwitch: Story = {
  ...listGroupStory,
  parameters: {},
  args: {
    listType: 'switch',
  },
};
