import { StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { MetaExtended } from '@root/types';
import * as FormFooterMeta from '../../components/form-footer/form-footer.stories';

const meta: MetaExtended = {
  id: 'd83829b2-7de2-48d2-be64-07a80c9caef3',
  title: 'Guidelines/Form Creation',
  parameters: {
    badges: [],
  },
};

export default meta;

type Story = StoryObj;

export const BasicInput: Story = {
  render: () => html`
    <label class="form-label" for="firstname">Firstname</label>
    <input type="text" id="firstname" class="form-control" />
  `,
};

export const RowSimple: Story = {
  render: () => html`
    <div class="row row-cols-1 row-cols-md-2">
      <div class="col">
        <label class="form-label" for="firstname">Firstname</label>
        <input type="text" id="firstname" class="form-control" />
      </div>
      <div class="col">
        <label class="form-label" for="lastname">Lastname</label>
        <input type="text" id="lastname" class="form-control" />
      </div>
    </div>
  `,
};

export const ColSimple: Story = {
  render: () => html`
    <div class="row">
      <div class="col-8">
        <label class="form-label" for="city">City</label>
        <input type="text" id="city" class="form-control" />
      </div>
      <div class="col-4">
        <label class="form-label" for="state">State</label>
        <input type="text" id="state" class="form-control" />
      </div>
    </div>
  `,
};

export const CustomWidth: Story = {
  render: () => html`
    <div class="row">
      <div class="col-auto">
        <label class="form-label" for="zip">Zip</label>
        <input type="number" id="zip" class="form-control" style="max-width: 11ch" />
      </div>
      <div class="col">
        <label class="form-label" for="city">City</label>
        <input type="text" id="city" class="form-control" />
      </div>
    </div>
  `,
};

export const VerticalSpacing: Story = {
  render: () => html`
    <div class="mb-16">
      <label for="firstname">Firstname</label>
      <input type="text" id="firstname" class="form-control" />
    </div>
    <div class="mb-16">
      <label for="lastname">Lastname</label>
      <input type="text" id="lastname" class="form-control" />
    </div>
  `,
};

export const Buttons: Story = {
  render: () => html`
    <div class="mb-16">
      <label for="firstname">Firstname</label>
      <input type="text" id="firstname" class="form-control" />
    </div>
    <div class="d-flex flex-row-reverse gap-8">
      <button class="btn btn-primary">Send</button>
      <button class="btn btn-secondary">Cancel</button>
    </div>
  `,
};

export const FloatingLabels: Story = {
  render: () => html`
    <div class="row">
      <div class="col">
        <div class="form-floating">
          <input type="text" id="firstname" class="form-control" placeholder=" " />
          <label class="form-label" for="firstname">Firstname</label>
        </div>
      </div>
      <div class="col">
        <div class="form-floating">
          <input type="text" id="lastname" class="form-control" placeholder=" " />
          <label class="form-label" for="lastname">Lastname</label>
        </div>
      </div>
    </div>
  `,
};

export const Validation: Story = {
  render: () => html`
    <form action="/">
      <!-- Form Control -->
      <div class="row mb-16">
        <div class="col-md-6">
          <div class="form-floating">
            <input
              id="form-control-invalid"
              type="text"
              class="form-control is-invalid"
              placeholder=" "
              aria-invalid="true"
              aria-describedby="input-invalid-feedback"
              required
            />
            <label class="form-label" for="form-control-invalid">Invalid Input</label>
            <p id="input-invalid-feedback" class="invalid-feedback">Error message</p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-floating">
            <input
              id="form-control-valid"
              type="text"
              class="form-control is-valid"
              placeholder=" "
              aria-describedby="input-valid-feedback"
              value="Value"
            />
            <label class="form-label" for="form-control-valid">Valid Input</label>
            <p id="input-valid-feedback" class="valid-feedback">Success message (optional)</p>
          </div>
        </div>
      </div>

      <!-- Form Select -->
      <div class="row mb-16">
        <div class="col-md-6">
          <div class="form-floating">
            <select
              id="form-select-invalid"
              class="form-select is-invalid"
              aria-invalid="true"
              aria-describedby="select-invalid-feedback"
              required
            >
              <option></option>
              <option value="1">Value 1</option>
              <option value="2">Value 2</option>
            </select>
            <label class="form-label" for="form-select-invalid">Invalid Select</label>
            <p id="select-invalid-feedback" class="invalid-feedback">Error message</p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-floating">
            <select
              id="form-select-valid"
              class="form-select is-valid"
              aria-describedby="select-valid-feedback"
            >
              <option></option>
              <option value="1">Value 1</option>
              <option value="2">Value 2</option>
            </select>
            <label class="form-label" for="form-select-valid">Valid Select</label>
            <p id="select-valid-feedback" class="valid-feedback">Success message (optional)</p>
          </div>
        </div>
      </div>

      <!-- Form File -->
      <div class="row mb-16">
        <div class="col-md-6">
          <div class="form-floating">
            <input
              id="form-file-invalid"
              type="file"
              class="form-control is-invalid"
              aria-invalid="true"
              aria-describedby="file-input-invalid-feedback"
              required
            />
            <label class="form-label" for="form-file-invalid">Invalid File</label>
            <p id="file-input-invalid-feedback" class="invalid-feedback">Error message</p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-floating">
            <input
              id="form-file-valid"
              type="file"
              class="form-control is-valid"
              aria-describedby="file-input-valid-feedback"
            />
            <label class="form-label" for="form-file-valid">Valid File</label>
            <p id="file-input-valid-feedback" class="valid-feedback">Success message (optional)</p>
          </div>
        </div>
      </div>

      <!-- Form Textarea -->
      <div class="row mb-16">
        <div class="col-md-6">
          <div class="form-floating">
            <textarea
              id="form-textarea-invalid"
              class="form-control is-invalid"
              placeholder=" "
              aria-invalid="true"
              aria-describedby="textarea-invalid-feedback"
              required
            ></textarea>
            <label class="form-label" for="form-textarea-invalid">Invalid Textarea</label>
            <p id="textarea-invalid-feedback" class="invalid-feedback">Error message</p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-floating">
            <textarea
              id="form-textarea-valid"
              class="form-control is-valid"
              placeholder=" "
              aria-describedby="textarea-valid-feedback"
            >
              Value
            </textarea
            >
            <label class="form-label" for="form-textarea-valid">Valid Textarea</label>
            <p id="textarea-valid-feedback" class="valid-feedback">Success message (optional)</p>
          </div>
        </div>
      </div>

      <!-- Form Checkbox -->
      <div class="row mb-16">
        <div class="col-md-6">
          <div class="form-check">
            <input
              class="form-check-input is-invalid"
              id="form-checkbox-invalid"
              type="checkbox"
              aria-invalid="true"
              aria-describedby="checkbox-invalid-feedback"
            />
            <label class="form-check-label" for="form-checkbox-invalid">Invalid Checkbox</label>
            <p id="checkbox-invalid-feedback" class="invalid-feedback">Error message</p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-check">
            <input
              class="form-check-input is-valid"
              id="form-checkbox-valid"
              type="checkbox"
              aria-describedby="checkbox-valid-feedback"
              checked
            />
            <label class="form-check-label" for="form-checkbox-valid">Valid Checkbox</label>
            <p id="checkbox-valid-feedback" class="valid-feedback">Success message (optional)</p>
          </div>
        </div>
      </div>

      <!-- Form Radio -->
      <div class="row mb-16">
        <div class="col-md-6">
          <div class="form-check">
            <input
              class="form-check-input is-invalid"
              id="form-radio-invalid"
              type="radio"
              required
              aria-describedby="radio-invalid-feedback"
            />
            <label class="form-check-label" for="form-radio-invalid">Invalid Radio</label>
            <p id="radio-invalid-feedback" class="invalid-feedback">Error message</p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-check">
            <input
              class="form-check-input is-valid"
              id="form-radio-valid"
              type="radio"
              checked
              aria-describedby="radio-valid-feedback"
            />
            <label class="form-check-label" for="form-radio-valid">Valid Radio</label>
            <p id="radio-valid-feedback" class="valid-feedback">Success message (optional)</p>
          </div>
        </div>
      </div>

      <!-- Form Switch -->
      <div class="row mb-16">
        <div class="col-md-6">
          <div class="form-check form-switch">
            <input
              id="form-switch-invalid"
              class="form-check-input is-invalid"
              type="checkbox"
              role="switch"
              aria-invalid="true"
              aria-describedby="switch-invalid-feedback"
            />
            <label class="form-check-label" for="form-switch-invalid">Invalid Switch</label>
            <p id="switch-invalid-feedback" class="invalid-feedback">Error message</p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-check form-switch">
            <input
              id="form-switch-valid"
              class="form-check-input is-valid"
              type="checkbox"
              role="switch"
              aria-describedby="switch-valid-feedback"
              checked
            />
            <label class="form-check-label" for="form-switch-valid">Valid Switch</label>
            <p id="switch-valid-feedback" class="valid-feedback">Success message (optional)</p>
          </div>
        </div>
      </div>
    </form>
  `,
};

export const RequiredOptional: Story = {
  decorators: [story => html`<div style="margin-inline: auto; max-width: 600px;">${story()}</div>`],
  render: () => html`
    <form action="/">
      <div class="mb-16">
        <div class="form-floating">
          <select id="select-el" class="form-select">
            <option>Choose an option...</option>
            <option value="value_1">Mr.</option>
            <option value="value_2">Mrs.</option>
            <option value="value_3">Ms.</option>
          </select>
          <label class="form-label" for="select-el"
            >Salutation <span aria-hidden="true">(optional)</span></label
          >
        </div>
      </div>
      <div class="mb-16">
        <div class="form-floating">
          <input
            id="input-first-name"
            class="form-control"
            type="text"
            placeholder="Placeholder"
            required
          />
          <label class="form-label" for="input-first-name"
            >First name <span aria-hidden="true">(required)</span></label
          >
        </div>
      </div>
      <div class="mb-16">
        <div class="form-floating">
          <input
            id="input-last-name"
            class="form-control"
            type="text"
            placeholder="Placeholder"
            required
          />
          <label class="form-label" for="input-last-name"
            >Last name <span aria-hidden="true">(required)</span></label
          >
        </div>
      </div>
      <div class="mb-16">
        <div class="form-floating">
          <textarea id="textarea-subject" class="form-control" rows="4" required></textarea>
          <label class="form-label" for="textarea-subject"
            >Subject <span aria-hidden="true">(required)</span></label
          >
        </div>
      </div>
      <div class="mb-16">
        <fieldset>
          <legend>Are you an existing customer? <span aria-hidden="true">(optional)</span></legend>
          <div class="form-check">
            <input
              name="customer-group"
              class="form-check-input"
              type="radio"
              id="customer-radio-1"
            />
            <label class="form-check-label" for="customer-radio-1">Yes</label>
          </div>
          <div class="form-check ">
            <input
              name="customer-group"
              class="form-check-input"
              type="radio"
              id="customer-radio-2"
            />
            <label class="form-check-label" for="customer-radio-2">No</label>
          </div>
        </fieldset>
      </div>
      <div class="mb-16">
        <div class="form-check form-switch">
          <input type="checkbox" role="switch" id="input-switch" class="form-check-input" />
          <label class="form-check-label" for="input-switch">
            I want to receive the newsletter <span aria-hidden="true">(optional)</span>
          </label>
        </div>
      </div>
      <div class="mb-16">
        <div class="form-check">
          <input type="checkbox" id="input-checkbox" required />
          <label for="input-checkbox">
            I hereby confirm that I acknowledge and accept the terms and conditions.
            <span aria-hidden="true">(required)</span>
          </label>
        </div>
      </div>

      <div class="d-flex justify-content-end">
        <button class="btn btn-primary">Send</button>
      </div>
    </form>
  `,
};

export const Hints: Story = {
  render: () => html`
    <div class="form-floating">
      <input
        type="text"
        id="firstname"
        aria-describedby="firstname-hint"
        class="form-control"
        placeholder=" "
      />
      <label class="form-label" for="firstname">Firstname</label>
      <p id="firstname-hint" class="form-hint">Also provide any middle names in this field</p>
    </div>
  `,
};

export const Footer: Story = {
  render: FormFooterMeta.render,
  args: FormFooterMeta.FooterArgs,
};
