import { Args, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { fakeContent, spreadArgs } from '@/utils';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: 'ebb11274-091b-4cb7-9a3f-3e0451c9a865',
  title: 'Raw Components/Internet Header',
  tags: ['package:InternetHeader', 'status:Deprecated', 'devOnly'],
  component: 'swisspost-internet-header',
  parameters: {
    badges: [],
    layout: 'fullscreen',
    controls: { sort: 'alpha' },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=19536-26512&mode=design&t=HksCTWa2MMccgMl4-0',
    },
  },
  render,
  args: {
    project: 'test',
    environment: 'int01',
    language: 'en',
  },
  argTypes: {
    project: {
      control: false,
      table: {
        category: 'Required props',
      },
      type: {
        name: 'string',
        required: true,
      },
    },
    environment: {
      control: false,
      table: {
        category: 'Optional props',
      },
    },
    fullWidth: {
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Optional props',
      },
    },
    language: {
      table: {
        category: 'Optional props',
      },
    },
  },
  decorators: [
    story => html`
      <div
        class="header-story-wrapper"
        style="--header-z-index: 1;overflow: auto;max-height: 100svh;"
      >
        ${story()} ${fakeContent()}
      </div>
    `,
  ],
};

function render({ innerHMTL, ...args }: Args) {
  return html` <swisspost-internet-header ${spreadArgs(args)}></swisspost-internet-header> `;
}

export default meta;

type Story = StoryObj;

export const Default: Story = {};
