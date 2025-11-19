import type { Args, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { spread } from '@open-wc/lit-helpers';
import { getAttributes } from '@/utils';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: 'd6f8b5c7-4e2a-4f3a-9d3a-1a2b3c4d5e6f',
  title: 'Components/Pagination',
  component: 'post-pagination',
  tags: ['package:WebComponents', 'status:Experimental'],
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

export const ManyItems: Story = {
  name: 'Many items',
  render: (args: Args) => html`
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
  render: (args: Args) => html`

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
