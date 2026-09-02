import type { StoryObj } from '@storybook/web-components-vite';
import { MetaExtended } from '@root/types';
import { html } from 'lit';

// TEMPORARY DEMO — helps the team decide whether to keep
//   html { scrollbar-gutter: stable; }
// in packages/styles/src/elements/reset.scss (see issue #8046).
//
// That property permanently reserves space for the vertical scrollbar, which changes the
// layout of every page - even ones that never scroll. These stories render a few realistic
// page archetypes (short vs. tall content, with/without tabs, several components combined) so
// the visual impact can be compared side by side, across browsers, before a decision is made.
//
// Safe to delete this file once the team has decided.

const meta: MetaExtended = {
  id: 'f3a1e6c2-8b7d-4a4c-9e21-8046d3c9a001',
  title: 'Foundations/Layout/Containers/Scrollbar-gutter demo',
  tags: ['package:Styles'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj;

function renderHeader(title: string) {
  return html`
    <post-header text-menu="Menu">
      <post-logo slot="post-logo" url="/">Homepage</post-logo>
      <p slot="title">${title}</p>
    </post-header>
  `;
}

function renderFooter() {
  return html`
    <post-footer text-footer="Footer">
      <div slot="prefooter">
        <h3 id="prefooter">Service name</h3>
        <ul aria-labelledby="prefooter">
          <li><a href="#" class="btn btn-link">Pre-Footer Link 1</a></li>
          <li><a href="#" class="btn btn-link">Pre-Footer Link 2</a></li>
          <li><a href="#" class="btn btn-link">Pre-Footer Link 3</a></li>
        </ul>
      </div>

      <span id="grid-1-title" slot="grid-1-title">Title 1</span>
      <ul slot="grid-1" aria-labelledby="grid-1-title">
        <li><a href="#">Text link 1</a></li>
        <li><a href="#">Text link 2</a></li>
        <li><a href="#">Text link 3</a></li>
      </ul>

      <span id="grid-2-title" slot="grid-2-title">Title 2</span>
      <ul slot="grid-2" aria-labelledby="grid-2-title">
        <li><a href="#">Text link 1</a></li>
        <li><a href="#">Text link 2</a></li>
        <li><a href="#">Text link 3</a></li>
      </ul>

      <div slot="socialmedia">
        <h3 id="socialmedia">Follow us</h3>
        <ul aria-labelledby="socialmedia">
          <li>
            <a href="https://www.facebook.com/swisspost" class="btn btn-primary btn-icon">
              <post-icon aria-hidden="true" name="facebook"></post-icon>
              <span class="visually-hidden">Facebook</span>
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/company/swiss-post" class="btn btn-primary btn-icon">
              <post-icon aria-hidden="true" name="linkedin"></post-icon>
              <span class="visually-hidden">Linkedin</span>
            </a>
          </li>
        </ul>
      </div>

      <span slot="copyright">© Copyright 2026 by Swiss Post Ltd. All rights reserved.</span>

      <div slot="meta">
        <ul aria-label="Meta">
          <li><a href="#">Accessibility</a></li>
          <li><a href="#">General Terms and Conditions</a></li>
          <li><a href="#">Data protection and disclaimer</a></li>
        </ul>
      </div>
    </post-footer>
  `;
}

// Placeholder content blocks, styled via the `.fake-content` utility class
// (see apps/documentation/.storybook/styles/preview.scss) - same pattern used by
// e.g. src/stories/raw-components/megadropdown/megadropdown.stories.ts.
function renderFakeContent(count: number) {
  return html`${Array.from(
    { length: count },
    () => html`<p aria-hidden="true" class="fake-content"></p>`,
  )}`;
}

function renderPageTabs(nameSuffix: string) {
  return html`
    <post-tabs label="Page navigation">
      <post-tab-item name="first${nameSuffix}"
        ><a href="/first" aria-current="page">First page</a></post-tab-item
      >
      <post-tab-item name="second${nameSuffix}"><a href="/second">Second page</a></post-tab-item>
      <post-tab-item name="third${nameSuffix}"><a href="/third">Third page</a></post-tab-item>
    </post-tabs>
  `;
}

// 1. Plain page: header + footer + fake content only, short version (fits in the viewport,
// no vertical scrollbar needed).
export const HeaderFooterShortContent: Story = {
  render: () => html`
    ${renderHeader('Header, footer and fake content (short, no scrollbar)')}
    <main class="container my-24">${renderFakeContent(0)}</main>
    ${renderFooter()}
  `,
};

// 2. Same as above, but with enough content to force a real vertical scrollbar.
export const HeaderFooterTallContent: Story = {
  render: () => html`
    ${renderHeader('Header, footer and fake content (tall, with scrollbar)')}
    <main class="container my-24">${renderFakeContent(10)}</main>
    ${renderFooter()}
  `,
};

// 2b. Same short page as story 1, but forcing `scrollbar-gutter: stable both-edges` instead of
// the default `stable`, so the gutter is reserved on both the left and right edges. Useful to
// compare the symmetric layout impact against the single-edge default.
export const HeaderFooterShortContentBothEdges: Story = {
  render: () => html`
    <style>
      html {
        scrollbar-gutter: stable both-edges;
      }
    </style>
    ${renderHeader('Header, footer and fake content (short, both edges)')}
    <main class="container my-24">${renderFakeContent(0)}</main>
    ${renderFooter()}
  `,
};

// 3. Isolated tabs example: page tabs directly in `.container` and `.container-fluid`, nothing
// else around them (no header, footer or side navigation). Wrapped in `.min-vh-half` so the
// content is explicitly much shorter than the viewport - proving that any scrollbar/gutter you
// still see here comes from `scrollbar-gutter: stable` itself, not from real overflow.
export const TabsInContainers: Story = {
  render: () => html`
    <div class="min-vh-half">
      <div class="container my-24">${renderPageTabs('-container')}</div>
      <div class="container-fluid my-24">${renderPageTabs('-fluid')}</div>
    </div>
  `,
};

// 4. A busier, more realistic page mixing several components, to check the general layout
// impact of the scrollbar-gutter beyond tabs alone.
export const MixedComponents: Story = {
  render: () => html`
    ${renderHeader('Mixed components page')}
    <main class="container my-24">
      <post-breadcrumbs home-url="/" text-home="Home" text-breadcrumbs="Breadcrumbs">
        <post-breadcrumb-item url="/section1">Section 1</post-breadcrumb-item>
        <post-breadcrumb-item url="/section2">Section 2</post-breadcrumb-item>
      </post-breadcrumbs>

      <post-banner>This banner shows a message to the user.</post-banner>

      ${renderPageTabs('-mixed')}

      <div class="row my-24">
        <div class="col-12 col-md-4">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title">Card title</h3>
              <p>Some card content to fill the space.</p>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title">Card title</h3>
              <p>Some card content to fill the space.</p>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title">Card title</h3>
              <p>Some card content to fill the space.</p>
            </div>
          </div>
        </div>
      </div>

      <post-progressbar value="60" min="0" max="100" aria-label="Progress"></post-progressbar>

      <post-accordion class="my-24">
        <post-accordion-item>
          <span slot="header">Section 1</span>
          <p>Accordion content 1.</p>
        </post-accordion-item>
        <post-accordion-item collapsed>
          <span slot="header">Section 2</span>
          <p>Accordion content 2.</p>
        </post-accordion-item>
      </post-accordion>

      ${renderFakeContent(0)}
    </main>
    ${renderFooter()}
  `,
};

// 4b. Same page as story 4, but forcing `scrollbar-gutter: stable both-edges` instead of the
// default `stable`, so the gutter is reserved on both the left and right edges.
export const MixedComponentsBothEdges: Story = {
  render: () => html`
    <style>
      html {
        scrollbar-gutter: stable both-edges;
      }
    </style>
    ${renderHeader('Mixed components page (both edges)')}
    <main class="container my-24">
      <post-breadcrumbs home-url="/" text-home="Home" text-breadcrumbs="Breadcrumbs">
        <post-breadcrumb-item url="/section1">Section 1</post-breadcrumb-item>
        <post-breadcrumb-item url="/section2">Section 2</post-breadcrumb-item>
      </post-breadcrumbs>

      <post-banner>This banner shows a message to the user.</post-banner>

      ${renderPageTabs('-mixed-both-edges')}

      <div class="row my-24">
        <div class="col-12 col-md-4">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title">Card title</h3>
              <p>Some card content to fill the space.</p>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title">Card title</h3>
              <p>Some card content to fill the space.</p>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title">Card title</h3>
              <p>Some card content to fill the space.</p>
            </div>
          </div>
        </div>
      </div>

      <post-progressbar value="60" min="0" max="100" aria-label="Progress"></post-progressbar>

      <post-accordion class="my-24">
        <post-accordion-item>
          <span slot="header">Section 1</span>
          <p>Accordion content 1.</p>
        </post-accordion-item>
        <post-accordion-item collapsed>
          <span slot="header">Section 2</span>
          <p>Accordion content 2.</p>
        </post-accordion-item>
      </post-accordion>

      ${renderFakeContent(0)}
    </main>
    ${renderFooter()}
  `,
};

// 5. Same as above, but without the footer or the accordion - useful to check the impact of the
// scrollbar-gutter on a shorter/simpler variant of the same page.
export const MixedComponentsNoFooterNoAccordion: Story = {
  render: () => html`
    ${renderHeader('Mixed components page (no footer, no accordion)')}
    <main class="container my-24">
      <post-breadcrumbs home-url="/" text-home="Home" text-breadcrumbs="Breadcrumbs">
        <post-breadcrumb-item url="/section1">Section 1</post-breadcrumb-item>
        <post-breadcrumb-item url="/section2">Section 2</post-breadcrumb-item>
      </post-breadcrumbs>

      <post-banner>This banner shows a message to the user.</post-banner>

      ${renderPageTabs('-mixed-no-footer')}

      <div class="row my-24">
        <div class="col-12 col-md-4">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title">Card title</h3>
              <p>Some card content to fill the space.</p>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title">Card title</h3>
              <p>Some card content to fill the space.</p>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title">Card title</h3>
              <p>Some card content to fill the space.</p>
            </div>
          </div>
        </div>
      </div>

      <post-progressbar value="60" min="0" max="100" aria-label="Progress"></post-progressbar>

      ${renderFakeContent(6)}
    </main>
  `,
};