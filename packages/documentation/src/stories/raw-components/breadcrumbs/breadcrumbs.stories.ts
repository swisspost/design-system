import { StoryContext, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { spread } from '@open-wc/lit-helpers';
import { getAttributes } from '@/utils';
import customItems from './custom-items';
import { MetaComponent } from '@root/types';

const meta: MetaComponent<HTMLSwisspostInternetBreadcrumbsElement> = {
  id: '4347e5bf-8bf2-4f44-9075-9faaa53591ed',
  title: 'Raw Components/Internet Header/Breadcrumbs',
  component: 'swisspost-internet-breadcrumbs',
  tags: ['package:InternetHeader'],
  render: renderInternetBreadcrumbs,
  decorators: [hiddenHeader],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=21648-20076&mode=design&t=HksCTWa2MMccgMl4-0',
    },
  },
  argTypes: {
    customItems: {
      name: 'custom-items',
      control: 'object',
      table: {
        type: {
          detail: JSON.stringify(customItems, null, 2),
        },
      },
    },
  },
};

export default meta;

// DECORATORS
function hiddenHeader(story: StoryFn, context: StoryContext) {
  return html`
    <div class="d-none">
      <swisspost-internet-header project="test"></swisspost-internet-header>
    </div>
    ${story(context.args, context)}
  `;
}

// RENDERER
function renderInternetBreadcrumbs(args: Partial<HTMLSwisspostInternetBreadcrumbsElement>) {
  const attributes = getAttributes(args, arg => arg !== null && arg !== undefined);
  return html`
    <swisspost-internet-breadcrumbs ${spread(attributes)}></swisspost-internet-breadcrumbs>
  `;
}

// STORIES
type Story = StoryObj<HTMLSwisspostInternetBreadcrumbsElement>;

export const Default: Story = {};

export const CustomItems: Story = {
  args: {
    customItems: customItems,
  },
};
