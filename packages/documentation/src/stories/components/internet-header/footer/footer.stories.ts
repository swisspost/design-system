import { Args, StoryContext, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import customFooterConfig from './custom-config/custom-footer-config';
import { spread } from '@open-wc/lit-helpers';
import { MetaComponent } from '../../../../../types';

const meta: MetaComponent = {
  id: '27fc009d-3eec-43a9-b3a2-55531e721817',
  title: 'Components/Internet Header/Footer',
  component: 'swisspost-internet-footer',
  tags: ['package:InternetHeader'],
  render: renderInternetFooter,
  decorators: [hiddenHeader],
  parameters: {
    layout: 'fullscreen',
    badges: [],
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
function hiddenHeader(story: any, { args }: StoryContext) {
  return html`
    <style>
      swisspost-internet-header {
        display: none;
      }
    </style>
    ${story()}
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
