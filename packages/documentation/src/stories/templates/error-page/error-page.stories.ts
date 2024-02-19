import { Args, Meta, StoryObj } from '@storybook/web-components';
import { BADGE } from '../../../../.storybook/constants';
import { html } from 'lit';

const meta: Meta = {
  id: 'a536a61d-cac2-4f39-adbf-092bdd445ce5',
  title: 'Patterns/Error page',
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
    layout: 'fullscreen',
  },
  render,
  decorators: [
    story => html`
      <swisspost-internet-header project="test"></swisspost-internet-header>
      <div class="container my-4">
        <swisspost-internet-breadcrumbs hide-buttons></swisspost-internet-breadcrumbs>
      </div>
      ${story()}
      <swisspost-internet-footer></swisspost-internet-footer>
    `,
  ],
};

function render(args: Args) {
  return html`
    <div class="bg-light error-container">
      <div class="container">
        <div class="row">
          <div class="col-rg-8 py-huge">
            <h2>
              This page could not be found.
              <br />
              <span class="fw-light">
                Possible reasons for this could be a misspelled or old URL.
              </span>
            </h2>
            <p class="fw-light mt-3">
              We kindly ask you to review this once again. It is also possible that we have moved,
              archived, or renamed the relevant page. Perhaps you can find the content you're
              looking for on our homepage. Or use the search on our portal to locate the desired
              page.
            </p>
            <div class="d-flex gap-3 mt-4">
              <a class="btn btn-primary" href="/">Home page</a>
              <a class="btn btn-secondary" href="https://www.post.ch/de/pages/suche#t=AllTab">
                Search
              </a>
            </div>
          </div>
          <div class="col-6 offset-3 offset-rg-0 col-rg-4 align-self-end">
            <img class="error-container--image" src="/images/content/404.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  `;
}

export default meta;

type Story = StoryObj;

export const Default: Story = {};
