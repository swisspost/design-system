import { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

import { renderHeader } from '../internet-header/header.stories';

const meta: MetaComponent = {
  id: '27fc009d-3eec-43a9-b3a2-55531e721817',
  title: 'Raw Components/Internet Header/Footer',
  component: 'swisspost-internet-footer',
  tags: ['package:InternetHeader', 'devOnly'],
  render: renderInternetFooter,
  decorators: [hiddenHeader],
  parameters: {
    layout: 'fullscreen',
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-Next-Level?node-id=558-7013&p=f&t=jMzUCOZU8lwcCDjB-0',
    },
  },
  args: {
    textFooter: 'Footer',
    textCookieSettings: 'Cookie Settings',
  },
};

export default meta;

// DECORATORS
function hiddenHeader(story: StoryFn, context: StoryContext) {
  return html`
    <div class="d-none">${renderHeader()}</div>
    ${story(context.args, context)}
  `;
}

// RENDERER
function renderInternetFooter(args: Args) {
  return html`
    <swisspost-internet-footer
      text-footer=${args.textFooter}
      text-cookie-settings=${args.textCookieSettings}
    ></swisspost-internet-footer>
  `;
}

// STORIES
type Story = StoryObj;

export const Default: Story = {};
