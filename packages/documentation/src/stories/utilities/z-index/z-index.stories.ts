import type { Args, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './z-index.styles.scss';
import { MetaExtended } from '@root/types';

const options: Array<string> = ['n1', '0', '1', '2', '3', 'header', 'spinner', 'toast']

const meta: MetaExtended = {
  id: 'd4b7f8a2-1c3e-4b5d-9f1a-2e6b0c7a9f3d',
  title: 'Utilities/Z-Index',
  tags: ['status:InProgress'],
  args: {
    zIndex1: '0',
    zIndex2: '1',
    zIndex3: '2',
  },
  argTypes: {
    zIndex1: {
      name: 'Box 1 z-Index',
      description: 'z-index first box',
      control: { type: 'select' },
      options: options,
      table: { category: 'Boxes' },
    },
    zIndex2: {
      name: 'Box 2 z-Index',
      description: 'z-index second box',
      control: { type: 'select' },
      options: options,
      table: { category: 'Boxes' },
    },
    zIndex3: {
      name: 'Box 3 z-Index',
      description: 'z-index third box ',
      control: { type: 'select' },
      options: options,
      table: { category: 'Boxes' },
    },
  },
  render: (args: Args) => {
    return html`
      <div class="container-examples">
        <div class="z-${args.zIndex1} position-absolute">z-${args.zIndex1}</div>
        <div class="z-${args.zIndex2} position-absolute">z-${args.zIndex2}</div>
        <div class="z-${args.zIndex3} position-absolute">z-${args.zIndex3}</div>
      </div>
    `;
  },
};

export default meta;
type Story = StoryObj;
export const ZIndex: Story = {};
