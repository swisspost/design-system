import { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import customFooterConfig from './custom-footer-config';
import { spread } from '@open-wc/lit-helpers';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: '27fc009d-3eec-43a9-b3a2-55531e721817',
  title: 'Raw Components/Internet Header/Footer',
  component: 'swisspost-internet-footer',
  tags: ['package:InternetHeader'],
  render: renderInternetFooter,
  decorators: [hiddenHeader],
  parameters: {
    layout: 'fullscreen',
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=26665-17211&mode=design&t=HksCTWa2MMccgMl4-0',
    },
  },
  argTypes: {
    customConfig: {
      control: 'object',
      table: {
        type: {
          summary: 'ICustomConfig',
          detail: JSON.stringify(customFooterConfig),
        },
      },
    },
  },
};

export default meta;

// DECORATORS
function hiddenHeader(story: StoryFn, context: StoryContext) {
  return html`
    <style>
      swisspost-internet-header {
        display: none;
      }
    </style>
    ${story(context.args, context)}
  `;
}

// RENDERER
function renderInternetFooter(args: Args) {
  const props = args.customConfig ? { 'custom-config': JSON.stringify(args.customConfig) } : {};
  return html`
    <swisspost-internet-header ${spread(props)} project="test"></swisspost-internet-header>
    <swisspost-internet-footer></swisspost-internet-footer>
  `;
}

// STORIES
type Story = StoryObj;

export const Default: Story = {};

export const CustomConfig: Story = {
  args: {
    customConfig: customFooterConfig,
  },
};
