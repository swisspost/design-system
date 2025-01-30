import type { Args, StoryObj } from '@storybook/web-components';
import { StoryContext, StoryFn } from '@storybook/web-components';
import { MetaExtended } from '@root/types';
import { html } from 'lit';
import './align-container.styles.scss';

const meta: MetaExtended = {
  id: '4cedb9d9-396f-4038-9493-65dfbc260ca6',
  title: 'Foundations/Layout/Align Elements To Container',
  decorators: [
    (story: StoryFn, context: StoryContext) => html`
      <div class="align-container-examples">${story(context.args, context)}</div>
    `,
  ],
};

export default meta;

type Story = StoryObj;

export const AlignContainerStart: Story = {
  argTypes: {
    AlignContainer: {
      name: 'Align Container',
      description: 'Align an grid element to its container start edge.',
      control: {
        type: 'select',
      },
      options: ['none', 'align-container-start'],
    },
  },
  args: {
    AlignContainer: 'align-container-start',
  },
  render: (args: Args) => html`
    <div class="container">
      <div class="row">
        <div class="col-6 ${args.AlignContainer}">
          <img
            alt="image aligned with the inline-start edge of the container"
            src="public/images/design-system-preview.png"
          />
        </div>
        <div class="col-6">
          <h2>Some inline-end content</h2>
          <p>Some inline-end text</p>
        </div>
      </div>
    </div>
  `,
};

export const AlignContainerEnd: Story = {
  args: {
    AlignContainer: 'align-container-end',
  },
  argTypes: {
    AlignContainer: {
      name: 'Align Container',
      description: 'Align an grid element to its container end edge.',
      control: {
        type: 'select',
      },
      options: ['none', 'align-container-end'],
    },
  },
  render: (args: Args) => html`
    <div class="container">
      <div class="row">
        <div class="col-6">
          <h2>Some inline-start content</h2>
          <p>Some inline-start text</p>
        </div>
        <div class="col-6 ${args.AlignContainer !== 'none' ? args.AlignContainer : ''}">
          <img
            alt="image aligned with the inline-end edge of the container"
            src="public/images/design-system-preview.png"
          />
        </div>
      </div>
    </div>
  `,
};
