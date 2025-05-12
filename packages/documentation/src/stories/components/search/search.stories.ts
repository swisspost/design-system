import { Args, StoryContext, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: 'bc68b346-2fdd-436e-bddf-309d24df06a1',
  title: 'Components/Form Search',
  tags: ['package:HTML'],
  render: render,
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=2781-16519&node-type=frame&t=mZSBn66oo6CnywJU-0',
    },
  },
  args: {
    placeholder: 'Search...',
    showDeleteButton: true,
    showSearchButton: true,
    value: '', // Default empty value
  },
  argTypes: {
    placeholder: {
      name: 'Placeholder',
      description: 'Defines the text displayed when the search input is empty.',
      control: {
        type: 'text',
      },
      table: {
        category: 'General',
      },
    },
    showDeleteButton: {
      name: 'Show Delete Button',
      description: 'Toggles the visibility of the delete button.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Controls',
      },
    },
    showSearchButton: {
      name: 'Show Search Button',
      description: 'Toggles the visibility of the search button.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Controls',
      },
    },
    value: {
      name: 'Value',
      description: 'Initial value of the input field.',
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

type Story = StoryObj;

function render(args: Args, context: StoryContext) {
  const id = context.id ?? `SearchInput_${context.name}`;

  return html`
    <div class="search-input form-floating">
      <input
        id="${id}"
        class="form-control"
        type="search"
        placeholder="${args.placeholder}"
        value="${args.value}"
      />
      <label class="form-label" for="${id}">Label</label>
      ${args.showDeleteButton
        ? html`
            <button
              class="delete-button"
              aria-label="Clear search"
              onclick="this.closest('.search-input').querySelector('input').value = ''"
            >
              <post-icon name="closex"></post-icon>
            </button>
          `
        : nothing}
      ${args.showSearchButton
        ? html`
            <button class="search-button" aria-label="Start search">
              <post-icon name="search"></post-icon>
            </button>
          `
        : nothing}
    </div>
  `;
}

export const Default: Story = {};
