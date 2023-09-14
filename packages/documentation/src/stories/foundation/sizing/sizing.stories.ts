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
    margin: 0,
    padding: 0,
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

    margin: {
      name: 'Margin',
      description: 'Set the margin of the cube',
      control: {
        type: 'select',
      },
      options: sizingOptions,
    },

    padding: {
      name: 'Padding',
      description: 'Set the padding of the cube',
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
    const classes =
      'border border-dark h-' +
      args.height +
      ' w-' +
      args.width +
      ' m-' +
      args.margin +
      ' p-' +
      args.padding;

    return html`
      <div class="${classes}" style="background-color:orange; background-clip:content-box;"></div>
    `;
  },
};

export const Table: Story = {
  render: () => {
    const enum PostSizeImplementation {
      Pixel,
      Rem,
    }
    const sizes = [
      {
        name: 'hair',
        size_pixel: 1,
        size_rem: 0.0625,
        implemented: PostSizeImplementation.Pixel,
        equivalent: 0,
      },
      {
        name: 'line',
        size_pixel: 2,
        size_rem: 0.125,
        implemented: PostSizeImplementation.Pixel,
        equivalent: 0,
      },
      {
        name: 'micro',
        size_pixel: 4,
        size_rem: 0.25,
        implemented: PostSizeImplementation.Rem,
        equivalent: 1,
      },
      {
        name: 'mini',
        size_pixel: 8,
        size_rem: 0.5,
        implemented: PostSizeImplementation.Rem,
        equivalent: 2,
      },
      {
        name: 'small-regular',
        size_pixel: 12,
        size_rem: 0.75,
        implemented: PostSizeImplementation.Rem,
        equivalent: 0,
      },
      {
        name: 'regular',
        size_pixel: 16,
        size_rem: 1,
        implemented: PostSizeImplementation.Rem,
        equivalent: 3,
      },
      {
        name: 'small-large',
        size_pixel: 20,
        size_rem: 1.25,
        implemented: PostSizeImplementation.Rem,
        equivalent: 0,
      },
      {
        name: 'large',
        size_pixel: 24,
        size_rem: 1.5,
        implemented: PostSizeImplementation.Rem,
        equivalent: 4,
      },
      {
        name: 'big',
        size_pixel: 32,
        size_rem: 2,
        implemented: PostSizeImplementation.Rem,
        equivalent: 0,
      },
      {
        name: 'bigger-big',
        size_pixel: 40,
        size_rem: 2.5,
        implemented: PostSizeImplementation.Rem,
        equivalent: 0,
      },
      {
        name: 'small-huge',
        size_pixel: 48,
        size_rem: 3,
        implemented: PostSizeImplementation.Rem,
        equivalent: 5,
      },
      {
        name: 'huge',
        size_pixel: 56,
        size_rem: 3.5,
        implemented: PostSizeImplementation.Rem,
        equivalent: 0,
      },
      {
        name: 'giant',
        size_pixel: 80,
        size_rem: 5,
        implemented: PostSizeImplementation.Rem,
        equivalent: 0,
      },
      {
        name: 'bigger-giant',
        size_pixel: 112,
        size_rem: 7,
        implemented: PostSizeImplementation.Rem,
        equivalent: 0,
      },
    ];

    function sizesMapper(size: {
      name: string;
      size_pixel: number;
      size_rem: number;
      implemented: PostSizeImplementation;
      equivalent: number;
    }) {
      return html`
        <tr>
          <td>${size.name}</td>
          <td>${'*-' + size.name}</td>
          <td>${size.size_pixel} px</td>
          <td>${size.size_rem} rem</td>
          <td>
            ${size.implemented === PostSizeImplementation.Pixel
              ? size.size_pixel + 'px'
              : size.size_rem + 'rem'}
          </td>
          <td>${size.equivalent > 0 ? '*-' + size.equivalent : 'none'}</td>
        </tr>
      `;
    }

    return html`
      <table class="table table-striped table-sm" aria-describedby="post-sizes-reference-table">
        <thead class="thead-dark">
          <tr>
            <th>Size name</th>
            <th>Size name in classes</th>
            <th>Size in pixels (approx.)</th>
            <th>Size in rem</th>
            <th>Effective size used in css</th>
            <th>Bootstrap size equivalent</th>
          </tr>
        </thead>
        <tbody>${sizes.map(sizesMapper)}</tbody>
      </table>
    `;
  },
};
