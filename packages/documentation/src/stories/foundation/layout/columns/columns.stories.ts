import type { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { MetaExtended } from '@root/types';

const meta: MetaExtended = {
  id: 'cd70f48f-6308-4ec8-a8c6-982bd72c855c',
  title: 'Foundations/Layout/Columns',
  parameters: {
    badges: [],
  },
  decorators: [
    (story: StoryFn, { args, context }: StoryContext) => html`
      <div class="p-16 column-example text-center">${story(args, context)}</div>
    `,
  ],
  args: {
    alignItems: 'align-items-start',
    alignSelf: 'no self alignment',
    justifyContent: 'justify-content-start',
    offsetItem: 'offset-1',
    renderBreakingElement: true,
    ColumnOneOrder: 'no order',
    ColumnTwoOrder: 'order-5',
    ColumnThreeOrder: 'order-1',
    ColumnWidth: 'col-4',
  },
  argTypes: {
    alignItems: {
      name: 'Align Items',
      description: 'Aligns the whole row vertically.',
      control: {
        type: 'select',
      },
      options: ['align-items-start', 'align-items-center', 'align-items-end'],
    },
    alignSelf: {
      name: 'Align Item 1',
      description: 'Aligns the Item 1 vertically.',
      control: {
        type: 'select',
      },
      options: ['no self alignment', 'align-self-start', 'align-self-center', 'align-self-end'],
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
    },
    renderBreakingElement: {
      name: 'Render breaking element',
      description: 'Toggle rendering of breaking element',
      control: {
        type: 'boolean',
      },
    },
    ColumnOneOrder: {
      name: 'Order first column',
      description: 'Set order-class for first element',
      control: {
        type: 'select',
      },
      options: ['no order class', 'order-0', 'order-1', 'order-2', 'order-3', 'order-4', 'order-5'],
    },
    ColumnTwoOrder: {
      name: 'Order second column',
      description: 'Set order-class for second element',
      control: {
        type: 'select',
      },
      options: ['no order class', 'order-0', 'order-1', 'order-2', 'order-3', 'order-4', 'order-5'],
    },
    ColumnThreeOrder: {
      name: 'Order third column',
      description: 'Set order-class for third element',
      control: {
        type: 'select',
      },
      options: ['no order class', 'order-0', 'order-1', 'order-2', 'order-3', 'order-4', 'order-5'],
    },
    ColumnWidth: {
      name: 'Width of second Column',
      description: 'Set width for second column to see line breaking',
      control: {
        type: 'select',
      },
      options: [
        'col-1',
        'col-2',
        'col-3',
        'col-4',
        'col-5',
        'col-6',
        'col-7',
        'col-8',
        'col-9',
        'col-10',
        'col-11',
        'col-12',
      ],
    },
  },
};

export default meta;

type Story = StoryObj;

export const VerticalExample: Story = {
  parameters: {
    controls: {
      include: ['Align Items', 'Align Item 1'],
    },
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
    controls: {
      include: ['Horizontal Alignement'],
    },
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
  parameters: {
    controls: {
      include: ['Order first column', 'Order second column', 'Order third column'],
    },
  },
  render: (args: Args) => html`
    <div class="container">
      <div class="row">
        <div
          class="col${args.ColumnOneOrder === 'no order class' ? '' : ` ${args.ColumnOneOrder}`}"
        >
          First in DOM
        </div>
        <div
          class="col${args.ColumnTwoOrder === 'no order class' ? '' : ` ${args.ColumnTwoOrder}`}"
        >
          Second in DOM
        </div>
        <div
          class="col${args.ColumnThreeOrder === 'no order class'
            ? ''
            : ` ${args.ColumnThreeOrder}`}"
        >
          Third in DOM
        </div>
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
    controls: {
      include: ['Offset classes'],
    },
  },
  render: (args: Args) => html`
    <div class="row">
      <div class="col-1 ${args.offsetItem}">.${args.offsetItem}</div>
    </div>
  `,
};

export const ColumnBreakExample: Story = {
  parameters: {
    controls: {
      include: ['Render breaking element'],
    },
  },
  render: (args: Args) => html`
    <div class="row">
      <div class="col-3">.col-3</div>
      <div class="col-3">.col-3</div>
      ${args.renderBreakingElement
        ? html`
            <!-- Force next columns to break to new line -->
            <div class="w-100"></div>
          `
        : nothing}
      <div class="col-3">.col-3</div>
      <div class="col-3">.col-3</div>
    </div>
  `,
};

export const ResetOffsetExample: Story = {
  decorators: [
    (story: StoryFn, { args, context }: StoryContext) => html`
      ${story(args, context)}
      <p class="mt-16"><small>Resize the browser window to see changes.</small></p>
    `,
  ],
  render: () => html`
    <div class="row">
      <div class="col-sm-5 col-md-6">.col-sm-5 .col-md-6</div>
      <div class="col-sm-5 offset-sm-2 col-md-6 offset-md-0">
        .col-sm-5 .offset-sm-2 .col-md-6 .offset-md-0
      </div>
    </div>
  `,
};

export const ColumnWrapping: Story = {
  parameters: {
    controls: {
      include: ['Width of second Column'],
    },
  },
  render: (args: Args) => html`
    <div class="row">
      <div class="col-9">.col-9</div>
      <div class="${args.ColumnWidth}">${args.ColumnWidth}</div>
      <div class="col-6">
        .col-6
        <br />
        Subsequent columns continue along the new line.
      </div>
    </div>
  `,
};
