import type { Args, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { useArgs } from 'storybook/preview-api';
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
    disabled: {
      control: 'boolean',
      table: {
        category: 'Props',
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      table: {
        category: 'Props',
      },
    },
    labelPrevious: {
      control: 'text',
      table: {
        category: 'Props',
      },
    },
    labelNext: {
      control: 'text',
      table: {
        category: 'Props',
      },
    },
    labelPage: {
      control: 'text',
      table: {
        category: 'Props',
      },
    },
    labelFirst: {
      control: 'text',
      table: {
        category: 'Props',
      },
    },
    labelLast: {
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
        disabled="${args.disabled ? true : nothing}"
        label=${args.label}
        label-previous=${args.labelPrevious}
        label-next=${args.labelNext}
        label-page=${args.labelPage}
        label-first=${args.labelFirst}
        label-last=${args.labelLast}
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
      page=10
      page-size=6
      collection-size=200
      label="Pagination"
      label-previous="Previous page"
      label-next="Next page"
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
      label-previous="Previous page"
      label-next="Next page"
      label-page="Page"
      label-first="First page"
      label-last="Last page"
    ></post-pagination>
  `,
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Render the pagination in a disabled state to prevent interaction.',
      },
    },
  },
  render: () => html`
    <post-pagination
      page=1
      page-size=10
      collection-size=100
      disabled="true"
      label="Pagination"
      label-previous="Previous page"
      label-next="Next page"
      label-page="Page"
      label-first="First page"
      label-last="Last page"
    ></post-pagination>
  `,
};
