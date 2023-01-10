import { h } from '@stencil/core';
import { Default as Header } from '../../../../documentation/src/stories/internet-header/header/post-internet-header.stories';

export default {
  title: 'Breadcrumb',
  argTypes: {
    'custom-items': {
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
};

const Template = args => {
  return (
    <div>
      <swisspost-internet-header {...Header.args} />
      <main class="container mt-huge-r">
        <swisspost-internet-breadcrumbs custom-items={JSON.stringify(args['custom-items'])} />
        <h1 class="mt-huge-r mb-big-r bold">CWF Internet Header</h1>
        <p class="fake-content my-big"></p>
      </main>
    </div>
  );
};

export const Default = Template.bind({});

export const CustomItems = Template.bind({});
CustomItems.args = {
  'custom-items': [
    { text: 'X', url: '/x' },
    { text: 'XY', url: '/x/xy' },
    { text: 'XYZ', url: '/x/xy/xyz' },
  ],
};

const NonExistentHeaderTemplate = args => {
  return (
    <div class="page-wrapper">
      <main class="container mt-huge-r">
        <swisspost-internet-breadcrumbs custom-items={JSON.stringify(args['custom-items'])} />
        <h1 class="mt-huge-r mb-big-r bold">CWF Internet Header</h1>
        <p class="my-big">
          The <code>&lt;swisspost-internet-breadcrumbs&gt;</code> component cannot be used on its
          own. Accordingly, the <code>&lt;swisspost-internet-breadcrumbs&gt;</code> component should
          not be rendered if there's no <code>&lt;swisspost-internet-header&gt;</code> component
          included on the page.
        </p>
        <p class="fake-content my-big"></p>
        <p class="fake-content my-big"></p>
        <p class="fake-content my-big"></p>
      </main>
    </div>
  );
};

export const NonExistentHeader = NonExistentHeaderTemplate.bind({});
