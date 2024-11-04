import { Args, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: '8ca2bd70-56e6-4da9-b1fd-4e55388dca88',
  title: 'Components/Menu Button',
  tags: ['package:WebComponents'],
  component: 'post-menu',
  parameters: {
    design: {},
  },
  render,
  args: {
    id: 'menu-one',
    placement: 'bottom',
    padding: '1rem',
    backgroundColor: '#ffffff',
  },
  argTypes: {
    id: {
      name: 'Id',
      description:
        'The id is used to connect a trigger element with the menu. <div className="mt-8 alert alert-info alert-sm">`<button data-menu-target="...">` is the only valid trigger element for `post-menu`.</div>',
      table: {
        category: 'General',
      },
    },
    padding: {
      name: 'Padding',
      description: 'Controls the padding inside the menu container using --post-menu-padding.',
      control: { type: 'text' },
      table: {
        category: 'CSS Variables',
      },
    },
    backgroundColor: {
      name: 'Background Color',
      description: 'Sets the background color of the menu container using --post-menu-bg.',
      control: { type: 'color' },
      table: {
        category: 'CSS Variables',
      },
    },
  },
};

function render(args: Args) {
  return html`
    <post-menu-trigger for="${args.id}">
      <button class="btn btn-secondary">Menu button</button>
    </post-menu-trigger>

    <post-menu 
      style="--post-menu-padding: ${args.padding}; --post-menu-bg: ${args.backgroundColor};" 
      id="${args.id}" 
      placement="${args.placement !== 'bottom' ? args.placement : nothing}"
    >
      <post-menu-item><button>Example 2</button></post-menu-item>
      <post-menu-item><div>Example 3</div></post-menu-item>
      <hr />
      <post-menu-item>
        <a href="#">Example 1</a>
      </post-menu-item>
    </post-menu>
  `;
}

export default meta;

// Default story for interactive example in Storybook
export const Default: StoryObj = {};
