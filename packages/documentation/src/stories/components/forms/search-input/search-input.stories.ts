import { Args, StoryContext, StoryObj } from '@storybook/web-components';
import { html, nothing, TemplateResult } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: 'bc68b346-2fdd-436e-bddf-309d24df06a1',
  title: 'Components/Forms/Search Input',
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
    label: 'Label',
    floatingLabel: false,
    placeholder: 'Placeholder',
    type: 'text',
  },
  argTypes: {
    label: {
      name: 'Label',
      description: 'Describes the content/topic of the component.',
      control: {
        type: 'text',
      },
      table: {
        category: 'General',
      },
    },
    floatingLabel: {
      name: 'Floating Label',
      description: 'Defines how the components label is rendered.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
    placeholder: {
      name: 'Placeholder',
      description: 'Defines the text displayed in the input when it is empty.',
      control: {
        type: 'text',
      },
      table: {
        category: 'General',
      },
    },
    type: {
      name: 'Type',
      description: 'The components `type` attribute.',
      control: {
        type: 'select',
        labels: {},
      },
      options: [
        'text',
        'number',
      ],
      table: {
        category: 'General',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

function render(args: Args, context: StoryContext) {
  const id = context.id ?? `ExampleTextarea_${context.name}`;
  const useAriaLabel = !args.floatingLabel && args.hiddenLabel;
  const label: TemplateResult | null = !useAriaLabel
    ? html` <label for="${id}" class="search-floating-label">${args.label}</label> `
    : null;

  if (args.floatingLabel && !args.placeholder) {
    args.placeholder = ' '; // a placeholder must always be defined for the floating label to work properly
  }

  const control: TemplateResult = html`
    <input
      id="${id}"
      class="search-input"
      type="${args.type}"
      placeholder="${args.placeholder || nothing}"
      aria-label="${useAriaLabel ? args.label : nothing}"
      value="${args.value ? args.value : nothing}"
    />
  `;
    return html`
      <form class="search">${[control, label].filter(el => el !== null)}
        <button type="reset" class="close-btn">
          <post-icon name="2043"></post-icon>
        </button>
        <button class="search-btn">
          <post-icon name="2069"></post-icon>
        </button>
      </form>
    `;
}

export const Default: Story = {};
