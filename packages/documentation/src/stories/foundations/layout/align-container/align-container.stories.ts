import type { Args, StoryObj } from '@storybook/web-components';
import { StoryContext, StoryFn } from '@storybook/web-components';
import { MetaExtended } from '@root/types';
import { html, nothing } from 'lit';
import './align-container.styles.scss';

const meta: MetaExtended = {
  id: '4cedb9d9-396f-4038-9493-65dfbc260ca6',
  title: 'Foundations/Layout/Align Elements To Container',
  decorators: [
    (story: StoryFn, context: StoryContext) => html`
      <div class="align-container-examples">${story(context.args, context)}</div>
    `,
  ],
  argTypes: {
    alignContainer: {
      name: 'Align Container',
      description: 'Align an element to its Container edge.',
      control: {
        type: 'select',
      },
      options: ['none', 'align-container-start', 'align-container-end'],
    },
  },
  args: {
    alignContainer: 'align-container-start',
  },
  render: (args: Args) => html`
    <div class="container">
      <h2>Some content</h2>
      <p>Some text</p>
      <img
        alt="image aligned with the inline-start edge of the container"
        src="public/images/design-system-preview.png"
        class="${args.alignContainer !== 'none' ? args.alignContainer : nothing}"
      />
    </div>
  `,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const AlignContainerGrid: Story = {
  args: {
    alignContainer: 'align-container-start',
  },
  argTypes: {
    alignContainer: {
      name: 'Align Container',
      description: 'Align an element to its container end edge.',
      control: {
        type: 'select',
      },
      options: ['none', 'align-container-start', 'align-container-end'],
    },
  },
  render: (args: Args) => html`
    <div class="container">
      <div class="row">
        <div class="col-4">
          <img
            alt="image aligned with the inline-end edge of the container"
            src="public/images/design-system-preview.png"
            class="${args.alignContainer !== 'none' ? args.alignContainer : nothing}"
          />
        </div>
        <div class="col-4">
          <h2>Some inline-start content</h2>
          <p>Some inline-start text</p>
        </div>
        <div class="col-4">
          <img
            alt="image aligned with the inline-end edge of the container"
            src="public/images/design-system-preview.png"
            class="${args.alignContainer !== 'none' ? args.alignContainer : nothing}"
          />
        </div>
      </div>
    </div>
  `,
};
