import type { Args, StoryObj } from '@storybook/web-components';
import { html } from 'lit/static-html.js';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: 'de313349-0c0b-4baf-adc6-cb8c2e36fc1a',
  title: 'Components/Buttons/Close button',
  component: 'post-closebutton',
  tags: ['package:WebComponents'],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=2514-18516&t=gCGlckfBEobCTna3-4',
    },
  },
  args: {
    label: 'Close button',
  },
  argTypes: {
    label: {
      name: 'Label',
      description: 'Visually hidden label for the close button.',
      control: {
        type: 'text',
      },
      table: {
        category: 'General',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: Args) => {
    return html`<post-closebutton label="${args.label}"></post-closebutton> `;
  },
};

export const SlotComponent: Story = {
  render: () => {
    return html`<Host>
      <slot name="post-closebutton"></slot>
      My component's content
    </Host> `;
  },
};

export const Slot: Story = {
  render: () => {
    return html`<post-mycomponent>
      <post-closebutton></post-closebutton>
    </post-mycomponent> `;
  },
};
