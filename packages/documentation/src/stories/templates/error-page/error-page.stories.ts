import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

type ErrorType = '400' | '401' | '403' | '404' | '451' | '500' | '503' | '504';
const contentByType: Record<
  ErrorType,
  {
    subtitle: string;
    description: string;
    imageUrl: string;
    secondaryButtonLabel?: string;
    sectionClass?: string;
    imageClass?: string;
  }
> = {
  '400': {
    subtitle: 'Something went wrong.',
    description:
      'The page you requested could not be loaded.\n' +
      '\n' +
      'Please check the URL again. We may also have moved, archived or renamed the page in question. You may be able to find the content you are looking for via our homepage. Or use the search function on our portal to find the page you want.',
    imageUrl: '/images/content/400.svg',
    imageClass: 'error-400',
  },
  '401': {
    subtitle: 'No permission..',
    description:
      'Access to the page accessed has been denied. This can happen if your browser is not authenticated or if the required login information is missing.\n' +
      '\n' +
      'Please contact your IT administrator.',
    imageUrl: '/images/content/401.svg',
    imageClass: 'error-401',
    sectionClass: 'align-section-end',
  },
  '403': {
    subtitle: 'No entry.',
    description:
      'Server understood the request but rejected it. Access to the requested resource is not permitted.\n' +
      '\n' +
      'This may be due to incorrect URLs, a lack of login permissions, outdated browser data such as caches and cookies, or security settings.',
    imageUrl: '/images/content/403.svg',
  },
  '404': {
    subtitle: 'This page could not be found.',
    description:
      'Reasons for this could be that you have called up an incorrect or outdated URL.\n' +
      '\n' +
      'We kindly ask you to check this again. We may also have moved, archived or renamed the page in question. You may be able to find the content you are looking for via our homepage. Or use the search function on our portal to find the page you want.',
    imageUrl: '/images/content/404.svg',
  },
  '451': {
    subtitle: 'The page is unavailable for legal reasons.',
    description:
      'The site is blocked due to laws, court orders or other legal orders.\n' +
      '\n' +
      'The error can also be caused by technical problems on the server, e.g. if the server is overloaded or there are errors in the configuration. ',
    imageUrl: '/images/content/451.svg',
  },
  '500': {
    subtitle: 'Unexpected problem.',
    description:
      'This can be due to various server-side problems and usually requires the website operator or server administrator to rectify the problem.\n' +
      '\n' +
      'Try to reload the page, clear the browser cache or try to load the page again later. If the error persists, please inform the website operator.',
    imageUrl: '/images/content/500.svg',
    secondaryButtonLabel: 'Contact the website operator',
  },
  '503': {
    subtitle: 'The page you requested could not be loaded.',
    description:
      'The server appears to be temporarily unable to process requests. This can be caused by various factors, such as overloading, maintenance work or problems with server configuration.\n' +
      '\n' +
      'You can try to access the page again later or clear your browser’s cache.',
    imageUrl: '/images/content/503.svg',
  },
  '504': {
    subtitle: 'The page took too long to load.',
    description:
      'The server had to wait too long for a response from another server. The error is often only temporary.\n' +
      '\n' +
      'You can try to access the page again later or clear your browser’s cache.',
    imageUrl: '/images/content/504.svg',
  },
};

const meta: Meta = {
  id: 'a536a61d-cac2-4f39-adbf-092bdd445ce5',
  title: 'Templates/Error page',
  tags: ['status:InProgress'],
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
        labels: {
          '400': 'Bad Request',
          '401': 'Unauthorized',
          '403': 'Forbidden',
          '404': 'Not Found',
          '451': 'Unavailable For Legal Reasons',
          '500': 'Error on Server side',
          '503': 'Service unavailable',
          '504': 'Gateway time-out',
        },
      },
      options: ['400', '401', '403', '404', '451', '500', '503', '504'],
      table: {
        category: 'General',
      },
    },
  },
  render: ({ type }) => render(type),
};

function render(type: ErrorType) {
  const { subtitle, description, imageUrl, secondaryButtonLabel, sectionClass, imageClass } =
    contentByType[type];

  return html`
    <div class="palette palette-alternate error-container overflow-hidden">
      <div class="section">
        <div class="container">
          <div class="row align-items-center">
            <div class="col">
              <h2 class="palette-text mt-big-r">
                Error ${type}
                <br />
                <span class="fw-normal">${subtitle}</span>
              </h2>

              <p class="mt-16">${description}</p>

              <div class="button-section mt-big-r">
                ${secondaryButtonLabel
                  ? html`
                      <a
                        class="btn btn-secondary"
                        href="https://www.post.ch/de/pages/suche#t=AllTab"
                        @click="${(e: Event) => e.preventDefault()}"
                      >
                        ${secondaryButtonLabel}
                      </a>
                    `
                  : html`
                      <a
                        class="btn btn-primary"
                        href="/"
                        @click="${(e: Event) => e.preventDefault()}"
                      >
                        <post-icon name="arrowleft" aria-hidden="true"></post-icon>
                        Home page
                      </a>
                      <a
                        class="btn btn-secondary"
                        href="https://www.post.ch/de/pages/suche#t=AllTab"
                        @click="${(e: Event) => e.preventDefault()}"
                      >
                        Search
                      </a>
                    `}
              </div>
            </div>
            <div class="col error-container--image ${imageClass ?? ''}">
              <img src="${imageUrl}" alt="" class="${sectionClass ?? ''}" />
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export default meta;

type Story = StoryObj;

export const Default: Story = {};
