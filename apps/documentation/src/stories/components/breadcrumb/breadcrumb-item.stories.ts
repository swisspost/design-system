import { MetaComponent } from '@root/types';
import { Args } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';

const meta: MetaComponent = {
  id: 'b7db7391-f893-4b1e-a125-b30c6f0b028d',
  title: 'Components/Breadcrumb Item',
  component: 'post-breadcrumb-item',
  render,
  tags: ['package:WebComponents', 'status:Experimental'],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-Next-Level?node-id=558-16158&m=dev',
    },
  },
  args: {
    variant: 'listitem',
    selected: false,
  },
  argTypes: {
    url: {
      control: {
        type: 'text',
      },
    },
  },
};

function render(args: Args) {
  return html`
    <post-breadcrumb-item
      url=${args.url || nothing}
      variant=${args.variant !== 'listitem' ? args.variant : nothing}
      ?selected=${args.selected}
      >Section 1</post-breadcrumb-item
    >
  `;
}

export default meta;

type Story = StoryObj;

export const Default: Story = {};
