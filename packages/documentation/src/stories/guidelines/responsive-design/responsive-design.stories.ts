import { StoryObj } from '@storybook/web-components';
import { MetaExtended } from '@root/types';
import { html } from 'lit-html';

const meta: MetaExtended = {
  id: '51785576-8553-4909-8827-fd97de4f874e',
  title: 'Guidelines/Responsive Design',
  parameters: {
    badges: [],
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const FluidLayout: Story = {
  render: () => {
    return html`<div class="container">
      <div class="row">
        <div class="col-12 my-content py-12">
          This content has a percentage-width of 100%, which will take the full width of its
          container, no matter the screen size.
        </div>
      </div>
    </div>`;
  },
  decorators: [story => html`<div class="good-example">${story()}</div>`],
};

export const NotFluidLayout: Story = {
  render: () => {
    return html`
      <div class="p-12 my-content" style="width: 2000px">
        This content has a fixed width of 2000px, which might work on desktop but on smaller
        screens, an unnecessary scrollbar will appear.
      </div>
    `;
  },
  decorators: [story => html`<div class="bad-example">${story()}</div>`],
};

export const BreakpointsLayout: Story = {
  render: () => {
    return html` <div class="container">
      <div class="row">
        <div class="col-12 col-sm-6">
          <div class="my-content p-12 gap-12 d-flex flex-column flex-lg-row align-items-center">
            <div>
              <h3>I'm responsive</h3>
              <p>
                This card is responsive. On larger screens, the button is at the right of this
                content because there is enough space for it. On tablet, the button moves under the
                content to improve readability. On mobile, each card spans the whole width of the
                screen.
              </p>
            </div>
            <div>
              <button class="btn btn-secondary">Button</button>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6">
          <div class="my-content p-12 gap-12 d-flex flex-column flex-lg-row align-items-center">
            <div>
              <h3>I'm responsive</h3>
              <p>
                This card is responsive. On larger screens, the button is at the right of this
                content because there is enough space for it. On tablet, the button moves under the
                content to improve readability. On mobile, each card spans the whole width of the
                screen.
              </p>
            </div>
            <div>
              <button class="btn btn-secondary">Button</button>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  },
  decorators: [story => html`<div class="good-example">${story()}</div>`],
};

export const NoBreakpointsLayout: Story = {
  render: () => {
    return html`
      <div class="container">
        <div class="row">
          <div class="col-6">
            <div class="d-flex my-content align-items-center p-12 gap-12">
              <div>
                <h3>I'm not responsive</h3>
                <p>
                  This card is not responsive. The button is always at the right of this content,
                  not matter the screen size. On mobile or tablet, this text is harder to read.
                </p>
              </div>
              <div>
                <button class="btn btn-secondary">Button</button>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="d-flex my-content align-items-center p-12 gap-12">
              <div>
                <h3>I'm not responsive</h3>
                <p>
                  This card is not responsive. The button is always at the right of this content,
                  not matter the screen size. On mobile or tablet, this text is harder to read.
                </p>
              </div>
              <div>
                <button class="btn btn-secondary">Button</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  decorators: [story => html`<div class="bad-example">${story()}</div>`],
};
