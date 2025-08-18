import { StoryObj, Args } from '@storybook/web-components-vite';
import { MetaExtended } from '@root/types';
import { html } from 'lit';

const meta: MetaExtended = {
  id: '76ade552-2c03-4d6d-9dce-28daa3401234',
  title:
    'Accessibility Practices/Foundational Structure And Semantics/Reference Crossing The Shadowdom/For',
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
  
    <label for="id_0">My Text</label>
    <input id="id_0"></input>
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
    <label for="id_1">My Text</label>
    <demo-target
      target-version="1"
      workaround="${args.workaround}"
      aria-labelledby-id="id_1"
    ></demo-target>
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
    <demo-target target-version="2" workaround="${args.workaround}">
      <label slot="label-slot">My Text</label></demo-target
    >
  `,
};

// Case: Referencing from Shadow Dom to Light DOM workaround with aria-labelledby directly set on host
export const Example4: Story = {
  render: () => html`
    <demo-target target-version="3" aria-labelledby="id_3">
      <label id="id_3" slot="label-slot">My Text</label>
    </demo-target>
  `,
};

// Case: Referencing from Shadow Dom to Slotted Content (Light) DOM workaround with aria-labelledby directly set on host
export const Example5: Story = {
  render: () => html`
    <post-test-target4 aria-labelledby="id_5">
      <label id="id_5" slot="label-slot">My Text</label>
    </post-test-target4>
  `,
};

// Case: Standard Light DOM to Shadow DOM workaround
export const Example6: Story = {
  argTypes: {
    workaround: {
      name: 'Workaround',
      control: {
        type: 'radio',
      },
      options: ['none', 'ariaLabelledByElements (not working)'],
    },
  },
  args: {
    workaround: 'none',
  },
  render: (args: Args) => html`
    <post-test-label workaround="${args.workaround}" id="id_6"> </post-test-label>
    <input aria-labelledby="id_6"></input>
  `,
};

// Case: Shadow DOM to other Shadow Dom workaround

export const Example7: Story = {
  render: () => html`
    <post-test-label id="id_7"></post-test-label>
    <post-test-target3 aria-labelledby="id_7"></post-test-target3>
  `,
};
