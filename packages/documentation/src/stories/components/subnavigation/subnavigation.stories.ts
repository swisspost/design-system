import { Args, StoryContext, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaComponent } from '../../../../types';
import { parse } from '../../../utils/sass-export';
import scss from './subnavigation.module.scss';

const SCSS_VARIABLES: any = parse(scss);

const meta: MetaComponent = {
  id: '87ceabbb-f552-46eb-8a47-4d84e7f8cef0',
  title: 'Components/Subnavigation',
  tags: ['package:HTML'],
  decorators: [clickBlocker],
  render: renderTest,
  parameters: {
    badges: [],
    controls: {
      exclude: ['Badges'],
    },
  },
  args: {
    itemCount: 3,
    backgroundColor: 'default',
  },
  argTypes: {
    backgroundColor: {
      name: 'Background Color',
      description: 'Sets the background of the component',
      control: {
        type: 'select',
      },
      options: ['default', ...SCSS_VARIABLES['bg-classes']],
      table: {
        category: 'General',
      },
    },
    itemCount: {
      name: 'Items',
      description: 'Number of Items in the subnavigation',
      control: {
        type: 'number',
        min: 1,
        max: 5,
        step: 1,
      },
      table: {
        category: 'General',
      },
    },
    badges: {
      name: 'Badges',
      control: {
        type: 'boolean',
      },
    },
  },
};

export default meta;

// DECORATOR
function clickBlocker(story: any) {
  return html` <div @click=${(e: Event) => e.preventDefault()}>${story()}</div> `;
}

function renderTest(args: Args, context: StoryContext) {
  return html`
    <div
      class="subnavigation${args.backgroundColor !== 'default' ? ' ' + args.backgroundColor : ''}"
    >
      <div class="container container-fluid-xs container-fluid-sm">
        <ul class="subnavigation-list">
          ${Array.from(
            { length: args.itemCount },
            (_, index) => html`
              <li class="subnavigation-item">
                <a href="#" class="subnavigation-link${index == 0 ? ' active' : ''}">
                  Navitem ${index === 0 ? 'active' : 'default'}
                  ${args.badges ? html` <span class="badge bg-gray">19</span> ` : ''}
                </a>
              </li>
            `,
          )}
        </ul>
      </div>
    </div>
  `;
}

type Story = StoryObj;

export const Default: Story = {};

export const ColoredBackground: Story = {
  args: {
    backgroundColor: 'bg-gray',
  },
};

export const Badges: Story = {
  args: {
    badges: true,
  },
};
