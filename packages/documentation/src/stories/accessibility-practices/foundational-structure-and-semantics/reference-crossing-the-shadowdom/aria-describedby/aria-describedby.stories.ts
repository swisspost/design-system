import { StoryObj, Args } from '@storybook/web-components-vite';
import { MetaExtended } from '@root/types';
import { html } from 'lit';
import './aria-describedby.styles.scss';

const meta: MetaExtended = {
  id: '76ade552-2c03-4d6d-9dce-28daa3405910',
  title:
    'Accessibility Practices/Foundational Structure And Semantics/Reference Crossing The Shadowdom/aria-describedby',
  parameters: {
    badges: [],
  },

  decorators: [story => html`<div style="width:300px;height:60px;display:block">${story()}</div>`],
};

export default meta;

type Story = StoryObj;

// Case: Standard Light DOM to Light DOM
export const ExampleHTML: Story = {
  render: () => html` <demo-button ariadescribedby-id="example-description"></demo-button> `,
};

// Case: Referencing from Shadow DOM (Host Attribute) to Light DOM (Element) workaround setting programmatically the relevant Element property
export const Example2: Story = {
  argTypes: {
    workaround: {
      name: 'Workaround',
      control: {
        type: 'radio',
      },
      options: ['none', 'ariaDescribedByElements'],
    },
  },
  args: {
    workaround: 'none',
  },
  render: (args: Args) => html`
    <demo-button
      button-version="3"
      ariadescribedby-id="id_1"
      workaround="${args.workaround}"
    ></demo-button>
    <span id="id_1">My Description</span>
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
      options: ['none', 'ariaDescribedByElements'],
    },
  },
  args: {
    workaround: 'none',
  },
  render: (args: Args) => html`
    <demo-button button-version="4" workaround="${args.workaround}"
      ><span slot="aria-slot">My Description</span></demo-button
    >
  `,
};

// Case: Standard Light DOM to Shadow DOM workaround
export const Example4: Story = {
  render: () => html`
    <div class="btn btn-primary" aria-describedby="id_2" role="button" tabindex="0">
      <post-icon name="1022"></post-icon>
    </div>
    <demo-span content="My Description" id="id_2"></demo-span>
  `,
};

// Case: Shadow DOM to other Shadow Dom workaround
export const Example5: Story = {
  render: () => html`
    <demo-button
      button-version="3"
      workaround="ariaDescribedByElements"
      ariadescribedby-id="id_3"
    ></demo-button>
    <demo-span content="My Description" id="id_3"></demo-span>
  `,
};
