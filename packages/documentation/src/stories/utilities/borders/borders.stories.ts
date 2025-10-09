import type { Args, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit/static-html.js';
import { MetaExtended } from '@root/types';
import './borders.styles.scss';

const meta: MetaExtended = {
  id: 'cbee1b5e-c98b-4818-8b88-b3c9989796d8',
  title: 'Utilities/Borders',
  tags: ['status:Stable'],

  decorators: [
    story =>
      html` <div class="border-example">
        <div class="d-flex p-2 gap-2" style="height: auto">
          <div class="flex-fill">${story()}</div>
        </div>
      </div>`,
  ],
};

export default meta;

type Story = StoryObj;

export const BorderSides: Story = {
  argTypes: {
    border: {
      name: 'border-{side}',
      description:
        'Sets the default border on all sides. Use `border-top`, `border-end`, `border-bottom`, or `border-start` to apply borders to specific sides.',
      control: {
        type: 'select',
      },
      options: ['none', 'border', 'border-top', 'border-end', 'border-bottom', 'border-start'],
      table: {
        category: 'Add Borders',
      },
    },
    borderWidth: {
      name: 'border-{width}',
      description:
        'Sets the border width (`border-1` applies a 1px border, `border-2` applies a 2px border).',
      control: {
        type: 'select',
      },
      options: ['none', '1', '2'],
      table: {
        category: 'Set Border Width',
      },
    },
  },
  args: {
    border: 'border',
    borderWidth: 'none',
  },
  render: (args: Args) => {
    const border = args.border != 'none' ? args.border : '';
    const borderWidthClass = args.borderWidth != 'none' ? ` border-${args.borderWidth}` : '';

    return html` <div class="${border}${borderWidthClass}">Sample Text</div> `;
  },
};

export const RemoveBorders: Story = {
  argTypes: {
    borderToRemove: {
      name: 'border-{side}-0',
      description:
        'Removes the selected border. Use `border-top-0`, `border-end-0`, `border-bottom-0`, or `border-start-0` to subtract the border from specific sides.',
      control: {
        type: 'select',
      },
      options: ['none', 'border-top-0', 'border-end-0', 'border-bottom-0', 'border-start-0'],
      table: {
        category: 'Remove Borders',
      },
    },
  },
  args: {
    borderToRemove: 'none',
  },
  render: (args: Args) => {
    const borderToRemove = args.borderToRemove != 'none' ? ` ${args.borderToRemove}` : '';

    return html` <div class="border${borderToRemove}">Sample Text</div> `;
  },
};

const border_args_sides = [
  'rounded',
  'rounded-top',
  'rounded-end',
  'rounded-bottom',
  'rounded-start',
];
const border_args_scales = ['-4', '-8', '-pill', '-circle'];

const combinedOptions: string[] = [];

border_args_scales.forEach(cls => {
  border_args_sides.forEach(arg => {
    combinedOptions.push(arg + cls);
  });
});

export const BorderRounded: Story = {
  argTypes: {
    borderRounded: {
      name: 'rounded-{side}-{scale}',
      description: 'Enables the `border radius` and sets its scale.',
      control: {
        type: 'select',
      },
      options: ['none', ...combinedOptions],
    },
  },
  args: {
    borderRounded: 'rounded-4',
  },
  render: (args: Args) => {
    const borderRounded = args.borderRounded != 'none' ? `${args.borderRounded}` : '';

    return html` <div class="border ${borderRounded}">Sample Text</div> `;
  },
};
