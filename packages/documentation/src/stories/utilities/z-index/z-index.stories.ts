import type { Args, StoryObj, StoryFn, StoryContext } from '@storybook/web-components';
import { html } from 'lit';
import './z-index.styles.scss';
import { MetaExtended } from '@root/types';

const meta: MetaExtended = {
  id: 'd4b7f8a2-1c3e-4b5d-9f1a-2e6b0c7a9f3d',
  title: 'Utilities/Z-Index',
  args: {
    zIndex1: '0',
    zIndex2: '1',
    zIndex3: '2',
  },
  argTypes: {
    zIndex1: {
      name: 'Box 1 zIndex',
      description: 'z-index de la première boîte',
      control: { type: 'select' },
      options: ['n1', '0', '1', '2', '3'],
      table: { category: 'Boxes' },
    },
    zIndex2: {
      name: 'Box 2 zIndex',
      description: 'z-index de la deuxième boîte',
      control: { type: 'select' },
      options: ['n1', '0', '1', '2', '3'],
      table: { category: 'Boxes' },
    },
    zIndex3: {
      name: 'Box 3 zIndex',
      description: 'z-index de la troisième boîte',
      control: { type: 'select' },
      options: ['n1', '0', '1', '2', '3'],
      table: { category: 'Boxes' },
    },
  },
  render: (args: Args) => {
    return html`
      <div class="position-relative container-examples">
        <div class="z-${args.zIndex1} position-absolute z-container rounded-4">
          Box 1 (z-${args.zIndex1})
        </div>
        <div class="z-${args.zIndex2} position-absolute z-container rounded-4">
          Box 2 (z-${args.zIndex2})
        </div>
        <div class="z-${args.zIndex3} position-absolute z-container rounded-4">
          Box 3 (z-${args.zIndex3})
        </div>
      </div>
    `;
  },
  decorators: [
    (story: StoryFn, context: StoryContext) => {
      return story(context.args, context);
    },
  ],
};

export default meta;
type Story = StoryObj;
export const ZIndex: Story = {};
