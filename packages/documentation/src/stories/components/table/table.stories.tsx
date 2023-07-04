import React from 'react';
import { Meta, Args, Story } from '@storybook/react';
import docsPage from './table.docs.mdx';

export default {
  title: 'Components/Table',
  parameters: {
    docs: {
      page: docsPage,
    },
  },
  args: {
    variant: [],
    borderStyle: 'null',
    caption: 'List of users',
    captionPlacement: 'bottom',
    alignment: 'align-top',
    content: null,
  },
  argTypes: {
    content: {
      name: 'Content',
      description: 'Hidden helper arg for dynamically switching the table body',
      table: {
        disable: true,
      },
    },
    caption: {
      name: 'Caption',
      description: 'A description of the table, very useful for screen reader users.',
      control: {
        type: 'text',
      },
      table: {
        category: 'Caption',
      },
    },
    captionPlacement: {
      name: 'Caption Placement',
      description:
        'Choose where to place the description of the table. If a visual description is not necessary, it can also be hidden visually and still be of value for screen reader users.',
      control: {
        type: 'select',
        labels: {
          bottom: 'Bottom (default)',
          top: 'Top',
          hidden: 'Visually hidden',
        },
      },
      options: ['bottom', 'top', 'hidden'],
      table: {
        category: 'Caption',
      },
    },
    borderStyle: {
      name: 'Border style',
      description: 'Border style',
      control: {
        type: 'radio',
        labels: {
          'null': 'Default (underlined)',
          'table-bordered': 'Bordered',
          'table-borderless': 'Borderless',
        },
      },
      options: ['null', 'table-bordered', 'table-borderless'],
      table: {
        category: 'General',
      },
    },
    variant: {
      name: 'Variants',
      description: 'Stylistic table variants.',
      control: {
        type: 'check',
        labels: {
          'table-striped': 'Striped',
          'table-hover': 'Hover enabled',
        },
      },
      options: ['table-striped', 'table-hover'],
      table: {
        category: 'General',
      },
    },
    alignment: {
      name: 'Alignment',
      description:
        'Vertical alignment options for cell content. Alignment classes can also be set for individual rows or cells.',
      control: {
        type: 'select',
        labels: {
          'align-top': 'Top (default)',
          'align-middle': 'Middle',
          'align-bottom': 'Bottom',
        },
      },
      options: ['align-top', 'align-middle', 'align-bottom'],
      table: {
        category: 'General',
      },
    },
  },
} as Meta;

const Template = (args: Args) => (
  <table
    className={[
      'table',
      args.borderStyle,
      args.variant.join(' '),
      args.captionPlacement === 'top' ? 'caption-top' : 'null',
      args.alignment,
    ]
      .filter(a => a !== 'null')
      .join(' ')}
  >
    <caption className={args.captionPlacement === 'hidden' ? 'visually-hidden' : ''}>
      {args.caption}
    </caption>
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Handle</th>
      </tr>
    </thead>

    <tbody>{args.content}</tbody>
  </table>
);

export const Default: Story = Template.bind({});
Default.args = {
  content: [
    <tr key="1">
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>,
    <tr key="2">
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>,
    <tr key="3">
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>,
    <tr key="4">
      <th scope="row">4</th>
      <td>Someone</td>
      <td>
        else
        <br />
        entirely
      </td>
      <td>@twitter</td>
    </tr>,
  ],
};

export const TableWithButtons: Story = Template.bind({});
TableWithButtons.args = {
  alignment: 'align-middle',
  content: [
    <tr key="1">
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>
        <button className="btn btn-secondary btn-icon btn-md">
          <span className="visually-hidden">Edit</span>
          <i className="pi pi-2012"></i>
        </button>
        <button className="btn btn-primary btn-icon btn-md ms-2">
          <span className="visually-hidden">Edit</span>
          <i className="pi pi-3193"></i>
        </button>
      </td>
    </tr>,
    <tr key="2">
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>
        <button className="btn btn-secondary btn-icon btn-md">
          <span className="visually-hidden">Edit</span>
          <i className="pi pi-2012"></i>
        </button>
        <button className="btn btn-primary btn-icon btn-md ms-2">
          <span className="visually-hidden">Edit</span>
          <i className="pi pi-3193"></i>
        </button>
      </td>
    </tr>,
    <tr key="3">
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>
        <button className="btn btn-secondary btn-icon btn-md">
          <span className="visually-hidden">Edit</span>
          <i className="pi pi-2012"></i>
        </button>
        <button className="btn btn-primary btn-icon btn-md ms-2">
          <span className="visually-hidden">Edit</span>
          <i className="pi pi-3193"></i>
        </button>
      </td>
    </tr>,
  ],
};
