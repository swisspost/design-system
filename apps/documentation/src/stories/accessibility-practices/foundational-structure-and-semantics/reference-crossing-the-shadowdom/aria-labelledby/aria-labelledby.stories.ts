import { StoryObj, Args } from '@storybook/web-components-vite';
import { MetaExtended } from '@root/types';
import { html } from 'lit';
import './aria-labelledby.styles.scss';

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

// Case: Shadow Dom EXAMPLE
export const ExampleHTML: Story = {
  render: () => html` <demo-button arialabelledby-id="example-label"> </demo-button> `,
};

// Case: Referencing from Shadow DOM (Host Attribute) to Light DOM (Element) workaround setting programmatically the relevant Element property
export const Example2: Story = {
  argTypes: {
    workaround: {
      name: 'Workaround',
      description: 'Toggles the workaround solution',
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
      arialabelledby-id="id_2"
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
      ><span slot="aria-slot">My Text</span></demo-button
    >
  `,
};

// Case: Standard Light DOM to Shadow DOM workaround
export const Example4: Story = {
  render: () => html`
    <demo-span id="id_3">My Text</demo-span>
    <div class="btn btn-primary" aria-labelledby="id_3" role="button" tabindex="0">
      <post-icon name="1022"></post-icon>
    </div>
  `,
};

// Case: Shadow DOM to other Shadow Dom workaround
export const Example5: Story = {
  render: () => html`
    <demo-span id="id_4">My Text</demo-span>
    <demo-button
      button-version="1"
      arialabelledby-id="id_4"
      workaround="ariaLabelledByElements"
    ></demo-button>
  `,
};
