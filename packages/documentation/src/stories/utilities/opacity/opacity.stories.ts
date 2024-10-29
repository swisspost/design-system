import type { Args, StoryObj, StoryFn, StoryContext } from '@storybook/web-components';
import { html } from 'lit';
import './opacity.styles.scss';
import { MetaExtended } from '@root/types';

const meta: MetaExtended = {
  id: '5e27e48d-a5f6-4e57-a343-7f40507fc27b',
  title: 'Utilities/Opacity',
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
      options: [0, 25, 50, 75, 100],
    },
  },
  render: (args: Args) => {
    return html` <div class="opacity-${args.opacity}">Opacity ${args.opacity}%</div> `;
  },
  decorators: [
    (story: StoryFn, context: StoryContext) => {
      const storyTemplate = html`<div class="opacity-example">
        ${story(context.args, context)}
      </div>`;
      return storyTemplate;
    },
  ],
};

export default meta;

type Story = StoryObj;

export const Opacity: Story = {};
