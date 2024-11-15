import { StoryContext, StoryFn, StoryObj } from '@storybook/web-components';
import { MetaComponent } from '@root/types';
import { html } from 'lit';

const meta: MetaComponent = {
  id: '1a1b4cab-d0a8-4b01-bd85-b70e18668cb5',
  title: 'Components/Back To Top Button',
  component: 'post-back-to-top',
  tags: ['package:WebComponents'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=18-11',
    },
  },
  render: () => html` <div
    class="header-story-wrapper"
    style="--header-z-index: 1;overflow: auto; "
  >
    <swisspost-internet-header
      project="test"
      environment="int01"
      language="en"
    ></swisspost-internet-header>
    <div class="container">
      <p class="fake-content my-32"></p>
      <p class="fake-content my-32"></p>
      <p class="fake-content my-32"></p>
      <p class="fake-content my-32"></p>
      <p class="fake-content my-32"></p>
      <p class="fake-content my-32"></p>
      <p class="fake-content my-32"></p>
      <p class="fake-content my-32"></p>
      <p class="fake-content my-32"></p>
      <p class="fake-content my-32"></p>
      <p class="fake-content my-32"></p>
      <p class="fake-content my-32"></p>
      <p class="fake-content my-32"></p>
      <p class="fake-content my-32"></p>
      <p class="fake-content my-32"></p>
      <p class="fake-content my-32"></p>
      <p class="fake-content my-32"></p>
    </div>
    <post-back-to-top />
  </div>`,
  decorators: [
    (story: StoryFn, { args, context }: StoryContext) => html` ${story(args, context)} `,
  ],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
