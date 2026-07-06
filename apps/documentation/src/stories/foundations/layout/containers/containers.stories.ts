import { fakeParagraphs } from '@root/src/utils/fake-content';
import { MetaExtended } from '@root/types';
import type { Args, StoryObj } from '@storybook/web-components-vite';
import { StoryContext, StoryFn } from '@storybook/web-components-vite';
import { html } from 'lit';
import './containers.styles.scss';

const meta: MetaExtended = {
  id: 'a4ca9660-bb4a-4cc7-adfd-84767382ac03',
  title: 'Foundations/Layout/Containers',
  tags: ['package:Styles'],
  render: (args: Args) => html`
    <div class=${args.containerClass}>
      <post-tabs label="Page Tabs" size="large">
        <post-tab-item name="letters">
          <a href="/letters">Letters</a>
        </post-tab-item>
        <post-tab-item name="packages">
          <!-- The active link must have an aria-current="page" attribute to ensure correct accessibility and styling. -->
          <a href="/packages" aria-current="page">Packages</a>
        </post-tab-item>
        <post-tab-item name="logistics">
          <a href="/logistics">Logistics</a>
        </post-tab-item>
      </post-tabs>
      ${fakeParagraphs(12)}
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
