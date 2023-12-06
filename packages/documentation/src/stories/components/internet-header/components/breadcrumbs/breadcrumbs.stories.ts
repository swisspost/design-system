import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { spread } from '@open-wc/lit-helpers';
import { BADGE } from '../../../../../../.storybook/constants';
import { getAttributes } from '../../../../../utils';
import customItems from './overrides/custom-items';

const meta: Meta<HTMLSwisspostInternetBreadcrumbsElement> = {
  title: 'Components/Internet Header/Breadcrumbs',
  component: 'swisspost-internet-breadcrumbs',
  render: renderInternetBreadcrumbs,
  decorators: [hiddenHeader],
  parameters: {
    badges: [BADGE.STABLE],
  },
  argTypes: {
    customItems: {
      name: 'custom-items',
      control: 'object',
      description:
        "Add custom breadcrumb items to the end of the pre-configured list. Handy if your online service has it's own navigation structure.",
      table: {
        type: {
          summary: 'IBreadcrumbItem',
          detail: JSON.stringify(customItems),
        },
      },
    },
  },
};

export default meta;

// DECORATORS
function hiddenHeader(story: any) {
  return html`
    <swisspost-internet-header project="test" hidden></swisspost-internet-header>
    ${story()}
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
