import type { Args, StoryObj } from '@storybook/web-components';
import { html } from 'lit/static-html.js';
import { MetaComponent } from '@root/types';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const meta: MetaComponent = {
  id: 'de313349-0c0b-4baf-adc6-cb8c2e36fc1a',
  title: 'Components/Buttons/Close button',
  component: 'post-closebutton',
  tags: ['package:WebComponents'],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=2514-18516&t=gCGlckfBEobCTna3-4',
    },
  },
  args: {
    'slots-default': 'Close button',
  },
  argTypes: {
    'slots-default': {
      name: 'Label',
      control: {
        type: 'text',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: Args) => {
    return html`<post-closebutton>${unsafeHTML(args['slots-default'])}</post-closebutton> `;
  },
};
