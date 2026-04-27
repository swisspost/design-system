import { StoryContext, StoryFn, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { spread } from '@open-wc/lit-helpers';
import { getAttributes } from '@/utils';
import customItems from './custom-items';
import { MetaComponent } from '@root/types';

const meta: MetaComponent<HTMLSwisspostInternetBreadcrumbsElement> = {
  id: '4347e5bf-8bf2-4f44-9075-9faaa53591ed',
  title: 'Raw Components/Internet Header/Breadcrumbs',
  component: 'swisspost-internet-breadcrumbs',
  tags: ['package:InternetHeader', 'devOnly'],
  render: renderInternetBreadcrumbs,
  decorators: [hiddenHeader],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-Next-Level?node-id=558-16158&m=dev',
    },
  },
  args: {
    textHome: 'Homepage',
    textBreadcrumbs: 'Breadcrumbs',
    textMoreItems: 'More items',
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
