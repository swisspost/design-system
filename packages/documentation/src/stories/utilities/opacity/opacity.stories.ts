import type { Args, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './opacity.styles.scss';
import { MetaExtended } from '@root/types';

const meta: MetaExtended = {
  id: '5e27e48d-a5f6-4e57-a343-7f40507fc27b',
  title: 'Utilities/Opacity',
};

const opacityOptions = [0, 25, 50, 75, 100];

export default meta;

type Story = StoryObj;

export const Opacity: Story = {
  args: {
    opacity: '100',
  },
  argTypes: {
    opacity: {
      name: 'opacity',
      description: 'Set the opacity of the element',
      control: {
        type: 'select',
      },
      options: opacityOptions,
    },
  },
  render: (args: Args) => {
    return html`
      <div class="opacity-${args.opacity}">
        <div class="opacity-content">Opacity ${args.opacity}%</div>
      </div>
    `;
  },
};

export const OpacitySnapshot: Story = {
  render: () => {
    return html`
      ${opacityOptions.map(opacity => {
        return html`
          <div class="opacity-${opacity}">
            <div class="opacity-content">Opacity ${opacity}%</div>
          </div>
        `;
      })}
    `;
  },
};
