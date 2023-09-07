import { Args, Meta, StoryContext, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { BADGE } from '../../../../../.storybook/constants';
import customFooterConfig from './custom-config/custom-footer-config';
import { getAttributes } from '../../../../utils';

const meta: Meta = {
  title: 'Internet Header/Footer',
  component: 'swisspost-internet-footer',
  render: renderInternetFooter,
  decorators: [hiddenHeader],
  parameters: {
    layout: 'fullscreen',
    badges: [BADGE.STABLE],
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
  const props = getAttributes(args);
  return html`
    <swisspost-internet-header
      custom-config=${JSON.stringify(args.customConfig)}
      project="test"
    ></swisspost-internet-header>
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
