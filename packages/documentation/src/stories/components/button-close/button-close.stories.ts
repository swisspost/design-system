import type { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { MetaComponent } from '@root/types';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import './button-close.styles.scss';

const meta: MetaComponent = {
  id: 'de313349-0c0b-4baf-adc6-cb8c2e36fc1a',
  title: 'Components/Button Close',
  component: 'post-closebutton',
  render: getCloseButtonRenderer(),
  tags: ['package:WebComponents', 'status:Experimental'],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=2514-18516&t=gCGlckfBEobCTna3-4',
    },
  },
  args: {
    'slots-default': 'Close',
    'buttonType': 'button',
    'size': 'default',
    'placement': 'auto',
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

function getCloseButtonRenderer(extraClasses?: string) {
  return (args: Args) => html`
    <post-closebutton
      button-type=${args.buttonType !== 'button' ? args.buttonType : nothing}
      class=${extraClasses ?? nothing}
      size="${args.size !== 'default' ? args.size : nothing}"
      placement="${args.placement !== 'auto' ? args.placement : nothing}"
    >
      ${unsafeHTML(args['slots-default'])}
    </post-closebutton>
  `;
}

type Story = StoryObj;

export const Default: Story = {
  decorators: [
    (story: StoryFn, context: StoryContext) => {
      return html`<div class="mock-element">${story(context.args, context)}</div>`;
    },
  ],
};

export const AutomaticPositioning: Story = {
  render: (args: Args) => {
    const renderCloseButton = getCloseButtonRenderer();
    return html` <div class="position-relative">Closable element ${renderCloseButton(args)}</div> `;
  },
};
