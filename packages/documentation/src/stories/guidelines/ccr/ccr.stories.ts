import { StoryObj, Args } from '@storybook/web-components';
import { MetaExtended } from '@root/types';
import { html } from 'lit';

const meta: MetaExtended = {
  id: '76ade552-2c03-4d6d-9dce-28daa340f7d3',
  title: 'Guidelines/Cross Component Referencing',
  parameters: {
    badges: [],
  },
};

export default meta;

type Story = StoryObj;

export const ExampleHTML: Story = {
  render: () => html`
    <div class="form-floating">
      <input class="form-control" id="test0" value="" placeholder="Placeholder" />
      <label class="form-label" for="test0">Label Text</label>
    </div>
  `,
};

export const Example1: Story = {
  render: () => html` <post-test-example the-id="test1"></post-test-example> `,
};

export const Example2: Story = {
  argTypes: {
    label: {
      name: 'Label Text',
      control: {
        type: 'text',
      },
    },
    workaround: {
      name: 'Workaround',
      control: {
        type: 'radio',
      },
      options: ['none', 'ariamixin', 'arialabel'],
    },
  },
  args: {
    workaround: 'none',
    label: 'Label Text',
  },
  render: (args: Args) => html`
    <post-test-input
      input-id="test2"
      workaround="${args.workaround}"
      label-text=${args.label}
    ></post-test-input>
    <label for="test2"> ${args.label}</label>
  `,
};

export const Example3: Story = {
  argTypes: {
    label: {
      name: 'Label Text',
      control: {
        type: 'text',
      },
    },
    workaround: {
      name: 'Workaround',
      control: {
        type: 'radio',
      },
      options: ['none', 'ariamixin', 'arialabel'],
    },
  },
  args: {
    workaround: 'none',
    label: 'Label Text',
  },
  render: (args: Args) => html`
    <post-test-example2 the-id="test3" workaround="${args.workaround}" label-text=${args.label}>
      <label for="test3"> ${args.label} </label>
    </post-test-example2>
  `,
};

export const Example4: Story = {
  argTypes: {
    label: {
      name: 'Label Text',
      control: {
        type: 'text',
      },
    },
    workaround: {
      name: 'Workaround',
      control: {
        type: 'radio',
      },
      options: ['none', 'arialabel'],
    },
  },
  args: {
    workaround: 'none',
    label: 'Label Text',
  },
  render: (args: Args) => html`
    <post-test-label
      for="test4"
      workaround="${args.workaround}"
      label-text=${args.label}
    ></post-test-label>
    <input id="test4" value="" placeholder="Placeholder" />
  `,
};

export const Example5: Story = {
  argTypes: {
    label: {
      name: 'Label Text',
      control: {
        type: 'text',
      },
    },
    workaround: {
      name: 'Workaround',
      control: {
        type: 'radio',
      },
      options: ['none', 'arialabel'],
    },
  },
  args: {
    workaround: 'none',
    label: 'Label Text',
  },
  render: (args: Args) => html` <post-test-example3
    the-id="test5"
    workaround="${args.workaround}"
    label-text=${args.label}
  >
    <input id="test5" value="" placeholder="Placeholder" />
  </post-test-example3>`,
};

export const Example6: Story = {
  argTypes: {
    label: {
      name: 'Label Text',
      control: {
        type: 'text',
      },
    },
    workaround: {
      name: 'Workaround',
      control: {
        type: 'radio',
      },
      options: ['none', 'arialabel'],
    },
  },
  args: {
    workaround: 'none',
    label: 'Label Text',
  },
  render: (args: Args) => html`<post-test-input
      input-id="test6"
      label-text=${args.label}
      workaround="${args.workaround}"
    ></post-test-input>
    <post-test-label for="test6"></post-test-label>`,
};
