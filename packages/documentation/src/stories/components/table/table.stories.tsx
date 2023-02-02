import React from 'react';
import { Meta, Args, Story } from '@storybook/react';
import docsPage from './table.docs.mdx';
import { ReactProps } from '../../../types/component';

export default {
  title: 'Components/Table',
  parameters: {
    docs: {
      page: docsPage,
    },
  },
  args: {
    variant: 'null',
    caption: 'List of users',
    captionPlacement: 'bottom',
    alignment: 'align-top',
    hover: false,
  },
  argTypes: {
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
    variant: {
      name: 'Variants',
      description: 'Stylistic table variants.',
      control: {
        type: 'radio',
        labels: {
          'null': 'Default',
          'table-striped': 'Striped',
          'table-bordered': 'Bordered',
          'table-borderless': 'Borderless',
        },
      },
      options: ['null', 'table-striped', 'table-bordered', 'table-borderless'],
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
    hover: {
      name: 'Hover',
      description: 'Enable or disable hover styles.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
  },
} as Meta;

const TableWrapper = (props: ReactProps<{ args: Args; children: ChildNode }>) => (
  <table
    className={[
      'table',
      props.args.variant,
      props.args.captionPlacement === 'top' ? 'caption-top' : 'null',
      props.args.hover ? 'table-hover' : 'null',
      props.args.alignment,
    ]
      .filter(a => a !== 'null')
      .join(' ')}
  >
    <caption className={props.args.captionPlacement === 'hidden' ? 'visually-hidden' : ''}>
      {props.args.caption}
    </caption>
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Handle</th>
      </tr>
    </thead>

    <tbody>{props.children}</tbody>
  </table>
);

const Template = (args: Args) => (
  <TableWrapper args={args}>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </TableWrapper>
);

const TableButtons = () => (
  <React.Fragment>
    <button className="btn btn-secondary btn-icon btn-md">
      <span className="visually-hidden">Edit</span>
      <i className="pi pi-2012"></i>
    </button>
    <button className="btn btn-primary btn-icon btn-md ms-2">
      <span className="visually-hidden">Edit</span>
      <i className="pi pi-3193"></i>
    </button>
  </React.Fragment>
);

const ButtonTemplate = (args: Args) => (
  <TableWrapper args={args}>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>
        <TableButtons />
      </td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>
        <TableButtons />
      </td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>
        <TableButtons />
      </td>
    </tr>
  </TableWrapper>
);

export const Default: Story = Template.bind({});

export const TableWithButtons: Story = ButtonTemplate.bind({});
