import { StoryObj } from '@storybook/web-components-vite';
import { MetaExtended } from '@root/types';
import { html } from 'lit';

const meta: MetaExtended = {
  id: '76ade552-2c03-4d6d-9dce-28daa3405112',
  title:
    'Accessibility Practices/Foundational Structure And Semantics/Reference Crossing The Shadowdom/aria-role-list',
  parameters: {
    badges: [],
  },

  decorators: [story => html`<div style="width:300px;display:block">${story()}</div>`],
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
      <demo-list-item-group list-group-version="1">
        <div slot="demo-list-item" role="listitem">item 1</div>
        <div slot="demo-list-item" role="listitem">item 2</div>
        <div slot="demo-list-item" role="listitem">item 3</div>
      </demo-list-item-group>
    </div>
  `,
};

// Case: Parent in the Light - children with Slotted content same component
export const Example1b: Story = {
  render: () => html`
    <demo-list-item-group list-group-version="1" role="list" tabindex="0">
      <div slot="demo-list-item" role="listitem">item 1</div>
      <div slot="demo-list-item" role="listitem">item 2</div>
      <div slot="demo-list-item" role="listitem">item 3</div>
    </demo-list-item-group>
  `,
};

// Case: Parent in the Light (Component host) -> Children in the ShadowDOM
export const Example2a: Story = {
  render: () =>
    html`
      <demo-list-item-group list-group-version="2" role="list" tabindex="0"> </demo-list-item-group>
    `,
};

// Case: Parent in Light (slotted content) - Children in the ShadowDOM
export const Example2b: Story = {
  render: () =>
    html`<demo-list-item-group list-group-version="2" tabindex="0">
      <div role="list" tabindex="0" slot="list-parent"></div>
    </demo-list-item-group>`,
};

// Case: Parent in the Shadow - Children in the Light
export const Example3: Story = {
  render: () => html`
    <demo-list role="list" tabindex="0" list-version="1">
      <div role="listitem">item 1</div>
      <div role="listitem">item 2</div>
      <div role="listitem">item 3</div>
    </demo-list>
  `,
};

// Case: Referencing from Shadow DOM (Host Attribute) to Slotted Content (Element)
export const Example4: Story = {
  render: () => html`<demo-list list-version="2">
    <demo-list-item>item 1</demo-list-item>
    <demo-list-item>item 2</demo-list-item>
    <demo-list-item>item 3</demo-list-item>
  </demo-list>`,
};
