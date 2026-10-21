import type { Args, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: 'f5683a10-19cf-4fc7-a40b-df4fb8db195c',
  title: 'Components/Non-native Select',
  component: 'post-select',
  tags: ['package:WebComponents', 'status:New'],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=21-183',
    },
  },
  args: {
    value: '',
    placeholder: 'Select a country',
    disabled: false,
    ariaLabel: 'Country',
  },
  argTypes: {
    ariaLabel: {
      name: 'aria-label',
      description: 'Accessible name for the select. Use a visible label where possible.',
      control: 'text',
      table: { category: 'Accessibility' },
    },
  },
  render,
};

export default meta;

function render(args: Args) {
  return html`
    <div style="width: 280px;">
      <post-select
        aria-label="${args.ariaLabel}"
        value="${args.value}"
        placeholder="${args.placeholder}"
        ?disabled=${args.disabled}
      >
        <post-select-option value="Switzerland" icon="checkmark"></post-select-option>
        <post-select-option value="Germany"></post-select-option>
        <post-select-option value="France"></post-select-option>
        <post-select-option value="Italy"></post-select-option>
      </post-select>
    </div>
  `;
}

type Story = StoryObj;

export const Default: Story = {};

export const Selected: Story = {
  args: { value: 'Switzerland' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const CustomOptionTemplate: Story = {
  render: () => html`
    <div style="width: 280px;">
      <post-select aria-label="Shipping service" placeholder="Choose a service">
        <post-select-option value="express">
          <span><strong>Express</strong><br /><small>Next working day</small></span>
        </post-select-option>
        <post-select-option value="standard">
          <span><strong>Standard</strong><br /><small>Within three working days</small></span>
        </post-select-option>
      </post-select>
    </div>
  `,
};
