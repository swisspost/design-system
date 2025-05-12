import { StoryObj, Args } from '@storybook/web-components';
import { MetaExtended } from '@root/types';
import { html } from 'lit';

const meta: MetaExtended = {
  id: '76ade552-2c03-4d6d-9dce-28daa340f3g6',
  title: 'Guidelines/Crossing the Shadow DOM/3.AriaDescribedBy',
  parameters: {
    badges: [],
  },
};

export default meta;

type Story = StoryObj;

// Case: Standard Light DOM to Light DOM
export const ExampleHTML: Story = {
  render: () => html`
    <div class="btn btn-primary" aria-describedby="id_1" role="button" tabindex="0">
      <post-icon name="1022"></post-icon>
    </div>
    <span id="id_1">My Description</span>
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
      options: ['none', 'ariaDescribedByElements'],
    },
  },
  args: {
    workaround: 'none',
  },
  render: (args: Args) => html`
    <post-test-button2
      aria-describedby-id="id_2"
      workaround="${args.workaround}"
    ></post-test-button2>
    <span id="id_2">My Description</span>
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
    <post-test-button3 workaround="${args.workaround}"
      ><span slot="label-slot">My Description</span></post-test-button3
    >
  `,
};

// Case: Referencing from Shadow Dom to Light DOM workaround with aria-describedby directly set on host
export const Example4: Story = {
  render: () => html`
    <post-test-button aria-describedby-id="id_4"></post-test-button>
    <span id="id_4">My Description</span>
  `,
};

// Case: Referencing from Shadow Dom to Slotted Content (Light DOM) workaround with aria-describedby directly set on host
export const Example5: Story = {
  render: () => html`
    <post-test-button aria-describedby-id="id_5"
      ><span slot="label-slot" id="id_5">My Description</span>
    </post-test-button>
  `,
};

// Case: Standard Light DOM to Shadow DOM workaround
export const Example6: Story = {
  render: () => html`
    <div class="btn btn-primary" aria-describedby="id_6" role="button" tabindex="0">
      <post-icon name="1022"></post-icon>
    </div>
    <post-test-span2 id="id_6"></post-test-span2>
  `,
};

// Case: Shadow DOM to other Shadow Dom workaround
export const Example7: Story = {
  render: () => html`
    <post-test-span2 id="id_7"></post-test-span2>
    <post-test-button aria-describedby="id_7"></post-test-button>
  `,
};
