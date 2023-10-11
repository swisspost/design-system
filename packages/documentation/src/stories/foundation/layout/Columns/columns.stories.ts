import type { Args, Meta, StoryFn, StoryObj, StoryContext } from '@storybook/web-components';
import { BADGE } from '../../../../../.storybook/constants';
import { html } from 'lit';

const meta: Meta = {
  title: 'Foundations/Layout/Columns',
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
  },
  decorators: [
    (story: StoryFn, { args, context }: StoryContext) => html`
      <div class="p-regular column-example text-center">${story(args, context)}</div>
    `,
  ],
  args: {
    alignItems: 'align-items-start',
    alignSelf: 'no self alignment',
    justifyContent: 'justify-content-start',
    offsetItem: 'offset-1',
  },
  argTypes: {
    alignItems: {
      name: 'Align Items',
      description: 'Aligns the whole row vertically.',
      control: {
        type: 'select',
      },
      options: ['align-items-start', 'align-items-center', 'align-items-end'],
      table: {
        category: 'General',
      },
    },
    alignSelf: {
      name: 'Align Item 1',
      description: 'Aligns the Item 1 vertically.',
      control: {
        type: 'select',
      },
      options: ['no self alignment', 'align-self-start', 'align-self-center', 'align-self-end'],
      table: {
        category: 'General',
      },
    },
    justifyContent: {
      name: 'Horizontal Alignement',
      description: 'Aligns the Items horizontally.',
      control: {
        type: 'select',
      },
      options: [
        'justify-content-start',
        'justify-content-center',
        'justify-content-end',
        'justify-content-around',
        'justify-content-between',
        'justify-content-evenly',
      ],
      table: {
        category: 'General',
      },
    },
    offsetItem: {
      name: 'Offset classes',
      description: 'Increases the left margin of a column',
      control: {
        type: 'select',
      },
      options: [
        'offset-1',
        'offset-2',
        'offset-3',
        'offset-4',
        'offset-5',
        'offset-6',
        'offset-7',
        'offset-8',
        'offset-9',
        'offset-10',
        'offset-11',
      ],
      table: {
        category: 'General',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const VerticalExample: Story = {
  parameters: {
    controls: { exclude: ['Horizontal Alignement', 'Offset classes'] },
  },
  render: (args: Args) => html`
    <div class="container">
      <div class="row-height row ${args.alignItems}">
        <div class="col${args.alignSelf === 'no self alignment' ? '' : ` ${args.alignSelf}`}">
          Item 1
        </div>
        <div class="col">Item 2</div>
        <div class="col">Item 3</div>
      </div>
    </div>
  `,
};

export const HorizontalExample: Story = {
  parameters: {
    controls: { exclude: ['Align Items', 'Align Item 1', 'Offset classes'] },
  },
  render: (args: Args) => html`
    <div class="container">
      <div class="row ${args.justifyContent}">
        <div class="col-4">Item 1</div>
        <div class="col-4">Item 2</div>
      </div>
    </div>
  `,
};

export const OrderExample: Story = {
  render: () => html`
    <div class="container">
      <div class="row">
        <div class="col">First in DOM, no order applied</div>
        <div class="col order-5">Second in DOM, with a larger order</div>
        <div class="col order-1">Third in DOM, with an order of 1</div>
      </div>
    </div>
  `,
};

export const OrderMaxExample: Story = {
  render: () => html`
    <div class="container">
      <div class="row">
        <div class="col order-last">First in DOM, ordered last</div>
        <div class="col">Second in DOM, unordered</div>
        <div class="col order-first">Third in DOM, ordered first</div>
      </div>
    </div>
  `,
};

export const OffsetExample: Story = {
  parameters: {
    controls: { exclude: ['Align Items', 'Align Item 1', 'Horizontal Alignement'] },
  },
  render: (args: Args) => html`
    <div class="row">
      <div class="col-1 ${args.offsetItem}">.col-1 .${args.offsetItem}</div>
    </div>
  `,
};

export const ColumnBreakExample: Story = {
  render: () => html`
    <div class="row">
      <div class="col-3">.col-3</div>
      <div class="col-3">.col-3</div>

      <!-- Force next columns to break to new line -->
      <div class="w-100"></div>

      <div class="col-3">.col-3</div>
      <div class="col-3">.col-3</div>
    </div>
  `,
};

export const ResetOffsetExample: Story = {
  decorators: [
    (story: StoryFn, { args, context }: StoryContext) => html`
      ${story(args, context)}
      <p class="mt-regular"><small>Resize the browser window to see changes.</small></p>
    `,
  ],
  render: () => html`
    <div class="row">
      <div class="col-sm-5 col-md-6">.col-sm-5 .col-md-6</div>
      <div class="col-sm-5 offset-sm-2 col-md-6 offset-md-0">
        .col-sm-5 .offset-sm-2 .col-md-6 .offset-md-0
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6 col-md-5 col-lg-6">.col-sm-6 .col-md-5 .col-lg-6</div>
      <div class="col-sm-6 col-md-5 offset-md-2 col-lg-6 offset-lg-0">
        .col-sm-6 .col-md-5 .offset-md-2 .col-lg-6 .offset-lg-0
      </div>
    </div>
  `,
};

export const MarginUtilitiesExample: Story = {
  decorators: [
    (story: StoryFn, { args, context }: StoryContext) => html`
      ${story(args, context)}
      <p class="mt-regular"><small>Resize the browser window to see changes.</small></p>
    `,
  ],
  render: () => html`
    <div class="row">
      <div class="col-md-4">.col-md-4</div>
      <div class="col-md-4 ms-auto">.col-md-4 .ms-auto</div>
    </div>
    <div class="row">
      <div class="col-md-3 ms-md-auto">.col-md-3 .ms-md-auto</div>
      <div class="col-md-3 ms-md-auto">.col-md-3 .ms-md-auto</div>
    </div>
    <div class="row">
      <div class="col-auto me-auto">.col-auto .me-auto</div>
      <div class="col-auto">.col-auto</div>
    </div>
  `,
};

export const StandaloneColumnExample: Story = {
  decorators: [
    (story: StoryFn, { args, context }: StoryContext) => html`
      <div class="standalone-columns">
        ${story(args, context)}
        <p class="mt-regular"><small>Resize the browser window to see changes.</small></p>
      </div>
    `,
  ],
  render: () => html`
    <div class="col-3 p-3 mb-2">.col-3: width of 25%</div>

    <div class="col-md-9 p-3">.col-md-9: width of 75% above md breakpoint</div>
  `,
};

export const ColumnWrapping: Story = {
  render: () => html`
    <div class="row">
      <div class="col-9">.col-9</div>
      <div class="col-4">
        .col-4
        <br />
        Since 9 + 4 = 13 &gt; 12, this 4-column-wide div gets wrapped onto a new line as one
        contiguous unit.
      </div>
      <div class="col-6">
        .col-6
        <br />
        Subsequent columns continue along the new line.
      </div>
    </div>
  `,
};
