import { Meta, Args, Story } from '@storybook/react';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
import Header from '../header/post-internet-header.stories';
import docsPage from './internet-footer.docs.mdx';
import '../header/internet-header.styles.scss';

export default {
  title: 'Internet Header/Components/Footer',
  parameters: {
    docs: {
      page: docsPage,
    },
    layout: 'fullscreen',
    actions: {
      handles: ['headerLoaded', 'languageChanged'],
    },
    badges: [BADGE.STABLE],
  },
  argTypes: {
    'custom-config': {
      name: 'Custom Config',
      control: {
        type: 'object',
      },
      description: 'Allows for custom menu entries or custom links in the footer',
      table: {
        type: {
          summary: '{ [key: "de" | "fr" | "it" | "en"]: { ... }',
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
    <div className="page-wrapper">
      <swisspost-internet-header
        {...Header.args}
        custom-config={JSON.stringify(args['custom-config'])}
      />
      <main className="container mt-huge-r">
        <swisspost-internet-breadcrumbs />
        <h1 className="mt-huge-r mb-big-r bold">Swiss Post Design System Internet Header</h1>
        <p className="fake-content my-big"></p>
        <p className="fake-content my-big"></p>
        <p className="fake-content my-big"></p>
        <p className="fake-content my-big"></p>
      </main>
      <swisspost-internet-footer />
    </div>
  );
};

export const Default: Story = Template.bind({});

export const CustomConfig: Story = Template.bind({});
CustomConfig.args = {
  'custom-config': {
    de: {
      footer: {
        block: {
          title: 'Eigene Footer-Konfiguration',
          links: [
            { url: 'https://fireship.io', text: 'Fireship.io', target: '_blank' },
            { url: 'https://css-tricks.com', text: 'CSS-Tricks', target: '_blank' },
            { url: 'https://web.dev', text: 'web.dev', target: '_blank' },
            { url: 'https://developer.mozilla.org', text: 'MDN Web Docs', target: '_blank' },
            { url: 'https://getbootstrap.com', text: 'Bootstrap', target: '_blank' },
            { url: 'https://google.com', text: 'Google', target: '_blank' },
            { url: 'https://microsoft.com', text: 'Microsoft', target: '_blank' },
          ],
        },
      },
    },
  },
};

const NonExistentHeaderTemplate = () => {
  return (
    <div className="page-wrapper">
      <main className="container mt-huge-r">
        <h1 className="mt-huge-r mb-big-r bold">Swiss Post Design System Internet Header</h1>
        <p className="my-big">
          The <code>&lt;swisspost-internet-footer&gt;</code> component cannot be used on its own.
          Accordingly, the <code>&lt;swisspost-internet-footer&gt;</code> component should not be
          rendered if there's no <code>&lt;swisspost-internet-header&gt;</code> component included
          on the page.
        </p>
        <p className="fake-content my-big"></p>
        <p className="fake-content my-big"></p>
        <p className="fake-content my-big"></p>
      </main>
      <swisspost-internet-footer />
    </div>
  );
};

export const NonExistentHeader: Story = NonExistentHeaderTemplate.bind({});
