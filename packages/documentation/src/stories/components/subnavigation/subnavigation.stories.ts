import { Meta, StoryObj, Args, StoryContext } from '@storybook/web-components';
import { BADGE } from '../../../../.storybook/constants';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Subnavigation',
  parameters: {
    badges: [BADGE.WEB_COMPONENT_CANDIDATE],
  },
  render: render,
  argTypes: {
    coloredBackground: {
      name: 'Colored Background',
      control: {
        type: 'boolean',
      },
    },
    alternate: {
      name: 'Alternate',
      control: {
        type: 'boolean',
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
    <div
      class="subnavigation${args.alternate
        ? ' subnavigation-alternate'
        : ''}${args.coloredBackground ? ' bg-petrol' : ''}"
    >
      <div class="container container-fluid-xs container-fluid-sm">
        <ul class="subnavigation-list">
          <li class="subnavigation-item">
            <a href="#" class="subnavigation-link active">
              Navitem active
              ${args.badge
                ? html`
                    <span class="badge bg-active rounded-pill">19</span>
                  `
                : ''}
            </a>
          </li>
          <li class="subnavigation-item">
            <a href="#" class="subnavigation-link">
              Navitem default
              ${args.badge
                ? html`
                    <span class="badge bg-active rounded-pill">10</span>
                  `
                : ''}
            </a>
          </li>
          <li class="subnavigation-item">
            <a href="#" class="subnavigation-link">
              Navitem default
              ${args.badge
                ? html`
                    <span class="badge bg-active rounded-pill">3</span>
                  `
                : ''}
            </a>
          </li>
        </ul>
      </div>
    </div>
  `;
}

type Story = StoryObj;

export const Default: Story = {};

export const ColoredBackground: Story = {
  args: {
    coloredBackground: true,
  },
};

export const Badges: Story = {
  args: {
    badge: true,
  },
};
