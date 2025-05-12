import { StoryObj, Args } from '@storybook/web-components';
import { MetaExtended } from '@root/types';
import { html } from 'lit';

const meta: MetaExtended = {
  id: '76ade552-2c03-4d6d-9dce-28daa346f3g3',
  title: 'Guidelines/Crossing the Shadow DOM/4.AriaControls',
  parameters: {
    badges: [],
  },
};

export default meta;

type Story = StoryObj;

// Case: Standard Light DOM to Light DOM
export const ExampleHTML: Story = {
  render: () => html`
    <div aria-controls="id_1" role="tab" tabindex="0">Control Element 1</div>
    <div id="id_1" role="tabpanel">Controlled Content 1</div>
    <div aria-controls="id_2" role="tab" tabindex="0">Control Element 2</div>
    <div id="id_2" role="tabpanel">Controlled Content 2</div>
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
      options: ['none', 'ariaControlsElements'],
    },
  },
  args: {
    workaround: 'none',
  },
  render: (args: Args) => html`
    <post-test-button2
      aria-controls-id="controlled_id_2"
      workaround="${args.workaround}"
    ></post-test-button2>
    <span id="controlled_id_2">Controlled Element 2</span>
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
      options: ['none', 'ariaControlsElements'], // Adjusted option name for clarity
    },
  },
  args: {
    workaround: 'none',
  },
  render: (args: Args) => html`
    <post-test-button3 workaround="${args.workaround}">
      <span slot="control-slot" id="controlled_id_3">Controlled Element 3 (Slotted)</span>
    </post-test-button3>
  `,
};

// Case: Referencing from Shadow DOM (Host Attribute) to Light DOM (Element) workaround with aria-controls directly set on host
export const Example4: Story = {
  render: () => html`
    <post-test-button aria-controls-id="controlled_id_4">Control Element</post-test-button>
    <span id="controlled_id_4">Controlled Element 4</span>
  `,
};

// Case: Referencing from Shadow Dom to Slotted Content (Light DOM) workaround with aria-controls directly set on host
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
    <post-test-span2 id="controlled_id_7_host"></post-test-span2>
    <post-test-button aria-controls="controlled_id_7"></post-test-button>
  `,
};
