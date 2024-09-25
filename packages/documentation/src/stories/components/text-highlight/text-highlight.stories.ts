import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaExtended } from '@root/types';

const meta: MetaExtended = {
  id: '88318ccf-be8d-4bdf-b8dc-06b0b78e5e3d',
  title: 'Components/Text Highlight',
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
    <p class="text-highlight">
      Lead text nullam quis risus eget urna mollis ornare veleu leo. Cum sociis natoque penatibus et
      magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies
      vehicula.
    </p>
    <p class="text-highlight">
      Lead text nullam quis risus eget urna mollis ornare veleu leo. Cum sociis natoque penatibus et
      magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies
      vehicula.
    </p>
  `,
};
