import { StoryObj } from '@storybook/web-components';
import { MetaExtended } from '../../../../types';
import { html } from 'lit';

const meta: MetaExtended = {
  id: '46da78e8-e83b-4ca1-aaf6-bbc662efef14',
  title: 'Foundations/Accessibility',
  parameters: {
    badges: [],
  },
};

export default meta;

function validateForm() {
  const form = document.getElementById('myForm');
  const requiredFields = form.querySelectorAll(
    'input[required], select[required], textarea[required]',
  );

  let firstInvalidField = null;

  requiredFields.forEach(field => {
    if (field.type === 'checkbox' && !field.checked) {
      field.classList.add('is-invalid');
      if (firstInvalidField === null) {
        firstInvalidField = field;
      }
    } else if (!field.value.trim()) {
      field.classList.add('is-invalid');
      if (firstInvalidField === null) {
        firstInvalidField = field;
      }
    } else {
      field.classList.remove('is-invalid');
    }
  });

  if (firstInvalidField) {
    firstInvalidField.scrollIntoView({ behavior: 'smooth' });
  }
}

function validateBadForm() {
  const form = document.getElementById('myBadForm');
  const requiredFields = form.querySelectorAll(
    'input[required], select[required], textarea[required]',
  );
  const submitButton = form.querySelector('button[type="submit"]');

  let allFieldsFilled = true;

  requiredFields.forEach(field => {
    if (field.type === 'checkbox') {
      if (!field.checked) {
        allFieldsFilled = false;
      }
    } else if (!field.value.trim()) {
      allFieldsFilled = false;
    }
  });

  if (allFieldsFilled) {
    submitButton.removeAttribute('disabled');
  } else {
    submitButton.setAttribute('disabled', 'disabled');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // Add event listeners to call validateForm() on input change
  const form = document.getElementById('myBadForm');
  const formInputs = form.querySelectorAll('input, select, textarea');
  formInputs.forEach(input => {
    input.addEventListener('input', validateBadForm);
  });
});

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
