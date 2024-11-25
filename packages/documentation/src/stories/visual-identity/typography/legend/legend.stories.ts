import type { Args, StoryObj } from '@storybook/web-components';
import { html, unsafeStatic } from 'lit/static-html.js';
import { MetaExtended } from '@root/types';

const meta: MetaExtended = {
  id: '61faccd2-de2c-48f0-9a06-c051a56580ef',
  title: 'Visual Identity/Typography/Legend',
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=1495-27801&node-type=instance&m=dev',
    },
  },
  args: {
    type: 'small',
  },
  argTypes: {
    type: {
      name: 'Type',
      description:
        'Large: Used for the title of a section in a form. Small: Used for the title of group of selection options.',
      control: {
        type: 'radio',
        labels: {
          large: 'Large',
          small: 'Small',
        },
      },
      options: ['large', 'small'],
      table: {
        category: 'General',
        type: {
          summary: 'HTML class attribute',
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: Args) => html`
    <fieldset>
      <legend ${args.type !== 'small' && args.type ? unsafeStatic(`class=${args.type}`) : ''}>
        Default legend
      </legend>
    </fieldset>
  `,
};
