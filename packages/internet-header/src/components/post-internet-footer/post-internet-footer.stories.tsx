import { h } from '@stencil/core';
import { Default as Header } from '../../../../documentation/src/stories/internet-header/header/post-internet-header.stories';

export default {
  title: 'Footer',
  argTypes: {
    'custom-config': {
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
  parameters: {
    actions: {
      handles: ['headerLoaded', 'languageChanged'],
    },
  },
};

const Template = args => {
  return (
    <div class="page-wrapper">
      <swisspost-internet-header
        {...Header.args}
        custom-config={JSON.stringify(args['custom-config'])}
      />
      <main class="container mt-huge-r">
        <swisspost-internet-breadcrumbs />
        <h1 class="mt-huge-r mb-big-r bold">CWF Internet Header</h1>
        <p class="fake-content my-big"></p>
        <p class="fake-content my-big"></p>
        <p class="fake-content my-big"></p>
        <p class="fake-content my-big"></p>
      </main>
      <swisspost-internet-footer />
    </div>
  );
};

export const Default = Template.bind({});

export const CustomConfig = Template.bind({});
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
    <div class="page-wrapper">
      <main class="container mt-huge-r">
        <h1 class="mt-huge-r mb-big-r bold">CWF Internet Header</h1>
        <p class="my-big">
          The <code>&lt;swisspost-internet-footer&gt;</code> component cannot be used on its own.
          Accordingly, the <code>&lt;swisspost-internet-footer&gt;</code> component should not be
          rendered if there's no <code>&lt;swisspost-internet-header&gt;</code> component included
          on the page.
        </p>
        <p class="fake-content my-big"></p>
        <p class="fake-content my-big"></p>
        <p class="fake-content my-big"></p>
      </main>
      <swisspost-internet-footer />
    </div>
  );
};

export const NonExistentHeader = NonExistentHeaderTemplate.bind({});
