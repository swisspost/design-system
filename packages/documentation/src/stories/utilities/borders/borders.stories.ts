import type { Args, StoryObj } from '@storybook/web-components';
import { html } from 'lit/static-html.js';
import { MetaExtended } from '@root/types';
import { parse } from '@/utils/sass-export';
import scss from './borders.module.scss';
import './borders.styles.scss';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const SCSS_VARIABLES: any = parse(scss);

const properties = ['border', 'color'];

console.log(SCSS_VARIABLES);

const border_args = properties.reduce((options, property) => {
  return {
    ...options,
    [property]: Object.keys(SCSS_VARIABLES[`${property}s`])
      .filter((key: string) => key.startsWith(`post-utility-border-`))
      .map((key: string) => key.replace(`post-utility-border-`, '')),
  };
}, {} as { [property: string]: string[] });

console.log(border_args);
const meta: MetaExtended = {
  id: 'cbee1b5e-c98b-4818-8b88-b3c9989796d8',
  title: 'Utilities/Borders',
};

export default meta;

type Story = StoryObj;

export const Borders: Story = {
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
        'Sets the border width in pixels based on the given number (e.g. `border-2` applies a 2px border, `border-10` applies a 10px border, etc.).',
      control: {
        type: 'select',
      },
      options: ['none', ...border_args.border],
      table: {
        category: 'Set Border Width',
      },
    },
    borderColor: {
      name: 'border-{color}',
      description:
        'Sets the border color using predefined color classes like `border-primary`, `border-secondary`, `border-success`, etc.',
      control: {
        type: 'select',
      },
      options: ['none', ...border_args.color],
      table: {
        category: 'Set Border Color',
      },
    },
  },
  args: {
    border: 'border',
    borderWidth: 'none',
    borderColor: 'none',
  },
  render: (args: Args) => {
    const border = args.border != 'none' ? args.border : '';
    const borderWidthClass = args.borderWidth != 'none' ? ` border-${args.borderWidth}` : '';
    const borderColorClass = args.borderColor != 'none' ? ` border-${args.borderColor}` : '';
    return html`
      <div class="border-example">
        <div class="d-flex p-2 gap-2" style="height: auto">
          <div class="flex-fill">
            <div class="${border}${borderWidthClass}${borderColorClass}">Sample Text</div>
          </div>
        </div>
      </div>
    `;
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

    return html`
      <div class="border-example">
        <div class="d-flex p-2 gap-2" style="height: auto">
          <div class="flex-fill">
            <div class="border${borderToRemove}">Sample Text</div>
          </div>
        </div>
      </div>
    `;
  },
};

export const BorderOpacity: Story = {
  argTypes: {
    borderOpacity: {
      name: 'border-opacity',
      description:
        'Sets the opacity of the border. Use values between 0, 10, 25, 50, 100 to define the transparency level (e.g., `border-opacity-50` for 50% opacity).',
      control: {
        type: 'select',
      },
      options: [0, 10, 25, 50, 75, 100],
    },
  },
  args: {
    borderOpacity: 'border',
  },
  render: (args: Args) => {
    const borderOpacity =
      args.borderOpacity != 'none' ? `border-opacity-${args.borderOpacity}` : '';
    return html`
      <div class="border-example">
        <div class="d-flex p-2 gap-2" style="height: auto">
          <div class="flex-fill">
            <div class="border border-dark ${borderOpacity}">Sample Text</div>
          </div>
        </div>
      </div>
    `;
  },
};

export const BorderRounded: Story = {
  argTypes: {
    borderRounded: {
      name: 'rounded-{radius}',
      description: 'Enables the border radius and sets its size',
      control: {
        type: 'select',
      },
      options: ['-', '1', '2', '3', '4', '5', 'circle', 'pill'],
    },
    borderRoundedSide: {
      name: 'rounded-{side}',
      description: 'Applies a border-radius to the selected side.',
      control: {
        type: 'select',
      },
      options: ['-', 'top', 'end', 'bottom', 'start'],
    },
  },
  args: {
    borderRounded: '-',
    borderRoundedSide: '-',
  },
  render: (args: Args) => {
    const borderRoundedSide = args.borderRoundedSide != '-' ? `-${args.borderRoundedSide}` : '';
    const borderRounded = args.borderRounded != '-' ? `-${args.borderRounded}` : '';

    return html`
      <div class="border-example">
        <div class="d-flex p-2 gap-2" style="height: auto">
          <div class="flex-fill">
            <div class="border rounded${borderRoundedSide}${borderRounded}">Sample Text</div>
          </div>
        </div>
      </div>
    `;
  },
};
