import { Meta, StoryObj, Args, StoryContext } from '@storybook/web-components';
import { BADGE } from '../../../../.storybook/constants';
import { html } from 'lit';
import scss from './background.module.scss';

const backgroundColors = scss.bgClasses.split('"').filter((_, index) => index % 2 === 1);

const meta: Meta = {
  title: 'Components/Subnavigation',
  decorators: [clickBlocker],
  render: renderTest,
  parameters: {
    badges: [BADGE.WEB_COMPONENT_CANDIDATE],
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
      options: ['default', ...backgroundColors],
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
                  ${args.badges ? html` <span class="badge">19</span> ` : ''}
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

export const Default: Story = {
  parameters: {
    controls: {
      include: ['Items', 'Background Color'],
    },
  },
};

export const ColoredBackground: Story = {
  parameters: {
    controls: {
      include: ['Background Color'],
    },
  },
};

export const Badges: Story = {
  args: {
    badges: true,
  },
};
