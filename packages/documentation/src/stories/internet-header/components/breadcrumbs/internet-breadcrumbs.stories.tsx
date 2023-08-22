import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { spread } from '@open-wc/lit-helpers';
import { BADGE } from '../../../../../.storybook/constants';
import { getAttributes } from '../../../../utils';

const meta: Meta<HTMLSwisspostInternetBreadcrumbsElement> = {
  title: 'Internet Header/Breadcrumbs Component',
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
    },
  }
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

const renderer = () => html`
  <p>Hello</p>
`;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code:
`<body>
  <swisspost-internet-header project="your-project-id"></swisspost-internet-header>

  <div class="container">
    <swisspost-internet-breadcrumbs></swisspost-internet-breadcrumbs>
  </div>
</body>`,
      },
    },
  },
};

export const CustomItems: Story = {
  args: {
    customItems: [
      { text: 'X', url: '/x' },
      { text: 'XY', url: '/x/xy' },
      { text: 'XYZ', url: '/x/xy/xyz' },
    ],
  },
};
