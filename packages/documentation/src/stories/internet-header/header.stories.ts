import { Meta, StoryContext, StoryObj, Args } from '@storybook/web-components';
import { BADGE } from '../../../.storybook/constants';
import { html } from 'lit';

const meta: Meta = {
  title: 'Internet Header/Header Test',
  component: 'swisspost-internet-header',
  parameters: {
    badges: [BADGE.STABLE],
    layout: 'fullscreen',
  },
  render,
  args: {
    environment: 'int01',
    project: 'test',
    meta: true,
    fullWidth: false,
    stickyness: 'minimal',
  },
  argTypes: {
    project: {
      name: 'Project',
      control: false,
    },
    environment: {
      name: 'Environment',
      control: false,
    },
    meta: {
      name: 'Meta',
    },
    fullWidth: {
      name: 'Full width',
      control: {
        type: 'boolean',
      },
    },
  },
  decorators: [
    story =>
      html`
        <div
          class="header-story-wrapper"
          style="--header-z-index: 1;overflow: auto;max-height: 100svh;"
        >
          ${story()}
          <div class="container">
            <p class="fake-content my-big"></p>
            <p class="fake-content my-big"></p>
            <p class="fake-content my-big"></p>
            <p class="fake-content my-big"></p>
            <p class="fake-content my-big"></p>
          </div>
        </div>
      `,
  ],
};

function render(args: Args, context: StoryContext) {
  return html`
    <swisspost-internet-header
      environment=${args.environment}
      project=${args.project}
      ?meta=${args.meta}
      ?full-width=${args.fullWidth}
      stickyness=${args.stickyness}
    ></swisspost-internet-header>
  `;
}

export default meta;

type Story = StoryObj;

export const Default: Story = {};
