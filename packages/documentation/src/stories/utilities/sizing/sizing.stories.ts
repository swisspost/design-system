import type { Args, StoryObj, StoryFn, StoryContext } from '@storybook/web-components';
import { html } from 'lit';
import sizing from './sizing.module.scss';
import { parse } from '@/utils/sass-export';
import { MetaExtended } from '@root/types';
import './sizing.styles.scss';
import { camelToKebabCase } from '@/utils/naming';

const sizes: Record<string, string> = parse(sizing);

const pixelSizes = Object.keys(sizes.pxsizes)
  .filter((key: string) => key.startsWith(`post-utility-gap-`) && !key.includes('-auto'))
  .map((key: string) => key.replace(`post-utility-gap-`, ''));

// Removed 'auto' from pixel sizes and moved it to the percentage sizes as it makes more sense
const percentageSizes = [...Object.keys(sizes.pcsizes), 'auto'];

const meta: MetaExtended = {
  render: renderSizing,
  id: 'e728de1f-0d71-4317-8bb8-cbef0bf8d5db',
  title: 'Utilities/Sizing',
  parameters: {
    badges: [],
  },
  args: {
    height: 'none',
    width: 'none',
    maxHeight: 'none',
    maxWidth: 'none',
    minHeight: 'none',
    minWidth: 'none',
  },
  decorators: [
    (story: StoryFn, context: StoryContext) => {
      const storyTemplate = html`
        <div class="sizing-example">
          <div class="h-104" style="border: 1px solid #b4b3af">${story(context.args, context)}</div>
        </div>
      `;
      return storyTemplate;
    },
  ],
};

export default meta;

type Story = StoryObj;

function renderSizing(args: Args) {
  const classNames = [
    `content`,
    `h-${args.height}`,
    `w-${args.width}`,
    args.maxHeight && args.maxHeight !== 'none' ? `max-h-${args.maxHeight}` : '',
    args.maxWidth && args.maxWidth !== 'none' ? `max-w-${args.maxWidth}` : '',
    args.minHeight && args.minHeight !== 'none' ? `min-h-${args.minHeight}` : '',
    args.minWidth && args.minWidth !== 'none' ? `min-w-${args.minWidth}` : '',
  ]
    .filter(Boolean)
    .join(' ');

  return html`<div class="${classNames}"></div>`;
}

const pcArgTypes = [
  { name: 'height', category: 'Height', options: percentageSizes },
  { name: 'width', category: 'Width', options: percentageSizes },
  { name: 'maxHeight', category: 'Height', options: percentageSizes },
  { name: 'maxWidth', category: 'Width', options: percentageSizes },
  { name: 'minHeight', category: 'Height', options: percentageSizes },
  { name: 'minWidth', category: 'Width', options: percentageSizes },
];

export const PercentSizes: Story = {
  args: {
    width: 'quarter',
    height: 'full',
  },
  argTypes: Object.fromEntries(
    pcArgTypes.map(argType => [
      argType.name,
      {
        name: camelToKebabCase(argType.name),
        description: `Set the ${camelToKebabCase(argType.name).toLowerCase()} of the rectangle`,
        control: { type: 'select' },
        options: argType.options,
        table: { category: argType.category },
      },
    ]),
  ),
};

const pxArgTypes = [
  { name: 'height', category: 'Height', options: pixelSizes },
  { name: 'width', category: 'Width', options: pixelSizes },
  { name: 'maxHeight', category: 'Height', options: pixelSizes },
  { name: 'maxWidth', category: 'Width', options: pixelSizes },
  { name: 'minHeight', category: 'Height', options: pixelSizes },
  { name: 'minWidth', category: 'Width', options: pixelSizes },
];

export const PxSizes: Story = {
  args: {
    width: '104',
    height: '80',
  },
  argTypes: Object.fromEntries(
    pxArgTypes.map(argType => [
      argType.name,
      {
        name: camelToKebabCase(argType.name),
        description: `Set the ${camelToKebabCase(argType.name).toLowerCase()} of the rectangle`,
        control: { type: 'select' },
        options: argType.options,
        table: { category: argType.category },
      },
    ]),
  ),
};
