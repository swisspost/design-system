import type { Args, Meta, StoryObj, StoryContext } from '@storybook/web-components';
import { html } from 'lit/static-html.js';
import { BADGE } from '../../../../.storybook/constants';

const sizingOptions = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  'auto',
  'hair',
  'line',
  'micro',
  'mini',
  'small-regular',
  'regular',
  'Small',
  'small-large',
  'large',
  'big',
  'Bigg',
  'bigger-big',
  'small-huge',
  'huge',
  'giant',
  'Bigger',
  'bigger-giant',
];

const meta: Meta = {
  title: 'Foundations/Sizing',
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
  },
  args: {
    height: 'bigger-giant',
    width: 'bigger-giant',
  },
  argTypes: {
    height: {
      name: 'Height',
      description: 'Set the Height of the cube',
      control: {
        type: 'select',
      },
      options: sizingOptions,
    },
    width: {
      name: 'Width',
      description: 'Set the Width of the cube',
      control: {
        type: 'select',
      },
      options: sizingOptions,
    },
  },
};

export default meta;

type Story = StoryObj;

export const MarginPadding: Story = {
  render: (args: Args) => {
    const classes = 'border border-dark bg-light h-' + args.height + ' w-' + args.width;

    return html`
      <div class="d-flex bg-primary p-regular" style="height: 150px">
        <div class="flex-fill">
          <div class="${classes}"></div>
        </div>

        <ul class="ps-regular text-white">
          <li class="d-flex align-items-center mb-regular">
            <div class="bg-light h-regular w-regular me-mini"></div>
            <span>content</span>
          </li>
        </ul>
      </div>
    `;
  },
};
