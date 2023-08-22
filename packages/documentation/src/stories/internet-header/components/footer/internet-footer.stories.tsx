import { Meta, StoryContext, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { BADGE } from '../../../../../.storybook/constants';

const meta: Meta = {
  title: 'Internet Header/Footer Component',
  component: 'swisspost-internet-footer',
  render: renderInternetFooter,
  decorators: [hiddenHeader],
  parameters: {
    layout: 'fullscreen',
    badges: [BADGE.STABLE],
  },
};

export default meta;

// DECORATORS
function hiddenHeader(story: any, { args }: StoryContext) {
  return html`
    <swisspost-internet-header custom-config=${JSON.stringify(args.customConfig)} project="test" hidden></swisspost-internet-header>
    ${story()}
  `;
}

// RENDERER
function renderInternetFooter() {
  return html`
    <swisspost-internet-footer></swisspost-internet-footer>
  `;
}

// STORIES
type Story = StoryObj;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code:
`<body>
  <swisspost-internet-header project="your-project-id"></swisspost-internet-header>

  <div class="container">
    <swisspost-internet-breadcrumbs></swisspost-internet-breadcrumbs>
  </div>

  <main class="container">
    <!-- Your content -->
  </main>

  <swisspost-internet-footer></swisspost-internet-footer>
</body>`
      },
    },
  },
};

export const CustomConfig: Story = {
  parameters: {
    docs: {
      source: {
        language: 'typescript',
        code:
`await customElements.whenDefined('swisspost-internet-header');
const header = document.querySelector('swisspost-internet-header');
header.customConfig = {
  de: {
    header: { /* ... */ },
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
};`
      },
    },
  },
  args: {
    customConfig: {
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
  },
};
