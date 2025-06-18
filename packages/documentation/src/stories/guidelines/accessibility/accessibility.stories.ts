import { StoryObj } from '@storybook/web-components-vite';
import { MetaExtended } from '@root/types';
import { html } from 'lit/static-html.js';

const meta: MetaExtended = {
  id: '759a427c-7884-474e-b6b7-de32d3acf5df',
  title: 'Guidelines/Accessibility',
  parameters: {
    badges: [],
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () =>
    html`<div class="p-12 my-12" style="color: #050400; background-color: #f0efed;">
        <p>This text has enough contrast with its background.</p>
      </div>
      <div class="p-12 my-12" style="color: #9b9a96; background-color: #f0efed;">
        <p>
          This text does not have enough contrast with its background and is not easily readable.
        </p>
      </div>`,
};

export const Focus: Story = {
  decorators: [
    story => html`<div class="d-flex flex-column gap-12 align-items-start">${story()}</div>`,
  ],
  render: () =>
    html`
      <a href="#">This link is accessible using keyboard navigation and has a focus ring.</a>
      <button class="btn btn-primary">
        This button is accessible using keyboard navigation and has a focus ring.
      </button>
      <button class="btn btn-secondary" tabindex="-1">
        This button is not accessible using keyboard navigation.
      </button>
    `,
};

export const FormHint: Story = {
  render: () => html`<div class="form-floating mb-24">
      <input
        id="myinput"
        class="form-control"
        type="text"
        placeholder="Placeholder"
        aria-describedby="form-hint-myinput"
      />
      <label class="form-label" for="myinput">Label</label>
      <p class="form-hint" id="form-hint-myinput">
        This hint gives additional information on how to fill in the form input.
      </p>
    </div>
    <div class="form-floating">
      <input
        id="myinvalidinput"
        class="form-control is-invalid"
        type="text"
        placeholder="Placeholder"
        aria-invalid="true"
        aria-describedby="form-validation-myinvalidinput"
      />
      <label class="form-label" for="myinvalidinput">Label</label>
      <p class="invalid-feedback" id="form-validation-myinvalidinput">
        This message informs that the input field is not valid.
      </p>
    </div> `,
};

export const AltText: Story = {
  render: () =>
    html` <img src="/assets/images/logo-swisspost.svg" alt="Swiss Post Logo" class="w-48" /> `,
};
