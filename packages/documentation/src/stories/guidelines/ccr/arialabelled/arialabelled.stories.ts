import { StoryObj } from '@storybook/web-components';
import { MetaExtended } from '@root/types';
import { html } from 'lit';

const meta: MetaExtended = {
  id: '76ade552-2c03-4d6d-9dce-28daa340f7d4',
  title: 'Guidelines/Cross Component Referencing/2.AriaLabelledBy-id',
  parameters: {
    badges: [],
  },
};

export default meta;

type Story = StoryObj;

export const ExampleHTML: Story = {
  render: () => html`
    <span id="id_1">My Text</span>
    <div class="btn btn-primary" aria-labelledby="id_1" role="button" tabindex="0">
      <post-icon name="1022"></post-icon>
    </div>
  `,
};

export const Example2: Story = {
  render: () => html`
    <span id="id_2">My Text</span>
    <post-test-button></post-test-button>
  `,
};

export const Example3: Story = {
  render: () => html`
    <post-test-span span-id="id_3" label-text="My Text"></post-test-span>
    <div class="btn btn-primary" aria-labelledby="id_3" role="textbox" tabindex="0">
      <post-icon name="1022"></post-icon>
    </div>
  `,
};

export const Example4: Story = {
  render: () => html`
    <post-test-span span-id="id_4" label-text="My Text"></post-test-span>
    <post-test-button aria-labelledby="id_4"></post-test-button>
  `,
};
