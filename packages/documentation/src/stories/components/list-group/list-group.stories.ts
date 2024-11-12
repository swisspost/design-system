import type { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: '5a47ba70-7831-4e59-b83e-81b6e6c32372',
  title: 'Components/List Group',
  tags: ['package:HTML'],
  render: renderListGroup,
  decorators: [gridDecorator],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=21-170',
    },
  },
  args: {
    listType: 'link',
    label: 'Label',
  },
  argTypes: {
    listType: {
      name: 'List type',
      description: 'Type of list elements to show in the list group.',
      options: ['link', 'document', 'switch'],
      control: {
        type: 'radio',
      },
      table: {
        category: 'General',
      },
    },
    label: {
      name: 'Label',
      description: 'Label of the link, document or switch',
      control: {
        type: 'text',
      },
      table: {
        category: 'General',
      },
    },
  },
};

export default meta;

function gridDecorator(story: StoryFn, context: StoryContext) {
  return html`
    <div class="row">
      <div class="col-lg-4 col-rg-6 col-12">${story(context.args, context)}</div>
    </div>
  `;
}

export function renderListGroup(args: Args) {
  return html`
    <ul class="list-group">
      ${getContent(args, 3)}
    </ul>
  `;

  function getIcon(name: string) {
    return html`<post-icon name="${name}"></post-icon>`;
  }

  function getContent(args: Args, itemsCount: number) {
    const linkIcon = getIcon('3020');
    const fileIcon = getIcon('3169');
    const downloadIcon = getIcon('2066');

    const isDoc = args.listType === 'document';
    const items = Array.from(Array(itemsCount).keys());

    switch (args.listType) {
      case 'link':
      case 'document':
        return html`
          ${items.map(
            () => html`
              <li>
                <a href="#" download=${isDoc || null} class="list-group-${args.listType}">
                  ${isDoc ? fileIcon : null}${args.label}${isDoc ? downloadIcon : linkIcon}
                </a>
              </li>
            `,
          )}
        `;
      case 'switch':
        return html`
          ${items.map(
            i => html`
              <li>
                <div class="list-group-${args.listType} form-check form-switch">
                  <!-- it's important to set custom ids here -->
                  <input
                    type="checkbox"
                    role="switch"
                    id="list-switch-item-${i}"
                    class="form-check-input"
                    ?checked=${i === 0}
                  />
                  <label class="form-check-label order-first" for="list-switch-item-${i}"
                    >${args.label}</label
                  >
                </div>
              </li>
            `,
          )}
        `;
    }
  }
}

type Story = StoryObj;

export const Default: Story = {};

export const ListLinks: Story = {
  args: {
    listType: 'link',
  },
};

export const ListDocuments: Story = {
  args: {
    listType: 'document',
  },
};

export const ListSwitch: Story = {
  args: {
    listType: 'switch',
  },
};
