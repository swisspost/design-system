import type { Args, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: 'd6f8b5c7-4e2a-4f3a-9d3a-1a2b3c4d5e6f',
  title: 'Components/Pagination',
  component: 'post-pagination',
  tags: ['package:WebComponents', 'status:Experimental'],
  parameters: {
    badges: [],
  },
  args: {
    page: 1,
    pageSize: 10,
    collectionSize: 100,
    label: 'Pagination',
    labelPrevious: 'Previous page',
    labelNext: 'Next page',
    labelPage: 'Page',
    labelFirst: 'First page',
    labelLast: 'Last page',
    disabled: false,
  },
  argTypes: {
    page: { control: { type: 'number' } },
    pageSize: { control: { type: 'number' } },
    collectionSize: { control: { type: 'number' } },
    label: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: Args) => html`
      <post-pagination
        page=${args.page}
        page-size=${args.pageSize}
        collection-size=${args.collectionSize}
        label=${args.label}
        label-previous=${args.labelPrevious}
        label-next=${args.labelNext}
        label-page=${args.labelPage}
        label-first=${args.labelFirst}
        label-last=${args.labelLast}
        ?disabled=${args.disabled}
      ></post-pagination>
  `,
};

export const ManyPages: Story = {
  render: (args: Args) => html`
      <post-pagination
        page=10
        page-size=10
        collection-size=300
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

export const Disabled: Story = {
  render: (args: Args) => html`
      <post-pagination
        page=1
        page-size=10
        collection-size=100
        label="Pagination"
        label-page="Page"
        label-first="First page"
        label-last="Last page"
        ?disabled=${true}
      ></post-pagination>
  `,
};
