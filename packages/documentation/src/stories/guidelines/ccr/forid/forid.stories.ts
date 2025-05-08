import { StoryObj, Args } from '@storybook/web-components';
import { MetaExtended } from '@root/types';
import { html } from 'lit';

const meta: MetaExtended = {
  id: '76ade552-2c03-4d6d-9dce-28daa340f7d3',
  title: 'Guidelines/Cross Component Referencing/1.For-id',
  parameters: {
    badges: [],
  },

  decorators: [story => html`<div style="width:300px;height:60px;display:block">${story()}</div>`],
};

export default meta;

type Story = StoryObj;

export const ExampleHTML: Story = {
  render: () => html`
    <label for="id_0">My Text</label>
    <input id="id_0"></input>
  `,
};

export const Example2: Story = {
  argTypes: {
    workaround: {
      name: 'Workaround',
      control: {
        type: 'radio',
      },
      options: ['none', 'ariamixin'],
    },
  },
  args: {
    workaround: 'none',
  },
  render: (args: Args) => html`
    <label for="id_1">My Text</label>
    <post-test-target workaround="${args.workaround}" aria-labelledby-id="id_1"></post-test-target>
  `,
};

export const Example3: Story = {
  argTypes: {
    workaround: {
      name: 'Workaround',
      control: {
        type: 'radio',
      },
      options: ['none', 'ariamixin'],
    },
  },
  args: {
    workaround: 'none',
  },
  render: (args: Args) => html`
    <post-test-target2 workaround="${args.workaround}">
      <label slot="label-slot">My Text</label></post-test-target2
    >
  `,
};

// ssr workaround 1
export const Example5: Story = {
  render: () => html`
    <post-test-target3 aria-labelledby="id_5" role="textbox" tabindex="0">
      <label id="id_5" slot="label-slot">My Text</label>
      >
    </post-test-target3>
  `,
};

// ssr workaround 2
export const Example7: Story = {
  render: () => html`
    <post-test-target4 aria-labelledby="id_7">
      <label id="id_7" slot="label-slot">My Text</label>
      >
    </post-test-target4>
  `,
};

export const Example4: Story = {
  argTypes: {
    workaround: {
      name: 'Workaround',
      control: {
        type: 'radio',
      },
      options: ['none', 'ariamixin (not working)'],
    },
  },
  args: {
    workaround: 'none',
  },
  render: (args: Args) => html`
    <post-test-label workaround="${args.workaround}" for="id_4" id="id_4"> </post-test-label>
    <input aria-labelledby="id_4"></input>
  `,
};

export const Example6: Story = {
  render: () => html`
    <post-test-label id="id_6"></post-test-label>
    <post-test-target3 aria-labelledby="id_6" role="button"></post-test-target3>
  `,
};
