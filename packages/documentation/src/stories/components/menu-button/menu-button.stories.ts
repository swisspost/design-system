import { Args, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: '8ca2bd70-56e6-4da9-b1fd-4e55388dca88',
  title: 'Components/Menu Button',
  tags: ['package:WebComponents'],
  component: 'post-menu',
  parameters: {
    badges: [],
    docs: {
      argTypes: {
        sort: 'requiredFirst',
      },
    },
    design: {},
  },
  render,
  args: {
    id: 'menu-one',
    placement: 'bottom',
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
  },
  placement: {
    name: 'Placement',
  },
};

function render(args: Args) {
  return html`
    <post-menu-toggle>
      <button class="btn btn-secondary" data-menu-target="${args.id}">Menu button</button>
    </post-menu-toggle>
    <post-menu class="hydrated" id="${args.id}" placement="${args.placement}">
      <post-menu-item><button>Example 2</button></post-menu-item>
      <post-menu-item>
        <a href="#" class="text-decoration-none">Example 1</a></post-menu-item>
        <hr />
      <post-menu-item><div>Example 3</div></post-menu-item>
    </post-menu>
  `;
}

export default meta;
export const Default: StoryObj = {};
