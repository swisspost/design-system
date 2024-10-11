import type { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: '5a47ba70-7831-4e59-b83e-81b6e6c32372',
  title: 'Components/List Group',
  tags: ['package:HTML'],
  decorators: [gridContainer],
  parameters: {
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

function gridContainer(story: StoryFn, context: StoryContext) {
  return html`
    <div class="row">
      <div class="col-lg-4 col-rg-6 col-12">${story(context.args, context)}</div>
    </div>
  `;
}

function getSwitchList() {
  return html`
    ${[
      '7fb639f8-86f6-4937-999c-4ee15f81643b',
      '7fb639f8-4421-4937-999c-4ee15f81643b',
      '7fb639f8-5221-4937-999c-4ee15f81643b',
    ].map(
      id =>
        html`
          <li class="list-group-item">
            <div class="form-check form-switch">
              <input type="checkbox" role="switch" id="${id}" class="form-check-input" />
              <label class="form-check-label order-first" for="${id}">Label</label>
            </div>
          </li>
        `,
    )}
  `;
}

function getLinksList() {
  return html`
    ${['Label', 'Label', 'Label'].map(
      label =>
        html`
          <li class="list-group-item list-group-item-action">
            <a href="#"
              >${label} <post-icon class="list-group-item-right-svg" name="3020"></post-icon
            ></a>
          </li>
        `,
    )}
  `;
}

function getDocumentsList() {
  return html`
    ${['Label', 'Label', 'Label'].map(
      label =>
        html`
          <li class="list-group-item">
            <a href="#" download
              ><post-icon name="3169"></post-icon> ${label} <post-icon name="2066"></post-icon
            ></a>
          </li>
        `,
    )}
  `;
}

export function renderListGroup(args: Args) {
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
  }

  return html`
    <ul class="list-group">
      ${content}
    </ul>
  `;
}

type Story = StoryObj;

export const Default: Story = {
  render: renderListGroup,
};

export const ListLinks: Story = {
  render: renderListGroup,
  args: {
    listType: 'links',
  },
};

export const ListDocuments: Story = {
  render: renderListGroup,
  args: {
    listType: 'documents',
  },
};

export const ListSwitch: Story = {
  render: renderListGroup,
  args: {
    listType: 'switch',
  },
};
