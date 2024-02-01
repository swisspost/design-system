import { Meta, StoryObj, Args, StoryContext } from '@storybook/web-components';
import { BADGE } from '../../../../.storybook/constants';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Subnavigation',
  parameters: {
    badges: [BADGE.WEB_COMPONENT_CANDIDATE],
  },
  args: {
    itemCount: 3,
  },
  render: render,
  argTypes: {
    background: {
      name: 'Background',
      description: 'Sets the background of the component',
      controls: {
        type: 'select',
        labels: {
          'default': 'default',
          'subnavigation-alternate': 'alternate',
          'bg-petrol': 'bg-petrol',
        },
      },
      options: ['default', 'subnavigation-alternate', 'bg-petrol'],
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

function render(args: Args, context: StoryContext) {
  return html`
    <div class="subnavigation${args.background !== 'default' ? ' ' + args.background : ''}">
      <div class="container container-fluid-xs container-fluid-sm">
        <ul class="subnavigation-list">
          ${Array.from(
            { length: args.itemCount },
            (_, index) => html`
              <li class="subnavigation-item">
                <a
                  href="/?path=/docs/components-subnavigation--docs"
                  class="subnavigation-link${index == 0 ? ' active' : ''}"
                >
                  Navitem ${index === 0 ? 'active' : 'default'}
                  ${args.badge ? html` <span class="badge bg-active rounded-pill">19</span> ` : ''}
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
    background: 'bg-petrol',
    itemCount: 3,
  },
};

export const Badges: Story = {
  args: {
    badge: true,
  },
};
