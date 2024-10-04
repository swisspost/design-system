import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaExtended } from '@root/types';

const meta: MetaExtended = {
  id: '61faccd2-de2c-48f0-9a06-c051a56580ef',
  title: 'Foundations/Typography/Legend',
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=26-49',
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <fieldset>
      <legend>Default legend</legend>
    </fieldset>
  `,
};

export const Large: Story = {
  render: () => html`
    <fieldset>
      <legend class="legend-large">Large legend</legend>
    </fieldset>
  `,
};
