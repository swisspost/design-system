import { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

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
    palette: 'palette-default',
  },
  argTypes: {
    palette: {
      name: 'Palette',
      description: 'Sets the color scheme of the component',
      control: {
        type: 'select',
      },
      options: ['palette-default', 'palette-accent', 'palette-alternate', 'palette-brand'],
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
function clickBlocker(story: StoryFn, context: StoryContext) {
  return html`
    <div @click=${(e: Event) => e.preventDefault()}>${story(context.args, context)}</div>
  `;
}

function renderTest(args: Args) {
  return html`
    <div class="subnavigation ${args.palette}">
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

export const AlternativeColors: Story = {
  args: {
    palette: 'palette-accent',
  },
};

export const Badges: Story = {
  args: {
    badges: true,
  },
};
