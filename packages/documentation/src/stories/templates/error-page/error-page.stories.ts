import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  id: 'a536a61d-cac2-4f39-adbf-092bdd445ce5',
  title: 'Templates/Error page',
  parameters: {
    layout: 'fullscreen',
  },
  render,
};

function render() {
  return html`
    <div class="palette-alternate error-container">
      <div class="container">
        <div class="row">
          <div class="col-sm-8 py-56">
            <h2>
              This page could not be found.
              <br />
              <span class="fw-light">A reasons for this could be a misspelled URL.</span>
            </h2>
            <p class="mt-16">
              We kindly ask you to review this once again. It is also possible that we have moved,
              archived, or renamed the relevant page. Perhaps you can find the content you're
              looking for on our homepage. Or use the search on our portal to locate the desired
              page.
            </p>
            <div class="d-flex gap-16 mt-24">
              <a class="btn btn-primary" href="/" @click="${(e: Event) => e.preventDefault()}"
                >Home page</a
              >
              <a
                class="btn btn-secondary"
                href="https://www.post.ch/de/pages/suche#t=AllTab"
                @click="${(e: Event) => e.preventDefault()}"
              >
                Search
              </a>
            </div>
          </div>
          <div class="col-6 offset-3 offset-sm-0 col-sm-4 align-self-end">
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
