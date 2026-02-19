import type { Args, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { useArgs } from 'storybook/preview-api';
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
    label: 'Pagination',
    textPrevious: 'Previous page',
    textNext: 'Next page',
    textPage: 'Page',
    textFirst: 'First page',
    textLast: 'Last page',
  },
  argTypes: {
    page: {
      control: 'number',
      table: {
        category: 'Props',
      },
    },
    pageSize: {
      control: 'number',
      table: {
        category: 'Props',
      },
    },
    collectionSize: {
      control: 'number',
      table: {
        category: 'Props',
      },
    },
    label: {
      control: 'text',
      table: {
        category: 'Props',
      },
    },
    textPrevious: {
      control: 'text',
      table: {
        category: 'Props',
      },
    },
    textNext: {
      control: 'text',
      table: {
        category: 'Props',
      },
    },
    textPage: {
      control: 'text',
      table: {
        category: 'Props',
      },
    },
    textFirst: {
      control: 'text',
      table: {
        category: 'Props',
      },
    },
    textLast: {
      control: 'text',
      table: {
        category: 'Props',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: Args) => {
    const [, updateArgs] = useArgs();
    return html`
      <post-pagination
        page=${args.page}
        page-size=${args.pageSize}
        collection-size=${args.collectionSize}
        label=${args.label}
        text-previous=${args.textPrevious}
        text-next=${args.textNext}
        text-page=${args.textPage}
        text-first=${args.textFirst}
        text-last=${args.textLast}
        @postChange=${(e: CustomEvent) => {
          const newPage = e.detail;
          updateArgs({ page: newPage });
        }}
      ></post-pagination>
    `;
  },
};

export const ManyPages: Story = {
  render: () => html`
    <post-pagination
      page="10"
      page-size="6"
      collection-size="200"
      label="Pagination"
      text-previous="Previous page"
      text-next="Next page"
      text-page="Page"
      text-first="First page"
      text-last="Last page"
    ></post-pagination>
  `,
};

export const PageOutOfRange: Story = {
  render: () => html`
    <post-pagination
      page="50"
      page-size="10"
      collection-size="40"
      label="Pagination"
      text-previous="Previous page"
      text-next="Next page"
      text-page="Page"
      text-first="First page"
      text-last="Last page"
    ></post-pagination>
  `,
};
