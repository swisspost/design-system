import type { Args, Meta, StoryObj, StoryContext } from '@storybook/web-components';
import { BADGE } from '../../../../.storybook/constants';
import { html } from 'lit/static-html.js';

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
  'small-large',
  'large',
  'big',
  'bigger-big',
  'small-huge',
  'huge',
  'giant',
  'bigger-giant',
];

const positionOptions = {
  '': 'All around',
  'x': 'Along the horizontal axis',
  'y': 'Along the vertical axis',
  't': 'At the top',
  'b': 'At the bottom',
  'r': 'To the right',
  'l': 'To the left',
};

const meta: Meta = {
  title: 'Utilities/Spacing',
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
  },
  args: {
    marginSize: 'regular',
    marginPosition: '',
    paddingSize: 'regular',
    paddingPosition: '',
  },
  argTypes: {
    marginSize: {
      name: 'Margin size',
      description: 'Sets the size of the Margin.',
      control: {
        type: 'select',
      },
      options: sizingOptions,
      table: {
        category: 'General',
      },
    },
    marginPosition: {
      name: 'Margin Position',
      description: 'Sets the position of the Margin.',
      control: {
        type: 'select',
        labels: positionOptions,
      },
      options: Object.keys(positionOptions),
      table: {
        category: 'General',
      },
    },
    paddingSize: {
      name: 'Padding size',
      description: 'Sets the size of the Padding.',
      control: {
        type: 'select',
      },
      options: sizingOptions,
      table: {
        category: 'General',
      },
    },
    paddingPosition: {
      name: 'Pading Position',
      description: 'Sets the position of the Padding.',
      control: {
        type: 'select',
        labels: positionOptions,
      },
      options: Object.keys(positionOptions),
      table: {
        category: 'General',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: Args) => {
    return html`
      <!-- Demo -->
      <div class="bg-primary p-regular d-flex align-items-start">
        <div class="flex-fill d-flex">
          <div class="bg-petrol">
            <div
              class="bg-petrol-bright border border-dark h-bigger-giant m${args.marginPosition}-${args.marginSize} p${args.paddingPosition}-${args.paddingSize} w-bigger-giant"
            >
              <div class="bg-light h-100"></div>
            </div>
          </div>
        </div>

        <!-- Legend -->
        <ul class="ps-regular text-white">
          <li class="d-flex align-items-center mb-regular">
            <div class="bg-petrol h-regular w-regular me-mini"></div>
            <span>margin</span>
          </li>
          <li class="d-flex align-items-center mb-regular">
            <div class="bg-petrol-bright h-regular w-regular me-mini"></div>
            <span>padding</span>
          </li>
          <li class="d-flex align-items-center mb-regular">
            <div class="bg-light h-regular w-regular me-mini"></div>
            <span>content</span>
          </li>
        </ul>
      </div>
    `;
  },
};

export const responsiveExample: Story = {
  render: (args: Args) => {
    return html`
      <div class="bg-primary p-regular">
        <div
          class="border border-dark bg-petrol-bright h-bigger-giant w-bigger-giant p-regular p-lg-big">
          <div class="bg-light h-100"></div>
        </div>
        <p class="text-white"><smaFl>Resize the browser window to see changes.</small></p>
      </div>
    `;
  },
};

export const automaticResponsiveExample: Story = {
  render: (args: Args) => {
    return html`
      <div class="bg-primary p-regular">
        <div class="border border-dark bg-petrol-bright h-bigger-giant w-bigger-giant p-large-r">
          <div class="bg-light h-100"></div>
        </div>
        <p class="text-white"><small>Resize the browser window to see changes.</small></p>
      </div>
    `;
  },
};

export const gridGap: Story = {
  render: (args: Args) => {
    return html`
      <div class="row p-regular">
        <div class="p-2 bg-light border col-6">Grid item 1</div>
        <div class="p-2 bg-light border col-6">Grid item 2</div>
        <div class="p-2 bg-light border col-6">Grid item 3</div>
        <div class="p-2 bg-light border col-6">Grid item 1</div>
      </div>
    `;
  },
};
