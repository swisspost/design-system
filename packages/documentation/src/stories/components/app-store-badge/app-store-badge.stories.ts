import { StoryContext, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: 'f1cda0ac-28d4-4afc-b56d-9182bd9bd671',
  title: 'Components/App Store Badge',
  tags: ['package:HTML'],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=2513-10518&node-type=instance&t=YDywHpWmdpWu1a5h-0',
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  decorators: [
    (story: StoryFn, context: StoryContext) => html` <div>${story(context.args, context)}</div> `,
  ],
  render: () => html`
    <a class="app-store-badge" href="#">
      <img src="/assets/images/google-play-badge.png" alt="Google Play Store badge" />
      <span class="visually-hidden">Download the App on the Google Play</span>
    </a>
  `,
};
