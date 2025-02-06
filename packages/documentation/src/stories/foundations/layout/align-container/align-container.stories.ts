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
      options: [
        'none',
        'align-container-start',
        'align-container-end',
        'align-container-start align-container-end',
      ],
      table: {
        category: 'General',
      },
    },
  },
  args: {
    alignContainer: 'align-container-start',
  },
  render: (args: Args) => html`
    <div class="container">
      <h3>Title</h3>
      <p>
        ${args.alignContainer !== 'none'
          ? 'Image aligned to the  ' + args.alignContainer.substring(16) + ' of the container.'
          : 'Image not aligned to the container.'}
      </p>
      <img
        src="https://www.post.ch/-/media/portal-opp/pn/bilder/filialezukunft.jpg?mw=1600&vs=1&hash=92E85C90640D8F24A1B21E150E1BC9C5"
        class="${args.alignContainer !== 'none' ? args.alignContainer : nothing}"
      />
    </div>
  `,
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const AlignContainerGrid: Story = {
  render: (args: Args) => html`
    <div class="container">
      <div class="row">
        <div class="col-4">
          <img
            src="https://www.post.ch/-/media/portal-opp/pn/bilder/filialezukunft.jpg?mw=1600&vs=1&hash=92E85C90640D8F24A1B21E150E1BC9C5"
            class="${args.alignContainer !== 'none' ? args.alignContainer : nothing}"
          />
        </div>
        <div class="col-4">
          <h3>Title</h3>
          <p>
            ${args.alignContainer !== 'none'
              ? 'Images aligned to the ' + args.alignContainer.substring(16) + ' of the container.'
              : 'Images not aligned to the container.'}
          </p>
        </div>
        <div class="col-4">
          <img
            src="https://www.post.ch/-/media/portal-opp/pn/bilder/filialezukunft.jpg?mw=1600&vs=1&hash=92E85C90640D8F24A1B21E150E1BC9C5"
            class="${args.alignContainer !== 'none' ? args.alignContainer : nothing}"
          />
        </div>
      </div>
    </div>
  `,
};
