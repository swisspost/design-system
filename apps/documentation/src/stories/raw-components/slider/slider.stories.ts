import { Args, type StoryContext, type StoryFn, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { MetaComponent } from '@root/types';
import { spreadArgs } from '@/utils';

const meta: MetaComponent = {
  id: 'd6bc3b88-050b-4ed7-af0d-c01d22a2605a',
  title: 'Raw Components/Slider',
  tags: ['package:WebComponents', 'devOnly'],
  component: 'post-slider',
  render,
  decorators: [paddedContainer],
  parameters: {
    design: {},
  },
  args: {
    orient: 'horizontal',
    range: false,
  },
  argTypes: {
    step: {
      control: {
        type: 'text',
      },
    },
    value: {
      control: {
        type: 'text',
      },
    },
  },
};

function paddedContainer(story: StoryFn, context: StoryContext) {
  return html`<div class="p-16">${story(context.args, context)}</div>`;
}

function render({ orient, ...args }: Args) {
  return html`
    <post-slider
      ${spreadArgs(args)}
      orient=${orient !== 'horizontal' ? orient : nothing}
    ></post-slider>
  `;
}

export default meta;

export const Default: StoryObj = {};
