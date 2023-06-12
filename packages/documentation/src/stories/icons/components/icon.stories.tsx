import { Args, Story } from '@storybook/react';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
import docsPage from './icon.docs.mdx';

import { forEach } from '../../../utils/react';

export default {
  title: 'Icons/Components/Icon',
  component: 'post-icon',
  parameters: {
    docs: {
      page: docsPage,
    },
    badges: [BADGE.NEEDS_REVISION],
  },
  args: {
    'name': '1022',
    'base': '',
    'flip-h': false,
    'flip-v': false,
    'scale': 1,
    'rotate': 0,
    'animation': null,
  },
  argTypes: {
    'name': {
      table: {
        category: 'General',
      },
    },
    'base': {
      table: {
        category: 'General',
      },
    },
    'flip-h': {
      table: {
        category: 'Transformation',
      },
    },
    'flip-v': {
      table: {
        category: 'Transformation',
      },
    },
    'scale': {
      control: {
        type: 'number',
        min: 0.5,
        max: 3,
        step: 0.1,
      },
      table: {
        category: 'Transformation',
      },
    },
    'rotate': {
      control: {
        type: 'number',
        min: -360,
        max: 360,
        step: 1,
      },
      table: {
        category: 'Transformation',
      },
    },
    'animation': {
      options: [null, 'cylon', 'cylon-vertical', 'spin', 'spin-reverse', 'fade', 'throb'],
      table: {
        category: 'Transformation',
      },
    },
  },
};

function normalizeArgs(args: Args) {
  return Object.assign({}, args, {
    base: args.base || null,
    scale: args.scale !== 1 ? args.scale : null,
    rotate: args.rotate !== 0 ? args.rotate : null,
  });
}

const Template = (args: Args) => <post-icon {...normalizeArgs(args)} />;

export const Default: Story = Template.bind({});
Default.decorators = [
  (Story: Story) => (
    <div style={{ fontSize: '32px' }}>
      <Story />
    </div>
  ),
];

const ColorTemplate = (args: Args) => (
  <>
    {forEach(
      [
        { class: 'text-primary' },
        { class: 'text-info' },
        { class: 'text-success' },
        { style: { color: 'blue' } },
        { style: { color: '#800080' } },
        { style: { color: 'rgb(230, 0, 0)' } },
      ],
      (data: { key: number; value: any }) =>
        Template({
          ...args,
          key: data.key,
          ...data.value,
        }),
    )}
  </>
);

export const Color: Story = ColorTemplate.bind({});
Color.parameters = {
  controls: {
    exclude: ['Base', 'Flip Horizontally', 'Flip Vertically', 'Scale', 'Rotate', 'Animation'],
  },
};
Color.decorators = [
  (Story: Story) => (
    <div className="d-flex flex-wrap gap-2" style={{ fontSize: '32px' }}>
      <Story />
    </div>
  ),
];

const SizeTemplate = (args: Args) => (
  <>
    {forEach(
      [
        {},
        { class: 'h3' },
        { class: 'h1' },
        { class: 'fs-huge' },
        { style: { fontSize: '4rem' } },
        { style: { fontSize: '6rem' } },
      ],
      (data: { key: number; value: any }) =>
        Template({
          ...args,
          key: data.key,
          ...data.value,
        }),
    )}
  </>
);

export const Size: Story = SizeTemplate.bind({});
Size.parameters = {
  controls: {
    exclude: ['Base', 'Flip Horizontally', 'Flip Vertically', 'Scale', 'Rotate', 'Animation'],
  },
};
Size.decorators = [
  Story => (
    <div className="d-flex flex-column">
      <Story />
    </div>
  ),
];

const StyleTemplate = (args: Args) => (
  <>
    {forEach(
      [
        { class: 'border rounded p-3', style: { fontSize: '4rem' } },
        { class: 'border border-success rounded p-3 text-success', style: { fontSize: '4rem' } },
        { class: 'rounded-circle bg-info p-3', style: { fontSize: '4rem' } },
      ],
      (data: { key: number; value: any }) =>
        Template({
          ...args,
          key: data.key,
          ...data.value,
        }),
    )}
  </>
);

