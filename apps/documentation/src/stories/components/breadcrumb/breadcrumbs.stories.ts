import type { Args, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: 'b7db7391-f893-4b1e-a125-b30c6f0b028b',
  title: 'Components/Breadcrumbs',
  component: 'post-breadcrumbs',
  tags: ['package:WebComponents', 'status:Experimental'],
  render,
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-Next-Level?node-id=558-16158&m=dev',
    },
    controls: {
      exclude: ['itemCount'],
    },
  },
  args: {
    homeUrl: '/',
    textHome: 'Home',
    textBreadcrumbs: 'Breadcrumbs',
    textMoreItems: 'More items',
    itemCount: 3,
  },
};

function render(args: Args) {
  return html`
    <post-breadcrumbs
      home-url=${args.homeUrl}
      text-home=${args.textHome}
      text-breadcrumbs=${args.textBreadcrumbs}
      text-more-items=${args.textMoreItems}
    >
      ${Array.from({ length: args.itemCount }).map(
        (_, i) =>
          html`<post-breadcrumb-item url="/section${i + 1}"
            >Section ${i + 1}</post-breadcrumb-item
          > `,
      )}
    </post-breadcrumbs>
  `;
}

export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const Concatenated: Story = {
  args: {
    itemCount: 10,
  },
};
