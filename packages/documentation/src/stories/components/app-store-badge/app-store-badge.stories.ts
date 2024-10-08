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
    <div class="app-store-badge">
      <img src="/assets/images/app-store-badge-google.png" alt="App Store" />
      <span>Download on the App Store</span>
    </div>
  `,
};
