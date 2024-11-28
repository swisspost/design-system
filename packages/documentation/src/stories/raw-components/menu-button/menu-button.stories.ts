import { Args, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: '8ca2bd70-56e6-4da9-b1fd-4e55388dca88',
  title: 'Raw Components/Menu Button',
  tags: ['package:WebComponents'],
  component: 'post-menu',
  parameters: {
    design: {},
  },
  render,
  args: {
    id: 'menu-one',
    placement: 'bottom',
    padding: '',
    backgroundColor: '',
  },
  argTypes: {
    id: {
      name: 'id',
      description: 'The id is used to connect a trigger element with the popover.',
      table: {
        category: 'General',
      },
    },
    padding: {
      name: 'padding',
      description: 'Controls the padding inside the menu container using --post-menu-padding.',
      control: { type: 'text' },
      table: {
        category: 'CSS Variables',
      },
    },
    backgroundColor: {
      name: 'background color',
      description: 'Defines the color of the menu.',
      table: {
        category: 'CSS Variables',
      },
    },
  },
};

function render(args: Args) {
  // Construct the style string conditionally based on padding and backgroundColor
  const styles = [
    args.padding ? `--post-menu-padding: ${args.padding};` : '',
    args.backgroundColor ? `--post-menu-bg: ${args.backgroundColor};` : '',
  ]
    .filter(Boolean)
    .join(' ')
    .trim();

  return html`
    <post-menu-trigger for="${args.id}">
      <button class="btn btn-primary">Menu button</button>
    </post-menu-trigger>
    <post-menu
      style="${styles || nothing}"
      id="${args.id}"
      placement="${args.placement !== 'bottom' ? args.placement : nothing}"
    >
      <post-menu-item><button>Example 1</button></post-menu-item>
      <post-menu-item>
        <a href="#">Example 2</a>
        <post-menu-item><div>Example 3</div></post-menu-item>
      </post-menu-item>
    </post-menu>
  `;
}

export default meta;
export const Default: StoryObj = {};
