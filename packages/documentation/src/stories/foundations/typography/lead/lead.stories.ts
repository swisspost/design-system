import type { StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { MetaExtended } from '@root/types';

const meta: MetaExtended = {
  id: 'b2b49569-42b8-40bb-93b3-a874415f625d',
  title: 'Foundations/Typography/Lead text',
  tags: ['package:Styles', 'status:Stable'],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=178-6713&node-type=frame&t=X3tyO53unPAPaH3B-0',
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <p class="lead">
      It helps readers quickly understand what to expect.
      This component is styled to stand out slightly from regular text while maintaining readability.
      Use it for introductory summaries in articles, sections, or announcements.
    </p>
  `,
};
