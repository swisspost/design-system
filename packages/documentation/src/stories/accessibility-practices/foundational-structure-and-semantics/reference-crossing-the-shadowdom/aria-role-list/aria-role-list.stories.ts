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
  render: () => html` <demo-list list-version="2"> </demo-list>`,
};

// Case: Parent in the Light - children with Slotted content same component
export const Example1b: Story = {
  render: () => html`
    <demo-list role="list" tabindex="0" list-version="1">
      <div role="listitem">item 1</div>
      <div role="listitem">item 2</div>
      <div role="listitem">item 3</div>
    </demo-list>
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
export const Example3a: Story = {
  render: () => html`
    <demo-list list-version="0"></demo-list>
    <div role="listitem">item 1</div>
    <div role="listitem">item 2</div>
    <div role="listitem">item 3</div>
  `,
};

// Case: Parent in the Shadow - Children Slotted
export const Example3b: Story = {
  render: () => html`
    <demo-list list-version="3">
      <div role="listitem">item 1</div>
      <div role="listitem">item 2</div>
      <div role="listitem">item 3</div>
    </demo-list>
  `,
};

// Case: Referencing from Shadow DOM to embedded Shadow DOM
export const Example4a: Story = {
  render: () => html` <demo-list list-version="4" role="list" tabindex="0"> </demo-list>`,
};

// Case: Referencing from Shadow DOM with slotted children in different embedded shadow DOMs
export const Example4b: Story = {
  render: () => html`<demo-list list-version="3">
    <demo-list-item>item 1</demo-list-item>
    <demo-list-item>item 2</demo-list-item>
    <demo-list-item>item 3</demo-list-item>
  </demo-list>`,
};

// Case: Parent in the Shadow > custom-component > childrent components
export const Example4c: Story = {
  render: () => html`<demo-list list-version="3">
    <demo-list-item-group list-group-version="4" role="presentation">
      <demo-list-item>item 1</demo-list-item>
      <demo-list-item>item 2</demo-list-item>
      <demo-list-item>item 3</demo-list-item>
    </demo-list-item-group>
  </demo-list>`,
};
