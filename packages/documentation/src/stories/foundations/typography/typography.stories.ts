import { type Args, StoryObj } from '@storybook/web-components-vite';
import { MetaExtended } from '@root/types';
import { html, unsafeStatic } from 'lit/static-html.js';

const meta: MetaExtended = {
  id: '677cfabf-dbf0-4de2-ad07-6d5bfb9e2375',
  title: 'Foundations/Typography/Overview',
  tags: ['package:Styles'],
  parameters: {
    badges: [],
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const Link: Story = {
  render: () => html`
    <div>
      <a href="post.ch">Example Link</a>

      <p>
        This paragraph contains an inline
        <a href="post.ch">clickable</a>
        that demonstrates how hyperlinks will appear within body text.
      </p>
    </div>
  `,
};

export const Legend: Story = {
  render: () => html`
    <div>
      <fieldset>
        <legend>Default legend</legend>
      </fieldset>

      <fieldset>
        <legend class="large">Default legend</legend>
      </fieldset>
    </div>
  `,
};

export const Heading: Story = {
  render: () => html`
    <div>
      <h1>
        <span class="d-block">h1 Heading</span>
        <span class="fw-normal">h1 Subheading</span>
      </h1>

      <h2>
        <span class="d-block">h2 Heading</span>
        <span class="fw-normal">h2 Subheading</span>
      </h2>

      <h3>
        <span class="d-block">h3 Heading</span>
        <span class="fw-normal">h3 Subheading</span>
      </h3>

      <h4>
        <span class="d-block">h4 Heading</span>
        <span class="fw-normal">h4 Subheading</span>
      </h4>

      <h5>
        <span class="d-block">h5 Heading</span>
        <span class="fw-normal">h5 Subheading</span>
      </h5>

      <h6>
        <span class="d-block">h6 Heading</span>
        <span class="fw-normal">h6 Subheading</span>
      </h6>
    </div>
  `,
};
