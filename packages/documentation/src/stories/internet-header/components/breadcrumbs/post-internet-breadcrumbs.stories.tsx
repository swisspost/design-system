import { Meta, Args, Story } from '@storybook/react';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
import Header from '../header/post-internet-header.stories';
import docsPage from './internet-breadcrumbs.docs.mdx';
import '../header/internet-header.styles.scss';

export default {
  title: 'Internet Header/Components/Breadcrumbs',
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: docsPage,
    },
    badges: [BADGE.STABLE],
  },
  argTypes: {
    'custom-items': {
      name: 'Custom Items',
      control: {
        type: 'array',
      },
      description:
        'Add additional items to the end of the default breadcrumb (e.g. for client-side routing).',
      table: {
        type: {
          summary: `[ { text: string, url: string } ]`,
        },
        defaultValue: {
          summary: 'null',
        },
      },
    },
  },
} as Meta;

const Template = (args: Args) => {
  return (
    <div>
      <swisspost-internet-header {...Header.args} />
      <main className="container mt-huge-r">
        <swisspost-internet-breadcrumbs custom-items={JSON.stringify(args['custom-items'])} />
        <h1 className="mt-huge-r mb-big-r bold">Swiss Post Design System Internet Header</h1>
        <p className="fake-content my-big"></p>
      </main>
    </div>
  );
};

export const Default: Story = Template.bind({});

export const CustomItems: Story = Template.bind({});
CustomItems.args = {
  'custom-items': [
    { text: 'X', url: '/x' },
    { text: 'XY', url: '/x/xy' },
    { text: 'XYZ', url: '/x/xy/xyz' },
  ],
};

const NonExistentHeaderTemplate = (args: Args) => {
  return (
    <div className="page-wrapper">
      <main className="container mt-huge-r">
        <swisspost-internet-breadcrumbs custom-items={JSON.stringify(args['custom-items'])} />
        <h1 className="mt-huge-r mb-big-r bold">Swiss Post Design System Internet Header</h1>
        <p className="my-big">
          The <code>&lt;swisspost-internet-breadcrumbs&gt;</code> component cannot be used on its
          own. Accordingly, the <code>&lt;swisspost-internet-breadcrumbs&gt;</code> component should
          not be rendered if there's no <code>&lt;swisspost-internet-header&gt;</code> component
          included on the page.
        </p>
        <p className="fake-content my-big"></p>
        <p className="fake-content my-big"></p>
        <p className="fake-content my-big"></p>
      </main>
    </div>
  );
};

export const NonExistentHeader: Story = NonExistentHeaderTemplate.bind({});
