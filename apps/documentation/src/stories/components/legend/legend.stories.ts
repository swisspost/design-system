import type { StoryObj } from '@storybook/web-components-vite';
import { MetaComponent } from '@root/types';
import { html, nothing } from 'lit';

const meta: MetaComponent = {
  id: '60c8a05b-4109-4efe-aab7-ea6f445d9684',
  title: 'Components/Legend',
  tags: ['package:Styles'],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-V2?node-id=3021-92609',
    },
  },
  args: {
    size: 'default',
  },
  argTypes: {
    size: {
      name: 'Size',
      description: 'The size of the legend.',
      control: {
        type: 'radio',
        labels: {
          default: 'Default',
          large: 'Large',
        },
      },
      options: ['default', 'large'],
      table: {
        category: 'General',
      },
    },
  },
  render: args => html`
    <fieldset>
      <legend class=${args.size === 'large' ? 'large' : nothing}>Legend</legend>
    </fieldset>
  `,
};

export default meta;

export const Default: StoryObj = {};
