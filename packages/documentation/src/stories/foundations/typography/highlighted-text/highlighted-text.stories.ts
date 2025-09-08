import type { StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { MetaExtended } from '@root/types';

const meta: MetaExtended = {
  id: '88318ccf-be8d-4bdf-b8dc-06b0b78e5e3d',
  title: 'Foundations/Typography/Highlighted Text',
  tags: ['package:Styles', 'status:Stable'],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=1481-12917',
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <p class="text-highlighted">
      Use this component when you need to emphasize important information or make a section more noticeable to readers. The highlighted style helps the content break away from the normal text flow.
    </p>
  `,
};
