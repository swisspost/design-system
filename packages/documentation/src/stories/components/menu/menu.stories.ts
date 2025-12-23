import { Args, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: '8ca2bd70-56e6-4da9-b1fd-4e55388dca88',
  title: 'Components/Menu',
  tags: ['package:WebComponents', 'status:Experimental'],
  component: 'post-menu',
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-Next-Level?node-id=13997-36408&m=dev',
    },
  },
  render,
  args: {
    id: 'menu-one',
    placement: 'bottom',
    label: 'Mail and shipping services menu',
  },
  argTypes: {
    id: {
      name: 'id',
      description: 'The id is used to connect a trigger element with the popover.',
      table: {
        category: 'General',
      },
    },
  },
};

function render(args: Args) {
  return html`
    <post-menu-trigger for="${args.id}">
      <button class="btn btn-primary">Postal services</button>
    </post-menu-trigger>
    <post-menu
      id="${args.id}"
      placement="${args.placement !== 'bottom' ? args.placement : nothing}"
      label="${args.label}"
    >
      <post-menu-item><a href="/cost">Calculate postage</a></post-menu-item>
      <post-menu-item><a href="/tracking">Track consignments</a></post-menu-item>
      <post-menu-item><button>Arrange a pickup</button></post-menu-item>
    </post-menu>
  `;
}

export default meta;
export const Default: StoryObj = {};
