import { StoryObj, Args } from '@storybook/web-components';
import { MetaExtended } from '@root/types';
import { html } from 'lit';
import '../../../../../../demo-components/demo-button.ts';

const meta: MetaExtended = {
  id: '76ade552-2c03-4d6d-9dce-28daa346f3g3',
  title:
    'Accessibility Practices/Foundational Structure And Semantics/Reference Relationships/Crossing The Shadow Dom/Aria-Controls',
  parameters: {
    badges: [],
  },
};

export default meta;

type Story = StoryObj;

export const ExampleHTML = () => {
  return html`<span id="id_4">My Text</span>
    <demo-button aria-labelledby-id="id_4">Demo Button</demo-button>`;
};

// Case: Referencing from Shadow DOM (Host Attribute) to Light DOM (Element)

export const Example2a: Story = {
  argTypes: {
    workaround: {
      name: 'Workaround',
      control: {
        type: 'radio',
      },
      options: ['none', 'ariaControlsElements'],
    },
  },
  args: {
    workaround: 'none',
  },
  render: (args: Args) => html`
    <post-test-button-control workaround="${args.workaround}" aria-controls-id="id_2">
      Button
    </post-test-button-control>
  `,
};

export const Example2b: Story = {
  argTypes: {
    workaround: {
      name: 'Workaround',
      control: {
        type: 'radio',
      },
      options: ['none', 'ariaControlsElements'],
    },
  },
  args: {
    workaround: 'none',
  },
  render: () => html`
    <post-test-button-control2 id="toggle3"
      ><div
        slot="control-slot"
        role="button"
        tabindex="0"
        aria-expanded="false"
        aria-controls="text3"
      >
        Button
      </div>
    </post-test-button-control2>
  `,
};

// Case: Referencing from Shadow DOM (Host Attribute) to Slotted Text (Element)
export const Example3: Story = {
  argTypes: {
    workaround: {
      name: 'Workaround',
      control: {
        type: 'radio',
      },
      options: ['none', 'ariaControlsElements'],
    },
  },
  args: {
    workaround: 'none',
  },
  render: (args: Args) => html`
    <post-test-button-control workaround="${args.workaround}" id="toggle2" aria-controls="text2">
      Button
    </post-test-button-control>
  `,
};

// Case: Referencing from Shadow DOM (Host Attribute) to Light DOM (Element) workaround with aria-controls directly set on host
export const Example4: Story = {
  render: () => html`
    <post-test-button aria-controls-id="controlled_id_4">Control Element</post-test-button>
    <span id="controlled_id_4">Controlled Element 4</span>
  `,
};

// Case: Referencing from Shadow Dom to Slotted Text (Light DOM) workaround with aria-controls directly set on host
export const Example5: Story = {
  render: () => html`
    <post-test-button aria-controls-id="controlled_id_5">
      <span slot="control-slot" id="controlled_id_5">Controlled Element 5 (Slotted)</span>
    </post-test-button>
  `,
};

// Case: Standard Light DOM to Shadow DOM
export const Example6: Story = {
  render: () => html`
    <div class="btn btn-primary" aria-controls="controlled_id_6" role="button" tabindex="0">
      <post-icon name="1022"></post-icon>
      Control Element
    </div>
    <post-test-span2></post-test-span2>
  `,
};

// Case: Shadow DOM to other Shadow Dom workaround
export const Example7: Story = {
  render: () => html`
    <post-test-span id="controlled_id_7_host"></post-test-span>
    <post-test-button aria-controls="controlled_id_7"></post-test-button>
  `,
};
