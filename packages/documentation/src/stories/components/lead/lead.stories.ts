import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaExtended } from '@root/types';

const meta: MetaExtended = {
  id: 'e76192bb-b2eb-487a-b9c1-ef938bccdfc4',
  title: 'Components/Lead',
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
  render: () =>
    html`
      <p class="lead">
        Lead text nullam quis risus eget urna mollis ornare veleu leo. Cum sociis natoque penatibus
        et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies
        vehicula.
      </p>
    `,
};