export const Style: Story = StyleTemplate.bind({});
Style.parameters = {
  controls: {
    exclude: ['Base', 'Flip Horizontally', 'Flip Vertically', 'Scale', 'Rotate', 'Animation'],
  },
};
Style.decorators = [
  Story => (
    <div className="d-flex flex-wrap gap-2">
      <Story />
    </div>
  ),
];

const FlipTemplate = (args: Args) => (
  <>
    {forEach(
      [{}, { 'flip-h': true }, { 'flip-v': true }, { 'flip-h': true, 'flip-v': true }],
      (data: { key: number; value: any }) =>
        Template({
          ...args,
          key: data.key,
          ...data.value,
        }),
    )}
  </>
);

export const Flip: Story = FlipTemplate.bind({});
Flip.parameters = {
  controls: {
    exclude: ['Base', 'Flip Horizontally', 'Flip Vertically', 'Scale', 'Rotate', 'Animation'],
  },
};
Flip.decorators = [
  Story => (
    <div className="d-flex flex-wrap gap-2" style={{ fontSize: '32px' }}>
      <Story />
    </div>
  ),
];

const ScaleTemplate = (args: Args) => (
  <>
    {forEach(
      [{ class: 'bg-info', scale: 0.5 }, { class: 'bg-info' }, { class: 'bg-info', scale: 1.5 }],
      (data: { key: number; value: any }) =>
        Template({
          ...args,
          key: data.key,
          ...data.value,
        }),
    )}
  </>
);

export const Scale: Story = ScaleTemplate.bind({});
Scale.parameters = {
  controls: {
    exclude: ['Base', 'Flip Horizontally', 'Flip Vertically', 'Scale', 'Rotate', 'Animation'],
  },
};
Scale.decorators = [
  Story => (
    <div className="d-flex flex-wrap gap-4" style={{ fontSize: '32px' }}>
      <Story />
    </div>
  ),
];

const RotateTemplate = (args: Args) => (
  <>
    {forEach(
      [
        { rotate: -365 },
        { rotate: -249 },
        { rotate: -35.5 },
        { rotate: 0 },
        { rotate: 98 },
        { rotate: 365 },
        { rotate: 753 },
      ],
      (data: { key: number; value: any }) =>
        Template({
          ...args,
          key: data.key,
          ...data.value,
        }),
    )}
  </>
);

export const Rotate: Story = RotateTemplate.bind({});
Rotate.parameters = {
  controls: {
    exclude: ['Base', 'Flip Horizontally', 'Flip Vertically', 'Scale', 'Rotate', 'Animation'],
  },
};
Rotate.decorators = [
  Story => (
    <div className="d-flex flex-wrap gap-2" style={{ fontSize: '32px' }}>
      <Story />
    </div>
  ),
];

const AnimateTemplate = (args: Args) => (
  <>
    {forEach(
      [
        { name: '2253', animation: 'cylon' },
        { name: '2252', animation: 'cylon-vertical' },
        { name: '2041', animation: 'spin' },
        { name: '2042', animation: 'spin-reverse' },
        { name: '2151', animation: 'fade' },
        { name: '2063', animation: 'throb' },
      ],
      (data: { key: number; value: any }) => (
        <div className="w-50 py-3">
          <p className="text-muted fs-tiny">Animation: {data.value.animation}</p>
          {Template({
            ...args,
            key: data.key,
            ...data.value,
          })}
        </div>
      ),
    )}
  </>
);

export const Animate: Story = AnimateTemplate.bind({});
Animate.parameters = {
  controls: {
    exclude: [
      'Name',
      'Base',
      'Flip Horizontally',
      'Flip Vertically',
      'Scale',
      'Rotate',
      'Animation',
    ],
  },
};
Animate.decorators = [
  Story => (
    <div className="d-flex flex-wrap text-center" style={{ fontSize: '32px' }}>
      <Story />
    </div>
  ),
];
