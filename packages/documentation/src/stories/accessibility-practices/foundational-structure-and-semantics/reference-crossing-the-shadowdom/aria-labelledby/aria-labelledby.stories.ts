import { StoryObj, Args } from '@storybook/web-components-vite';
import { MetaExtended } from '@root/types';
import { html } from 'lit';

const meta: MetaExtended = {
  id: '76ade552-2c03-4d6d-9dce-28daa3405678',
  title:
    'Accessibility Practices/Foundational Structure And Semantics/Reference Crossing The Shadowdom/aria-labelledby',
  parameters: {
    badges: [],
  },

  decorators: [story => html`<div style="width:300px;height:60px;display:block">${story()}</div>`],
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
    <demo-button
      button-version="1"
      aria-labelledby-id="id_2"
      workaround="${args.workaround}"
    ></demo-button>
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
    <demo-button button-version="2" workaround="${args.workaround}"
      ><span slot="label-slot">My Text</span></demo-button
    >
  `,
};

// Case: Standard Light DOM to Shadow DOM workaround
export const Example4: Story = {
  render: () => html`
    <demo-span id="id_6"></demo-span>
    <div class="btn btn-primary" aria-labelledby="id_6" role="button" tabindex="0">
      <post-icon name="1022"></post-icon>
    </div>
  `,
};

// Case: Referencing from Shadow Dom to the Light DOM workaround with aria-labelledby directly set on host
export const Example6: Story = {
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

// Case: Shadow DOM to other Shadow Dom workaround
export const Example7: Story = {
  render: () => html`
    <post-test-span id="id_7"></post-test-span>
    <post-test-button aria-labelledby="id_7"></post-test-button>
  `,
};
