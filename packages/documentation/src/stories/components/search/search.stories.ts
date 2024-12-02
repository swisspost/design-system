import { Args, StoryContext, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: 'bc68b346-2fdd-436e-bddf-309d24df06a1',
  title: 'Components/Search',
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
    hint: 'Hintus textus elare volare cantare hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.',
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
    hint: {
      name: 'Helper text',
      description: 'Text to place in the help text area of the component..',
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
  const hintId = `hint-${id}`;

  return html`
    <div class="search-input form-floating">
      <input
        id="${id}"
        class="form-control"
        type="search"
        placeholder="${args.placeholder}"
        aria-describedby="${args.hint ? hintId : nothing}"
      />
      <label class="form-label" for="${id}">Label</label>
      <button class="delete-button" aria-label="Clear search">
        <post-icon name="2043"></post-icon>
      </button>
      <button class="search-button" aria-label="Start search">
        <post-icon name="2069"></post-icon>
      </button>
      </div>
      <p class="form-hint" id="${hintId}">${args.hint}</p>
  `;
}

export const Default: Story = {};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Type to search...',
    hint: 'Hintus textus elare volare cantare hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.',
  },
};
