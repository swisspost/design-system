import type { Args, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { spread } from '@open-wc/lit-helpers';
import { getAttributes } from '@/utils';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: 'd6f8b5c7-4e2a-4f3a-9d3a-1a2b3c4d5e6f',
  title: 'Raw Components/Pagination',
  component: 'post-pagination',
  tags: ['package:WebComponents', 'status:Experimental', 'devOnly'],
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: '',
    },
  },
  args: {
    page: 1,
    pageSize: 10,
    collectionSize: 100,
    disabled: false,
    label: 'Pagination',
    labelPrevious: 'Previous page',
    labelNext: 'Next page',
    labelPage: 'Page',
    labelFirst: 'First page',
    labelLast: 'Last page',
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: Args) => {
    const attributes = getAttributes(args, (v) => v !== null && v !== undefined);
    return html`
      <post-pagination ${spread(attributes)}></post-pagination>
    `;
  },
};

export const ManyPages: Story = {
  render: () => html`
      <post-pagination
        page=10
        page-size=6
        collection-size=200
        label="Pagination"
        label-page="Page"
        label-first="First page"
        label-last="Last page"
      ></post-pagination>
  `,
};

export const PageOutOfRange: Story = {
  render: () => html`

      <post-pagination
        page=50
        page-size=10
        collection-size=40
        label="Pagination"
        label-page="Page"
        label-first="First page"
        label-last="Last page"
      ></post-pagination>
  `,
};

export const Disabled: Story = {
  render: () => html`
      <post-pagination
        page=1
        page-size=10
        collection-size=100
        disabled
        label="Pagination"
        label-page="Page"
        label-first="First page"
        label-last="Last page"
      ></post-pagination>
  `,
};
