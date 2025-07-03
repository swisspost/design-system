import { StoryObj } from '@storybook/web-components';
import { MetaExtended } from '@root/types';
import { html } from 'lit';

const meta: MetaExtended = {
  id: '76ade552-2c03-4d6d-9dce-28daa346f456',
  title:
    'Accessibility Practices/Foundational Structure And Semantics/Reference Relationships/Crossing The Shadow Dom/Aria-Roles/List Role',
  parameters: {
    badges: [],
  },
};

export default meta;

type Story = StoryObj;

// Case: Standard Light DOM to Light DOM
export const ExampleHTML: Story = {
  render: () => html`
    <div role="list" tabindex="0">
      <div role="listitem">item 1</div>
      <div role="listitem">item 2</div>
      <div role="listitem">item 3</div>
    </div>
  `,
};

// Case: Light Dom to child components with Slotted content
export const Example1a: Story = {
  render: () => html`
    <div role="list" tabindex="0">
      <post-test-list-item-group>
        <div slot="post-list-item" role="listitem">item 1</div>
        <div slot="post-list-item" role="listitem">item 2</div>
        <div slot="post-list-item" role="listitem">item 3</div>
      </post-test-list-item-group>
    </div>
  `,
};

// Case: Parent in the Light - children with Slotted content same component
export const Example1b: Story = {
  render: () => html`
    <post-test-list-item-group role="list" tabindex="0">
      <div slot="post-list-item" role="listitem">item 1</div>
      <div slot="post-list-item" role="listitem">item 2</div>
      <div slot="post-list-item" role="listitem">item 3</div>
    </post-test-list-item-group>
  `,
};

// Case: Parent in the Light (Component host) -> Children in the ShadowDOM
export const Example2a: Story = {
  render: () =>
    html` <post-test-list-item-group-2 role="list" tabindex="0"></post-test-list-item-group-2> `,
};

// Case: Parent in Light (slotted content) - Children in the ShadowDOM
export const Example2b: Story = {
  render: () =>
    html`<post-test-list-item-group-2 tabindex="0"
      ><div slot="list-parent" role="list"></div>
    </post-test-list-item-group-2> `,
};

// Case: Parent in the Shadow - Children in the Light
export const Example3: Story = {
  render: () => html`
    <post-test-list>
      <div role="listitem" slot="post-list-item">item 1</div>
      <div role="listitem" slot="post-list-item">item 2</div>
      <div role="listitem" slot="post-list-item">item 3</div>
    </post-test-list>
  `,
};

// Case: Referencing from Shadow DOM (Host Attribute) to Slotted Content (Element)
export const Example4: Story = {
  render: () => html`<post-test-list-2></post-test-list-2> `,
};
