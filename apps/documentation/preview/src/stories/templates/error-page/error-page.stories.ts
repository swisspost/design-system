import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

type ErrorContent = {
  label: string;
  subtitle: string;
  description: string;
  secondaryButtonLabel?: string;
  secondaryButtonHref?: string;
};

const contentByType = {
  '400': {
    label: 'Bad Request',
    subtitle: 'Something went wrong.',
    description:
      'The page you requested could not be loaded.\n' +
      '\n' +
      'Please check the URL again. We may also have moved, archived or renamed the page in question. You may be able to find the content you are looking for via our homepage. Or use the search function on our portal to find the page you want.',
  },
  '401': {
    label: 'Unauthorized',
    subtitle: 'No authorization.',
    description:
      'Access to the page accessed has been denied. This can happen if your browser is not authenticated or if the required login information is missing.\n' +
      '\n' +
      'Please contact your IT administrator.',
  },
  '403': {
    label: 'Forbidden',
    subtitle: 'No access.',
    description:
      'Server understood the request but rejected it. Access to the requested resource is not permitted.\n' +
      '\n' +
      'This may be due to incorrect URLs, a lack of login permissions, outdated browser data such as caches and cookies, or security settings.',
  },
  '404': {
    label: 'Not Found',
    subtitle: 'This page could not be found.',
    description:
      'Reasons for this could be that you have called up an incorrect or outdated URL.\n' +
      '\n' +
      'We kindly ask you to check this again. We may also have moved, archived or renamed the page in question. You may be able to find the content you are looking for via our homepage. Or use the search function on our portal to find the page you want.',
  },
  '451': {
    label: 'Unavailable For Legal Reasons',
    subtitle: 'The page is unavailable for legal reasons.',
    description:
      'The site is blocked due to laws, court orders or other legal orders.\n' +
      '\n' +
      'The error can also be caused by technical problems on the server, e.g. if the server is overloaded or there are errors in the configuration. ',
  },
  '500': {
    label: 'Error on Server side',
    subtitle: 'Unexpected problem.',
    description:
      'This can be due to various server-side problems and usually requires the website operator or server administrator to rectify the problem.\n' +
      '\n' +
      'Try to reload the page, clear the browser cache or try to load the page again later. If the error persists, please inform the website operator.',
    secondaryButtonLabel: 'Contact the website operator',
    secondaryButtonHref: 'https://www.post.ch/en/help-and-contact',
  },
  '503': {
    label: 'Service unavailable',
    subtitle: 'The page you requested could not be loaded.',
    description:
      'The server appears to be temporarily unable to process requests. This can be caused by various factors, such as overloading, maintenance work or problems with server configuration.\n' +
      '\n' +
      'You can try to access the page again later or clear your browser’s cache.',
  },
  '504': {
    label: 'Gateway time-out',
    subtitle: 'The page took too long to load.',
    description:
      'The server had to wait too long for a response from another server. The error is often only temporary.\n' +
      '\n' +
      'You can try to access the page again later or clear your browser’s cache.',
  },
} satisfies Record<string, ErrorContent>;

type ErrorType = keyof typeof contentByType;

const errorTypeOptions = Object.keys(contentByType) as ErrorType[];
const errorTypeLabels = Object.fromEntries(
  errorTypeOptions.map(type => [type, `${type}: ${contentByType[type].label}`]),
) as Record<ErrorType, string>;

const meta: Meta = {
  id: 'a536a61d-cac2-4f39-adbf-092bdd445ce5',
  title: 'Templates/Error page',
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    type: '404',
  },
  argTypes: {
    type: {
      name: 'Type',
      description:
        'HTTP error type displayed on the page (determines the message, image, and available actions).',
      control: {
        type: 'radio',
        labels: errorTypeLabels,
      },
      options: errorTypeOptions,
      table: {
        category: 'General',
      },
    },
  },
  render: ({ type }) => renderErrorPages(type),
};

function renderErrorPages(type: ErrorType) {
  const { subtitle, description, secondaryButtonLabel, secondaryButtonHref } = contentByType[type];
  const descriptionWithLineBreaks = description
    .split('\n')
    .map((line, index, lines) => (index < lines.length - 1 ? html`${line}<br />` : line));

  return html`
    <div class="palette palette-alternate error error-${type}">
      <div class="container">
        <div class="error-content">
          <h2 class="error-title">Error ${type}</h2>
          <h3 class="error-subtitle">${subtitle}</h3>

          <p>${descriptionWithLineBreaks}</p>

          <div class="error-buttons">
            ${secondaryButtonLabel
              ? html`
                  <a
                    class="btn btn-secondary"
                    href="${secondaryButtonHref}"
                    @click="${(e: Event) => e.preventDefault()}"
                  >
                    ${secondaryButtonLabel}
                  </a>
                `
              : html`
                  <a class="btn btn-primary" href="/" @click="${(e: Event) => e.preventDefault()}">
                    <post-icon name="arrowleft" aria-hidden="true"></post-icon>
                    Go to homepage
                  </a>
                  <a
                    class="btn btn-secondary"
                    href="https://www.post.ch/en/pages/suche#t=AllTab"
                    @click="${(e: Event) => e.preventDefault()}"
                  >
                    Go to search
                  </a>
                `}
          </div>
        </div>
      </div>
    </div>
  `;
}

export default meta;

type Story = StoryObj;

export const Default: Story = {};
