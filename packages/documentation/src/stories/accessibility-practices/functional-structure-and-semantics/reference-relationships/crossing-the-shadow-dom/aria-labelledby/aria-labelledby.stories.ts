import { StoryObj, Args } from '@storybook/web-components';
import { MetaExtended } from '@root/types';
import { html } from 'lit';

const meta: MetaExtended = {
  id: '76ade552-2c03-4d6d-9dce-28daa340f7d5',
  title:
    'Accessibility Practices/Foundational Structure And Semantics/Reference Relationships/Crossing The Shadow Dom/Aria-LabelledBy',
  parameters: {
    badges: [],
  },
};

export default meta;

type Story = StoryObj;

// Case: Standard Light DOM to Light DOM
export const ExampleHTML: Story = {
  render: () => html`
    <span id="id_1">My Text</span>
    <div class="btn btn-primary" aria-labelledby="id_1" role="button" tabindex="0">
      <post-icon name="1022"></post-icon>
    </div>
  `,
};

// Case: Referencing from Shadow DOM (Host Attribute) to Light DOM (Element) workaround setting programmatically the relevant Element property
export const Example2: Story = {
  argTypes: {
    workaround: {
      name: 'Workaround',
      control: {
        type: 'radio',
      },
      options: ['none', 'ariaLabelledByElements'],
    },
  },
  args: {
    workaround: 'none',
  },
  render: (args: Args) => html`
    <span id="id_2">My Text</span>
    <post-test-button2
      aria-labelledby-id="id_2"
      workaround="${args.workaround}"
    ></post-test-button2>
  `,
};

// Case: Referencing from Shadow DOM (Host Attribute) to Slotted Content (Element) workaround setting programmatically the relevant Element property
export const Example3: Story = {
  argTypes: {
    workaround: {
      name: 'Workaround',
      control: {
        type: 'radio',
      },
      options: ['none', 'ariaLabelledByElements'],
    },
  },
  args: {
    workaround: 'none',
  },
  render: (args: Args) => html`
    <post-test-button3 workaround="${args.workaround}"
      ><span slot="label-slot">My Text</span></post-test-button3
    >
  `,
};

// Case: Referencing from Shadow Dom to the Light DOM workaround with aria-labelledby directly set on host
export const Example4: Story = {
  render: () => html`
    <span id="id_4">My Text</span>
    <post-test-button aria-labelledby-id="id_4"></post-test-button>
  `,
};

// Case: Referencing from Shadow Dom to Slotted Content (Light) DOM workaround with aria-labelledby directly set on host
export const Example5: Story = {
  render: () => html`
    <post-test-button aria-labelledby-id="id_5"
      ><span slot="label-slot" id="id_5">My Text</span></post-test-button
    >
  `,
};

// Case: Standard Light DOM to Shadow DOM workaround
export const Example6: Story = {
  render: () => html`
    <post-test-span id="id_6"></post-test-span>
    <div class="btn btn-primary" aria-labelledby="id_6" role="button" tabindex="0">
      <post-icon name="1022"></post-icon>
    </div>
  `,
};

// Case: Shadow DOM to other Shadow Dom workaround
export const Example7: Story = {
  render: () => html`
    <post-test-span id="id_7"></post-test-span>
    <post-test-button aria-labelledby="id_7"></post-test-button>
  `,
};
