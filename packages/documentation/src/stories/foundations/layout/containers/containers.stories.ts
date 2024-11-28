import type { Args, StoryObj } from '@storybook/web-components';
import { StoryContext, StoryFn } from '@storybook/web-components';
import { MetaExtended } from '@root/types';
import { html } from 'lit';
import './containers.styles.scss';

const meta: MetaExtended = {
  id: 'a4ca9660-bb4a-4cc7-adfd-84767382ac03',
  title: 'Foundations/Layout/Containers',
  render: (args: Args) => html`
    <div class=${args.containerClass}>
      <!-- Content goes here -->
    </div>
  `,
  decorators: [
    (story: StoryFn, context: StoryContext) => html`
      <div class="container-examples">${story(context.args, context)}</div>
    `,
  ],
};

export default meta;

type Story = StoryObj;

export const Container: Story = {
  args: {
    containerClass: 'container',
  },
};

export const ContainerFluid: Story = {
  args: {
    containerClass: 'container-fluid',
  },
};
