import { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: 'd5f43fa8-42ba-4cb9-98c7-9386d4c939bb',
  title: 'Raw Components/Form Number Input',
  component: 'post-number-input',
  tags: ['package:WebComponents', 'status:InProgress'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-Next-Level?node-id=14016-18313&t=xQdJ3KtfCT99hmhK-4',
    },
  },
  render,
  args: {
    label: 'Quantity',
    floatingLabel: true,
    hiddenLabel: false,
  },
  argTypes: {
    floatingLabel: {
      name: 'floating label',
      description: 'If true, the label floats over the input field.',
      type: {
        name: 'boolean',
      },
      table: {
        category: 'Input',
      },
    },
    hiddenLabel: {
      name: 'hidden label',
      description: 'If true, the label is visually hidden.',
      if: {
        arg: 'floatingLabel',
        truthy: false,
      },
      type: {
        name: 'boolean',
      },
      table: {
        category: 'Input',
      },
    },
    label: {
      description: 'A caption for the number input.',
      type: {
        name: 'string',
        required: true,
      },
      table: {
        category: 'Input',
      },
    },
    placeholder: {
      description:
        'A brief hint to the user as to what kind of information is expected in the field.',
      type: {
        name: 'string',
      },
      table: {
        category: 'Input',
      },
    },
    value: {
      description: 'The value of the number entered into the input.',
      type: {
        name: 'number',
      },
      table: {
        category: 'Input',
      },
    },
    min: {
      description: 'The minimum value to accept for this input.',
      type: {
        name: 'number',
      },
      table: {
        category: 'Input',
      },
    },
    max: {
      description: 'The maximum value to accept for this input.',
      type: {
        name: 'number',
      },
      table: {
        category: 'Input',
      },
    },
    step: {
      description: 'The granularity that the value must adhere to.',
      type: {
        name: 'number',
      },
      table: {
        category: 'Input',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

function render(args: Args, context: StoryContext) {
  const id = `number-input--${context.name.toLowerCase().replaceAll(' ', '-')}`;

  const defaultPlaceholder = args.floatingLabel ? '' : nothing;

  const input = html`
    <input
      id=${!args.hiddenLabel ? id : nothing}
      type="number"
      class="form-control"
      aria-label=${args.hiddenLabel ? args.label : nothing}
      placeholder=${args.placeholder ?? defaultPlaceholder}
      value=${args.value ?? nothing}
      step=${args.step ?? nothing}
      min=${args.min ?? nothing}
      max=${args.max ?? nothing}
    />
  `;

  const label = !args.hiddenLabel
    ? html` <label class="form-label" for=${id}>${args.label}</label> `
    : nothing;

  return html`
    <post-number-input class=${args.floatingLabel ? 'form-floating' : nothing}>
      ${args.floatingLabel ? [input, label] : [label, input]}
    </post-number-input>
  `;
}

export const Default: Story = {};
