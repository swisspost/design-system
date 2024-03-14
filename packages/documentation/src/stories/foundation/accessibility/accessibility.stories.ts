import { StoryObj } from '@storybook/web-components';
import { MetaExtended } from '../../../../types';
import { html } from 'lit';
import { validateBadForm, addInputChangeListener } from './form-bad.example';
import { validateForm } from './form-good.example';

const meta: MetaExtended = {
  id: '46da78e8-e83b-4ca1-aaf6-bbc662efef14',
  title: 'Foundations/Accessibility',
  parameters: {
    badges: [],
  },
};

export default meta;

addInputChangeListener();

type Story = StoryObj;

export const Default: Story = {};

export const FormGoodExample: Story = {
  render: () => html`
    <div class="container">
      <form id="myForm" action="/">
        <div class="row mb-regular">
          <div class="col">
            <label class="form-label" for="firstname">Firstname</label>
            <input type="text" id="firstname" class="form-control" required />
            <div class="invalid-feedback">Please enter your firstname.</div>
          </div>
          <div class="col">
            <label class="form-label" for="lastname">Lastname</label>
            <input type="text" id="lastname" class="form-control" required />
            <div class="invalid-feedback">Please enter your lastname.</div>
          </div>
        </div>

        <div class="row mb-regular">
          <div class="col">
            <label class="form-label" for="phonenumber">Phone Number</label>
            <input type="tel" id="phonenumber" class="form-control" />
            <div class="invalid-feedback">Please enter your phone number.</div>
          </div>
          <div class="col">
            <label class="form-label" for="email">Email</label>
            <input type="email" id="email" class="form-control" required />
            <div class="invalid-feedback">Please enter a valid email address.</div>
          </div>
        </div>

        <div class="row mb-regular">
          <div class="col">
            <label class="form-label" for="address">Address</label>
            <input type="text" id="address" class="form-control" />
          </div>
          <div class="col">
            <label class="form-label" for="city">City</label>
            <input type="text" id="city" class="form-control" />
            <div class="invalid-feedback">Please enter your city.</div>
          </div>
        </div>

        <div class="row mb-regular">
          <div class="col">
            <label class="form-label" for="country">Country</label>
            <input type="text" id="country" class="form-control" />
            <div class="invalid-feedback">Please enter your country.</div>
          </div>
          <div class="col">
            <label class="form-label" for="zip">Zip</label>
            <input type="number" id="zip" class="form-control" />
            <div class="invalid-feedback">Please enter your zip code.</div>
          </div>
        </div>

        <div class="row mb-regular">
          <div class="col">
            <label class="form-label" for="question1">Random Question 1</label>
            <input type="text" id="question1" class="form-control" required />
            <div class="invalid-feedback">Please answer this question.</div>
          </div>
        </div>

        <div class="row mb-regular">
          <div class="col">
            <label class="form-label" for="question2">Random Question 2</label>
            <input type="text" id="question2" class="form-control" />
          </div>
        </div>

        <div class="row mb-regular">
          <div class="col">
            <label class="form-label" for="question3">Random Question 3</label>
            <input type="text" id="question3" class="form-control" />
          </div>
        </div>

        <div class="row mb-regular">
          <div class="col">
            <label class="form-label" for="question4">Random Question 4</label>
            <input type="text" id="question4" class="form-control" required />
            <div class="invalid-feedback">Please answer this question.</div>
          </div>
        </div>

        <div class="row mb-regular">
          <div class="col">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="terms" required />
              <label class="form-check-label" for="terms">
                I agree to the terms and conditions
              </label>
              <div class="invalid-feedback">You must agree to the terms and conditions.</div>
            </div>
          </div>
        </div>

        <div class="d-flex flex-row-reverse gap-mini">
          <button class="btn btn-primary" type="submit" @click="${() => validateForm()}">
            Send
          </button>
        </div>
      </form>
    </div>
  `,
};

export const FormBadExample: Story = {
  render: () => html` <div class="container">
    <form id="myBadForm" action="/">
      <div class="row mb-regular">
        <div class="col">
          <label class="form-label" for="firstname">Firstname</label>
          <input type="text" id="firstname" class="form-control" required />
        </div>
        <div class="col">
          <label class="form-label" for="lastname">Lastname</label>
          <input type="text" id="lastname" class="form-control" required />
        </div>
      </div>

      <div class="row mb-regular">
        <div class="col">
          <label class="form-label" for="phonenumber">Phone Number</label>
          <input type="tel" id="phonenumber" class="form-control" />
        </div>
        <div class="col">
          <label class="form-label" for="email">Email</label>
          <input type="email" id="email" class="form-control" required />
        </div>
      </div>

      <div class="row mb-regular">
        <div class="col">
          <label class="form-label" for="address">Address</label>
          <input type="text" id="address" class="form-control" />
        </div>
        <div class="col">
          <label class="form-label" for="city">City</label>
          <input type="text" id="city" class="form-control" />
        </div>
      </div>

      <div class="row mb-regular">
        <div class="col">
          <label class="form-label" for="country">Country</label>
          <input type="text" id="country" class="form-control" />
        </div>
        <div class="col">
          <label class="form-label" for="zip">Zip</label>
          <input type="number" id="zip" class="form-control" />
        </div>
      </div>

      <div class="row mb-regular">
        <div class="col">
          <label class="form-label" for="question1">Random Question 1</label>
          <input type="text" id="question1" class="form-control" required />
        </div>
      </div>

      <div class="row mb-regular">
        <div class="col">
          <label class="form-label" for="question2">Random Question 2</label>
          <input type="text" id="question2" class="form-control" />
        </div>
      </div>

      <div class="row mb-regular">
        <div class="col">
          <label class="form-label" for="question3">Random Question 3</label>
          <input type="text" id="question3" class="form-control" />
        </div>
      </div>

      <div class="row mb-regular">
        <div class="col">
          <label class="form-label" for="question4">Random Question 4</label>
          <input type="text" id="question4" class="form-control" required />
        </div>
      </div>

      <div class="row mb-regular">
        <div class="col">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="terms" required />
            <label class="form-check-label" for="terms">
              I agree to the terms and conditions
            </label>
          </div>
        </div>
      </div>

      <div class="d-flex flex-row-reverse gap-mini">
        <button class="btn btn-primary" type="submit" @click="${() => validateBadForm()}" disabled>
          Send
        </button>
      </div>
    </form>
  </div>`,
};
