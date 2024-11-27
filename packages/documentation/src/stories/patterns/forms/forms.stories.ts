import { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaExtended } from '@root/types';
import * as FormFooterMeta from '../../components/forms/form-footer/form-footer.stories';

const meta: MetaExtended = {
  id: 'd83829b2-7de2-48d2-be64-07a80c9caef3',
  title: 'Patterns/Forms',
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
        <div class="col">
          <div class="form-floating">
            <input
              id="formControlInvalid"
              type="text"
              class="form-control is-invalid"
              placeholder=" "
              required
            />
            <label class="form-label" for="FormControlInvalid">Invalid Input</label>
            <p class="invalid-feedback">Error message</p>
          </div>
        </div>
        <div class="col">
          <div class="form-floating">
            <input
              id="FormControlValid"
              type="text"
              class="form-control is-valid"
              placeholder=" "
              value="Value"
            />
            <label class="form-label" for="FormControlValid">Valid Input</label>
            <p class="valid-feedback">Success message (optional)</p>
          </div>
        </div>
      </div>

      <!-- Form Select -->
      <div class="row mb-16">
        <div class="col">
          <div class="form-floating">
            <select id="FormSelectInvalid" class="form-select is-invalid" required></select>
            <label class="form-label" for="FormSelectInvalid">Invalid Select</label>
            <p class="invalid-feedback">Error message</p>
          </div>
        </div>
        <div class="col">
          <div class="form-floating">
            <select id="FormSelectValid" class="form-select is-valid">
              <option disabled>Select one..</option>
              <option value="1">Value 1</option>
              <option value="2">Value 2</option>
            </select>
            <label class="form-label" for="FormSelectValid">Valid Select</label>
            <p class="valid-feedback">Success message (optional)</p>
          </div>
        </div>
      </div>

      <!-- Form Select Multiple-->
      <div class="row mb-16">
        <div class="col">
          <div class="form-floating">
            <select
              id="FormSelectMultipleInvalid"
              class="form-select is-invalid"
              multiple
              required
            ></select>
            <label class="form-label" for="FormSelectMultipleInvalid">
              Invalid Select Multiple
            </label>
            <p class="invalid-feedback">Error message</p>
          </div>
        </div>
        <div class="col">
          <div class="form-floating">
            <select id="FormSelectMultipleValid" class="form-select is-valid" multiple>
              <option value="1">Value 1</option>
              <option value="2">Value 2</option>
            </select>
            <label class="form-label" for="FormSelectMultipleValid">Valid Select Multiple</label>
            <p class="valid-feedback">Success message (optional)</p>
          </div>
        </div>
      </div>

      <!-- Form File -->
      <div class="row mb-16">
        <div class="col">
          <div class="form-floating">
            <input id="FormFileInvalid" type="file" class="form-control is-invalid" required />
            <label class="form-label" for="FormFileInvalid">Invalid File</label>
            <p class="invalid-feedback">Error message</p>
          </div>
        </div>
        <div class="col">
          <div class="form-floating">
            <input id="FormFileValid" type="file" class="form-control is-valid" />
            <label class="form-label" for="FormFileValid">Valid File</label>
            <p class="valid-feedback">Success message (optional)</p>
          </div>
        </div>
      </div>

      <!-- Form Textarea -->
      <div class="row mb-16">
        <div class="col">
          <div class="form-floating">
            <textarea
              id="FormTextareaInvalid"
              type="text"
              class="form-control is-invalid"
              placeholder=" "
              required
            ></textarea>
            <label class="form-label" for="FormTextareaInvalid">Invalid Textarea</label>
            <p class="invalid-feedback">Error message</p>
          </div>
        </div>
        <div class="col">
          <div class="form-floating">
            <textarea
              id="FormTextareaValid"
              type="text"
              class="form-control is-valid"
              placeholder=" "
            >
Value</textarea
            >
            <label class="form-label" for="FormTextareaValid">Valid Textarea</label>
            <p class="valid-feedback">Success message (optional)</p>
          </div>
        </div>
      </div>

      <!-- Form Checkbox -->
      <div class="row mb-16">
        <div class="col">
          <div class="form-check">
            <input class="form-check-input is-invalid" id="FormCheckboxInvalid" type="checkbox" />
            <label class="form-check-label" for="FormCheckboxInvalid">Invalid Checkbox</label>
            <p class="invalid-feedback">Error message</p>
          </div>
        </div>
        <div class="col">
          <div class="form-check">
            <input
              class="form-check-input is-valid"
              id="FormCheckboxValid"
              type="checkbox"
              checked
            />
            <label class="form-check-label" for="FormCheckboxValid">Valid Checkbox</label>
            <p class="valid-feedback">Success message (optional)</p>
          </div>
        </div>
      </div>

      <!-- Form Radio -->
      <div class="row mb-16">
        <div class="col">
          <div class="form-check">
            <input class="form-check-input is-invalid" id="FormRadioInvalid" type="radio" />
            <label class="form-check-label" for="FormRadioInvalid">Invalid Radio</label>
            <p class="invalid-feedback">Error message</p>
          </div>
        </div>
        <div class="col">
          <div class="form-check">
            <input class="form-check-input is-valid" id="FormRadioValid" type="radio" checked />
            <label class="form-check-label" for="FormRadioValid">Valid Radio</label>
            <p class="valid-feedback">Success message (optional)</p>
          </div>
        </div>
      </div>

      <!-- Form Range -->
      <div class="row mb-16">
        <div class="col">
          <div class="">
            <label class="form-label" for="FormRangeInvalid">Invalid Range</label>
            <input class="form-range is-invalid" id="FormRangeInvalid" type="range" />
            <p class="invalid-feedback">Error message</p>
          </div>
        </div>
        <div class="col">
          <div class="">
            <label class="form-label" for="FormRangeValid">Valid Range</label>
            <input class="form-range is-valid" id="FormRangeValid" type="range" />
            <p class="valid-feedback">Success message (optional)</p>
          </div>
        </div>
      </div>

      <!-- Form Switch -->
      <div class="row mb-16">
        <div class="col">
          <div class="form-check form-switch">
            <input
              id="FormSwitchInvalid"
              class="form-check-input is-invalid"
              type="checkbox"
              role="switch"
            />
            <label class="form-check-label" for="FormSwitchInvalid">Invalid Switch</label>
            <p class="invalid-feedback">Error message</p>
          </div>
        </div>
        <div class="col">
          <div class="form-check form-switch">
            <input
              id="FormSwitchValid"
              class="form-check-input is-valid"
              type="checkbox"
              role="switch"
              checked
            />
            <label class="form-check-label" for="FormSwitchValid">Valid Switch</label>
            <p class="valid-feedback">Success message (optional)</p>
          </div>
        </div>
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
      <p id="firstname-hint" class="form-hint">
        Also provide any middle names in this field
      </p>
    </div>
  `,
};

export const Footer: Story = {
  render: FormFooterMeta.render,
  args: FormFooterMeta.FooterArgs,
};
